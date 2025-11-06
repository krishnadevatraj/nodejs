import express from "express";
import { authController } from "./auth.controller";
import { validate } from "../../middleware/validate";
import loginSchema from "../validations/auth.validation";
const router = express.Router();

router.get("/login", validate(loginSchema), authController.login);

export default router;
