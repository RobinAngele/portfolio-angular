import { Component } from '@angular/core';
import { LogoComponent } from '../../logo/logo.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NavmenuComponent } from '../navmenu/navmenu.component';
import { BubbleComponent } from '../../bubble/bubble.component';
import { SocialMediaHeaderComponent } from '../social-media-header/social-media-header.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-area',
  standalone: true,
  imports: [
    LogoComponent, 
    NavbarComponent, 
    NavmenuComponent, 
    BubbleComponent, 
    SocialMediaHeaderComponent,
    TranslatePipe
  ],
  templateUrl: './hero-area.component.html',
  styleUrls: ['./hero-area.component.scss']
})
export class HeroAreaComponent {
  name: string = 'Robin';
  ctaText: string = 'Contact me';

  /** Longest role word that fits the hero layout at full size (e.g. "DEVELOPER") */
  private readonly MAX_ROLE_LENGTH = 9;

  /**
   * Returns a font-size scale so longer role words (e.g. "DÉVELOPPEUR") don't break the layout
   * @param text - Translated role text
   */
  roleScale(text: string): number {
    return Math.min(1, this.MAX_ROLE_LENGTH / text.length);
  }
}