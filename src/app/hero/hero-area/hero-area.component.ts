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
  role: string = 'FRONTEND DEVELOPER';
  name: string = 'Robin';
  ctaText: string = 'Contact me';
}