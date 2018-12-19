import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { timer, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Page } from './model/page';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'wfp-expo';

    // Datas
    data : Array<Page>
    actualPage : Page;

    // Booleans
    ready = false;
    dialogOpened = false;

    // Constants
    readonly MIN_PAGE_ID = 1;
    readonly MAX_PAGE_ID = 15;
    readonly WAITING_INITIAL_TIME = 1500;

    // Parameters
    route = '';

    // Timer observable & variables
    timing$ = timer(this.WAITING_INITIAL_TIME);

    constructor(
        private location: Location,
        private router: Router,
    ) { }

    ngOnInit() {
        // TODO : Add header to extend features && Find a storing data way (Back/DB?)
        this.data = new Array();
        this.actualPage = new Page();

        this.initialWaiter();
        this.loadActualPage();
    }

    /**
     * Delays the loading of the page.
     */
    initialWaiter() {
        this.ready = false;
        let timerForLoad = this.timing$.subscribe(
            () => {
                if(this.actualPage.images[0]) {
                    this.ready = true;
                    timerForLoad.unsubscribe();
                } else {
                    //trouble...
                }
            }
        );
    }

    /**
     * Handles the swipe events from the user to switch images on the Carousel.
     * @param evt 
     * @param prev 
     * @param next 
     */
    onSwipe(evt, prev, next) {
        const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left') : '';

        if (x === 'right') {
            prev.click();
        }
        else if (x === 'left') {
            next.click();
        }
    }

    /**
     * Load all the necessary data in actual Page from the Array containing all our data.
     */
    loadActualPage() {

        // Set the actual page id by getting the url.
        this.route = this.location.path();
        if (this.route.substring(0, 8) === '/artwork') {
            let id = Number(this.route.split('/artwork/')[1]);
            if(id) {
                this.actualPage.id = id;
            }
        }

        // Set the actual page data with the owned datas.
        if(this.data && this.data.length > 0) {
            this.data.forEach(
                page => {
                    if(page.id === this.actualPage.id) {
                        this.actualPage = new Page(page);
                    }
                }
            );
        }
    }

    /**
     * Page next / previous
     * @param way 
     */
    changePage(way : string) {
        let newId = this.actualPage.id;

        if(way === "prev" && newId > this.MIN_PAGE_ID) {
            newId--;
        } else if(way === "next" && newId < this.MAX_PAGE_ID) {
            newId++;
        }
        this.router.navigateByUrl('/artwork/' + newId);
        window.location.reload();
    }

    /**
     * Dialog opening.
     */
    openDialog() {
        this.dialogOpened = true;
        let snack = timer(4000).subscribe( 
            () => {
                this.dialogOpened = false;
                snack.unsubscribe();
            })
    }
}
