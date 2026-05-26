import express from 'express';
import upload from '../../middleware/upload.middleware';
import { mediaController } from './media.controller';
import { asynchHandler } from '../../utils/asynchHandler.utils';
import authenticate from '../../middleware/auth.middleware';
const router = express.Router();

router.post(
    '/upload',
    authenticate,
    upload.single('file'),
    asynchHandler(mediaController.uploadSingle)
);

export default router;
