import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { ContactAreaComponent } from './contact-area.component';

describe('ContactAreaComponent', () => {
  let fixture: ComponentFixture<ContactAreaComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactAreaComponent],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactAreaComponent);
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('shows the contact form', () => {
    expect(el.querySelector('app-contact-form form')).not.toBeNull();
  });

  it('links the booking button to the appointment page in a new tab', () => {
    const link = el.querySelector<HTMLAnchorElement>('.booking a')!;

    expect(link.getAttribute('href')).toBe(fixture.componentInstance.bookingUrl);
    expect(link.target).toBe('_blank');
  });
});
