import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import AOS from 'aos';
import { LogoComponent } from './logo/logo.component';
import { ButtonComponent } from './button/button.component';
import { BubbleComponent } from './bubble/bubble.component';
// Import the translations
import translationsEN from "../../public/i18n/en.json";
import translationsDE from "../../public/i18n/de.json";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    LogoComponent, 
    ButtonComponent, 
    BubbleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfoliorobin';

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
    translate.setTranslation('en', translationsEN);
    translate.setTranslation('de', translationsDE);
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit() {
    AOS.init();
  }

  shouldShowContactButton(): boolean {
    const currentPath = this.router.url;
    // Hide button on legal notice and privacy policy pages
    return !currentPath.includes('legal-notice') && !currentPath.includes('privacy-policy');
  }
}
