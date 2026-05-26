import { mediaModel } from './media.model';
import { mediaInterface } from '../../interface/media.interface';
export class mediaService {
    static async uploadMediaDetails(filePayload: mediaInterface) {
        return await mediaModel.uploadMediaDetails(filePayload);
    }
}
