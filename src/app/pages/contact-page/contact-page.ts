import { Component, inject } from '@angular/core';

import { Language } from '../../services/language';

@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage {
  readonly language = inject(Language);
}
