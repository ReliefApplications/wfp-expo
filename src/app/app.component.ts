import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'wfp-expo';

    // Parameters
    route = '';
    artId = 0;

    // Images
    images = ['', ''];

    constructor(
        private location: Location,
    ) {

    }

    ngOnInit() {
        this.route = this.location.path();
        this.getArtId();
        this.loadArtworks();
    }

    onSwipe(evt, prev, next) {
        const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left') : '';
        const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';

        if (x === 'right') {
            prev.click();
        }
        else if (x === 'left') {
            next.click();
        }
    }

    getArtId() {
        if (this.route.substring(0, 8) === '/artwork') {

            let id = Number(this.route.split('/artwork/')[1]);
            if (id) {
                this.artId = id;
            } else {
                this.artId = 0;
            }
        }
    }

    /**
     * Add the links of the art pictures (case 0 for first art associated with route '/artwork/0' ...)
     * images[0] = original art
     * images[1] = inspired art
     * Put the actual original title and the title of the inspired art in the two strings in each case.
     */
    loadArtworks() {
        switch (this.artId) {
            case 0:
                this.images[0] = './assets/artworks/original1.png';
                this.images[1] = './assets/artworks/art1.jpeg';
                break;
            case 1:
                this.images[0] = './assets/artworks/original2.png';
                this.images[1] = './assets/artworks/art2.jpeg';
                break;
            case 2:
                this.images[0] = './assets/artworks/original3.png';
                this.images[1] = './assets/artworks/art3.jpeg';
                break;
            case 3:
                this.images[0] = './assets/artworks/original4.png';
                this.images[1] = './assets/artworks/art4.jpeg';
                break;
            case 4:
                this.images[0] = './assets/artworks/original5.png';
                this.images[1] = './assets/artworks/art5.jpeg';
                break;
            default:
                break;

        }
    }
}
