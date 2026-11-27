import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    localStorage.removeItem('selectedLanguage');
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([]), provideTranslateService({ fallbackLang: 'en' })],
    }).compileComponents();
  });

  it('creates the app with a router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
    expect((fixture.nativeElement as HTMLElement).querySelector('router-outlet')).not.toBeNull();
  });

  it('registers English, German and French', () => {
    TestBed.createComponent(AppComponent);

    expect([...TestBed.inject(TranslateService).getLangs()].sort()).toEqual(['de', 'en', 'fr']);
  });

  it('loads the translations of each language', () => {
    TestBed.createComponent(AppComponent);
    const translate = TestBed.inject(TranslateService);

    translate.use('en');
    expect(translate.instant('NAVBAR.ABOUT')).toBe('About me');
    translate.use('de');
    expect(translate.instant('NAVBAR.ABOUT')).toBe('Über mich');
    translate.use('fr');
    expect(translate.instant('NAVBAR.ABOUT')).toBe('À propos');
  });
});
