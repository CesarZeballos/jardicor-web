import { SimplePage } from '../commons/interfaces/content';

/**
 * Paginas secundarias que todavia no tienen diseno: por ahora solo su H1, su
 * meta y su lugar en el router y el sitemap. El contenido entra despues sin
 * mover la estructura.
 *
 * PRIMERA TANDA (landing): el cliente lanza con la home sola mas `/contacto`.
 * Servicios, Trabajos y Nosotros quedan en `active: false` hasta tener su
 * diseno; volver a `true` las devuelve al router, al footer y al sitemap.
 */
export const servicesPage: SimplePage = {
  name: 'Servicios',
  h1: 'Servicios de mantenimiento, parquización y obra verde en Córdoba',
  meta: {
    title: 'Servicios de espacios verdes en Córdoba | Jardicor',
    description:
      'Mantenimiento, parquización, riego, poda e infraestructura complementaria para empresas, consorcios y predios industriales en Córdoba.',
    path: '/servicios',
    priority: 0.8,
  },
  active: false,
};

export const worksPage: SimplePage = {
  name: 'Trabajos',
  h1: 'Trabajos de mantenimiento y obra verde realizados por Jardicor',
  meta: {
    title: 'Trabajos realizados | Jardicor',
    description:
      'Predios, barrios cerrados y espacios corporativos donde Jardicor ejecuta mantenimiento y obra verde en Córdoba.',
    path: '/trabajos',
    priority: 0.5,
  },
  // Fuera de la primera tanda: ademas del diseno, espera material fotografico
  // real. Pasar a `true` la devuelve al router, al footer y al sitemap.
  active: false,
};

export const aboutPage: SimplePage = {
  name: 'Nosotros',
  h1: 'Jardicor, constructora verde en Córdoba',
  meta: {
    title: 'Quiénes somos | Jardicor · Constructora Verde',
    description:
      'Jardicor gestiona, construye y mantiene espacios verdes para empresas, consorcios y predios industriales en la zona norte de Córdoba.',
    path: '/nosotros',
    priority: 0.5,
  },
  active: false,
};

export const contactPage: SimplePage = {
  name: 'Contacto',
  h1: 'Solicitá un relevamiento técnico sin costo',
  meta: {
    title: 'Contacto y relevamiento técnico | Jardicor',
    description:
      'Contanos qué predio necesitás mantener y coordinamos una visita. El relevamiento no tiene costo y respondemos dentro del mismo día hábil.',
    path: '/contacto',
    priority: 0.7,
  },
  active: true,
};

export const simplePages: SimplePage[] = [
  servicesPage,
  worksPage,
  aboutPage,
  contactPage,
];
