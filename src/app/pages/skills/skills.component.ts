import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

interface Skill {
  name: string;
  level: number;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  skills: Skill[] = [
    { name: 'Angular', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'PHP', level: 70 },
    { name: 'MySQL', level: 75 },
    { name: 'CSS', level: 75 },
    { name: 'HTML', level: 95 }
  ];

  getBadgeClass(level: number): string {
    if (level >= 90) return 'expert';
    if (level >= 80) return 'advanced';
    if (level >= 70) return 'proficient';
    if (level >= 60) return 'intermediate';
    return 'beginner';
  }

  trackBySkill(index: number, skill: Skill): string | number {
    return skill.name || index;
  }
}
