import { errorHandler } from '../../utils/errorHandler.utils';
import { userTableInterface } from '../../interface/emp.interface';
import { empModel } from '../../modules/emp/emp.model';
import bcrypt from 'bcrypt';

export class empService {
    static async registerUser(userDetails: userTableInterface) {
        const isUserExist = await empModel.isUserExist(userDetails.email);
        console.log(isUserExist);
        if (isUserExist.length > 0) {
            throw new errorHandler(404, 'User is already exist', true);
        }
        const bcryptPassword = await bcrypt.hash(userDetails.password, 10);

        userDetails.password = bcryptPassword;

        const user = await empModel.registerUser(userDetails);
        console.log(user);
        return user;
    }

    static async getEmployeeDetails(empId: number) {
        const empDetails = await empModel.getEmployeeDetails(empId);
        return empDetails;
    }
}
