import { Generated } from 'kysely';
import { Updateable } from 'kysely';
export interface Collection {
    id: Generated<number>;
    collection_name: string;
    collection_description: string;
    cover_url?: string | null;
    no_of_media?: number;
    created_by: number;
    created_at?: Date;
    updated_at: Date;
}

export interface filterInterface {
    page: number;
    page_size: number;
}
export type filterInterfaceType = filterInterface | undefined;

export type AddCollectionPayload = Omit<Collection, 'id' | 'no_of_media'>;

export type UpdateCollectionPayload = Updateable<Collection>;
