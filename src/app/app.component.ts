import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { timer, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'wfp-expo';
    ready = false;
    readonly numberOfArtworks = 5;

    // Parameters
    route = '';
    artId = 0;

    // Observable
    readonly WAITING_INITIAL_TIME = 1500; //ms
    timing$ = timer(this.WAITING_INITIAL_TIME);

    // Images
    images = ['', ''];

    constructor(
        private location: Location,
        private router: Router,
    ) { }

    ngOnInit() {
        this.loadPage();
    }

    loadPage() {
        this.ready = false;
        let timerForLoad = this.timing$.subscribe(
            () => {
                if(this.images[0]) {
                    this.ready = true;
                    timerForLoad.unsubscribe();
                }
            }
        );

        this.route = this.location.path();
        this.getArtId();
        this.loadArtworks();
    }

    onSwipe(evt, prev, next) {
        const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left') : '';

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
            if(id) {
                this.artId = id;
                console.log(id);
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
            case 1:
                this.images[0] = './assets/artworks/original1.png';
                this.images[1] = './assets/artworks/art1.jpeg';
                break;
            case 2:
                this.images[0] = './assets/artworks/original2.png';
                this.images[1] = './assets/artworks/art2.jpeg';
                break;
            case 3:
                this.images[0] = './assets/artworks/original3.png';
                this.images[1] = './assets/artworks/art3.jpeg';
                break;
            case 4:
                this.images[0] = './assets/artworks/original4.png';
                this.images[1] = './assets/artworks/art4.jpeg';
                break;
            case 5:
                this.images[0] = './assets/artworks/original5.png';
                this.images[1] = './assets/artworks/art5.jpeg';
                break;
            default:
                break;
        }
    }

    changeArt(way : string) {
        let newId = this.artId;

        if(way === "prev" && newId>1) {
            newId--;
        } else if(way === "next" && newId<5) {
            newId++;
        }
        this.router.navigateByUrl('/artwork/' + newId);
        window.location.reload();
    }
}
