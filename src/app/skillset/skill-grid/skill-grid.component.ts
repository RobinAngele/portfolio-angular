import { Component } from '@angular/core';

@Component({
  selector: 'app-skill-grid',
  standalone: true,
  templateUrl: './skill-grid.component.html',
  styleUrls: ['./skill-grid.component.scss']
})
export class SkillGridComponent {
  skills = [
    { name: 'Angular', icon: 'assets/icons/angular_white.svg' },
    { name: 'TypeScript', icon: 'assets/icons/typescript_white.svg' },
    { name: 'JavaScript', icon: 'assets/icons/javascript_white.svg' },
    { name: 'HTML', icon: 'assets/icons/html_white.svg' },
    { name: 'CSS', icon: 'assets/icons/css_white.svg' },
    { name: 'Firebase', icon: 'assets/icons/firebase_white.svg' },
    { name: 'REST API', icon: 'assets/icons/rest-api_white.svg' },
    { name: 'Material Design', icon: 'assets/icons/material-design_white.svg' },
    { name: 'Scrum', icon: 'assets/icons/scrum_white.svg' },
    { name: 'Git', icon: 'assets/icons/git_white.svg' },
    { name: 'Docker', icon: 'assets/icons/Docker.svg' },
    { name: 'WordPress', icon: 'assets/icons/wordpress.svg' },
    { name: 'Linux', icon: 'assets/icons/Linux.svg' },
    { name: 'Growth Mindset', icon: 'assets/icons/mindset_white.svg', class: 'push-down' }
  ];
}