import { userTableInterface } from '../interface/emp.interface';
import { Collection } from '../interface/collection.interface';
import { mediaInterface } from '../interface/media.interface';
export interface schema {
    users: userTableInterface;
    collections: Collection;
    media: mediaInterface;
}

export const tableNames = {
    users: 'users',
    collections: 'collections',
    media: 'media',
} as const;
