import { TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  const STORAGE_KEY = 'selectedLanguage';

  const createService = (): LanguageService => {
    TestBed.configureTestingModule({ providers: [provideTranslateService()] });
    return TestBed.inject(LanguageService);
  };

  beforeEach(() => localStorage.removeItem(STORAGE_KEY));
  afterEach(() => localStorage.removeItem(STORAGE_KEY));

  it('starts in English when nothing is stored', () => {
    const service = createService();

    expect(service.getCurrentLanguage()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('starts in the stored language', () => {
    localStorage.setItem(STORAGE_KEY, 'fr');

    expect(createService().getCurrentLanguage()).toBe('fr');
  });

  it('ignores a stored language it does not support', () => {
    localStorage.setItem(STORAGE_KEY, 'xx');

    expect(createService().getCurrentLanguage()).toBe('en');
  });

  it('switches the language, updates the document and remembers the choice', () => {
    const service = createService();

    service.setLanguage('de');

    expect(service.getCurrentLanguage()).toBe('de');
    expect(TestBed.inject(TranslateService).getCurrentLang()).toBe('de');
    expect(document.documentElement.lang).toBe('de');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('de');
  });

  it('falls back to English for a language it does not support', () => {
    const service = createService();

    service.setLanguage('es');

    expect(service.getCurrentLanguage()).toBe('en');
  });

  it('cycles through English, German and French', () => {
    const service = createService();
    const seen: string[] = [];

    for (let i = 0; i < 3; i++) {
      service.toggleLanguage();
      seen.push(service.getCurrentLanguage());
    }

    expect(seen).toEqual(['de', 'fr', 'en']);
  });
});
