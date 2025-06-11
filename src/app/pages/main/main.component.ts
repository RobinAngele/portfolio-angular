import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeroAreaComponent } from '../../hero/hero-area/hero-area.component';
import { IntroductionAreaComponent } from '../../introduction/introduction-area/introduction-area.component';
import { SkillsetAreaComponent } from '../../skillset/skillset-area/skillset-area.component';
import { ProjectsAreaComponent } from '../../projects/projects-area/projects-area.component';
import { ContactAreaComponent } from '../../contact/contact-area/contact-area.component';
import { FooterAreaComponent } from '../../footer/footer-area/footer-area.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    HeroAreaComponent,
    IntroductionAreaComponent,
    SkillsetAreaComponent,
    ProjectsAreaComponent,
    ContactAreaComponent,
    FooterAreaComponent
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Robin Angelé | Frontend Developer');
  }
}