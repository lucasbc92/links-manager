const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models'); //same as db.Account

const router = express.Router();

const saltRounds = 10;

router.get('/sign-in', (request, response) => {
    return response.json({
        message: 'Sign in'
    })
})

router.get('/sign-up', async (request, response) => {
    const {email, password} = request.body;

    return response.json({email, password});

    const hash = bcrypt.hashSync(password, saltRounds)
    const result = await Account.create({
        email,
        password: hash
    })

    return response.json(result);
})

router.post('/sign-up', async (request, response) => {

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
            console.log(err.errors[0].message);
            return response.json({
                error: "Email is already registered."
            });
        }
        return response.json(err);
    }  

    return response.json(result);
})

module.exports = router;
