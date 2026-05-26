import joi from 'joi';

export const loginSchema = {
    body: joi.object({
        email: joi.string().required().email().empty('').messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty',
        }),
        password: joi.string().required().empty('').min(6).max(8).messages({
            'any.required': 'Password is required',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password must be at most 8 characters long',
        }),
    }),
};

export const registerSchema = {
    body: joi.object({
        first_name: joi.string().required().empty('').messages({
            'any.required': 'First name is required',
            'string.base': 'First name must be a string',
            'string.empty': 'First name cannot be empty',
        }),
        middle_name: joi.string().required().empty('').messages({
            'any.required': 'Middle name is required',
            'string.base': 'Middle name must be a string',
            'string.empty': 'Middle name cannot be empty',
        }),
        last_name: joi.string().required().empty('').messages({
            'any.required': 'Last name is required',
            'string.base': 'Last name must be a string',
            'string.empty': 'Last name cannot be empty',
        }),
        email: joi.string().email().required().empty('').messages({
            'any.required': 'Email is required',
            'string.base': 'Email must be a string',
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email cannot be empty',
        }),
        password: joi.string().required().min(6).max(8).messages({
            'any.required': 'Password is required',
            'string.base': 'Password must be a string',
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password must be at most 8 characters long',
            'string.empty': 'Password cannot be empty',
        }),
    }),
};

export const validateEmailSchema = {
    body: joi.object({
        token: joi.string().required().empty('').messages({
            'string.empty': 'Token cannot be empty',
        }),
    }),
};

export const resetPasswordSchema = {
    body: joi.object({
        password: joi.string().required().min(6).max(8).messages({
            'any.required': 'Password is required',
            'string.base': 'Password must be a string',
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password must be at most 8 characters long',
            'string.empty': 'Password cannot be empty',
        }),
        token: joi.string().required().messages({
            'any.required': 'Token is required',
        }),
    }),
};
