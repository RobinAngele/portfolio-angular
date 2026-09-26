import { Component, OnDestroy } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navmenu',
  standalone: true,
  imports: [NgIf, NgFor, UpperCasePipe, TranslatePipe],
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavmenuComponent implements OnDestroy {
  menuItems = [
    { label: 'About', link: '#about' },
    { label: 'Skills', link: '#skills' },
    { label: 'Projects', link: '#projects' }
  ];
  isMenuOpen = false;
  currentLang: string;
  languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' }
  ];

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
    this.lockPageScroll(this.isMenuOpen);
  }

  /**
   * Closes the mobile menu
   */
  closeMenu(): void {
    this.isMenuOpen = false;
    this.lockPageScroll(false);
  }

  /**
   * Releases the page scroll lock if the menu is destroyed while open
   */
  ngOnDestroy(): void {
    if (this.isMenuOpen) {
      this.lockPageScroll(false);
    }
  }

  /**
   * Prevents the page behind the open menu from scrolling
   * @param lock - Whether page scrolling should be locked
   */
  private lockPageScroll(lock: boolean): void {
    document.body.style.overflow = lock ? 'hidden' : '';
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