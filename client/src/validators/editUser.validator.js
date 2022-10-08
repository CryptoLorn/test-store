import Joi from "joi";

export const EditUserValidator = Joi.object({
    email: Joi.string()
        .regex(new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'))
        .required()
        .messages({
            'string.empty': '"email" cannot be empty',
            'string.pattern.base': 'Invalid email'
        }),
    role: Joi.string()
        .min(1)
        .messages({
            'string.empty': '"role" cannot be empty'
        })
})