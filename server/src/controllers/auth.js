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
    const email = 'lbc92@hotmail.com';
    const password = 'password';

    const hash = bcrypt.hashSync(password, saltRounds)

    const result = await Account.create({
        email,
        password: hash
    })

    return response.json(result);
})

module.exports = router;
