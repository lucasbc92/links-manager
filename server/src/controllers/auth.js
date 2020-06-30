const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models'); //same as db.Account
const { accountSignUp } = require('../validators/account');
const { getMessage } = require('../helpers/messages');
const { getAuthError } = require('../helpers/auth');

const router = express.Router();

const saltRounds = 10;

router.get('/sign-in', (request, response) => {
    return response.jsonOK(null);
})

router.get('/sign-up', async (request, response) => {
    const {email, password} = request.body;

    return response.jsonOK({email, password});
})

router.post('/sign-up', accountSignUp, async (request, response) => {

    const {email, password} = request.body;

    console.log({email, password});

    const hash = bcrypt.hashSync(password, saltRounds);

    let result;

    try {
        result = await Account.create({
            email,
            password: hash
        });
    } catch(err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return response.jsonBadRequest(null, getMessage('account.signup.email.not_unique'), getAuthError(err));
        }
        return response.jsonBadRequest(null, err.name, getAuthError(err));
    }  

    return response.jsonOK(result, getMessage('account.signup.success'));
})

module.exports = router;
