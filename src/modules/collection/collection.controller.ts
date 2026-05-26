import { Request, Response } from 'express';
import { collectionService } from './collection.service';
import {
    filterInterfaceType,
    Collection,
    AddCollectionPayload,
} from '../../interface/collection.interface';

export class collectionController {
    static async createCollection(req: Request, res: Response) {
        console.log('hello');
        console.log(req.body);

        // const { collection_name, collection_description } = req.body;
        // const empId = Number(req.user!.id);
        // // const filePath = req.file?.path;

        // let payload: AddCollectionPayload = {
        //     collection_name,
        //     collection_description,
        //     // cover_url: req.file?.path ?? null,
        //     created_at: new Date(),
        //     updated_at: new Date(),
        //     created_by: empId,
        // };

        // // if (filePath) {
        // //     payload.cover_url = filePath;
        // // }
        // console.log(payload);
        // await collectionService.createCollection(payload);
        res.status(200).json({
            status: 'success',
            message: 'Collection is created successfuly',
        });
    }

    static async updateCollection(req: Request, res: Response) {
        const payload = req.body;
        const collectionId = Number(req.params.id);
        await collectionService.updateCollection(payload, collectionId);
        res.status(200).json({
            status: 'success',
            message: 'Collection is updated successfuly',
        });
    }

    static async getCollections(req: Request, res: Response) {
        let filter: filterInterfaceType | undefined;

        if (req.query.page) {
            filter = {
                page: Number(req.query.page),
                page_size: Number(req.query.page_size),
            };
        }

        const empId = Number(req.user!.id);
        const collections = await collectionService.getCollections(
            empId,
            filter as filterInterfaceType
        );
        res.status(200).json({
            status: 'success',
            data: collections.data,
            total_count: collections.totalCount,
        });
    }
}
