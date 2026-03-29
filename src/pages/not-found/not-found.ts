import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="text-align:center; padding: 5rem 1rem;">
      <h1 style="font-size:4rem; color:#009A44; margin-bottom:1rem;">404</h1>
      <p style="color:#666; margin-bottom:2rem;">Page introuvable.</p>
      <a routerLink="/" class="btn-primary">← Retour à l'accueil</a>
    </div>
  `,
})
export class NotFound {}
