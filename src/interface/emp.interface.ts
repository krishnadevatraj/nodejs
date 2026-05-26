export interface userTableInterface {
    id?: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
    refresh_token?: string | null;
    reset_password_token?: string | null;
    expiry_time?: number | null;
}

export {};
