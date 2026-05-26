import express from 'express';
import { collectionController } from './collection.controller';
import { validate } from '../../middleware/validate';
import {
    createCollectionSchema,
    updateCollectionSchema,
    listCollectionSchema,
} from '../../validations/collection.validation';
import { asynchHandler } from '../../utils/asynchHandler.utils';
import authenticate from '../../middleware/auth.middleware';
import upload from '../../middleware/upload.middleware';

const router = express.Router();

router.post(
    '/create-collection',
    // authenticate,
    // validate(createCollectionSchema),
    // upload.single('collection_cover'),
    asynchHandler(collectionController.createCollection)
);

router.put(
    '/collection/:id',
    authenticate,
    validate(updateCollectionSchema),
    asynchHandler(collectionController.updateCollection)
);

router.get(
    '/collection',
    authenticate,
    validate(listCollectionSchema),
    asynchHandler(collectionController.getCollections)
);

export default router;
