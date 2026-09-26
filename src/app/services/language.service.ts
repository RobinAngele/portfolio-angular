import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export const SUPPORTED_LANGUAGES = ['en', 'de', 'fr'] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly STORAGE_KEY = 'selectedLanguage';
  private readonly DEFAULT_LANGUAGE = 'en';
  private currentLanguageSubject = new BehaviorSubject<string>(this.DEFAULT_LANGUAGE);
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.initializeLanguage();
  }

  /**
   * Initializes the language service and sets the stored language
   */
  private initializeLanguage(): void {
    const savedLanguage = this.getSavedLanguage();
    const languageToUse = savedLanguage || this.DEFAULT_LANGUAGE;
    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    this.setLanguage(languageToUse, false);
  }

  /**
   * Gets the currently selected language
   */
  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  /**
   * Switches to the specified language and saves the preference
   * @param language - Language code to switch to
   * @param save - Whether to save the language preference to localStorage
   */
  setLanguage(language: string, save: boolean = true): void {
    if (!this.isSupported(language)) {
      language = this.DEFAULT_LANGUAGE;
    }
    this.translate.use(language);
    this.document.documentElement.lang = language;
    this.currentLanguageSubject.next(language);
    if (save) {
      this.saveLanguage(language);
    }
  }

  /**
   * Gets the saved language from localStorage
   */
  private getSavedLanguage(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved && this.isSupported(saved) ? saved : null;
    }
    return null;
  }

  /**
   * Checks whether the given language code is supported
   * @param language - Language code to check
   */
  private isSupported(language: string): language is Language {
    return (SUPPORTED_LANGUAGES as readonly string[]).includes(language);
  }

  /**
   * Saves the language preference to localStorage
   * @param language - Language code to save
   */
  private saveLanguage(language: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, language);
    }
  }

  /**
   * Cycles to the next available language
   */
  toggleLanguage(): void {
    const index = SUPPORTED_LANGUAGES.indexOf(this.getCurrentLanguage() as Language);
    const newLang = SUPPORTED_LANGUAGES[(index + 1) % SUPPORTED_LANGUAGES.length];
    this.setLanguage(newLang);
  }
}
