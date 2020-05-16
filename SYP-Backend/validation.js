const Joi = require('@hapi/joi');

const registerValidation = data => {
    const registerSchema = Joi.object({
        username: Joi.string().min(5).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        role: Joi.string().required()
    });

    const validationResult = registerSchema.validate(data);
    return validationResult;
};

const loginValidation = data => {
    const loginSchema = Joi.object({
        username: Joi.string().min(5),
        email: Joi.string().min(6).email(),
        password: Joi.string().min(6).required()
    });

    const validationResult = loginSchema.validate(data);
    return validationResult;

};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;