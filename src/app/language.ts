import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {
  /**
   * currentLanguage
   */
  selectedLanguage = null;

  languages = {
    'es': {
      language: 'es-ES',
      voice: '',
      flag: ''
    },
  };
}
