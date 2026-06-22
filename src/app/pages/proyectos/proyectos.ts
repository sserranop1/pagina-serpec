import { Component, inject } from '@angular/core';

import { Language } from '../../services/language';

@Component({
  selector: 'app-proyectos',
  imports: [],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css',
})
export class Proyectos {
  readonly language = inject(Language);
}
