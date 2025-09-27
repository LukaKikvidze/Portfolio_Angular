import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { LightboxComponent } from '../../components/lightbox/lightbox.component';
import { SeoService } from '../../services/seo.service';
import { listStagger, fadeInUp } from '../../shared/animations';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, NgIf, ProjectCardComponent, LightboxComponent, RevealDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  animations: [listStagger, fadeInUp]
})
export class ProjectsComponent {
  categories = ['All','Angular','PHP','Full-stack','Other'];
  selected = signal('All');
  previewSrc = signal<string|undefined>(undefined);

  constructor(private svc: ProjectsService, private seo: SeoService){
    this.seo.setMeta({ title: 'Projects | Luka Kikvidze', description: 'Showcase of Angular, PHP, and Full‑stack projects by Luka Kikvidze.'});
  }

  get projects(): Project[] { return this.svc.getByCategory(this.selected()); }
}
