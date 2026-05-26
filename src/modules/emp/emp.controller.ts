import { Request, Response, NextFunction } from 'express';
import { empService } from './emp.service';
import { userTableInterface } from '../../interface/emp.interface';

export class empController {
    static async registerUser(req: Request, res: Response, next: NextFunction) {
        const payload = req.body;

        const user = await empService.registerUser(
            payload as userTableInterface
        );

        res.status(200).json({
            status: 'success',
            message: 'User Registered Successfully',
        });
    }

    static async getEmployeeDetails(req: Request, res: Response) {
        const empId = Number(req.user!.id);
        const empDetails = await empService.getEmployeeDetails(empId);
        res.status(200).json({
            status: 'success',
            data: empDetails,
            message: '',
        });
    }
}
