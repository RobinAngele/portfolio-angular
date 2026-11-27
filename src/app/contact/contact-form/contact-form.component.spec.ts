import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  let fixture: ComponentFixture<ContactFormComponent>;
  let el: HTMLElement;
  let originalFetch: typeof window.fetch;
  let requests: { url: string; body: FormData }[];

  const field = <T extends HTMLElement>(id: string): T => el.querySelector<T>(`#${id}`)!;
  const sendButton = (): HTMLButtonElement => el.querySelector<HTMLButtonElement>('button[type="submit"]')!;

  /** Types a value into a field and leaves it, as a visitor would. */
  const leave = (id: string, value: string): void => {
    const input = field<HTMLInputElement>(id);
    input.value = value;
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
  };

  const tickPrivacy = (): void => {
    field<HTMLInputElement>('privacy').click();
    fixture.detectChanges();
  };

  const fillValid = (): void => {
    leave('name', 'Ada Lovelace');
    leave('email', 'ada@example.org');
    leave('message', 'Hello Robin');
    tickPrivacy();
  };

  beforeEach(async () => {
    requests = [];
    originalFetch = window.fetch;
    window.fetch = ((url: string, init: RequestInit) => {
      requests.push({ url, body: init.body as FormData });
      return Promise.resolve(new Response(''));
    }) as typeof window.fetch;

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  it('starts with the send button disabled', () => {
    expect(sendButton().disabled).toBe(true);
  });

  it('enables the send button once every field is valid and the privacy box is ticked', () => {
    fillValid();

    expect(sendButton().disabled).toBe(false);
  });

  it('shows an error and keeps the button disabled for an invalid email address', () => {
    leave('name', 'Ada Lovelace');
    leave('email', 'not-an-email');
    leave('message', 'Hello Robin');
    tickPrivacy();

    expect(field('email-error').style.display).toBe('inline');
    expect(sendButton().disabled).toBe(true);
  });

  it('hides the error again once the address is corrected', () => {
    leave('email', 'not-an-email');
    leave('email', 'ada@example.org');

    expect(field('email-error').style.display).toBe('none');
  });

  it('disables the button again when the privacy box is unticked', () => {
    fillValid();
    tickPrivacy();

    expect(field('privacy-error').style.display).toBe('inline');
    expect(sendButton().disabled).toBe(true);
  });

  it('posts the message and resets the form', async () => {
    fillValid();

    await fixture.componentInstance.sendMail();
    fixture.detectChanges();

    expect(requests.length).toBe(1);
    expect(requests[0].url).toBe('/send_mail.php');
    expect(requests[0].body.get('name')).toBe('Ada Lovelace');
    expect(requests[0].body.get('mail')).toBe('ada@example.org');
    expect(requests[0].body.get('message')).toBe('Hello Robin');
    expect(field<HTMLInputElement>('name').value).toBe('');
    expect(field<HTMLInputElement>('privacy').checked).toBe(false);
    expect(sendButton().disabled).toBe(true);
  });

  it('does not post while the form is incomplete', async () => {
    leave('name', 'Ada Lovelace');

    await fixture.componentInstance.sendMail();

    expect(requests.length).toBe(0);
  });
});
