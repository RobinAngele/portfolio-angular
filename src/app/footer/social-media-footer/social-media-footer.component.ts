import { Component } from '@angular/core';

@Component({
  selector: 'app-social-media-footer',
  standalone: true,
  templateUrl: './social-media-footer.component.html',
  styleUrls: ['./social-media-footer.component.scss']
})
export class SocialMediaFooterComponent {
  socialLinks = [
    { 
      name: 'GitHub', 
      icon: 'assets/icons/github_white.svg', 
      href: 'https://github.com/RobinAngele/' 
    },
    { 
      name: 'LinkedIn', 
      icon: 'assets/icons/linked-in_white.svg', 
      href: 'https://www.linkedin.com/in/robin-angelé/' 
    },
    { 
      name: 'Email', 
      icon: 'assets/icons/mail_white.svg', 
      href: 'mailto:frontend@robin4consulting.com' 
    }
  ];
}