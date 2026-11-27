import { Component } from '@angular/core';
import { BubbleComponent } from '../../bubble/bubble.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-contact-area',
  templateUrl: './contact-area.component.html',
  styleUrls: ['./contact-area.component.scss'],
  imports: [BubbleComponent, ContactFormComponent, TranslatePipe, ButtonComponent],
  standalone: true
})
export class ContactAreaComponent {
  /** Public booking page of the self-hosted Nextcloud Appointments app */
  bookingUrl = 'https://cloud.robin4consulting.com/apps/appointments/pub/QC27tw1cCNYaQVZr/form';
}
