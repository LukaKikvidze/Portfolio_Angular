import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  skills = ['Angular','HTML','CSS','JavaScript','SQL','Python','Django','C++','PHP','Git'];
  constructor(private seo: SeoService){
    this.seo.setMeta({ title: 'About | Luka Kikvidze', description: 'About Luka Kikvidze – Angular Developer. Skills, certifications, and contact.'});
  }
}
