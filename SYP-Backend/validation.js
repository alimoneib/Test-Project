const Joi = require('@hapi/joi');

const registerValidation = data => {
    const registerSchema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        role: Joi.string().required()
    });

    const validationResult = registerSchema.validate(data);
    return validationResult;
};

const loginValidation = data => {
    const loginSchema = {
        name: joi.string().required(),
        email: joi.string().min(6).required(),
        password: joi.string().min(6).required()
    };

    joi.validate(data, loginSchema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;