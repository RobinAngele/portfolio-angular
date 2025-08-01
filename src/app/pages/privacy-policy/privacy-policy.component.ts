import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FooterAreaComponent } from '../../footer/footer-area/footer-area.component';
import { NavbarComponent } from '../../hero/navbar/navbar.component';
import { NavmenuComponent } from '../../hero/navmenu/navmenu.component';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [FooterAreaComponent, NavbarComponent, NavmenuComponent, TranslatePipe],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  currentLang!: string;

  /**
   * Initializes the privacy policy component with language and title services
   * @param titleService - Service for managing page title
   * @param translate - Angular translation service
   * @param languageService - Service for managing language preferences
   */
  constructor(
    private titleService: Title,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    this.initializeComponent();
  }


  /**
   * Initializes component state and sets up language subscription
   */
  private initializeComponent(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.setInitialTitle();
    this.subscribeToLanguageChanges();
  }


  /**
   * Sets the initial page title
   */
  private setInitialTitle(): void {
    this.titleService.setTitle('Privacy Policy | Robin Angelé');
  }


  /**
   * Subscribes to language changes and updates the title accordingly
   */
  private subscribeToLanguageChanges(): void {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLang = lang;
      this.updateTitleForLanguage(lang);
    });
  }


  /**
   * Updates the page title based on the selected language
   * @param lang - Language code
   */
  private updateTitleForLanguage(lang: string): void {
    if (lang === 'de') {
      this.titleService.setTitle('Datenschutz | Robin Angelé');
    } else {
      this.titleService.setTitle('Privacy Policy | Robin Angelé');
    }
  }

  /**
   * Switches the application language using the language service
   * @param lang - Language code to switch to
   */
  switchLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }
}