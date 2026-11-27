import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SkillGridComponent } from '../skill-grid/skill-grid.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-skillset-area',
  standalone: true,
  imports: [SkillGridComponent, TranslatePipe],
  templateUrl: './skillset-area.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./skillset-area.component.scss']
})
export class SkillsetAreaComponent {
}