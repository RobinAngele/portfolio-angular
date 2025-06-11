import { Component } from '@angular/core';
import { SkillGridComponent } from '../skill-grid/skill-grid.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-skillset-area',
  standalone: true,
  imports: [SkillGridComponent, TranslatePipe],
  templateUrl: './skillset-area.component.html',
  styleUrls: ['./skillset-area.component.scss']
})
export class SkillsetAreaComponent {
  title: string = "My Skills";
  description: string = "I specialize in frontend development with a focus on modern web technologies, AI integration, Linux environments, and automation tools. Here are the key technologies I work with:";
}