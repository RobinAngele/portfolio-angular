import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FooterAreaComponent } from '../../footer/footer-area/footer-area.component';
import { NavbarComponent } from '../../hero/navbar/navbar.component';
import { NavmenuComponent } from '../../hero/navmenu/navmenu.component';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [FooterAreaComponent, NavbarComponent, NavmenuComponent, TranslatePipe],
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent {
  currentLang: string;

  constructor(
    private titleService: Title,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.titleService.setTitle('Legal Notice | Robin Angelé');
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLang = lang;
      if (lang === 'de') {
        this.titleService.setTitle('Impressum | Robin Angelé');
      } else {
        this.titleService.setTitle('Legal Notice | Robin Angelé');
      }
    });
  }

  /**
   * Switches the application language using the language service
   * @param lang - Language code to switch to
   */
  switchLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }
}