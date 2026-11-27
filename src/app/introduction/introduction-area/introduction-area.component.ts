import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BubbleComponent } from '../../bubble/bubble.component';
import { ButtonComponent } from '../../button/button.component';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-introduction-area',
  standalone: true,
  imports: [BubbleComponent, ButtonComponent, TranslatePipe],
  templateUrl: './introduction-area.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./introduction-area.component.scss']
})
export class IntroductionAreaComponent {
  contactBtnText: string = 'INTRODUCTION.SEND_MESSAGE';
  
  constructor(
    public translateService: TranslateService,
    private languageService: LanguageService
  ) {}
  
  get currentLang(): string {
    return this.languageService.getCurrentLanguage();
  }
}