import { errorHandler } from '../../utils/errorHandler.utils';
import { loginInterface } from '../../interface/auth.interface';
import { authModel } from '../../modules/auth/auth.model';
import bcrypt from 'bcrypt';
import { jwtService } from '../../utils/jwt.utils';
import crypto from 'crypto';
import { sendEmail } from '../../service/email.service';

export class authService {
    static async login(userCrdentials: loginInterface) {
        const userDetails = await authModel.getUsersDetails(
            userCrdentials.email
        );

        if (!userDetails) {
            throw new errorHandler(404, 'User not found');
        }

        const isPasswordMatched = await bcrypt.compare(
            userCrdentials.password,
            userDetails.password
        );

        if (!isPasswordMatched) {
            throw new errorHandler(404, 'Invalid credentials');
        }
        const accessToken = jwtService.generateAccessToken({
            id: userDetails.id,
        });
        // const refreshTokenHash = jwtService.generateRefreshToken({
        //     id: userDetails.id,
        // });

        // const newRefreshTokenHash = crypto
        //     .createHash('sha256')
        //     .update(refreshTokenHash)
        //     .digest('hex');

        // await authModel.saveRefreshTokenDb(userDetails.id as number);

        return { accessToken, user: userDetails };
    }

    static async refreshToken(oldRefreshToken: string) {
        const userDetails = await authModel.getRefreshToken(oldRefreshToken);

        if (userDetails.length === 0) {
            throw new errorHandler(401, 'Invalid refresh token', false);
        }

        const newRefreshToken = jwtService.generateRefreshToken({
            id: userDetails[0].id,
        });
        const accessToken = jwtService.generateAccessToken({
            id: userDetails[0].id,
        });

        const newRefreshTokenHash = crypto
            .createHash('sha256')
            .update(newRefreshToken)
            .digest('hex');

        await authModel.updateRefreshTokenDb(
            userDetails[0].id as number,
            newRefreshTokenHash as string
        );

        return { accessToken, newRefreshTokenHash, user: userDetails[0] };
    }

    static async sendPasswordLink(email: string) {
        const userDetails = await authModel.getUsersDetails(email);

        if (!userDetails) {
            throw new errorHandler(404, 'User not found');
        }

        const token = crypto.randomBytes(32).toString('hex');

        const hashToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');
        const time =
            Date.now() + Number(process.env.RESET_PASSWORD_TOKEN_EXPIRY);
        const url = `${process.env.FRONTEND_BASE_URL}/reset-password/${token}`;
        console.log(url);
        const data = {
            expiry_time: time,
            reset_password_token: hashToken,
        };

        await authModel.updatePasswordLink(
            userDetails.id as number,
            data as object
        );

        const html = `<h2>Password Reset</h2><p>Click the link below:</p><a href="${url}">Reset Password</a>`;

        sendEmail({
            to: email,
            subject: 'Password Reset Successful',
            html: html,
        });

        return true;
    }

    static async resetPassword(password: string, token: string) {
        const time = Date.now();

        const hashToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        const response = await authModel.getExpiryTime(hashToken);

        if (!response || time > response.expiry_time!) {
            throw new errorHandler(400, 'Invalid or expired link');
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const queryResponse = await authModel.updatePassword(
            hashPassword,
            hashToken
        );

        if (!queryResponse || Number(queryResponse.numUpdatedRows) === 0) {
            throw new errorHandler(500, 'Failed to update password');
        }

        return true;
    }

    static async validateLink(token: string) {
        const time = Date.now();
        const hashToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');
        const response = await authModel.getExpiryTime(hashToken);
        if (!response) {
            throw new errorHandler(400, 'Invalid or expired link');
        }
        if (time > response.expiry_time!) {
            throw new errorHandler(410, 'Invalid or expired link');
        }

        return true;
    }
}
