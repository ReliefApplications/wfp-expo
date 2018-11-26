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
    artTitle = '';
    ready = false;
    readonly minArtId = 10; //1
    readonly numberOfArtworks = 13; //5
    dialogOpened = false;

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
            case 10:
                this.artTitle = 'River of Manzanares El Real';
                this.images[0] = './assets/manzanares/10_1.png';
                this.images[1] = './assets/manzanares/10_2.png';
                this.images[2] = './assets/manzanares/10_3.png';
                this.images[3] = './assets/manzanares/10_4.png';
                break;
            case 11:
                this.artTitle = 'Castle of Manzanares El Real';
                this.images[0] = './assets/manzanares/11_1.png';
                this.images[1] = './assets/manzanares/11_2.png';
                this.images[2] = './assets/manzanares/11_3.png';
                this.images[3] = './assets/manzanares/11_4.png';
                break;
            case 12:
                this.artTitle = 'Mountains of Manzanares El Real';
                this.images[0] = './assets/manzanares/12_1.png';
                this.images[1] = './assets/manzanares/12_2.png';
                this.images[2] = './assets/manzanares/12_3.png';
                this.images[3] = './assets/manzanares/12_4.png';
                break;
            case 13:
                this.artTitle = 'Artwork from the castle';
                this.images[0] = './assets/manzanares/13_1.png';
                this.images[1] = '';
                this.images[2] = '';
                this.images[3] = '';
                break;
            default:
                break;
        }
    }

    changeArt(way : string) {
        let newId = this.artId;

        if(way === "prev" && newId>this.minArtId) {
            newId--;
        } else if(way === "next" && newId<this.numberOfArtworks) {
            newId++;
        }
        this.router.navigateByUrl('/artwork/' + newId);
        window.location.reload();
    }

    openDialog() {
        this.dialogOpened = true;
        let snack = timer(4000).subscribe( 
            () => {
                this.dialogOpened = false;
                snack.unsubscribe();
            })
    }
}
