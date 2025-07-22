import { Component } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { NgIf } from '@angular/common';

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

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || 'en';
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
   * Switches the application language and closes menu
   * @param lang - Language code to switch to
   */
  switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang = lang;
    this.closeMenu();
  }
}