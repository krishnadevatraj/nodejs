import joi from 'joi';

export const createCollectionSchema = {
    body: joi.object({
        collection_name: joi.string().required().empty('').messages({
            'any.required': 'Collection name is required',
            'string.base': 'Collection name must be a string',
            'string.empty': 'Collection name cannot be empty',
        }),
        collection_description: joi.string().optional().empty('').messages({
            'any.required': 'Description is required',
            'string.base': 'Description must be a string',
            'string.empty': 'Description cannot be empty',
        }),
        collection_cover: joi.any().optional().allow(null, ''),
    }),
};
export const updateCollectionSchema = {
    params: joi.object({
        id: joi.string().required().messages({
            'any.required': 'Collection ID is required',
        }),
    }),
    body: joi.object({
        collection_name: joi.string().optional().empty('').messages({
            'string.base': 'Collection name must be a string',
            'string.empty': 'Collection name cannot be empty',
        }),
        description: joi.string().optional().empty('').messages({
            'string.base': 'Description must be a string',
            'string.empty': 'Description cannot be empty',
        }),
        cover_url: joi.string().optional().empty('').messages({
            'string.base': 'Cover URL must be a string',
            'string.empty': 'Cover URL cannot be empty',
        }),
    }),
};

export const listCollectionSchema = {
    params: joi.object({
        page: joi.number().optional().empty('').messages({
            'number.base': 'Page must be a number',
            'number.empty': 'Page cannot be empty',
        }),
        page_size: joi.number().optional().empty('').messages({
            'number.base': 'Page size must be a number',
            'number.empty': 'Page size cannot be empty',
        }),
    }),
};
