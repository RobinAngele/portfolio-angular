import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appBubbleIntersection]',
  standalone: true
})
export class BubbleIntersectionDirective implements OnInit, OnDestroy {
  private resizeObserver?: ResizeObserver;
  private animationFrameId?: number;
  private isBrowser: boolean;
  private overlayElement?: HTMLElement;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) {
      return;
    }
    setTimeout(() => {
      this.setupElement();
      this.setupIntersectionDetection();
    }, 100);
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.checkIntersection.bind(this));
    }
  }

  ngOnDestroy() {
    if (!this.isBrowser) {
      return;
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.animationFrameId && typeof window !== 'undefined') {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.checkIntersection.bind(this));
    }
  }

  private setupElement() {
    const element = this.el.nativeElement;
    this.renderer.setStyle(element, 'position', 'relative');
    this.renderer.setStyle(element, 'display', 'inline-block');
    this.overlayElement = this.renderer.createElement('div');
    this.renderer.addClass(this.overlayElement, 'bubble-intersection-overlay');
    this.renderer.setStyle(this.overlayElement, 'position', 'absolute');
    this.renderer.setStyle(this.overlayElement, 'top', '0');
    this.renderer.setStyle(this.overlayElement, 'left', '0');
    this.renderer.setStyle(this.overlayElement, 'width', '0%');
    this.renderer.setStyle(this.overlayElement, 'height', '100%');
    this.renderer.setStyle(this.overlayElement, 'background-color', 'transparent');
    this.renderer.setStyle(this.overlayElement, 'color', 'white');
    this.renderer.setStyle(this.overlayElement, 'overflow', 'hidden');
    this.renderer.setStyle(this.overlayElement, 'white-space', 'nowrap');
    this.renderer.setStyle(this.overlayElement, 'pointer-events', 'none');
    this.renderer.setStyle(this.overlayElement, 'z-index', '2');
    this.renderer.setStyle(this.overlayElement, 'font-family', 'inherit');
    this.renderer.setStyle(this.overlayElement, 'font-size', 'inherit');
    this.renderer.setStyle(this.overlayElement, 'font-weight', 'inherit');
    this.renderer.setStyle(this.overlayElement, 'line-height', 'inherit');
    this.renderer.setStyle(this.overlayElement, 'text-shadow', '0 1px 2px rgba(0, 0, 0, 0.3)');
    this.updateOverlayContent();
    this.renderer.appendChild(element, this.overlayElement);
  }

  private updateOverlayContent() {
    if (this.overlayElement) {
      const currentText = this.el.nativeElement.textContent || '';
      this.renderer.setProperty(this.overlayElement, 'textContent', currentText);
    }
  }

  private setupIntersectionDetection() {
    if (!this.isBrowser || typeof ResizeObserver === 'undefined') {
      this.setupFallbackDetection();
      return;
    }
    this.resizeObserver = new ResizeObserver(() => {
      this.checkIntersection();
    });
    this.resizeObserver.observe(this.el.nativeElement);
    this.checkIntersection();
  }

  private setupFallbackDetection() {
    const checkPeriodically = () => {
      this.checkIntersection();
      this.updateOverlayContent();
      if (this.isBrowser && typeof window !== 'undefined') {
        setTimeout(checkPeriodically, 200);
      }
    };
    checkPeriodically();
  }

  private checkIntersection() {
    if (!this.isBrowser || typeof window === 'undefined' || !this.overlayElement) {
      return;
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.animationFrameId = requestAnimationFrame(() => {
      const element = this.el.nativeElement;
      const rect = element.getBoundingClientRect();
      this.updateOverlayContent();
      const viewportWidth = window.innerWidth;
      const bubbleEnd = 0.45 * viewportWidth;
      if (rect.left < bubbleEnd && rect.right > 0) {
        const relativeIntersectionPoint = Math.max(0, Math.min(bubbleEnd - rect.left, rect.width));
        const whiteTextPercentage = (relativeIntersectionPoint / rect.width) * 100;
        this.renderer.setStyle(this.overlayElement, 'width', `${whiteTextPercentage}%`);
        this.renderer.setStyle(this.overlayElement, 'opacity', '1');
      } else {
        this.renderer.setStyle(this.overlayElement, 'width', '0%');
        this.renderer.setStyle(this.overlayElement, 'opacity', '0');
      }
    });
  }
}
