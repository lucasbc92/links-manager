const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models'); //same as db.Account
const { accountSignIn, accountSignUp } = require('../validators/account');
const { getMessage } = require('../helpers/messages');
const { getSignUpError } = require('../helpers/auth');
const { 
    generateJwt,
    generateRefreshJwt,
    verifyRefreshJwt,
    getTokenFromHeaders
} = require('../helpers/jwt');
const account = require('../validators/account');

const router = express.Router();

const saltRounds = 10;

router.post('/sign-in', accountSignIn, async (request, response) => {
    const {email, password} = request.body;

    const account = await Account.findOne({
        where: {email}
    })

    const accountMatch = account ? bcrypt.compareSync(password, account.password) : null;
    if(!accountMatch) {
        return response.jsonBadRequest(
            null,
            getMessage('account.signin.invalid'),
        );
    }

    const token = generateJwt({id: account.id});
    const refreshToken = generateRefreshJwt({id: account.id, version: account.jwtVersion});
    
    return response.jsonOK(
        account,
        getMessage('account.signin.success'),
        {token, refreshToken}
    );
})

router.post('/sign-up', accountSignUp, async (request, response) => {

    const {email, password} = request.body;
    console.log({email, password});

    const hash = bcrypt.hashSync(password, saltRounds);

    let newAccount;

    try {
        newAccount = await Account.create({
            email,
            password: hash
        });
    } catch(err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return response.jsonBadRequest(
                null,
                getMessage('account.signup.email.not_unique'),
                getSignUpError(err)
            );
        }
        return response.jsonBadRequest(
            null,
            err.name,
            getAuthError(err)
        );
    }
    const token = generateJwt({id: newAccount.id});
    const refreshToken = generateRefreshJwt({id: newAccount.id, version: newAccount.jwtVersion});

    return response.jsonOK(
        newAccount,
        getMessage('account.signup.success'),
        { token, refreshToken });
})

router.post('/refresh', async (request, response) => {
    const token = getTokenFromHeaders(request.headers);

    console.log(token);

    if(!token) {
        return response.jsonUnauthorized(null, 'Invalid token');
    }

    try {
        const decoded = verifyRefreshJwt(token);
        console.log('Decoded refresh token', decoded);

        const account = await Account.findByPk(decoded.id);
        if (!account) {
            return response.jsonUnauthorized(null, 'Invalid token');
        }
        
        if (decoded.version !== account.jwtVersion) {
            return response.jsonUnauthorized(null, 'Invalid token');
        }
        
        const meta = {
            token: generateJwt({id: account.id})
        };

        return response.jsonOK(null, '', meta);
    } catch (err) {
        return response.jsonUnauthorized(null, 'Invalid token');
    }
})

module.exports = router;
