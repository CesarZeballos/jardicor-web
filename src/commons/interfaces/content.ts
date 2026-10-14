import { IconId } from './site';

/** Lo comun a toda pagina indexable: lo que necesita el `<head>` y el sitemap. */
export interface PageMeta {
  /** Contenido del `<title>`. Unico por pagina: compite por una busqueda distinta. */
  title: string;
  description: string;
  /** Ruta absoluta del sitio, con barra inicial y sin barra final. */
  path: string;
  /**
   * Prioridad relativa dentro del sitemap. La pagina pilar va mas alto que las
   * de sector, que apenas tienen enlaces entrantes.
   */
  priority: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  /**
   * Marca una respuesta que todavia no esta confirmada por el cliente. No entra
   * al JSON-LD: seria afirmarle a Google algo que no sabemos.
   */
  pending?: boolean;
}

export interface Service {
  slug: string;
  /** Etiqueta corta, para nav y footer. */
  name: string;
  /** Titulo visible de la fila en la home. Puede diferir del nombre. */
  title: string;
  h1: string;
  summary: string;
  icon: IconId;
  meta: PageMeta;
  /** Interruptor de publicacion. Una pagina inactiva no entra al router ni al sitemap. */
  active: boolean;
}

export interface Sector {
  slug: string;
  name: string;
  /**
   * Texto del enlace del footer. Carga la busqueda a proposito: es de las pocas
   * senales que van a tener estas paginas.
   */
  linkText: string;
  description: string;
  icon: IconId;
  h1: string;
  meta: PageMeta;
  active: boolean;
}

export interface SimplePage {
  name: string;
  h1: string;
  meta: PageMeta;
  active: boolean;
}

/**
 * Pagina fuera del indice: se prerenderiza con `noindex` y no entra al sitemap
 * ni a ningun enlace del sitio. Por eso no lleva `PageMeta`.
 */
export interface NoIndexPage {
  title: string;
  /** Ruta absoluta del sitio, con barra inicial y sin barra final. */
  path: string;
  h1: string;
  lead: string;
  homeLinkLabel: string;
}

export interface Pillar {
  title: string;
  text: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  text: string;
}

/**
 * Nodo del esquema de cobertura. Ningun nombre de zona aparece solo: siempre
 * amarrado a su segmento comercial, para no atraer consulta residencial.
 */
export interface CoverageNode {
  area: string;
  segment: string;
  /** Centro del nodo en el `viewBox` 1200x380 del esquema. */
  x: number;
  y: number;
  /**
   * Linea de base de cada etiqueta, absoluta. No se deriva de `y` con un
   * desplazamiento fijo: las posiciones estan ajustadas una por una para que
   * ninguna etiqueta cruce el arco ni pise a su vecina.
   */
  areaY: number;
  segmentY: number;
  /** El nodo se dibuja lleno y mas grande: es el foco comercial. */
  highlighted?: boolean;
}

export interface HeroImage {
  /** Ruta del archivo. `null` mientras no exista el material fotografico real. */
  src: string | null;
  alt: string;
  /** Que foto tiene que ir aca. Se muestra en el slot mientras falte el material. */
  note: string;
}

export interface HomeSection {
  label?: string;
  title: string;
  lead?: string;
}

/** Aviso de privacidad que se abre junto al boton de envio del formulario. */
export interface PrivacyNotice {
  /** Nombre accesible del boton que abre el aviso. */
  buttonLabel: string;
  paragraphs: string[];
}
