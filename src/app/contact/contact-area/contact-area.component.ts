import { Component } from '@angular/core';
import { BubbleComponent } from '../../bubble/bubble.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-area',
  templateUrl: './contact-area.component.html',
  styleUrls: ['./contact-area.component.scss'],
  imports: [BubbleComponent, ContactFormComponent, TranslatePipe],
  standalone: true
})
export class ContactAreaComponent {

}
