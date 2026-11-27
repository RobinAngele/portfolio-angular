import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() btnText: string = 'Button works!';
  @Input() href: string = '#';
  @Input() target: string = '_self';
  @Input() style: string = 'primary';
}