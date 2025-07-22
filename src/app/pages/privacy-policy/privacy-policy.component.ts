import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FooterAreaComponent } from '../../footer/footer-area/footer-area.component';
import { NavbarComponent } from '../../hero/navbar/navbar.component';
import { NavmenuComponent } from '../../hero/navmenu/navmenu.component';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [FooterAreaComponent, NavbarComponent, NavmenuComponent, TranslatePipe],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  currentLang: string;

  constructor(
    private titleService: Title,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || 'en';
    this.titleService.setTitle('Privacy Policy | Robin Angelé');
    this.translate.onLangChange.subscribe(() => {
      if (this.translate.currentLang === 'de') {
        this.titleService.setTitle('Datenschutz | Robin Angelé');
      } else {
        this.titleService.setTitle('Privacy Policy | Robin Angelé');
      }
    });
  }

  /**
   * Switches the application language
   * @param lang - Language code to switch to
   */
  switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang = lang;
  }
}