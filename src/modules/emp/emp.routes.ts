import express from 'express';
import { empController } from './emp.controller';
import { validate } from '../../middleware/validate';
import { loginSchema, registerSchema } from '../../validations/auth.validation';
import { asynchHandler } from '../../utils/asynchHandler.utils';
import authenticate from '../../middleware/auth.middleware';
const router = express.Router();

router.post(
    '/register',
    validate(registerSchema),
    asynchHandler(empController.registerUser)
);

router.get(
    '/employee',
    authenticate,
    asynchHandler(empController.getEmployeeDetails)
);

export default router;
