import { Component, inject } from '@angular/core';

import { Language } from '../../services/language';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  readonly language = inject(Language);
}
