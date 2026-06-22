import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Language } from '../../services/language';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly language = inject(Language);
}
