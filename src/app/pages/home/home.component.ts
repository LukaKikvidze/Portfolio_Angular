import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { fadeInUp, fadeIn } from '../../shared/animations';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [fadeInUp, fadeIn]
})
export class HomeComponent {
  constructor(private seo: SeoService){
    this.seo.setMeta({ title: 'Luka Kikvidze | Angular Developer', description: 'Hi, I’m Luka, Angular Developer. Explore my projects, skills, and get in touch.' });
  }
}
