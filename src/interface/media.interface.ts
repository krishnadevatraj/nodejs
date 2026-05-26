export interface mediaInterface {
    media_id?: number;
    media_name: string;
    media_url: string;
    media_size: number;
    media_mimetype: string;
    uploaded_by: string | undefined;
    updated_by: string | undefined;
    created_on: Date;
    updated_on: Date;
    collection_id?: number | null;
    folder_id?: number | null;
}
