import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'wfp-expo';
    descriptionOpened = false;
    route = '';
    artId = 0;
    actualTitle = '';
    inspiredTitle = '';
    images = [
        'http://images.charentelibre.fr/2018/04/10/5acc8f987971bb9d112183db/golden/1000x625/a-112-ans-ce-japonais-est-le-doyen-de-l-humanite.jpg?v1',
        'http://scd.rfi.fr/sites/filesrfi/dynimagecache/0/233/3500/1977/1024/578/sites/images.rfi.fr/files/aef_image/2017-11-06t064451z_1386657183_rc13a8a4ff20_rtrmadp_3_trump-asia-japan_0_0.jpg'
    ];

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
        const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left'):'';
        const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';

        if(x === 'right') {
            prev.click();
        }
        else if(x === 'left') {
            next.click();
        }
        console.log(this.artId);
    }

    getArtId() {
        if(this.route.substring(0,8)==='/artwork') {

            let id = Number(this.route.split('/artwork/')[1]);
            if(id) {
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
        switch(this.artId) {
            case 0 :
                this.images[0] = './assets/artworks/art1.jpeg';
                this.images[1] = './assets/artworks/inspired1.jpg';
                this.actualTitle = 'test1';
                this.inspiredTitle = 'inspiredHello';
                break;
            case 1 :
                this.images[0] = './assets/artworks/art2.jpeg';
                this.images[1] = './assets/artworks/inspired1.jpg';
                this.actualTitle = '';
                this.inspiredTitle = '';
                break;
            case 2 :
                this.images[0] = './assets/artworks/art3.jpeg';
                this.images[1] = './assets/artworks/inspired1.jpg';
                this.actualTitle = '';
                this.inspiredTitle = '';
                break;
            case 3 : 
                this.images[0] = './assets/artworks/art4.jpeg';
                this.images[1] = './assets/artworks/inspired1.jpg';
                this.actualTitle = '';
                this.inspiredTitle = '';
                break;
            case 4 : 
                this.images[0] = '';
                this.images[1] = '';
                this.actualTitle = '';
                this.inspiredTitle = '';
                break;
            default:
                break;
                
        }
    }

    triggerDescription() {
        this.descriptionOpened = !this.descriptionOpened;
    }
}
