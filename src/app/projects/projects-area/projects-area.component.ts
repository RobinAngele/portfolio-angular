import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleComponent } from '../../bubble/bubble.component';
import { ProjectComponent } from '../project/project.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-projects-area',
  standalone: true,
  imports: [CommonModule, BubbleComponent, ProjectComponent, TranslatePipe],
  templateUrl: './projects-area.component.html',
  styleUrls: ['./projects-area.component.scss']
})
export class ProjectsAreaComponent {
  title: string = "My Projects";
  description: string = "These projects showcase my expertise in frontend development, AI integration, and automation. Each project demonstrates different skills and modern web technologies.";
  projects = [
    {
      title: "Join",
      stack: "Angular | TypeScript | HTML | CSS",
      description: "Task manager inspired by the Kanban System. A collaborative project management tool with drag-and-drop functionality.",
      github: "https://github.com/RobinAngele/join",
      projectUrl: 'https://join.robin4consulting.com',
      prevImageUrl: "assets/img/preview_join.svg"
    },
    {
      title: "El Pollo Loco",
      stack: "JavaScript (OOP) | HTML | CSS",
      description: "Jump-and-Run game based on an object-oriented approach. Features include character movement, collision detection, and enemy AI.",
      github: "https://github.com/RobinAngele/el-pollo-loco",
      projectUrl: 'https://robinangele.github.io/el-pollo-loco/',
      prevImageUrl: "assets/img/preview_polloloco.png"
    },
    {
      title: "Pokedex",
      stack: "REST API | JavaScript | HTML | CSS",
      description: "Pokedex App using REST API to fetch all Pokemon data from the PokeAPI. Includes search functionality and detailed Pokemon information.",
      github: "https://github.com/RobinAngele/Pokedex",
      projectUrl: 'https://robinangele.github.io/pokedex/',
      prevImageUrl: "assets/img/preview_pokedex.png"
    }
  ];
}