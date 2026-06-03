import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../utils/errorHandler.utils';
import { jwtService } from '../utils/jwt.utils';

const verifyRefreshToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const refreshToken = req.cookies?.refresh_token;

        if (!refreshToken) {
            return next(new errorHandler(401, 'Refresh token missing', false));
        }

        const decodedJson = jwtService.verifyRefreshToken(refreshToken) as {
            id: string;
        };

        req.user = {
            id: decodedJson.id,
        };

        next();
    } catch (e: any) {
        if (e.name === 'TokenExpiredError') {
            return next(new errorHandler(401, 'Refresh token expired', false));
        }

        return next(new errorHandler(401, 'Invalid refresh token', false));
    }
};

export default verifyRefreshToken;
