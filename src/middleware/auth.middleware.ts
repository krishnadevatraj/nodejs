import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../utils/errorHandler.utils';
import { jwtService } from '../utils/jwt.utils';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.access_token;

        if (!token) {
            return next(new errorHandler(401, 'Access token missing', false));
        }

        const decodedJson = jwtService.verifyToken(token) as { id: string };

        req.user = {
            id: decodedJson.id,
        };
        console.log(req.user);
        next();
    } catch (e: any) {
        if (e.name === 'TokenExpiredError') {
            throw new errorHandler(401, 'Token expired', false);
        }
        throw new errorHandler(401, 'Invalid access token', false);
    }
};
export default authenticate;
