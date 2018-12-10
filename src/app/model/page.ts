import { Image } from './image';

export class Page {
    /* Contains all the information a loaded page in the app */

    id: number;

    title: string;

    description: string;

    subtitle: string;

    images: Array<Image>;

    constructor(instance?) {
        if(!instance) {
            instance = { id: null };
        }

        this.id = instance.id ? instance.id : 0;
        this.title = instance.title ? instance.title : '';
        this.subtitle = instance.subtitle ? instance.subtitle : '';
        this.images = instance.images ? instance.images : [];
    }

    setDataArray() {
        let dataArray = new Array<Page>();

        
    }
}