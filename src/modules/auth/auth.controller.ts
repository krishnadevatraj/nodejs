import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { loginInterface } from '../../interface/auth.interface';

export class authController {
    static async login(req: Request, res: Response, next: NextFunction) {
        const userCrdentials = req.body;

        const response = await authService.login(userCrdentials);

        res.cookie('refresh_token', response.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000,
            sameSite: 'strict',
        });
        res.json({
            status: 'success',
            access_token: response.accessToken,
            first_name: response.user.first_name,
            last_name: response.user.last_name,
            email: response.user.email,
            message: 'Login Successfull',
        });
    }

    static async refreshToken(req: Request, res: Response) {
        const empId = Number(req.user?.id);

        const response = await authService.refreshToken(empId);

        res.cookie('refresh_token', response.newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000,
            sameSite: 'strict',
            path: '/api/refresh-token',
        });
        res.status(200).json({
            status: 'success',
            access_token: response.newAccessToken,
            first_name: response.emp.first_name,
            last_name: response.emp.last_name,
            email: response.emp.email,
            message: 'Token refreshed successfully',
        });
    }
    static async sendPasswordLink(req: Request, res: Response) {
        const email = req.body.email as string;
        const response = await authService.sendPasswordLink(email);

        res.status(200).json({
            status: 'success',
            message: 'Reset Password has been send on this email',
        });
    }

    static async resetPassword(req: Request, res: Response) {
        const { password, token } = req.body;
        await authService.resetPassword(password as string, token as string);
        res.status(200).json({
            status: 'success',
            message: 'Password reset successfully',
        });
    }
    static async validateLink(req: Request, res: Response) {
        const token = req.body.token as string;
        await authService.validateLink(token);
        res.status(200).json({
            status: 'success',
            message: 'Link validated successfully',
        });
    }

    static async logout(req: Request, res: Response) {
        res.cookie('access_token', '', {
            maxAge: 0,
        });
        res.status(200).json({
            status: 'success',
            message: 'Logout successful',
        });
    }
}
