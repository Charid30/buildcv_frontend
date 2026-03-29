import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface Experience {
  poste: string;
  entreprise: string;
  dates: string;
  description: string;
}

export interface Formation {
  diplome: string;
  etablissement: string;
  dates: string;
}

export interface Langue {
  langue: string;
  niveau: string;
}

export interface DonneesCV {
  prenom: string;
  nom: string;
  titreProfessionnel: string;
  email: string;
  telephone: string;
  ville: string;
  linkedin: string;
  profil: string;
  experiences: Experience[];
  formations: Formation[];
  competences: string[];
  langues: Langue[];
  interets: string;
  couleur: string;
}

@Injectable({ providedIn: 'root' })
export class CvService {
  private readonly apiUrl = environment.apiUrl;

  donneesCV = signal<DonneesCV | null>(null);
  nomFichier = signal<string>('');

  constructor(private http: HttpClient) {}

  setDonnees(data: DonneesCV) {
    this.donneesCV.set(data);
    this.nomFichier.set(`cv-${data.prenom.toLowerCase()}-${data.nom.toLowerCase()}.pdf`);
  }

  generer(data: DonneesCV) {
    return this.http.post(`${this.apiUrl}/cv`, data, {
      responseType: 'blob',
    });
  }
}
