import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'app-telechargement',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './telechargement.html',
  styleUrl: './telechargement.scss',
})
export class Telechargement {
  constructor(public cvService: CvService) {}
}
