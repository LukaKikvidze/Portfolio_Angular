import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { LightboxComponent } from '../../components/lightbox/lightbox.component';
import { SeoService } from '../../services/seo.service';
import { listStagger, fadeInUp } from '../../shared/animations';
import { RevealDirective } from '../../shared/reveal.directive';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, NgIf, ProjectCardComponent, LightboxComponent, RevealDirective, FormsModule, CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [listStagger, fadeInUp]
})
export class ProjectsComponent {
  categories = ['All','Angular','PHP','Full-stack','Other'];
  selected = signal('All');
  previewSrc = signal<string|undefined>(undefined);

  searchText = '';
  viewMode: 'grid' | 'list' = 'grid';
  filteredProjects: Project[] = [];
  activeFilters: string[] = [];
  showBackToTop = false;

  constructor(private svc: ProjectsService, private seo: SeoService){
    this.seo.setMeta({ 
      title: 'Projects | Luka Kikvidze', 
      description: 'Showcase of Angular, PHP, and Full‑stack projects by Luka Kikvidze.'
    });
    this.filteredProjects = this.svc.getAll();
  }

  onSearch(text: string) {
    this.searchText = text;
    this.filterProjects();
  }

  removeFilter(filter: string) {
    this.activeFilters = this.activeFilters.filter(f => f !== filter);
    this.filterProjects();
  }

  resetFilters() {
    this.activeFilters = [];
    this.searchText = '';
    this.filteredProjects = this.svc.getAll();
  }

  exportProjects() {
    // TODO: implement export logic
  }

  addProject() {
    // TODO: implement add project logic
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private filterProjects() {
    let projects = this.svc.getAll();

    if(this.searchText) {
      projects = projects.filter(p => p.title.toLowerCase().includes(this.searchText.toLowerCase()));
    }

    if(this.activeFilters.length) {
      projects = projects.filter(p => this.activeFilters.includes(p.category));
    }

    this.filteredProjects = projects;
  }

  getCategoryCount(category: string) {
    if(category === 'All') return this.svc.getAll().length;
    return this.svc.getByCategory(category).length;
  }
}
