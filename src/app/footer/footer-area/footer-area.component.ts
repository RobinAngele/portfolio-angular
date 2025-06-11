import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../../logo/logo.component';
import { SocialMediaFooterComponent } from '../social-media-footer/social-media-footer.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer-area',
  standalone: true,
  imports: [RouterModule, LogoComponent, SocialMediaFooterComponent, TranslatePipe],
  templateUrl: './footer-area.component.html',
  styleUrls: ['./footer-area.component.scss']
})
export class FooterAreaComponent {
  currentYear = new Date().getFullYear();
  copyrightName: string = 'Robin Angelé';
}