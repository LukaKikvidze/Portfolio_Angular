import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { fadeInUp } from '../../shared/animations';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgIf, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  animations: [fadeInUp]
})
export class ContactComponent {
  model = { name: '', email: '', message: '' };
  sending = false;
  sent = false;
  error = '';

  constructor(private seo: SeoService){
    this.seo.setMeta({ title: 'Contact | Luka Kikvidze', description: 'Contact Luka Kikvidze via email, LinkedIn, or phone. Download CV PDF.'});
  }

  async submit(){
    this.error = '';
    if(!this.model.name || !this.model.email || !this.model.message){ this.error = 'Please fill all fields.'; return; }
    try{
      this.sending = true;
      // Example: integrate EmailJS or your backend endpoint here.
      await new Promise(res=>setTimeout(res, 700));
      this.sent = true;
      this.model = { name: '', email: '', message: '' };
    }catch(e){
      this.error = 'Failed to send. Please try again later.';
    }finally{ this.sending = false; }
  }
}
