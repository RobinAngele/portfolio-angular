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

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (window.scrollY > 20) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }
}