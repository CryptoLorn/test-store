import Joi from "joi";

export const RegistrationValidator = Joi.object({
    email: Joi.string()
        .regex(new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'))
        .required()
        .messages({
            'string.empty': '"email" cannot be empty',
            'string.pattern.base': 'Invalid email'
        }),
    password: Joi.string()
        .min(3)
        .max(15)
        .required()
        .messages({
            'string.empty': '"password" cannot be empty',
            'string.min': '"password" length must be from 3-15 characters',
            'string.max': '"password" can be a max of 15 characters'
        })
})