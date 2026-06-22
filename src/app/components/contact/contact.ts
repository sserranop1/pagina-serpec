import { Component, inject } from '@angular/core';

import { Language } from '../../services/language';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  readonly language = inject(Language);
}
