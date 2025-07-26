import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  standalone: true,
  imports: [FormsModule, TranslatePipe]
})
export class ContactFormComponent {
  @ViewChild('name') nameEl!: ElementRef;
  @ViewChild('email') emailEl!: ElementRef;
  @ViewChild('message') messageEl!: ElementRef;
  @ViewChild('privacy') privacyEl!: ElementRef;
  @ViewChild('bubble') bubbleEl!: ElementRef;

  isInputValid: { [input: string]: boolean } = {
    'name': false,
    'email': false,
    'message': false,
    'privacy': false
  }

  private translate = inject(TranslateService);

  ngAfterViewInit() {
    this.nameEl.nativeElement.onblur = (event: Event) => this.onInputBlur(event);
    this.emailEl.nativeElement.onblur = (event: Event) => this.onInputBlur(event);
    this.messageEl.nativeElement.onblur = (event: Event) => this.onInputBlur(event);
    this.privacyEl.nativeElement.onchange = (event: Event) => this.onCheckboxChange(event);
  }

  /**
   * Function that gets triggered every time the onblur event is triggered on the input elements.
   * @param event Blur event.
   */
  onInputBlur(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    
    this.showValidationResponse(target);
  }

  /**
   * Function that gets triggered when the privacy checkbox changes.
   * @param event Change event.
   */
  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const errorEl = document.getElementById(`${target.id}-error`);
    
    if (target.checked) {
      errorEl!.style.display = 'none';
      this.isInputValid[target.id] = true;
    } else {
      errorEl!.style.display = 'inline';
      this.isInputValid[target.id] = false;
    }
  }

  /**
   * Displays a validation response for the input fields.
   * @param target Event target element (input, textarea).
   */
  showValidationResponse(target: HTMLInputElement | HTMLTextAreaElement): void {
    const errorEl = document.getElementById(`${target.id}-error`);
    
    if (!target.checkValidity()) {
      target.style.background = "white url('/assets/icons/error.svg') no-repeat right 25px top 10px";
      errorEl!.style.display = 'inline';
      this.isInputValid[target.id] = false;
    } else {
      target.style.background = "white url('/assets/icons/valid.svg') no-repeat right 25px top 10px";
      errorEl!.style.display = 'none';
      this.isInputValid[target.id] = true;
    }
  }

  /**
   * Sends an email with the filled in form data to the server.
   */
  async sendMail() {
    const nameText = this.nameEl.nativeElement.value;
    const emailText = this.emailEl.nativeElement.value;
    const messageText = this.messageEl.nativeElement.value;
    const bubbleEl = this.bubbleEl.nativeElement;
    const isFormValid = this.isInputValid['name'] && this.isInputValid['email'] && this.isInputValid['message'] && this.isInputValid['privacy'];
    const data = new FormData();

    if (isFormValid) {
      data.append('name', nameText);
      data.append('mail', emailText);
      data.append('message', messageText);
      bubbleEl.style.display = 'inline';
      bubbleEl.className = 'mail-bubble mail-animation';
      
      try {
        const response = await fetch('https://robin4consulting.com/send_mail.php', {
          method: 'POST',
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Email sent successfully:', result);
        this.resetForm();
      } catch (error) {
        console.error('Error sending email:', error);
        this.showErrorMessage();
      }
    }
  }

  /**
   * Resets the form after the email has been send.
   */
  resetForm() {
    this.resetInputElements();
    this.resetErrorMessages();
    this.resetInputValidation();
    setTimeout(() => {this.resetBubble()}, 3000);
  }

  /**
   * Resets the value and styling of the input elements.
   */
  resetInputElements() {
    this.nameEl.nativeElement.value = '';
    this.emailEl.nativeElement.value = '';
    this.messageEl.nativeElement.value = '';
    this.privacyEl.nativeElement.checked = false;
    
    this.nameEl.nativeElement.style.background = "white";
    this.emailEl.nativeElement.style.background = "white";
    this.messageEl.nativeElement.style.background = "white";
  }

  /**
   * Hides the error messages for failed validation.
   */
  resetErrorMessages() {
    document.getElementById(`name-error`)!.style.display = 'none';
    document.getElementById(`email-error`)!.style.display = 'none';
    document.getElementById(`message-error`)!.style.display = 'none';
    document.getElementById(`privacy-error`)!.style.display = 'none';
  }

  /**
   * Resets the input validation.
   */
  resetInputValidation() {
    this.isInputValid['name'] = false;
    this.isInputValid['email'] = false;
    this.isInputValid['message'] = false;
    this.isInputValid['privacy'] = false;
  }

  /**
   * Resets the mail info bubble.
   */
  resetBubble() {
    this.bubbleEl.nativeElement.style.display = 'none';
    this.bubbleEl.nativeElement.className = 'mail-bubble';
  }

  /**
   * Shows an error message to the user when email sending fails.
   */
  showErrorMessage() {
    const bubbleEl = this.bubbleEl.nativeElement;
    bubbleEl.style.display = 'inline';
    bubbleEl.className = 'mail-bubble error-animation';
    bubbleEl.textContent = this.translate.instant('CONTACT_FORM.ERROR');
    setTimeout(() => {this.resetBubble()}, 5000);
  }
 }
