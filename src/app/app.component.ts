import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { timer, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { VoiceSpeaker } from './voice-speaker';
import { GlobalText } from './../texts/global';
import { LanguageService } from './language';
//import { $ } from 'protractor';
import * as $ from 'jquery';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

    readonly minArtId = 10; // 1
    readonly numberOfArtworks = 13; // 5
    readonly WAITING_INITIAL_TIME = 1500; // ms

    selectedCountry: string;
    header = GlobalText.TEXTS;
    language = 'en-EN';
    title = 'wfp-expo';
    artTitle = '';
    ready = false;
    dialogOpened = false;
    languages = GlobalText.languages;
    show : boolean=true;
    

    // Parameters
    public route = '';
    public artId = 0;

    // Timer
    timing$ = timer(this.WAITING_INITIAL_TIME);

    // Images
    images = ['', ''];

    @ViewChild('speakButton', {read: ElementRef}) speakButton: ElementRef;
    @ViewChild('pauseButton') pauseButton;
    @ViewChild('resumeButton') resumeButton;
    @ViewChild('articleText') articleText;

    constructor(
        private location: Location,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private voice: VoiceSpeaker,
        private languageService: LanguageService,
    ) {
        this.languageService.selectedLanguage = 'es-ES';
        console.log(this.languages[1]);
     }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadPage();
    }

    getFlag(c: string) {
        return c ? ('./assets/flags-mini/' + c + '.png') : ('./assets/flags-mini/es.png');
    }

   selectLanguage(language: any) {
    this.show = false;
    this.header = GlobalText.changeLanguage(language.reference);
    this.languageService.selectedLanguage = language;
    this.loadPage();
   }

    loadPage() {
        this.ready = false;
        const timerForLoad = this.timing$.subscribe(
            () => {
                if (this.images[0]) {
                    this.ready = true;
                    this.cdr.detectChanges();
                    timerForLoad.unsubscribe();
                    console.log('this.speakButton', this.speakButton);
                    this.voice.init({
                        'speakButton': this.speakButton,
                        'pauseButton': this.pauseButton,
                        'resumeButton': this.resumeButton,
                        'articleText': this.articleText,
                    });
                }
            }
        );

        this.route = this.location.path();
        this.getArtId();
        this.loadArtworks();
    }

    onSwipe(evt, prev, next) {
        const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left') : '';

        switch (x) {
            case 'right' :
                prev.click();
            break;
            case 'left':
                next.click();
            break;
        }
    }

    getArtId() {
        if (this.route.substring(0, 1) === '/') {
            const id = Number(this.route.split('/')[1]);
            if (id) {
                this.artId = id;
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
                this.images[0] = './assets/manzanares/12_2.png';
                this.images[1] = './assets/manzanares/12_1.png';
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
            case 9 : 
                this.artTitle='Caracol';
                this.images[0]='./assets/manzanares/9_1.png';

            default:
                break;
        }
    }

    changeArt(way: string) {
        let newId = this.artId;

        if (way === 'prev' && newId > this.minArtId) {
            newId--;
        } else if (way === 'next' && newId < this.numberOfArtworks) {
            newId++;
        }
        this.router.navigateByUrl('/artwork/' + newId);
        window.location.reload();
    }

    onShowLanguageModal(){
        console.log('hie');
    }

    openDialog() {
        this.dialogOpened = true;
        const snack = timer(4000).subscribe(() => {
            this.dialogOpened = false;
            snack.unsubscribe();
        });
    }
}
