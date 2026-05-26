import db from '../../database/db';
import {
    AddCollectionPayload,
    Collection,
    filterInterfaceType,
    UpdateCollectionPayload,
} from '../../interface/collection.interface';

import { tableNames } from '../../database/schema';
export class collectionModel {
    static async createCollection(data: AddCollectionPayload) {
        return db
            .insertInto(tableNames.collections)
            .values(data)
            .returning('id')
            .execute();
    }
    static async updateCollection(
        data: UpdateCollectionPayload,
        collectionId: number
    ) {
        return db
            .updateTable(tableNames.collections)
            .set(data)
            .where('id', '=', collectionId)
            .execute();
    }

    static async getCollections(userId: number, filter: filterInterfaceType) {
        let baseQuery = db
            .selectFrom(`${tableNames.collections} as c`)
            .innerJoin(`${tableNames.users} as u`, 'c.created_by', 'u.id')
            .where('c.created_by', '=', userId);
        let data = await baseQuery.select([
            'c.collection_name',
            'c.collection_description',
            'c.cover_url',
            'u.first_name',
            'u.last_name',
        ]);

        if (filter?.page && filter?.page_size) {
            data = data
                .limit(filter.page_size)
                .offset((filter.page - 1) * filter.page_size);
        }

        let totalCountResult = await baseQuery
            .select(({ fn }) => fn.count('c.id').as('total'))
            .execute();

        return {
            data: await data.execute(),
            totalCount: totalCountResult[0]?.total,
        };
    }
}
