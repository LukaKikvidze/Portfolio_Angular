import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly projects: Project[] = [
    {
      id: 'p1',
      title: 'Georgian Metal',
      description: 'Company Website',
      technologies: ['Angular', 'TypeScript', 'Vite', 'Node'],
      category: 'Angular',
      githubUrl: 'https://github.com/lukakikvidze/',
      liveUrl: 'https://georgiametal.ge/',
      image: 'assets/images/project-1.svg'
    },
    {
      id: 'p2',
      title: 'Georgian Metal 2',
      description: 'Company second Webiste',
      technologies: ['React', 'Vite',],
      category: 'Other',
      githubUrl: 'https://github.com/lukakikvidze/',
      liveUrl: 'https://lasttest12.netlify.app/',
      image: 'assets/images/project-2.svg'
    },
    {
      id: 'p3',
      title: 'Tourmart',
      description: 'Full-stack with authentication and payments.',
      technologies: ['React', 'Vite', 'PHP', 'MySQL'],
      category: 'Full-stack',
      githubUrl: 'https://github.com/lukakikvidze/',
      liveUrl: 'https://tourmart.netlify.app/',
      image: 'assets/images/project-3.svg'
    },
    {
      id: 'p4',
      title: 'Pubg Account Buy-Sell',
      description: 'Only Front',
      technologies: ['React', 'Vite'],
      category: 'Other',
      githubUrl: 'https://github.com/lukakikvidze/',
      liveUrl: 'https://startling-rugelach-3f9a7c.netlify.app/',
      image: 'assets/images/project-4.svg'
    },
    {
      id: 'p5',
      title: 'Total Oil Energy',
      description: 'Company Website',
      technologies: ['Angular', 'Vite', 'TypeScript', 'Hosting'],
      category: 'Angular',
      githubUrl: 'https://github.com/lukakikvidze/',
      liveUrl: 'https://www.totaloilenergy.com/',
      image: 'assets/images/project-5.svg'
    },
    {
      id: 'p6',
      title: 'Dynamia',
      description: 'Start-up Project with my Group',
      technologies: ['React', 'Vite'],
      category: 'Other',
      githubUrl: 'https://github.com/lukakikvidze/',
      liveUrl: 'https://dynamoagency.netlify.app/',
      image: 'assets/images/project-6.svg'
    },
    // {
    //   id: 'p7',
    //   title: 'Landing Kit',
    //   description: 'Collection of responsive landing page templates.',
    //   technologies: ['HTML', 'CSS', 'JavaScript'],
    //   category: 'Other',
    //   githubUrl: 'https://github.com/lukakikvidze/landing-kit',
    //   liveUrl: 'https://landing.example.com',
    //   image: 'assets/images/project-7.svg'
    // }
  ];

  getAll() { return this.projects; }
  getByCategory(category?: string) {
    if (!category || category === 'All') return this.projects;
    return this.projects.filter(p => p.category === category);
  }
}