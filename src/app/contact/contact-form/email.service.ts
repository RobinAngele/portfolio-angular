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
    formDataToSend.append('mail', formData.email);
    formDataToSend.append('message', formData.message);
    
    // Use the correct server path for your KasServer hosting
    const apiUrl = 'https://w0205860.kasserver.com/robin4consulting.com/send_mail.php';

    this.mailSendPromise = fetch(apiUrl, {
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
