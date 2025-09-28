// contact.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  skills: string[] = [
    'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3',
    'RxJS', 'NgRx', 'SCSS', 'Git', 'REST API', 'Node.js',
    'Responsive Design', 'UI/UX', 'Clean Architecture'
  ];

  ngOnInit(): void {
    this.initializeAnimations();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.handleScrollAnimations();
  }

  private initializeAnimations(): void {
    // Initialize any animations after view init
    setTimeout(() => {
      this.animateElements();
    }, 100);
  }

  private animateElements(): void {
    // Add animation classes to elements
    const elements = document.querySelectorAll('[class*="animate-"]');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animated');
      }, index * 100);
    });
  }

  private handleScrollAnimations(): void {
    // Handle scroll-based animations
    const elements = document.querySelectorAll('.info-card, .skill-item');
    elements.forEach(element => {
      const position = element.getBoundingClientRect();
      if (position.top < window.innerHeight * 0.8) {
        element.classList.add('animate-in');
      }
    });
  }

  scrollToContact(): void {
    const contactSection = document.querySelector('.contact-methods');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
    
    // Optional: Add haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }

  downloadFile(url: string, filename: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Track download
    this.trackDownload(filename);
  }

  trackDownload(filename: string): void {
    console.log(`Downloaded: ${filename}`);
    // Analytics tracking logic can be added here
  }
}