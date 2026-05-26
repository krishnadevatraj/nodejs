import joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { pick } from '../utils/pick.utils';
import { errorHandler } from '../utils/errorHandler.utils';
import status from 'http-status';
export const validate =
    (schema: {
        params?: ObjectSchema;
        query?: ObjectSchema;
        body?: ObjectSchema;
    }) =>
    (req: Request, res: Response, next: NextFunction): void => {
        const validSchema = pick(schema, ['params', 'query', 'body']);

        const object = pick(req, Object.keys(validSchema));

        const { error, value } = joi
            .object(validSchema)
            .preferences({
                errors: { label: 'key' },
                abortEarly: false,
            })
            .validate(object);

        if (error) {
            const validationError: Record<string, string> = {};
            error.details.forEach((errorIndex) => {
                const field = errorIndex.context?.label || '';
                validationError[field] = errorIndex.message.replace(/"/g, '');
            });

            const errorMessage = 'Validation_Error';

            return next(
                new errorHandler(
                    status.BAD_REQUEST,
                    errorMessage,
                    false,
                    JSON.stringify(validationError)
                )
            );
        }
        Object.assign(req, value);
        return next();
    };
