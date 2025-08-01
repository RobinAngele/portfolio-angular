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

  /**
   * Initializes component after view initialization
   */
  ngAfterViewInit() {
    this.setupInputEventListeners();
    this.setupCheckboxEventListener();
  }


  /**
   * Sets up blur event listeners for input elements
   */
  private setupInputEventListeners(): void {
    this.nameEl.nativeElement.onblur = (event: Event) => this.onInputBlur(event);
    this.emailEl.nativeElement.onblur = (event: Event) => this.onInputBlur(event);
    this.messageEl.nativeElement.onblur = (event: Event) => this.onInputBlur(event);
  }


  /**
   * Sets up change event listener for privacy checkbox
   */
  private setupCheckboxEventListener(): void {
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
   * Displays a validation response for the input fields
   * @param target Event target element (input, textarea)
   */
  showValidationResponse(target: HTMLInputElement | HTMLTextAreaElement): void {
    const isValid = this.validateInput(target);
    this.updateInputValidation(target, isValid);
    this.updateValidationVisuals(target, isValid);
  }


  /**
   * Validates input element based on type
   * @param target Input element to validate
   * @returns True if input is valid
   */
  private validateInput(target: HTMLInputElement | HTMLTextAreaElement): boolean {
    if (target.id === 'email') {
      return target.checkValidity() && this.isValidEmail(target.value);
    }
    return target.checkValidity();
  }


  /**
   * Updates validation state for input
   * @param target Input element
   * @param isValid Whether input is valid
   */
  private updateInputValidation(target: HTMLInputElement | HTMLTextAreaElement, isValid: boolean): void {
    this.isInputValid[target.id] = isValid;
  }


  /**
   * Updates visual feedback for validation
   * @param target Input element
   * @param isValid Whether input is valid
   */
  private updateValidationVisuals(target: HTMLInputElement | HTMLTextAreaElement, isValid: boolean): void {
    const iconPath = isValid ? '/assets/icons/valid.svg' : '/assets/icons/error.svg';
    const errorEl = document.getElementById(`${target.id}-error`);
    
    target.style.background = `white url('${iconPath}') no-repeat right 25px top 10px`;
    errorEl!.style.display = isValid ? 'none' : 'inline';
  }

  /**
   * Validates email format more strictly than browser default.
   * @param email Email string to validate.
   * @returns True if email is valid, false otherwise.
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  /**
   * Sends an email with the filled in form data to the server
   */
  async sendMail() {
    if (!this.isFormCompletelyValid()) {
      return;
    }

    const formData = this.buildFormData();
    this.showLoadingBubble();
    
    try {
      const response = await this.makeEmailRequest(formData);
      const result = await response.json();
      
      this.handleEmailResponse(response, result);
    } catch (error) {
      console.error('Error sending email:', error);
      this.showErrorMessage();
    }
  }


  /**
   * Checks if all form inputs are valid
   * @returns True if form is completely valid
   */
  private isFormCompletelyValid(): boolean {
    return this.isInputValid['name'] && 
           this.isInputValid['email'] && 
           this.isInputValid['message'] && 
           this.isInputValid['privacy'];
  }


  /**
   * Builds FormData object from form inputs
   * @returns FormData ready for sending
   */
  private buildFormData(): FormData {
    const data = new FormData();
    data.append('name', this.nameEl.nativeElement.value);
    data.append('mail', this.emailEl.nativeElement.value);
    data.append('message', this.messageEl.nativeElement.value);
    return data;
  }


  /**
   * Shows loading animation on bubble element
   */
  private showLoadingBubble(): void {
    const bubbleEl = this.bubbleEl.nativeElement;
    bubbleEl.style.display = 'inline';
    bubbleEl.className = 'mail-bubble mail-animation';
  }


  /**
   * Makes HTTP request to send email
   * @param data FormData to send
   * @returns Promise with response
   */
  private makeEmailRequest(data: FormData): Promise<Response> {
    return fetch('https://robin4consulting.com/send_mail.php', {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });
  }


  /**
   * Handles email response from server
   * @param response HTTP response object
   * @param result Parsed JSON result
   */
  private handleEmailResponse(response: Response, result: any): void {
    if (!response.ok) {
      if (response.status === 400 && result.error === 'Form incomplete or invalid email') {
        this.handleServerValidationError();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } else {
      this.resetForm();
    }
  }

  /**
   * Resets the form after the email has been sent
   */
  resetForm() {
    this.resetInputElements();
    this.resetErrorMessages();
    this.resetInputValidation();
    setTimeout(() => {this.resetBubble()}, 3000);
  }


  /**
   * Resets the value and styling of the input elements
   */
  resetInputElements() {
    this.clearInputValues();
    this.clearInputStyling();
  }


  /**
   * Clears all input values and checkbox state
   */
  private clearInputValues(): void {
    this.nameEl.nativeElement.value = '';
    this.emailEl.nativeElement.value = '';
    this.messageEl.nativeElement.value = '';
    this.privacyEl.nativeElement.checked = false;
  }


  /**
   * Resets background styling for all inputs
   */
  private clearInputStyling(): void {
    this.nameEl.nativeElement.style.background = "white";
    this.emailEl.nativeElement.style.background = "white";
    this.messageEl.nativeElement.style.background = "white";
  }

  /**
   * Hides the error messages for failed validation
   */
  resetErrorMessages() {
    const errorIds = ['name-error', 'email-error', 'message-error', 'privacy-error'];
    errorIds.forEach(id => {
      document.getElementById(id)!.style.display = 'none';
    });
  }


  /**
   * Resets the input validation state
   */
  resetInputValidation() {
    this.isInputValid['name'] = false;
    this.isInputValid['email'] = false;
    this.isInputValid['message'] = false;
    this.isInputValid['privacy'] = false;
  }


  /**
   * Resets the mail info bubble
   */
  resetBubble() {
    this.bubbleEl.nativeElement.style.display = 'none';
    this.bubbleEl.nativeElement.className = 'mail-bubble';
  }

  /**
   * Shows an error message to the user when email sending fails
   */
  showErrorMessage() {
    const bubbleEl = this.bubbleEl.nativeElement;
    this.setupErrorBubble(bubbleEl);
    setTimeout(() => {this.resetBubble()}, 5000);
  }


  /**
   * Sets up error bubble with error styling and message
   * @param bubbleEl Bubble element to configure
   */
  private setupErrorBubble(bubbleEl: HTMLElement): void {
    bubbleEl.style.display = 'inline';
    bubbleEl.className = 'mail-bubble error-animation';
    bubbleEl.textContent = this.translate.instant('CONTACT_FORM.ERROR');
  }


  /**
   * Handles server-side validation errors by showing email validation error
   */
  handleServerValidationError() {
    this.hideBubble();
    this.showEmailValidationError();
    this.emailEl.nativeElement.focus();
  }


  /**
   * Hides the bubble element
   */
  private hideBubble(): void {
    this.bubbleEl.nativeElement.style.display = 'none';
    this.bubbleEl.nativeElement.className = 'mail-bubble';
  }


  /**
   * Shows validation error for email input
   */
  private showEmailValidationError(): void {
    const emailEl = this.emailEl.nativeElement;
    const emailErrorEl = document.getElementById('email-error');
    
    emailEl.style.background = "white url('/assets/icons/error.svg') no-repeat right 25px top 10px";
    emailErrorEl!.style.display = 'inline';
    this.isInputValid['email'] = false;
  }
 }
