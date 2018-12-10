export class Image {
    /* Data of an image */

    id: number;

    name: string;

    path: string;

    constructor(instance?) {
        if(!instance) {
            instance = { id: null };
        }
        this.id = instance.id ? instance.id : 0;
        this.name = instance.name ? instance.name : '';
        this.path = instance.path ? instance.path : '';
    }
}