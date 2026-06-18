import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { ContactPage } from './pages/contact-page/contact-page';
import { Proyectos } from './pages/proyectos/proyectos';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'nosotros', component: About },
  { path: 'contacto', component: ContactPage },
  { path: 'proyectos', component: Proyectos },
  { path: '**', redirectTo: '' }
];
