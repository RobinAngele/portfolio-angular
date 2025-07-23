import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleComponent } from '../../bubble/bubble.component';
import { ProjectComponent } from '../project/project.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projects-area',
  standalone: true,
  imports: [CommonModule, BubbleComponent, ProjectComponent, TranslatePipe],
  templateUrl: './projects-area.component.html',
  styleUrls: ['./projects-area.component.scss']
})
export class ProjectsAreaComponent {
  projects = [
    {
      titleKey: 'PROJECTS.PROJECT_JOIN.TITLE',
      stackKey: 'PROJECTS.PROJECT_JOIN.STACK',
      descriptionKey: 'PROJECTS.PROJECT_JOIN.DESCRIPTION',
      github: "https://github.com/RobinAngele/join",
      projectUrl: 'https://join.robin4consulting.com',
      prevImageUrl: "assets/img/preview_join.svg"
    },
    {
      titleKey: 'PROJECTS.PROJECT_POLLO.TITLE',
      stackKey: 'PROJECTS.PROJECT_POLLO.STACK',
      descriptionKey: 'PROJECTS.PROJECT_POLLO.DESCRIPTION',
      github: "https://github.com/RobinAngele/el-pollo-loco",
      projectUrl: 'https://robinangele.github.io/el-pollo-loco/',
      prevImageUrl: "assets/img/preview_polloloco.png"
    },
    {
      titleKey: 'PROJECTS.PROJECT_POKEDEX.TITLE', 
      stackKey: 'PROJECTS.PROJECT_POKEDEX.STACK',
      descriptionKey: 'PROJECTS.PROJECT_POKEDEX.DESCRIPTION',
      github: "https://github.com/RobinAngele/Pokedex",
      projectUrl: 'https://robinangele.github.io/pokedex/',
      prevImageUrl: "assets/img/preview_pokedex.png"
    }
  ];

  constructor(private translate: TranslateService) {}
}