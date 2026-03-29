import { Routes } from '@angular/router';
import { Accueil } from '../pages/accueil/accueil';
import { Editeur } from '../pages/editeur/editeur';
import { Telechargement } from '../pages/telechargement/telechargement';
import { NotFound } from '../pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'editeur', component: Editeur },
  { path: 'telechargement', component: Telechargement },
  { path: '**', component: NotFound },
];
