import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ButtonComponent, TranslatePipe],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() image: string = '';
  @Input() technologies: string[] = [];
  @Input() github: string = '';
  @Input() demo: string = '';
  @Input() project: any;
  @Input() isSecondElement: boolean = false;
}