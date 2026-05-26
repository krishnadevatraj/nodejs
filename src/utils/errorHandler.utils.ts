export class errorHandler extends Error {
    status: number;
    success: boolean;
    error: string;
    constructor(status: number, message: string, success?: boolean, error?: string) {
        super(message);
        this.status = status;
        this.message = message;
        this.success = success || false;
        this.error = error || '';
        Error.captureStackTrace(this, this.constructor);
    }
}
