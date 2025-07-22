import { Injectable } from '@angular/core';
import { ContactFormData } from './contact-form.utils';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private mailSendPromise: Promise<Response> | null = null;

  /**
   * Sends an email with form data using a POST request
   * @param formData - Contact form data to send
   * @returns Promise resolving to fetch response
   */
  async sendEmail(formData: ContactFormData): Promise<Response> {
    if (this.mailSendPromise) {
      return this.mailSendPromise;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);

    this.mailSendPromise = fetch('/send_mail.php', {
      method: 'POST',
      body: formDataToSend
    });

    try {
      const response = await this.mailSendPromise;
      return response;
    } finally {
      this.mailSendPromise = null;
    }
  }

  /**
   * Checks if an email send operation is currently in progress
   * @returns True if email is being sent
   */
  isSending(): boolean {
    return this.mailSendPromise !== null;
  }
}
