import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home | Luka Kikvidze', data: { animation: 'Home' } },
  { path: 'about', component: AboutComponent, title: 'About | Luka Kikvidze', data: { animation: 'About' } },
  { path: 'projects', component: ProjectsComponent, title: 'Projects | Luka Kikvidze', data: { animation: 'Projects' } },
  { path: 'skills', component: SkillsComponent, title: 'Skills | Luka Kikvidze', data: { animation: 'Skills' } },
  { path: 'contact', component: ContactComponent, title: 'Contact | Luka Kikvidze', data: { animation: 'Contact' } },
  { path: '**', redirectTo: '' }
];
