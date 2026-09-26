import { Component } from '@angular/core';

@Component({
  selector: 'app-social-media-header',
  standalone: true,
  templateUrl: './social-media-header.component.html',
  styleUrls: ['./social-media-header.component.scss']
})
export class SocialMediaHeaderComponent {
  socialLinks = [
    { 
      name: 'GitHub', 
      icon: 'assets/icons/github_blue.svg', 
      href: 'https://github.com/RobinAngele/' 
    },
    { 
      name: 'LinkedIn', 
      icon: 'assets/icons/linked-in_blue.svg', 
      href: 'https://www.linkedin.com/in/robin-angelé/' 
    },
    { 
      name: 'Email', 
      icon: 'assets/icons/mail_blue.svg', 
      href: 'mailto:frontend@robin4consulting.com' 
    }
  ];
}