import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { NavmenuComponent } from './navmenu.component';

describe('NavmenuComponent', () => {
  let fixture: ComponentFixture<NavmenuComponent>;
  let el: HTMLElement;

  const click = (selector: string): void => {
    const target = el.querySelector<HTMLElement>(selector)!;
    // keep the test page from following the menu's links
    target.addEventListener('click', (event) => event.preventDefault(), { once: true });
    target.click();
    fixture.detectChanges();
  };
  const isOpen = (): boolean => el.querySelector('.mobile-menu')!.classList.contains('open');

  beforeEach(async () => {
    localStorage.removeItem('selectedLanguage');
    await TestBed.configureTestingModule({
      imports: [NavmenuComponent],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(NavmenuComponent);
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.style.overflow = '';
    localStorage.removeItem('selectedLanguage');
  });

  it('is closed at the start', () => {
    expect(isOpen()).toBe(false);
  });

  it('opens from the burger button and stops the page behind it from scrolling', () => {
    click('.burger-menu-button');

    expect(isOpen()).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes after a link is chosen and lets the page scroll again', () => {
    click('.burger-menu-button');
    click('.mobile-menu a[href="#projects"]');

    expect(isOpen()).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('switches the language and closes', () => {
    click('.burger-menu-button');
    click('.language-toggle button[aria-label="Deutsch"]');

    expect(document.documentElement.lang).toBe('de');
    expect(el.querySelector('.language-toggle button.active')!.textContent!.trim()).toBe('DE');
    expect(isOpen()).toBe(false);
  });
});
