import { Response, Request, NextFunction } from 'express';
import { mediaService } from './media.service';
import { mediaInterface } from '../../interface/media.interface';

export class mediaController {
    static async uploadSingle(req: Request, res: Response, next: NextFunction) {
        // return res.status(500).json({
        //     success: false,
        //     message: 'Something went wrong',
        // });
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File is missing',
            });
        }
        const userId = req.user?.id;
        const filePayload = {
            media_name: req.file.originalname,
            media_mimetype: req.file.mimetype,
            media_size: req.file.size,
            media_url: req.file.path,
            uploaded_by: userId,
            updated_by: userId,
            created_on: new Date(),
            updated_on: new Date(),
        };
        const response = await mediaService.uploadMediaDetails(filePayload);
        if (!response) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
        res.status(200).json({
            success: true,
            message: 'File uploaded successfully',
            data: response,
        });
    }
}
