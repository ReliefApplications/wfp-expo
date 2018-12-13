import * as Speech from 'speak-tts';
import { Injectable } from '@angular/core';

@Injectable()
export class VoiceSpeaker {

    speaker = Speech.default;

    constructor() {
        this.speaker = new Speech.default();
        console.log(this.speaker);
          
    }

}