import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type LanguageCode = 'es' | 'en';

const STORAGE_KEY = 'serpec-language';

const TRANSLATIONS = {
  es: {
    header: {
      logoAlt: 'Logo de Serpec Ingenieros S.A.S',
      switchLanguage: 'English',
      switchAria: 'Cambiar idioma a inglés',
      nav: {
        home: 'Inicio',
        about: 'Nosotros',
        contact: 'Contacto',
        projects: 'Proyectos',
      },
    },
    home: {
      hero: {
        eyebrow: 'Ingeniería, operación y control en campo',
        title: 'Serpec Ingenieros S.A.S',
        description:
          'Acompañamos proyectos técnicos con planeación, personal especializado y seguimiento responsable en cada etapa de ejecución.',
        contactAction: 'Hablar con el equipo',
        servicesAction: 'Ver servicios',
      },
      services: {
        kicker: 'Qué hacemos',
        title: 'Soluciones para proyectos de ingeniería',
        cards: [
          {
            title: 'Planeación técnica',
            description:
              'Organizamos recursos, tiempos y requerimientos para que cada proyecto avance con una ruta clara desde el inicio.',
          },
          {
            title: 'Ejecución en campo',
            description:
              'Coordinamos actividades operativas con personal capacitado, supervisión directa y enfoque en cumplimiento.',
          },
          {
            title: 'Control y seguimiento',
            description:
              'Revisamos avances, documentamos procesos y mantenemos comunicación constante para tomar decisiones a tiempo.',
          },
        ],
      },
      trust: {
        kicker: 'Nuestra forma de trabajar',
        title: 'Orden técnico, responsabilidad y presencia en obra',
        description:
          'En Serpec Ingenieros S.A.S trabajamos con una visión práctica: entender las necesidades del proyecto, coordinar al equipo adecuado y responder con seriedad durante la ejecución.',
        steps: [
          {
            number: '01',
            title: 'Diagnóstico claro',
            description: 'Levantamos información del proyecto para definir prioridades y alcance.',
          },
          {
            number: '02',
            title: 'Coordinación constante',
            description: 'Mantenemos comunicación entre área administrativa, campo y cliente.',
          },
          {
            number: '03',
            title: 'Cumplimiento en sitio',
            description: 'Ejecutamos con seguimiento, orden y control de las actividades pactadas.',
          },
        ],
      },
      cta: {
        title: 'Conversemos sobre tu próximo proyecto',
        description:
          'Nuestro equipo puede orientarte sobre el alcance, la ejecución y el soporte que necesita tu obra o servicio técnico.',
        action: 'Ir a contacto',
      },
    },
    about: {
      title: 'Nosotros',
      description:
        'Serpec Ingenieros S.A.S acompaña proyectos técnicos con planeación, ejecución responsable y seguimiento en campo.',
    },
    projects: {
      title: 'Proyectos',
      description:
        'Aquí podrás presentar obras, servicios técnicos y experiencias ejecutadas por Serpec Ingenieros S.A.S.',
    },
    contactPage: {
      kicker: 'Contacto',
      title: 'Habla con Serpec Ingenieros S.A.S',
      intro:
        'Estamos listos para revisar tus necesidades, coordinar información técnica y orientar el siguiente paso de tu proyecto.',
      team: [
        {
          role: 'Jefe administrativa',
          name: 'Yolanda Perico',
          description:
            'Espacio para agregar una breve descripción sobre su rol, experiencia o responsabilidades dentro de Serpec Ingenieros S.A.S.',
        },
        {
          role: 'Jefe de campo',
          name: 'Jesus Serrano',
          description:
            'Espacio para agregar una breve descripción sobre su trabajo en campo, coordinación operativa o experiencia técnica.',
        },
      ],
      form: {
        namePlaceholder: 'Tu nombre',
        emailPlaceholder: 'Tu correo',
        messagePlaceholder: 'Cuéntanos sobre tu proyecto',
        submit: 'Enviar mensaje',
      },
    },
    shared: {
      simpleHero: {
        title: 'Bienvenido a mi página web',
        description:
          'Esta es una página hecha con Angular, pensada para aprender la estructura básica de una aplicación web moderna.',
        action: 'Conoce más',
      },
      services: {
        title: 'Mis servicios',
        cards: [
          {
            title: 'Diseño web',
            description: 'Creación de páginas modernas, limpias y adaptadas a cualquier pantalla.',
          },
          {
            title: 'Desarrollo frontend',
            description: 'Construcción de interfaces usando Angular, HTML, CSS y TypeScript.',
          },
          {
            title: 'Soporte tecnico',
            description: 'Ayuda para mejorar, corregir o mantener sitios y aplicaciones web.',
          },
        ],
      },
      contact: {
        title: 'Contacto',
        description: 'Escríbeme para trabajar juntos en tu próximo proyecto.',
        form: {
          namePlaceholder: 'Tu nombre',
          emailPlaceholder: 'Tu correo',
          messagePlaceholder: 'Tu mensaje',
          submit: 'Enviar',
        },
      },
    },
    footer: {
      copyright: '© 2026 Mi Página. Todos los derechos reservados.',
    },
  },
  en: {
    header: {
      logoAlt: 'Serpec Ingenieros S.A.S logo',
      switchLanguage: 'Español',
      switchAria: 'Switch language to Spanish',
      nav: {
        home: 'Home',
        about: 'About',
        contact: 'Contact',
        projects: 'Projects',
      },
    },
    home: {
      hero: {
        eyebrow: 'Engineering, operations and field control',
        title: 'Serpec Ingenieros S.A.S',
        description:
          'We support technical projects with planning, specialized personnel and responsible follow-up at every execution stage.',
        contactAction: 'Talk to the team',
        servicesAction: 'View services',
      },
      services: {
        kicker: 'What we do',
        title: 'Solutions for engineering projects',
        cards: [
          {
            title: 'Technical planning',
            description:
              'We organize resources, timelines and requirements so each project moves forward with a clear path from the start.',
          },
          {
            title: 'Field execution',
            description:
              'We coordinate operational activities with trained personnel, direct supervision and a focus on delivery.',
          },
          {
            title: 'Control and follow-up',
            description:
              'We review progress, document processes and keep communication active so decisions can be made on time.',
          },
        ],
      },
      trust: {
        kicker: 'How we work',
        title: 'Technical order, responsibility and on-site presence',
        description:
          'At Serpec Ingenieros S.A.S we work with a practical view: understanding project needs, coordinating the right team and responding seriously during execution.',
        steps: [
          {
            number: '01',
            title: 'Clear diagnosis',
            description: 'We gather project information to define priorities and scope.',
          },
          {
            number: '02',
            title: 'Constant coordination',
            description: 'We keep communication active between administration, field teams and clients.',
          },
          {
            number: '03',
            title: 'On-site delivery',
            description: 'We execute with follow-up, order and control over the agreed activities.',
          },
        ],
      },
      cta: {
        title: 'Let us talk about your next project',
        description:
          'Our team can guide you on the scope, execution and support your construction work or technical service needs.',
        action: 'Go to contact',
      },
    },
    about: {
      title: 'About us',
      description:
        'Serpec Ingenieros S.A.S supports technical projects with planning, responsible execution and field follow-up.',
    },
    projects: {
      title: 'Projects',
      description:
        'Use this space to present construction work, technical services and completed experiences by Serpec Ingenieros S.A.S.',
    },
    contactPage: {
      kicker: 'Contact',
      title: 'Talk to Serpec Ingenieros S.A.S',
      intro:
        'We are ready to review your needs, coordinate technical information and guide the next step of your project.',
      team: [
        {
          role: 'Administrative manager',
          name: 'Yolanda Perico',
          description:
            'Space to add a short description of her role, experience or responsibilities at Serpec Ingenieros S.A.S.',
        },
        {
          role: 'Field manager',
          name: 'Jesus Serrano',
          description:
            'Space to add a short description of his field work, operational coordination or technical experience.',
        },
      ],
      form: {
        namePlaceholder: 'Your name',
        emailPlaceholder: 'Your email',
        messagePlaceholder: 'Tell us about your project',
        submit: 'Send message',
      },
    },
    shared: {
      simpleHero: {
        title: 'Welcome to my website',
        description:
          'This is a page built with Angular, designed to learn the basic structure of a modern web application.',
        action: 'Learn more',
      },
      services: {
        title: 'My services',
        cards: [
          {
            title: 'Web design',
            description: 'Creation of modern, clean pages adapted to any screen.',
          },
          {
            title: 'Frontend development',
            description: 'Building interfaces with Angular, HTML, CSS and TypeScript.',
          },
          {
            title: 'Technical support',
            description: 'Help improving, fixing or maintaining websites and web applications.',
          },
        ],
      },
      contact: {
        title: 'Contact',
        description: 'Write to me so we can work together on your next project.',
        form: {
          namePlaceholder: 'Your name',
          emailPlaceholder: 'Your email',
          messagePlaceholder: 'Your message',
          submit: 'Send',
        },
      },
    },
    footer: {
      copyright: '© 2026 My Page. All rights reserved.',
    },
  },
} as const;

@Injectable({
  providedIn: 'root'
})
export class Language {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly selectedLanguage = signal<LanguageCode>(this.getInitialLanguage());

  readonly code = this.selectedLanguage.asReadonly();
  readonly copy = computed(() => TRANSLATIONS[this.selectedLanguage()]);

  constructor() {
    effect(() => {
      const language = this.selectedLanguage();
      this.document.documentElement.lang = language;

      try {
        this.getStorage()?.setItem(STORAGE_KEY, language);
      } catch {
        // Some environments expose localStorage but block access to it.
      }
    });
  }

  setLanguage(language: LanguageCode): void {
    this.selectedLanguage.set(language);
  }

  toggleLanguage(): void {
    this.selectedLanguage.update((language) => (language === 'es' ? 'en' : 'es'));
  }

  private getInitialLanguage(): LanguageCode {
    const storedLanguage = this.getStorage()?.getItem(STORAGE_KEY);

    return storedLanguage === 'en' ? 'en' : 'es';
  }

  private getStorage(): Storage | undefined {
    if (!isPlatformBrowser(this.platformId) || typeof globalThis.localStorage === 'undefined') {
      return undefined;
    }

    return globalThis.localStorage;
  }
}
