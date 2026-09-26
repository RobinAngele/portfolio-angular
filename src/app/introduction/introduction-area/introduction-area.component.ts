import { Component } from '@angular/core';
import { BubbleComponent } from '../../bubble/bubble.component';
import { ButtonComponent } from '../../button/button.component';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { NgIf } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-introduction-area',
  standalone: true,
  imports: [BubbleComponent, ButtonComponent, TranslatePipe, NgIf],
  templateUrl: './introduction-area.component.html',
  styleUrls: ['./introduction-area.component.scss']
})
export class IntroductionAreaComponent {
  title: string = "About me";
  description: string = "I am a frontend developer based in Germany with a passion for AI, Linux, and automation. I specialize in creating modern, responsive web applications while leveraging the latest technologies and AI tools to enhance development workflows and user experiences.";
  contactBtnText: string = 'INTRODUCTION.SEND_MESSAGE';
  
  constructor(
    public translateService: TranslateService,
    private languageService: LanguageService
  ) {}
  
  get currentLang(): string {
    return this.languageService.getCurrentLanguage();
  }
}