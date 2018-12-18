import { TEXT as TEXT_EN } from "./global_en";
import { TEXT as TEXT_ES } from "./global_es";

export class GlobalText {
    static language = 'es';
    static TEXTS = TEXT_ES;
    static maxHeight = 700;
    static maxWidthMobile = 750;
    static maxWidthFirstRow = 1000;
    static maxWidthSecondRow = 800;
    static maxWidth = 750;
    static languages = [
        {
          name:'Spanish', 
          reference:'es', 
          language: 'es-ES',
          voice: 'Google español'
        },
        {
          name:'English', 
          reference:'gb',
          language: 'en-EN',
          voice: 'Google US English'
        }
    ];
    

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
        return GlobalText.TEXTS;
        //this.adaptMargin();
    }

}