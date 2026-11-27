import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let el: HTMLElement;

  const languageButtons = (): HTMLButtonElement[] =>
    Array.from(el.querySelectorAll<HTMLButtonElement>('.language-toggle button'));
  const activeLanguages = (): string[] =>
    languageButtons().filter((button) => button.classList.contains('active')).map((button) => button.textContent!.trim());

  beforeEach(async () => {
    localStorage.removeItem('selectedLanguage');
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => localStorage.removeItem('selectedLanguage'));

  it('offers English, German and French, separated by slashes', () => {
    expect(languageButtons().map((button) => button.textContent!.trim())).toEqual(['EN', 'DE', 'FR']);
    expect(el.querySelectorAll('.language-toggle .separator').length).toBe(2);
  });

  it('marks English as the current language at the start', () => {
    expect(activeLanguages()).toEqual(['EN']);
    expect(languageButtons()[0].getAttribute('aria-pressed')).toBe('true');
  });

  it('switches the language when a button is clicked', () => {
    languageButtons()[1].click();
    fixture.detectChanges();

    expect(activeLanguages()).toEqual(['DE']);
    expect(languageButtons()[0].getAttribute('aria-pressed')).toBe('false');
    expect(document.documentElement.lang).toBe('de');
  });

  it('follows a language change made elsewhere on the page', () => {
    TestBed.inject(LanguageService).setLanguage('fr');
    fixture.detectChanges();

    expect(activeLanguages()).toEqual(['FR']);
  });
});
