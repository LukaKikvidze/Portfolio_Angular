import { Injectable, effect, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<Theme>('light');

  constructor() {
    const saved = (localStorage.getItem('theme') || '').toLowerCase();
    if (saved === 'dark' || saved === 'light') this.theme.set(saved);
    this.applyTheme(this.theme());
    effect(() => {
      const t = this.theme();
      this.applyTheme(t);
      localStorage.setItem('theme', t);
    });
  }

  toggle() {
    this.theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }

  private applyTheme(t: Theme) {
    const el = document.body;
    el.setAttribute('data-theme', t);
  }
}
