export class Favorite {
    articleId: number;
    title: string;
    url: string;
    tags: string;
    read: boolean;
    collectionId?: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
