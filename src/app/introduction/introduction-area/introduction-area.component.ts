import { Component, inject } from '@angular/core';
import { BubbleComponent } from '../../bubble/bubble.component';
import { ButtonComponent } from '../../button/button.component';
import { TranslatePipe } from '@ngx-translate/core';

import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-introduction-area',
  standalone: true,
  imports: [BubbleComponent, ButtonComponent, TranslatePipe],
  templateUrl: './introduction-area.component.html',
  styleUrls: ['./introduction-area.component.scss']
})
export class IntroductionAreaComponent {
  contactBtnText: string = 'INTRODUCTION.SEND_MESSAGE';

  /** The language the site is shown in; the template follows every change */
  currentLang = inject(LanguageService).currentLanguage;
}
