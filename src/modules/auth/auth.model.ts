import db from '../../database/db';

import { tableNames } from '../../database/schema';

export class authModel {
    static async getUsersDetails(email: string) {
        return db
            .selectFrom(tableNames.users)
            .select([
                'id',
                'first_name',
                'last_name',
                'middle_name',
                'email',
                'password',
            ])
            .where('email', '=', email)
            .executeTakeFirst();
    }

    static async saveRefreshTokenDb(userId: number, refreshToken: string) {
        const query = db
            .updateTable(tableNames.users)
            .set({ refresh_token: refreshToken })
            .where('id', '=', userId);
        return query.execute();
    }
    static async getRefreshToken(token: string) {
        const query = db
            .selectFrom(tableNames.users)
            .select(['id', 'refresh_token', 'first_name', 'last_name', 'email'])
            .where('refresh_token', '=', token);
        return query.execute();
    }

    static async updateRefreshTokenDb(userId: number, refreshToken: string) {
        const query = db
            .updateTable(tableNames.users)
            .set({ refresh_token: refreshToken })
            .where('id', '=', userId);
        return query.execute();
    }
    static async updatePasswordLink(userId: number, data: object) {
        const query = db
            .updateTable(tableNames.users)
            .set(data)
            .where('id', '=', userId);
        return query.execute();
    }
    static async getExpiryTime(token: string) {
        const query = db
            .selectFrom(tableNames.users)
            .select(['expiry_time', 'email'])
            .where('reset_password_token', '=', token);
        return query.executeTakeFirst();
    }
    static async updatePassword(password: string, token: string) {
        return db
            .updateTable(tableNames.users)
            .set({
                password,
                reset_password_token: null,
                expiry_time: null,
            })
            .where('reset_password_token', '=', token)
            .executeTakeFirst();
    }
}
