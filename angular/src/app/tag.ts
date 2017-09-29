export class Tag {
    tagId: number;
    name: string;
    articleIds: number[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
