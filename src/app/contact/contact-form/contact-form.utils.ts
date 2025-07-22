export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface FormValidationState {
  [key: string]: boolean;
}

export interface FormElements {
  name: HTMLInputElement;
  email: HTMLInputElement;
  message: HTMLTextAreaElement;
  privacy: HTMLInputElement;
  bubble: HTMLElement;
}

export class FormValidator {
  /**
   * Validates an input element and shows validation feedback
   * @param target - The input or textarea element to validate
   * @param validationState - Current validation state object
   * @returns Updated validation state for the element
   */
  static validateElement(target: HTMLInputElement | HTMLTextAreaElement, validationState: FormValidationState): boolean {
    const errorEl = document.getElementById(`${target.id}-error`);
    const isValid = target.checkValidity();
    
    if (isValid) {
      target.style.background = "white url('/assets/icons/valid.svg') no-repeat right 25px top 10px";
      errorEl!.style.display = 'none';
    } else {
      target.style.background = "white url('/assets/icons/error.svg') no-repeat right 25px top 10px";
      errorEl!.style.display = 'inline';
    }
    
    validationState[target.id] = isValid;
    return isValid;
  }

  /**
   * Validates checkbox element
   * @param target - The checkbox element to validate
   * @param validationState - Current validation state object
   * @returns Updated validation state for the element
   */
  static validateCheckbox(target: HTMLInputElement, validationState: FormValidationState): boolean {
    const errorEl = document.getElementById(`${target.id}-error`);
    const isValid = target.checked;
    
    errorEl!.style.display = isValid ? 'none' : 'inline';
    validationState[target.id] = isValid;
    return isValid;
  }

  /**
   * Checks if all form fields are valid
   * @param validationState - Current validation state object
   * @returns True if all fields are valid
   */
  static isFormValid(validationState: FormValidationState): boolean {
    return Object.values(validationState).every(isValid => isValid);
  }
}

export class FormResetter {
  /**
   * Resets all form input elements to their default state
   * @param elements - Form elements to reset
   */
  static resetInputElements(elements: FormElements): void {
    elements.name.value = '';
    elements.email.value = '';
    elements.message.value = '';
    elements.privacy.checked = false;
    elements.name.style.background = "white";
    elements.email.style.background = "white";
    elements.message.style.background = "white";
  }

  /**
   * Hides all error messages
   */
  static resetErrorMessages(): void {
    const errorIds = ['name-error', 'email-error', 'message-error', 'privacy-error'];
    errorIds.forEach(id => {
      const errorEl = document.getElementById(id);
      if (errorEl) errorEl.style.display = 'none';
    });
  }

  /**
   * Resets validation state for all form fields
   * @param validationState - Validation state object to reset
   */
  static resetValidationState(validationState: FormValidationState): void {
    Object.keys(validationState).forEach(key => {
      validationState[key] = false;
    });
  }

  /**
   * Resets and hides the mail bubble animation
   * @param bubbleElement - The bubble element to reset
   */
  static resetBubble(bubbleElement: HTMLElement): void {
    bubbleElement.style.display = 'none';
    bubbleElement.className = 'mail-bubble';
  }
}
