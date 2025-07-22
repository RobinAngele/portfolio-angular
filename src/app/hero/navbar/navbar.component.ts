import { Component, HostListener } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  scrolled = false;
  menuOpen = false;
  currentLang: string;

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || 'en';
  }

  /**
   * Listens to scroll events and updates scrolled state
   */
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (window.scrollY > 20) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }

  /**
   * Toggles the mobile menu open/closed state
   */
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
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