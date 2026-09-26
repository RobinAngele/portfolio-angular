import { Component } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { NgIf } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navmenu',
  standalone: true,
  imports: [NgIf, TranslatePipe],
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavmenuComponent {
  menuItems = [
    { label: 'About', link: '#about' },
    { label: 'Skills', link: '#skills' },
    { label: 'Projects', link: '#projects' }
  ];
  isMenuOpen = false;
  currentLang: string;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  /**
   * Toggles the mobile menu open/closed state
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Closes the mobile menu
   */
  closeMenu(): void {
    this.isMenuOpen = false;
  }

  /**
   * Switches the application language using the language service and closes menu
   * @param lang - Language code to switch to
   */
  switchLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
    this.closeMenu();
  }
}