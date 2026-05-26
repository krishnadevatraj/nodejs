import db from '../../database/db';
import { tableNames } from '../../database/schema';

import { mediaInterface } from '../../interface/media.interface';
export class mediaModel {
    static async uploadMediaDetails(data: mediaInterface) {
        return db
            .insertInto(tableNames.media)
            .values(data)
            .returning('media_id')
            .execute();
    }
}
