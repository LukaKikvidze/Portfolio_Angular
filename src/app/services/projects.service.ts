import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly projects: Project[] = [
    {
      id: 'p1',
      title: 'TaskFlow Dashboard',
      description: 'Project management dashboard with real-time updates and charts.',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'Node'],
      category: 'Angular',
      githubUrl: 'https://github.com/lukakikvidze/taskflow',
      liveUrl: 'https://taskflow.example.com',
      image: 'assets/images/project-1.svg'
    },
    {
      id: 'p2',
      title: 'Portfolio CMS',
      description: 'Custom CMS for managing portfolio content with Markdown support.',
      technologies: ['PHP', 'MySQL', 'Alpine.js'],
      category: 'PHP',
      githubUrl: 'https://github.com/lukakikvidze/portfolio-cms',
      liveUrl: 'https://cms.example.com',
      image: 'assets/images/project-2.svg'
    },
    {
      id: 'p3',
      title: 'E-commerce Starter',
      description: 'Full-stack e-commerce boilerplate with authentication and payments.',
      technologies: ['Angular', 'Express', 'PostgreSQL'],
      category: 'Full-stack',
      githubUrl: 'https://github.com/lukakikvidze/ecommerce-starter',
      liveUrl: 'https://shop.example.com',
      image: 'assets/images/project-3.svg'
    },
    {
      id: 'p4',
      title: 'Analytics Widgets',
      description: 'Reusable analytics widgets library with charts and maps.',
      technologies: ['Angular', 'D3.js'],
      category: 'Angular',
      githubUrl: 'https://github.com/lukakikvidze/analytics-widgets',
      liveUrl: 'https://analytics.example.com',
      image: 'assets/images/project-4.svg'
    },
    {
      id: 'p5',
      title: 'Blog Engine',
      description: 'Lightweight blog engine with SEO and sitemap.',
      technologies: ['PHP', 'SQLite'],
      category: 'PHP',
      githubUrl: 'https://github.com/lukakikvidze/blog-engine',
      liveUrl: 'https://blog.example.com',
      image: 'assets/images/project-5.svg'
    },
    {
      id: 'p6',
      title: 'Inventory App',
      description: 'Stock tracking system with role-based access control.',
      technologies: ['Angular', 'Firebase'],
      category: 'Full-stack',
      githubUrl: 'https://github.com/lukakikvidze/inventory-app',
      liveUrl: 'https://inventory.example.com',
      image: 'assets/images/project-6.svg'
    },
    {
      id: 'p7',
      title: 'Landing Kit',
      description: 'Collection of responsive landing page templates.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      category: 'Other',
      githubUrl: 'https://github.com/lukakikvidze/landing-kit',
      liveUrl: 'https://landing.example.com',
      image: 'assets/images/project-7.svg'
    }
  ];

  getAll() { return this.projects; }
  getByCategory(category?: string) {
    if (!category || category === 'All') return this.projects;
    return this.projects.filter(p => p.category === category);
  }
}