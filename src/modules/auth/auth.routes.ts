import express from 'express';
import { authController } from './auth.controller';
import { validate } from '../../middleware/validate';
import {
    loginSchema,
    registerSchema,
    resetPasswordSchema,
    validateEmailSchema,
} from '../../validations/auth.validation';
import { asynchHandler } from '../../utils/asynchHandler.utils';
import authenticate from '../../middleware/auth.middleware';
import verifyRefreshToken from '../../middleware/verifyRefreshToken.middleware';
const router = express.Router();

router.post(
    '/login',
    validate(loginSchema),

    asynchHandler(authController.login)
);

router.post(
    '/refresh-token',
    verifyRefreshToken,
    asynchHandler(authController.refreshToken)
);

router.post(
    '/send-password-link',
    asynchHandler(authController.sendPasswordLink)
);

router.post(
    '/validate-link',
    validate(validateEmailSchema),
    asynchHandler(authController.validateLink)
);

router.post(
    '/reset-password',
    validate(resetPasswordSchema),
    asynchHandler(authController.resetPassword)
);

router.post('/logout', asynchHandler(authController.logout));
export default router;
