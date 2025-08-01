import { Injectable } from '@angular/core';
import { ContactFormData } from './contact-form.utils';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly apiUrl = 'https://w0205860.kasserver.com/robin4consulting.com/send_mail.php';
  private mailSendPromise: Promise<Response> | null = null;

  /**
   * Sends email with form data
   * @param formData Contact form data to send
   * @returns Promise resolving to fetch response
   */
  async sendEmail(formData: ContactFormData): Promise<Response> {
    if (this.mailSendPromise) {
      return this.mailSendPromise;
    }

    const formDataToSend = this.buildFormData(formData);
    this.mailSendPromise = this.makeRequest(formDataToSend);

    try {
      const response = await this.mailSendPromise;
      return response;
    } finally {
      this.resetPromise();
    }
  }


  /**
   * Checks if email send operation is in progress
   * @returns True if email is being sent
   */
  isSending(): boolean {
    return this.mailSendPromise !== null;
  }


  /**
   * Builds FormData object from contact form data
   * @param formData Contact form data
   * @returns FormData object ready for sending
   */
  private buildFormData(formData: ContactFormData): FormData {
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('mail', formData.email);
    formDataToSend.append('message', formData.message);
    return formDataToSend;
  }


  /**
   * Makes HTTP POST request to send email
   * @param formData FormData to send
   * @returns Promise with fetch response
   */
  private makeRequest(formData: FormData): Promise<Response> {
    return fetch(this.apiUrl, {
      method: 'POST',
      body: formData
    });
  }


  /**
   * Resets the mail send promise to null
   */
  private resetPromise(): void {
    this.mailSendPromise = null;
  }
}