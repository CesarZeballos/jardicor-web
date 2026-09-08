import { Service } from '../commons/interfaces/content';

/**
 * Las seis paginas de servicio. Cada una compite por una busqueda distinta, asi
 * que cada una lleva su propio titulo, descripcion y H1.
 *
 * `active: false` saca la pagina del router, del footer y del sitemap sin tocar
 * ningun componente.
 */
export const services: Service[] = [
  {
    slug: 'mantenimiento-de-espacios-verdes',
    name: 'Mantenimiento de espacios verdes',
    title: 'Mantenimiento de espacios verdes',
    h1: 'Mantenimiento de espacios verdes para empresas, consorcios y predios industriales en Córdoba',
    summary:
      'Corte, desmalezado, bordeado y limpieza con frecuencia programada. Contratos mensuales con alcance definido y un responsable a cargo, en oficinas, comercios, predios industriales, barrios cerrados y grandes superficies.',
    icon: 's-maintenance',
    meta: {
      // No repite el title de la home a proposito: las dos apuntan a la misma
      // keyword y dos titles identicos se canibalizan. La home se queda con la
      // busqueda amplia; esta baja al segmento.
      title:
        'Mantenimiento de espacios verdes para empresas y consorcios | Jardicor',
      description:
        'Contratos de mantenimiento de espacios verdes para empresas, consorcios y predios industriales en Córdoba. Frecuencia programada y alcance por escrito.',
      path: '/servicios/mantenimiento-de-espacios-verdes',
      // Pagina pilar: la que tiene que rankear para la keyword principal del sitio.
      priority: 0.9,
    },
    active: false,
  },
  {
    slug: 'parquizacion-y-obra-verde',
    name: 'Parquización y obra verde',
    title: 'Parquización y obra verde',
    h1: 'Parquización y ejecución de obra verde en Córdoba',
    summary:
      'Ejecutamos proyectos de paisajismo de principio a fin: suelo, plantación, césped y terminaciones. Trabajamos con estudios de arquitectura y paisajismo que necesitan un ejecutor confiable.',
    icon: 's-landscaping',
    meta: {
      title: 'Parquización y obra verde en Córdoba | Jardicor',
      description:
        'Ejecución de proyectos de parquización y obra verde en Córdoba: suelo, plantación, césped y terminaciones para desarrollos, predios y estudios de paisajismo.',
      path: '/servicios/parquizacion-y-obra-verde',
      priority: 0.8,
    },
    active: false,
  },
  {
    slug: 'riego-y-eficiencia-hidrica',
    name: 'Riego y eficiencia hídrica',
    title: 'Riego y eficiencia hídrica',
    h1: 'Sistemas de riego y eficiencia hídrica en grandes superficies',
    summary:
      'Instalación, sectorización y automatización de sistemas. También revisamos y optimizamos instalaciones existentes para bajar el consumo en grandes superficies.',
    icon: 's-irrigation',
    meta: {
      title: 'Riego y eficiencia hídrica en Córdoba | Jardicor',
      description:
        'Instalación, sectorización y automatización de sistemas de riego en Córdoba. Optimización de instalaciones existentes para bajar el consumo de agua.',
      path: '/servicios/riego-y-eficiencia-hidrica',
      priority: 0.8,
    },
    active: false,
  },
  {
    slug: 'poda-y-arbolado',
    name: 'Poda y arbolado',
    title: 'Poda y arbolado',
    // Sin "podamos tu arbol": el copy evita a proposito la busqueda residencial.
    h1: 'Poda programada y control de arbolado en predios y espacios comunes',
    summary:
      'Poda de formación y de mantenimiento, despeje de luminarias y tendidos, control preventivo del arbolado y disposición de los residuos generados.',
    icon: 's-pruning',
    meta: {
      title: 'Poda y arbolado en predios y espacios comunes | Jardicor',
      description:
        'Poda programada de arbolado en predios, corredores y espacios comunes de Córdoba. Despeje de luminarias y tendidos, con disposición de residuos verdes.',
      path: '/servicios/poda-y-arbolado',
      priority: 0.8,
    },
    active: false,
  },
  {
    slug: 'infraestructura-complementaria',
    name: 'Infraestructura complementaria',
    title: 'Infraestructura complementaria',
    h1: 'Infraestructura complementaria para espacios verdes y predios',
    summary:
      'Gaviones, muros de contención, adoquinado, losetas cribadas, nivelación y preparación de terreno.',
    icon: 's-infrastructure',
    meta: {
      title: 'Gaviones, adoquinado y nivelación de terreno | Jardicor',
      description:
        'Gaviones, muros de contención, adoquinado, losetas cribadas, nivelación y movimiento de suelo dentro del mismo contrato de mantenimiento.',
      path: '/servicios/infraestructura-complementaria',
      priority: 0.6,
    },
    active: false,
  },
  {
    slug: 'servicios-complementarios',
    name: 'Servicios complementarios',
    // El titulo de la fila en la home vende el beneficio, no la categoria.
    title: 'Un solo proveedor para todo el predio',
    h1: 'Servicios complementarios: un solo proveedor para todo el predio',
    summary:
      'Retiro y gestión de residuos verdes y reciclables, puesta a punto de espacios degradados, provisión de plantas y macetas, césped sintético y pequeñas obras de mejora. Todo dentro del mismo contrato.',
    icon: 's-site',
    meta: {
      title: 'Servicios complementarios para predios | Jardicor',
      description:
        'Retiro de residuos verdes, puesta a punto de espacios degradados, provisión de plantas, césped sintético y obras de mejora dentro del mismo contrato.',
      path: '/servicios/servicios-complementarios',
      priority: 0.6,
    },
    active: false,
  },
];

export const activeServices: Service[] = services.filter(
  (service) => service.active,
);

export function findService(slug: string): Service | undefined {
  return activeServices.find((service) => service.slug === slug);
}
