import jwt from 'jsonwebtoken';

export class jwtService {
    static generateAccessToken(payload: object) {
        if (!process.env.JWT_SCRET_KEY) {
            throw new Error('JWT_SCRET_KEY is not defined');
        }
        return jwt.sign(payload, process.env.JWT_SCRET_KEY, {
            expiresIn: '1hr',
        });
    }
    static generateRefreshToken(payLoad: object) {
        if (!process.env.JWT_REFRESH_TOKEN) {
            throw new Error('JWT_REFRESH_TOKEN is not defined');
        }
        return jwt.sign(payLoad, process.env.JWT_REFRESH_TOKEN, {
            expiresIn: '7d',
        });
    }
    static verifyToken(token: string) {
        if (!process.env.JWT_SCRET_KEY) {
            throw new Error('JWT_SCRET_KEY is not defined');
        }
        return jwt.verify(token, process.env.JWT_SCRET_KEY);
    }
}
