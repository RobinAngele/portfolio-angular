import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { LegalNoticeComponent } from './legal-notice.component';

describe('LegalNoticeComponent', () => {
  let fixture: ComponentFixture<LegalNoticeComponent>;

  const switchTo = (language: string): void => {
    TestBed.inject(LanguageService).setLanguage(language);
    fixture.detectChanges();
  };

  beforeEach(async () => {
    localStorage.removeItem('selectedLanguage');
    await TestBed.configureTestingModule({
      imports: [LegalNoticeComponent],
      providers: [provideRouter([]), provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(LegalNoticeComponent);
    fixture.detectChanges();
  });

  afterEach(() => localStorage.removeItem('selectedLanguage'));

  it('names the page in English at the start', () => {
    expect(document.title).toBe('Legal Notice | Robin Angelé');
  });

  it('names the page in the language the visitor switches to', () => {
    switchTo('de');
    expect(document.title).toBe('Impressum | Robin Angelé');

    switchTo('fr');
    expect(document.title).toBe('Mentions légales | Robin Angelé');

    switchTo('en');
    expect(document.title).toBe('Legal Notice | Robin Angelé');
  });

  it('shows the publisher and the host', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent!;

    expect(text).toContain('Robin4consulting');
    expect(text).toContain('o2switch');
  });
});
