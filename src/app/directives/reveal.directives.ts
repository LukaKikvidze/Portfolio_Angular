// src/app/directives/reveal.directive.ts
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit {
  @Input() revealDelay: string = '0ms';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Initially hide the element
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(30px)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', `all 0.6s ease ${this.revealDelay}`);

    // Use setTimeout to trigger the animation after a small delay
    setTimeout(() => {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
    }, 100);
  }
}