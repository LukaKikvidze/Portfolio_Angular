import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { fadeInUp } from '../../shared/animations';
import { RevealDirective } from '../../shared/reveal.directive';

interface Skill { name: string; level: number; }

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor, RevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  animations: [fadeInUp]
})
export class SkillsComponent {
  skills: Skill[] = [
    { name: 'Angular', level: 90 },
    { name: 'HTML', level: 95 },
    { name: 'CSS', level: 90 },
    { name: 'JavaScript', level: 90 },
    { name: 'SQL', level: 70 },
    { name: 'Python', level: 75 },
    { name: 'Django', level: 65 },
    { name: 'C++', level: 60 },
    { name: 'PHP', level: 70 },
    { name: 'Git', level: 85 }
  ];
  constructor(private seo: SeoService){
    this.seo.setMeta({ title: 'Skills | Luka Kikvidze', description: 'Technical skills: Angular, HTML, CSS, JavaScript, SQL, Python, Django, C++, PHP, Git.'});
  }
}
