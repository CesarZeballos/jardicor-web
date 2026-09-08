import { Sector } from '../commons/interfaces/content';

/**
 * Las seis paginas de sector. No van al menu principal: se entra por Google, y
 * la unica senal de navegacion que tienen son los enlaces del footer. Por eso
 * `linkText` carga la busqueda en vez de repetir el nombre del sector.
 *
 * Publicacion por tandas (jardicor-decisiones-home.md). Primera tanda:
 * Empresas y corporativos · Barrios cerrados y desarrollos · Estudios de
 * arquitectura y paisajismo. Para escalonar el lanzamiento alcanza con poner
 * `active: false` en las otras tres: salen del router, del footer y del sitemap.
 */
export const sectors: Sector[] = [
  {
    slug: 'empresas-y-corporativos',
    name: 'Empresas y corporativos',
    linkText: 'Mantenimiento para empresas',
    description:
      'Oficinas, comercios, clínicas, concesionarias e instituciones que necesitan tercerizar el mantenimiento',
    icon: 'c-companies',
    h1: 'Mantenimiento de espacios verdes para empresas y corporativos en Córdoba',
    meta: {
      title: 'Mantenimiento de espacios verdes para empresas | Jardicor',
      description:
        'Mantenimiento tercerizado de espacios verdes para oficinas, comercios, clínicas e instituciones en Córdoba. Alcance por escrito y facturación en regla.',
      path: '/sectores/empresas-y-corporativos',
      priority: 0.7,
    },
    active: false,
  },
  {
    slug: 'barrios-cerrados-y-desarrollos',
    name: 'Barrios cerrados y desarrollos',
    linkText: 'Mantenimiento para barrios cerrados',
    description: 'Grandes superficies con uso intensivo y espacios comunes',
    icon: 'c-neighborhoods',
    h1: 'Mantenimiento de espacios comunes en barrios cerrados y desarrollos',
    meta: {
      title: 'Mantenimiento para barrios cerrados en Córdoba | Jardicor',
      description:
        'Mantenimiento de espacios comunes en barrios cerrados y desarrollos de Córdoba: grandes superficies, uso intensivo y frecuencia programada.',
      path: '/sectores/barrios-cerrados-y-desarrollos',
      priority: 0.7,
    },
    active: false,
  },
  {
    slug: 'parques-industriales',
    name: 'Parques industriales',
    linkText: 'Mantenimiento para parques industriales',
    description: 'Perímetros, accesos, banquinas y franjas de control',
    icon: 'c-industrial',
    h1: 'Mantenimiento de espacios verdes en parques industriales',
    meta: {
      title: 'Mantenimiento para parques industriales en Córdoba | Jardicor',
      description:
        'Mantenimiento de perímetros, accesos, banquinas y franjas de control en parques industriales y predios logísticos de Córdoba.',
      path: '/sectores/parques-industriales',
      priority: 0.7,
    },
    active: false,
  },
  {
    slug: 'consorcios-y-administraciones',
    name: 'Consorcios y administraciones',
    linkText: 'Mantenimiento para consorcios',
    description: 'Presupuesto previsible y alcance definido',
    icon: 'c-buildings',
    h1: 'Mantenimiento de espacios verdes para consorcios y administraciones',
    meta: {
      title: 'Mantenimiento para consorcios en Córdoba | Jardicor',
      description:
        'Mantenimiento de espacios comunes para consorcios y administraciones de Córdoba. Presupuesto previsible, alcance definido y un responsable identificado.',
      path: '/sectores/consorcios-y-administraciones',
      priority: 0.7,
    },
    active: false,
  },
  {
    slug: 'municipios-y-comunas',
    name: 'Municipios y comunas',
    linkText: 'Mantenimiento para municipios',
    description: 'Plazas, parques, ingresos y predios públicos',
    icon: 'c-municipalities',
    h1: 'Mantenimiento de espacios verdes para municipios y comunas',
    meta: {
      title: 'Mantenimiento para municipios y comunas | Jardicor',
      description:
        'Mantenimiento de plazas, parques, ingresos y predios públicos para municipios y comunas de la provincia de Córdoba.',
      path: '/sectores/municipios-y-comunas',
      priority: 0.7,
    },
    active: false,
  },
  {
    slug: 'estudios-de-arquitectura-y-paisajismo',
    name: 'Estudios de arquitectura y paisajismo',
    linkText: 'Ejecución de obra para estudios',
    description:
      'Proyectos que necesitan un ejecutor que respete el criterio del autor',
    icon: 'c-studios',
    h1: 'Ejecución de obra de paisajismo para estudios de arquitectura',
    meta: {
      title: 'Ejecución de obra de paisajismo en Córdoba | Jardicor',
      description:
        'Ejecutamos proyectos de estudios de arquitectura y paisajismo en Córdoba respetando el criterio del autor: suelo, plantación, césped y terminaciones.',
      path: '/sectores/estudios-de-arquitectura-y-paisajismo',
      priority: 0.7,
    },
    active: false,
  },
];

export const activeSectors: Sector[] = sectors.filter(
  (sector) => sector.active,
);

export function findSector(slug: string): Sector | undefined {
  return activeSectors.find((sector) => sector.slug === slug);
}
