import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../utils/errorHandler.utils';
import { jwtService } from '../utils/jwt.utils';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];

        if (Array.isArray(authHeader) || !authHeader) {
            res.status(401).json({
                message: 'Invalid or missing Authorization header',
            });
            return;
        }

        const token = authHeader?.split(' ')[1];

        if (!token) {
            return next(new errorHandler(401, 'Access token missing', false));
        }

        const decodedJson = jwtService.verifyToken(token) as {
            id: string;
            email: string;
        };

        req.user = {
            id: decodedJson.id,
            email: decodedJson.email,
        };

        next();
    } catch (e: any) {
        if (e.name === 'TokenExpiredError') {
            throw new errorHandler(401, 'Token expired', false);
        }
        throw new errorHandler(401, 'Invalid access token', false);
    }
};
export default authenticate;
