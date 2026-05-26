import db from '../../database/db';
import { userTableInterface } from '../../interface/emp.interface';

import { tableNames } from '../../database/schema';

export class empModel {
    static async registerUser(userDetails: userTableInterface) {
        try {
            return db
                .insertInto(tableNames.users)
                .values(userDetails)
                .returning('id')
                .execute();
        } catch (error) {
            throw error;
        }
    }

    static async isUserExist(email: string) {
        const query = db
            .selectFrom(tableNames.users)
            .select('email')
            .where('email', '=', email);
        return query.execute();
    }

    static async getEmployeeDetails(userId: number) {
        const query = db
            .selectFrom(tableNames.users)
            .select(['id', 'first_name', 'last_name', 'middle_name', 'email'])
            .where('id', '=', userId);
        return query.executeTakeFirst();
    }
}
