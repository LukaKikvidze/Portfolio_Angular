import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgFor],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  
  @Output() previewImage = new EventEmitter<string>();
  @Output() demoClick = new EventEmitter<Project>();
  @Output() githubClick = new EventEmitter<Project>();

  onPreviewClick(): void {
    if (this.project.image) {
      this.previewImage.emit(this.project.image);
    }
  }

  onDemoClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.demoClick.emit(this.project);
    
    // Navigate to demo URL
    if (this.project.liveUrl) {
      window.open(this.project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  }

  onGithubClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.githubClick.emit(this.project);
    
    // Navigate to GitHub URL
    if (this.project.githubUrl) {
      window.open(this.project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  }

  onCardKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onPreviewClick();
    }
  }

  onThumbKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onPreviewClick();
    }
  }

  trackByTech(index: number, tech: string): string {
    return tech;
  }
}