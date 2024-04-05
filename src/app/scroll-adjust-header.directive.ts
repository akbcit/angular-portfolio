import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAdjustHeader]',
  standalone: true
})
export class ScrollAdjustHeaderDirective {
  private lastScrollTop = 0;
  private scrollThresholdForHalfMargin = 50;
  private scrollThresholdForHiding = 100;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const st = window.scrollY || document.documentElement.scrollTop;

    if (st > this.lastScrollTop) {
      // Scrolling down
      if (st > this.scrollThresholdForHiding && !this.el.nativeElement.classList.contains('hidden-header')) {
        // Apply hidden-header, ensuring it overrides half-margin visually
        this.renderer.addClass(this.el.nativeElement, 'hidden-header');
      } else if (st > this.scrollThresholdForHalfMargin && !this.el.nativeElement.classList.contains('half-margin')) {
        // Apply half-margin only if not already hidden or in the process of hiding
        if (!this.el.nativeElement.classList.contains('hidden-header')) {
          this.renderer.addClass(this.el.nativeElement, 'half-margin');
        }
      }
    } else {
      // Scrolling up
      if (st <= this.scrollThresholdForHiding) {
        // Remove hidden-header if scrolling up past hiding threshold
        this.renderer.removeClass(this.el.nativeElement, 'hidden-header');
        // Consider adding back half-margin if needed here
      }
      if (st <= this.scrollThresholdForHalfMargin) {
        // Remove half-margin if scrolling up to the top
        this.renderer.removeClass(this.el.nativeElement, 'half-margin');
      }
    }

    this.lastScrollTop = st <= 0 ? 0 : st;
  }
}
