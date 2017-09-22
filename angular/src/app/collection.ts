export class Collection {
    id: number;
    name: string;
    articleIds: number[];
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
