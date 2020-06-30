const Joi = require ('@hapi/joi');
const { getValidatorError } = require ('../helpers/validator');

const accountSignUp = (request, response, next) => {
    const { email, password, password_confirmation } = request.body;

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
    });

    const options = {abortEarly: false};
    const {error} = schema.validate(
        { email, password, password_confirmation },
        options
    );

    if (error) {
        const errorMessages = getValidatorError(error, 'account.signup');
        return response.jsonBadRequest(null, '', {error: errorMessages});
    }

    next();
}

module.exports = { accountSignUp };