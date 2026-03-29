import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CvService, DonneesCV, Experience, Formation, Langue } from '../../services/cv.service';

@Component({
  selector: 'app-editeur',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editeur.html',
  styleUrl: './editeur.scss',
})
export class Editeur {
  erreur = signal<string | null>(null);
  chargement = signal(false);

  // Infos personnelles
  prenom = '';
  nom = '';
  titreProfessionnel = '';
  email = '';
  telephone = '';
  ville = '';
  linkedin = '';
  profil = '';

  // Expériences
  experiences: Experience[] = [{ poste: '', entreprise: '', dates: '', description: '' }];

  // Formations
  formations: Formation[] = [{ diplome: '', etablissement: '', dates: '' }];

  // Compétences (tableau de strings)
  competencesTexte = '';

  // Langues
  langues: Langue[] = [{ langue: '', niveau: '' }];

  // Intérêts
  interets = '';

  // Couleur du CV
  couleurSelectionnee = '#009A44';

  readonly paletteCouleursCV = [
    { hex: '#009A44', nom: 'Vert BF' },
    { hex: '#1565C0', nom: 'Bleu professionnel' },
    { hex: '#1A3C6E', nom: 'Bleu marine' },
    { hex: '#8B1A1A', nom: 'Bordeaux' },
    { hex: '#37474F', nom: 'Gris anthracite' },
    { hex: '#6A1B9A', nom: 'Violet élégant' },
    { hex: '#E65100', nom: 'Orange foncé' },
    { hex: '#00695C', nom: 'Vert canard' },
  ];

  readonly niveauxLangue = ['Débutant', 'Intermédiaire', 'Avancé', 'Courant', 'Langue maternelle'];

  get nomCouleurSelectionnee(): string {
    return this.paletteCouleursCV.find(c => c.hex === this.couleurSelectionnee)?.nom ?? '';
  }

  constructor(private router: Router, private cvService: CvService) {}

  ajouterExperience() {
    this.experiences = [...this.experiences, { poste: '', entreprise: '', dates: '', description: '' }];
  }

  supprimerExperience(i: number) {
    this.experiences = this.experiences.filter((_, idx) => idx !== i);
  }

  ajouterFormation() {
    this.formations = [...this.formations, { diplome: '', etablissement: '', dates: '' }];
  }

  supprimerFormation(i: number) {
    this.formations = this.formations.filter((_, idx) => idx !== i);
  }

  ajouterLangue() {
    this.langues = [...this.langues, { langue: '', niveau: '' }];
  }

  supprimerLangue(i: number) {
    this.langues = this.langues.filter((_, idx) => idx !== i);
  }

  trackByIndex(index: number): number {
    return index;
  }

  async generer() {
    this.erreur.set(null);

    if (!this.prenom.trim() || !this.nom.trim()) {
      this.erreur.set('Le prénom et le nom sont obligatoires.');
      return;
    }
    if (!this.email.trim() || !this.telephone.trim() || !this.ville.trim()) {
      this.erreur.set('Email, téléphone et ville sont obligatoires.');
      return;
    }

    const competences = this.competencesTexte
      .split(',')
      .map(c => c.trim())
      .filter(c => c.length > 0);

    const donnees: DonneesCV = {
      prenom: this.prenom.trim(),
      nom: this.nom.trim(),
      titreProfessionnel: this.titreProfessionnel.trim(),
      email: this.email.trim(),
      telephone: this.telephone.trim(),
      ville: this.ville.trim(),
      linkedin: this.linkedin.trim(),
      profil: this.profil.trim(),
      experiences: this.experiences.filter(e => e.poste.trim()),
      formations: this.formations.filter(f => f.diplome.trim()),
      competences,
      langues: this.langues.filter(l => l.langue.trim()),
      interets: this.interets.trim(),
      couleur: this.couleurSelectionnee,
    };

    this.chargement.set(true);
    this.cvService.setDonnees(donnees);

    this.cvService.generer(donnees).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cv-${donnees.prenom.toLowerCase()}-${donnees.nom.toLowerCase()}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        this.chargement.set(false);
        this.router.navigate(['/telechargement']);
      },
      error: (err) => {
        this.chargement.set(false);
        this.erreur.set(err?.error?.erreur || 'Une erreur est survenue. Veuillez réessayer.');
      },
    });
  }
}
