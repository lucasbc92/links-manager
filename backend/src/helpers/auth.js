const messages = require('../config/messages.json');
const { getMessage } = require('./messages');

const getSignUpError = (error) => {
    if(!error) return null;

    const errorMessages = {};

    error.errors.map((detail) => {
        const message = detail.message;

        const keyPath = detail.path;
        const keySplit = keyPath.split(/[\s.]+/);
        const key = keySplit[keySplit.length-1];
        const type = detail.validatorKey;

        const path = `account.signup.${key}.${type}`;

        const customMessage = getMessage(path);
        if(!customMessage) {
            console.log('custom message not found for path: ', path)
        }

        errorMessages[keyPath] = customMessage || message;
    });

    console.log(errorMessages);

    return errorMessages;
}

module.exports = { getSignUpError }
