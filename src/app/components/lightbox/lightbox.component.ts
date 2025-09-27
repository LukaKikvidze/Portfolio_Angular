import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.css'
})
export class LightboxComponent {
  @Input() src = '';
  @Input() alt = '';
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape') onEsc(){ this.closed.emit(); }
}
