
import { Injectable } from '@angular/core';
// import * as speaker from '../assets/voice.js';
import * as SpeakerModule from 'speak-tts';
import { LanguageService } from './language';


@Injectable()
export class VoiceSpeaker {
    speaker = new SpeakerModule.default();
    speakButton: any;
    pauseButton: any;
    resumeButton: any;
    articleText: any;

    constructor(
        private languageService: LanguageService
    ) {
    }

    init(buttons: any) {
        this.speakButton = buttons.speakButton;
        this.pauseButton = buttons.pauseButton;
        this.resumeButton = buttons.resumeButton;
        this.articleText = buttons.articleText;

        return this.speaker.init({
            volume: 0.5,
            lang: 'es-ES',
            rate: 1,
            pitch: 1,
            voice: 'Google español',
            // 'splitSentences': false,
            listeners: {
              onvoiceschanged: voices => {
                console.log('Voices changed', voices);
              }
            }
          })
          .then(data => {
            console.log('Speech is ready', data);
            // this.addVoicesList(data.voices);
                this.prepareSpeakButton();
          });
        //   .catch(e => {
        //     console.error('An error occured while initializing : ', e);
        //     alert('Your browser is not compatible with the speech system');
        //   });
    }

    prepareSpeakButton() {

        const speakButtonSelected = this.speakButton.nativeElement;
        const pauseButtonSelected = this.pauseButton.nativeElement;
        const removeButtonSelected = this.resumeButton.nativeElement;

        const textarea: any = this.articleText.nativeElement;

        speakButtonSelected.addEventListener('click', () => {
            const language = this.languageService.selectedLanguage.language;
            console.log(language);

            // TODO remove default espagnol, because in this scope we have to get the selected voice
            const voice = this.languageService.selectedLanguage.voice;
            console.log(voice);

            if (language) {
                this.speaker.setLanguage(this.languageService.selectedLanguage);
            }
            if (voice) {
                this.speaker.setVoice(voice);
            }
            this.speaker
            .speak({
                text: textarea.innerHTML,
                queue: false,
                // listeners: {
                //     onstart: () => {},
                //     onend: () => {},
                //     onresume: () => {},
                //     onboundary: event => {}
                // }
            })
            // .then(data => {
            //     // TODO: definir la prochaine action ou supprimer
            // })
            .catch(e => {
                console.error('An error occurred:', e);
                alert('The speaker failed');
            });
        });
        pauseButtonSelected.addEventListener('click', () => {
            this.speaker.pause();
        });
        removeButtonSelected.addEventListener('click', () => {
            this.speaker.resume();
        });
    }

    addVoicesList (voices) {
        const list = window.document.createElement('div');
        let html =
          '<h2>Available Voices</h2><select id="languages"><option value="">autodetect language</option>';
        voices.forEach(voice => {
          html += `<option value="${voice.lang}" data-name="${voice.name}">${
            voice.name
          } (${voice.lang})</option>`;
        });
        list.innerHTML = html;
        window.document.body.appendChild(list);
    }
}
