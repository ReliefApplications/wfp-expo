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

    // Titles
    actualTitle = '';
    inspiredTitle = '';

    // Images
    images = ['', ''];

    // Descriptions
    actualDescription: string;
    englishDesc = "On 7 February 2018, a magnitude 7.5 earthquake affected over half a million people in Papua New Guinea. Homes, farms, water sources and roads were destroyed across four provinces. For families who were already isolated and food insecure, the earthquake was a double burden - it cut them off from help and increased their vulnerability to hunger and malnutrition. \n The World Food Programme launched a response that concluded in June. We provided emergency food assistance to 33,000 people in some of the hardest-hit areas, focused on the Southern Highlands. But finding these families was no easy task in a country made up of remote communities, mountainous terrain and limited data on where people needed help the most. \n When organizing food distributions in the Southern Highlands, WFP asked local councillors in Pau’a for lists of families who should receive assistance. Jerry immediately took some paper and a pen and walked through the area counting people and drawing circles. The next day he handed WFP colleagues multiple sheets of paper covered with circles on both sides. \n WFP distributed high energy biscuits, rice and canned tuna to 1140 people in Pau’a. Other lists - not Jerry’s - were used for the distributions. \n These 5 linocuts are freely inspired copies of Jerry’s work that Mairi Sun showed me on her return from Papua New Guinea after she took part in WFP’s response in the Southern Highlands. They are a metaphor for the challenge of identifying, counting and representing people in need of assistance.";
    constructor(
        private location: Location,
    ) {

    }

    ngOnInit() {
        this.actualDescription = this.englishDesc;
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
                this.images[0] = './assets/artworks/art1.jpeg';
                this.images[1] = './assets/artworks/original1.png';
                this.actualTitle = 'test1';
                this.inspiredTitle = 'inspiredHello';
                break;
            case 1:
                this.images[0] = './assets/artworks/art2.jpeg';
                this.images[1] = './assets/artworks/original2.png';
                this.actualTitle = '';
                this.inspiredTitle = '';
                break;
            case 2:
                this.images[0] = './assets/artworks/art3.jpeg';
                this.images[1] = './assets/artworks/original3.png';
                this.actualTitle = '';
                this.inspiredTitle = '';
                break;
            case 3:
                this.images[0] = './assets/artworks/art4.jpeg';
                this.images[1] = './assets/artworks/original4.png';
                this.actualTitle = '';
                this.inspiredTitle = '';
                break;
            case 4:
                this.images[0] = './assets/artworks/art5.jpeg';;
                this.images[1] = './assets/artworks/original5.png';
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
