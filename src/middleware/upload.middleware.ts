import {
    ALLOWED_EXTENSION,
    ALLOWED_MIME_TYPE,
    MAX_FILE_SIZE,
} from '../config/constant';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Response, Request } from 'express';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const fileName = `${uuidv4()}${ext}`;
        cb(null, fileName);
    },
});
const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    const ext = path.extname(file.originalname).toLocaleLowerCase();
    if (!ALLOWED_EXTENSION.includes(ext) && !ALLOWED_MIME_TYPE.includes(ext)) {
        cb(new Error('File type not allowed'));
    }
    cb(null, true);
};

const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter,
});

export default upload;
