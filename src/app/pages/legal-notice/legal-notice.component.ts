import { Component, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FooterAreaComponent } from '../../footer/footer-area/footer-area.component';
import { NavbarComponent } from '../../hero/navbar/navbar.component';
import { NavmenuComponent } from '../../hero/navmenu/navmenu.component';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [FooterAreaComponent, NavbarComponent, NavmenuComponent, TranslatePipe],
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent {
  private titleService = inject(Title);
  private languageService = inject(LanguageService);

  constructor() {
    // Runs once at the start and again every time the language changes
    effect(() => {
      const lang = this.languageService.currentLanguage();
      if (lang === 'de') {
        this.titleService.setTitle('Impressum | Robin Angelé');
      } else if (lang === 'fr') {
        this.titleService.setTitle('Mentions légales | Robin Angelé');
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
