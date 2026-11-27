import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() btnText: string = 'Button works!';
  @Input() href: string = '#';
  @Input() target: string = '_self';
  @Input() style: string = 'primary';
}