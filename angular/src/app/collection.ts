export class Collection {
    cId: number;
    name: string;
    articleIds: number[];
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
