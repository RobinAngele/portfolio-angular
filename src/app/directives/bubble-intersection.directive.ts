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

  /**
   * Initializes the bubble intersection directive
   * @param el Element reference for the directive
   * @param renderer Angular renderer for DOM manipulation
   * @param platformId Platform identifier for browser detection
   */
  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Angular lifecycle hook - initializes directive after component initialization
   */
  ngOnInit() {
    if (!this.isBrowser) {
      return;
    }
    this.initializeDirective();
    this.setupResizeListener();
  }


  /**
   * Angular lifecycle hook - cleans up resources before component destruction
   */
  ngOnDestroy() {
    if (!this.isBrowser) {
      return;
    }
    this.cleanupResources();
  }


  /**
   * Initializes the directive with delayed setup
   */
  private initializeDirective(): void {
    setTimeout(() => {
      this.setupElement();
      this.setupIntersectionDetection();
    }, 100);
  }


  /**
   * Sets up window resize event listener
   */
  private setupResizeListener(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.checkIntersection.bind(this));
    }
  }


  /**
   * Cleans up all resources and event listeners
   */
  private cleanupResources(): void {
    this.disconnectResizeObserver();
    this.cancelAnimationFrame();
    this.removeResizeListener();
  }


  /**
   * Disconnects resize observer if it exists
   */
  private disconnectResizeObserver(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }


  /**
   * Cancels animation frame if it exists
   */
  private cancelAnimationFrame(): void {
    if (this.animationFrameId && typeof window !== 'undefined') {
      cancelAnimationFrame(this.animationFrameId);
    }
  }


  /**
   * Removes window resize event listener
   */
  private removeResizeListener(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.checkIntersection.bind(this));
    }
  }

  /**
   * Sets up the element with overlay
   */
  private setupElement() {
    this.setupElementPositioning();
    this.createOverlayElement();
    this.setupOverlayStyles();
    this.updateOverlayContent();
    this.appendOverlayToElement();
  }


  /**
   * Sets up positioning styles for the main element
   */
  private setupElementPositioning(): void {
    const element = this.el.nativeElement;
    this.renderer.setStyle(element, 'position', 'relative');
    this.renderer.setStyle(element, 'display', 'inline-block');
  }


  /**
   * Creates the overlay element
   */
  private createOverlayElement(): void {
    this.overlayElement = this.renderer.createElement('div');
    this.renderer.addClass(this.overlayElement, 'bubble-intersection-overlay');
  }


  /**
   * Sets up all styles for the overlay element
   */
  private setupOverlayStyles(): void {
    this.setupOverlayPositioning();
    this.setupOverlayAppearance();
    this.setupOverlayFont();
  }


  /**
   * Sets up positioning styles for overlay
   */
  private setupOverlayPositioning(): void {
    this.renderer.setStyle(this.overlayElement, 'position', 'absolute');
    this.renderer.setStyle(this.overlayElement, 'top', '0');
    this.renderer.setStyle(this.overlayElement, 'left', '0');
    this.renderer.setStyle(this.overlayElement, 'width', '0%');
    this.renderer.setStyle(this.overlayElement, 'height', '100%');
  }


  /**
   * Sets up appearance styles for overlay
   */
  private setupOverlayAppearance(): void {
    this.renderer.setStyle(this.overlayElement, 'background-color', 'transparent');
    this.renderer.setStyle(this.overlayElement, 'color', 'white');
    this.renderer.setStyle(this.overlayElement, 'overflow', 'hidden');
    this.renderer.setStyle(this.overlayElement, 'white-space', 'nowrap');
    this.renderer.setStyle(this.overlayElement, 'pointer-events', 'none');
    this.renderer.setStyle(this.overlayElement, 'z-index', '2');
    this.renderer.setStyle(this.overlayElement, 'text-shadow', '0 1px 2px rgba(0, 0, 0, 0.3)');
  }


  /**
   * Sets up font styles for overlay
   */
  private setupOverlayFont(): void {
    this.renderer.setStyle(this.overlayElement, 'font-family', 'inherit');
    this.renderer.setStyle(this.overlayElement, 'font-size', 'inherit');
    this.renderer.setStyle(this.overlayElement, 'font-weight', 'inherit');
    this.renderer.setStyle(this.overlayElement, 'line-height', 'inherit');
  }


  /**
   * Appends overlay element to main element
   */
  private appendOverlayToElement(): void {
    const element = this.el.nativeElement;
    this.renderer.appendChild(element, this.overlayElement);
  }


  /**
   * Updates overlay content with current element text
   */
  private updateOverlayContent() {
    if (this.overlayElement) {
      const currentText = this.el.nativeElement.textContent || '';
      this.renderer.setProperty(this.overlayElement, 'textContent', currentText);
    }
  }


  /**
   * Sets up intersection detection using ResizeObserver or fallback
   */
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


  /**
   * Sets up fallback detection using periodic checks
   */
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

  /**
   * Checks and updates intersection with bubble area
   */
  private checkIntersection() {
    if (!this.canCheckIntersection()) {
      return;
    }
    this.scheduleIntersectionUpdate();
  }


  /**
   * Checks if intersection checking is possible
   * @returns True if intersection can be checked
   */
  private canCheckIntersection(): boolean {
    return this.isBrowser && 
           typeof window !== 'undefined' && 
           !!this.overlayElement;
  }


  /**
   * Schedules intersection update using animation frame
   */
  private scheduleIntersectionUpdate(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.animationFrameId = requestAnimationFrame(() => {
      this.performIntersectionUpdate();
    });
  }


  /**
   * Performs the actual intersection calculation and update
   */
  private performIntersectionUpdate(): void {
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();
    this.updateOverlayContent();
    
    const intersectionData = this.calculateIntersection(rect);
    this.updateOverlayVisibility(intersectionData);
  }


  /**
   * Calculates intersection data
   * @param rect Element bounding rectangle
   * @returns Intersection calculation result
   */
  private calculateIntersection(rect: DOMRect): { isIntersecting: boolean; percentage: number } {
    const viewportWidth = window.innerWidth;
    const bubbleEnd = 0.45 * viewportWidth;
    
    if (rect.left < bubbleEnd && rect.right > 0) {
      const relativeIntersectionPoint = Math.max(0, Math.min(bubbleEnd - rect.left, rect.width));
      const whiteTextPercentage = (relativeIntersectionPoint / rect.width) * 100;
      return { isIntersecting: true, percentage: whiteTextPercentage };
    }
    
    return { isIntersecting: false, percentage: 0 };
  }


  /**
   * Updates overlay visibility based on intersection data
   * @param data Intersection data
   */
  private updateOverlayVisibility(data: { isIntersecting: boolean; percentage: number }): void {
    if (data.isIntersecting) {
      this.renderer.setStyle(this.overlayElement, 'width', `${data.percentage}%`);
      this.renderer.setStyle(this.overlayElement, 'opacity', '1');
    } else {
      this.renderer.setStyle(this.overlayElement, 'width', '0%');
      this.renderer.setStyle(this.overlayElement, 'opacity', '0');
    }
  }
}
