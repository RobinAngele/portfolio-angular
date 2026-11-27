import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [UpperCasePipe, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private languageService = inject(LanguageService);

  /** The language the site is shown in; the template follows every change */
  currentLang = this.languageService.currentLanguage;
  languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' }
  ];

  /**
   * Switches the application language using the language service
   * @param lang - Language code to switch to
   */
  switchLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }
}
