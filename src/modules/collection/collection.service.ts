import { collectionModel } from './collection.model';
import {
    Collection,
    filterInterfaceType,
    AddCollectionPayload,
    UpdateCollectionPayload,
} from '../../interface/collection.interface';
import { errorHandler } from '../../utils/errorHandler.utils';

export class collectionService {
    static async createCollection(data: AddCollectionPayload) {
        const response = await collectionModel.createCollection(data);

        if (!response) {
            throw new errorHandler(500, 'Failed to create collection');
        }
    }

    static async updateCollection(
        data: UpdateCollectionPayload,
        collectionId: number
    ) {
        const collectionData = {
            ...data,
            updated_at: new Date(),
        };
        const response = await collectionModel.updateCollection(
            collectionData,
            collectionId
        );

        if (!response) {
            throw new errorHandler(500, 'Failed to update collection');
        }
    }

    static async getCollections(userId: number, filter: filterInterfaceType) {
        const response = await collectionModel.getCollections(userId, filter);
        if (!response) {
            throw new errorHandler(404, 'Collection not found');
        }

        return response;
    }
}
