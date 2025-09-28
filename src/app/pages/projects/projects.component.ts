import { Component, signal, computed, OnInit, DestroyRef, inject, HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { LightboxComponent } from '../../components/lightbox/lightbox.component';
import { SeoService } from '../../services/seo.service';
import { listStagger, fadeInUp } from '../../shared/animations';
import { RevealDirective } from '../../shared/reveal.directive';
import { debounceTime, distinctUntilChanged, BehaviorSubject } from 'rxjs';

export interface ProjectCategory {
  id: string;
  name: string;
  icon?: string;
  count: number;
}

export interface ProjectFilter {
  category: string;
  search: string;
  technologies: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgFor, 
    NgIf,
    ProjectCardComponent, 
    LightboxComponent, 
    RevealDirective
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  animations: [listStagger, fadeInUp]
})
export class ProjectsComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private searchSubject = new BehaviorSubject<string>('');
  
  // State signals
  selectedCategory = signal<string>('All');
  searchQuery = signal<string>('');
  previewSrc = signal<string | undefined>(undefined);
  isLoading = signal<boolean>(true);
  viewMode = signal<'grid' | 'list'>('grid');
  showBackToTop = signal<boolean>(false);
  
  // Computed properties
  categories = computed<ProjectCategory[]>(() => {
    const projects = this.svc.getByCategory('All');
    const categoryMap = new Map<string, number>();
    
    // Count projects per category
    projects.forEach((project: Project) => {
      const category = project.category;
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });
    
    // Build categories with counts
    const cats: ProjectCategory[] = [
      { id: 'All', name: 'All Projects', count: projects.length }
    ];
    
    ['Angular', 'React', 'Vue', 'PHP', 'Node.js', 'Full-stack', 'Mobile', 'Other'].forEach(cat => {
      const count = categoryMap.get(cat) || 0;
      if (count > 0) {
        cats.push({ id: cat, name: cat, count });
      }
    });
    
    return cats;
  });
  
  filteredProjects = computed<Project[]>(() => {
    let projects = this.svc.getByCategory('All');
    const category = this.selectedCategory();
    const search = this.searchQuery().toLowerCase().trim();
    
    // Filter by category
    if (category !== 'All') {
      projects = projects.filter((p: Project) => p.category === category);
    }
    
    // Filter by search query
    if (search) {
      projects = projects.filter((p: Project) => 
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        (p.technologies && p.technologies.some((tech: string) => tech.toLowerCase().includes(search)))
      );
    }
    
    // Sort by date (assuming you have a createdAt or similar date field)
    return projects.sort((a: Project, b: Project) => {
      return new Date(b.id).getTime() - new Date(a.id).getTime(); // Using id as fallback
    });
  });
  
  featuredProjects = computed<Project[]>(() => 
    this.filteredProjects().slice(0, 3)
  );
  
  regularProjects = computed<Project[]>(() => 
    this.filteredProjects()
  );
  
  hasResults = computed<boolean>(() => this.filteredProjects().length > 0);
  
  constructor(
    private svc: ProjectsService, 
    private seo: SeoService
  ) {
    this.setupSeo();
    this.setupSearch();
  }
  
  ngOnInit(): void {
    // Simulate loading for smooth animation
    setTimeout(() => this.isLoading.set(false), 800);
  }
  
  private setupSeo(): void {
    this.seo.setMeta({
      title: 'Projects | Luka Kikvidze - Angular Developer Portfolio',
      description: 'Explore my portfolio of modern web applications built with Angular, React, PHP, and other cutting-edge technologies. From enterprise solutions to creative experiments.'
    });
  }
  
  private setupSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(query => this.searchQuery.set(query));
  }
  
  // Event handlers
  onCategoryChange(categoryId: string): void {
    this.selectedCategory.set(categoryId);
    this.trackEvent('filter_category', { category: categoryId });
  }
  
  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchSubject.next(target.value);
  }
  
  onClearSearch(): void {
    this.searchQuery.set('');
    this.searchSubject.next('');
  }
  
  onViewModeChange(mode: 'grid' | 'list'): void {
    this.viewMode.set(mode);
    this.trackEvent('change_view_mode', { mode });
  }
  
  onProjectPreview(imageSrc: string): void {
    this.previewSrc.set(imageSrc);
    this.trackEvent('preview_project', { image: imageSrc });
  }
  
  onCloseLightbox(): void {
    this.previewSrc.set(undefined);
  }
  
  onProjectClick(project: Project): void {
    this.trackEvent('project_click', {
      title: project.title,
      category: project.category,
      technologies: project.technologies?.join(', ') || ''
    });
  }
  
  onProjectLink(project: Project, linkType: 'demo' | 'github'): void {
    this.trackEvent('project_link_click', {
      title: project.title,
      linkType,
      url: linkType === 'demo' ? project.liveUrl : project.githubUrl
    });
  }
  
  // Utility methods
  getCategoryIcon(categoryId: string): string {
    const icons: Record<string, string> = {
      'All': '🎯',
      'Angular': '🅰️',
      'React': '⚛️',
      'Vue': '💚',
      'PHP': '🐘',
      'Node.js': '🟢',
      'Full-stack': '🔄',
      'Mobile': '📱',
      'Other': '✨'
    };
    return icons[categoryId] || '📁';
  }
  
  getProjectsByTechnology(tech: string): Project[] {
    return this.svc.getByCategory('All').filter((p: Project) => 
      p.technologies?.some((t: string) => t.toLowerCase() === tech.toLowerCase()) || false
    );
  }
  
  getTechnologyCount(tech: string): number {
    return this.getProjectsByTechnology(tech).length;
  }
  
  getRandomFeaturedProject(): Project | undefined {
    const featured = this.featuredProjects();
    return featured.length > 0 
      ? featured[Math.floor(Math.random() * featured.length)]
      : undefined;
  }
  
  // Scroll handling
  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showBackToTop.set(scrollTop > 300);
  }
  
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Analytics
  private trackEvent(eventName: string, properties?: Record<string, any>): void {
    // Integrate with analytics service
    console.log(`Event: ${eventName}`, properties);
  }
  
  // Keyboard shortcuts
  onKeyboardShortcut(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case 'k':
          event.preventDefault();
          document.getElementById('project-search')?.focus();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          event.preventDefault();
          const index = parseInt(event.key) - 1;
          const categories = this.categories();
          if (categories[index]) {
            this.onCategoryChange(categories[index].id);
          }
          break;
      }
    }
    
    if (event.key === 'Escape') {
      this.onCloseLightbox();
      this.onClearSearch();
    }
  }
  
  // Export/Share functionality
  exportProjectList(): void {
    const projects = this.filteredProjects().map((p: Project) => ({
      title: p.title,
      description: p.description,
      technologies: p.technologies || [],
      demoUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || ''
    }));
    
    const dataStr = JSON.stringify(projects, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `luka-kikvidze-projects-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    this.trackEvent('export_projects', { count: projects.length });
  }
}