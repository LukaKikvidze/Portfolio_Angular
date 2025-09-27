import { Directive, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;

  @Input() revealDelay: string | number = '0ms';

  @HostBinding('class.reveal') base = true;
  @HostBinding('class.reveal-show') show = false;
  @HostBinding('style.transitionDelay') get delay() {
    return typeof this.revealDelay === 'number' ? `${this.revealDelay}ms` : this.revealDelay;
  }

  ngOnInit() {
    if (typeof window === 'undefined') return;
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          this.show = true;
          this.observer?.disconnect();
        }
      });
    }, { threshold: 0.15 });
    this.observer.observe((this as any).el?.nativeElement ?? (arguments as any));
  }

  ngOnDestroy() { this.observer?.disconnect(); }
}
