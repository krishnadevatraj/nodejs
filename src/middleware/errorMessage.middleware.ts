import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../utils/errorHandler.utils';

export const errorMessage = (
    err: errorHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err.status || 500;
    const message = err.message || 'Database Error';
    const success = err.success || false;
    const error = err.error || '';
    console.log(err);
    res.status(status).json({
        status: status,
        success: success,
        message: message,
        error: error,
    });
};
