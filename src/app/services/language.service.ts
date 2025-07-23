import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

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
    @Inject(PLATFORM_ID) private platformId: Object
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
    this.translate.use(language);
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
      return localStorage.getItem(this.STORAGE_KEY);
    }
    return null;
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
   * Toggles between available languages
   */
  toggleLanguage(): void {
    const currentLang = this.getCurrentLanguage();
    const newLang = currentLang === 'en' ? 'de' : 'en';
    this.setLanguage(newLang);
  }
}
