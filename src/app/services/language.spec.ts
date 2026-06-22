import { TestBed } from '@angular/core/testing';

import { Language } from './language';

describe('Language', () => {
  let service: Language;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Language);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should switch between Spanish and English copy', () => {
    service.setLanguage('es');

    expect(service.copy().header.nav.home).toBe('Inicio');

    service.toggleLanguage();

    expect(service.code()).toBe('en');
    expect(service.copy().header.nav.home).toBe('Home');
  });
});
