import { TEXT as TEXT_EN } from "./global_en";
import { TEXT as TEXT_ES } from "./global_es";

export class GlobalText {
    static language = 'es';
    static languages = ['gb', 'es'];
    static TEXTS = TEXT_ES;
    static country;
    static maxHeight = 700;
    static maxWidthMobile = 750;
    static maxWidthFirstRow = 1000;
    static maxWidthSecondRow = 800;
    static maxWidth = 750;

    public static changeLanguage(language : string = this.language) {
        GlobalText.language = language;

        switch (language) {
            case 'gb':
                GlobalText.TEXTS = TEXT_EN;
                break;
            case 'es':
                GlobalText.TEXTS = TEXT_ES;
                console.log(GlobalText.TEXTS);
                break;
            default: GlobalText.TEXTS = TEXT_EN; 
                break;
        }
        this.language = language;
        //this.adaptMargin();
    }

    // private static adaptMargin() {
    //     const element = document.getElementsByTagName("mat-sidenav-content") as HTMLCollectionOf<HTMLElement>;

    //     if(window.innerHeight > this.maxHeight || window.innerWidth > this.maxWidth) {
    //         if(this.language === 'ar') {
    //             document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    //             element[0].style.margin = "0px 64px 0px 0px";
    //         } else {
    //             document.getElementsByTagName('html')[0].setAttribute('dir', '');
    //             element[0].style.margin = "0px 0px 0px 64px";
    //         }
    //     } else {
    //         this.resetMenuMargin();
    //     }
    // }

    // public static resetMenuMargin() {
    //     const element = document.getElementsByTagName("mat-sidenav-content") as HTMLCollectionOf<HTMLElement>;
    //     element[0].style.margin = "0px 0px 0px 0px";
    // }
}