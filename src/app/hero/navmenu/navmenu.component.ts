import { Component, OnDestroy, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navmenu',
  standalone: true,
  imports: [UpperCasePipe, TranslatePipe],
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavmenuComponent implements OnDestroy {
  private languageService = inject(LanguageService);

  isMenuOpen = signal(false);
  /** The language the site is shown in; the template follows every change */
  currentLang = this.languageService.currentLanguage;
  languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' }
  ];

  /**
   * Toggles the mobile menu open/closed state
   */
  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
    this.lockPageScroll(this.isMenuOpen());
  }

  /**
   * Closes the mobile menu
   */
  closeMenu(): void {
    this.isMenuOpen.set(false);
    this.lockPageScroll(false);
  }

  /**
   * Releases the page scroll lock if the menu is destroyed while open
   */
  ngOnDestroy(): void {
    if (this.isMenuOpen()) {
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
