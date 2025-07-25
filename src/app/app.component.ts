import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';
import { LogoComponent } from './logo/logo.component';
import { BubbleComponent } from './bubble/bubble.component';
import { LanguageService } from './services/language.service';
import translationsEN from "../../public/i18n/en.json";
import translationsDE from "../../public/i18n/de.json";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    LogoComponent, 
    BubbleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfoliorobin';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    translate.setTranslation('en', translationsEN);
    translate.setTranslation('de', translationsDE);
    this.translate.addLangs(['de', 'en']);
  }

  /**
   * Initializes the component and sets up AOS animations if running in browser
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }
}
