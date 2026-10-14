/**
 * Tipos minimos de schema.org: solo las propiedades que el sitio emite. No se
 * modela el vocabulario entero, pero tampoco se cae en un objeto sin forma.
 */

export interface PlaceJsonLd {
  '@type': 'City' | 'Place' | 'AdministrativeArea';
  name: string;
}

export interface PostalAddressJsonLd {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: 'AR';
}

export interface LocalBusinessJsonLd {
  '@type': 'LocalBusiness';
  '@id': string;
  name: string;
  description: string;
  url: string;
  logo: string;
  image: string;
  telephone: string;
  email: string;
  /** Solo se emite cuando hay un domicilio real cargado en `content/site.ts`. */
  address?: PostalAddressJsonLd;
  areaServed: PlaceJsonLd[];
  knowsAbout: string[];
  sameAs: string[];
}

export interface AnswerJsonLd {
  '@type': 'Answer';
  text: string;
}

export interface QuestionJsonLd {
  '@type': 'Question';
  name: string;
  acceptedAnswer: AnswerJsonLd;
}

export interface FaqPageJsonLd {
  '@type': 'FAQPage';
  mainEntity: QuestionJsonLd[];
}

export interface ServiceJsonLd {
  '@type': 'Service';
  name: string;
  description: string;
  url: string;
  serviceType: string;
  provider: { '@id': string };
  areaServed: PlaceJsonLd[];
}

export interface BreadcrumbItemJsonLd {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

export interface BreadcrumbListJsonLd {
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbItemJsonLd[];
}

export type JsonLdNode =
  LocalBusinessJsonLd | FaqPageJsonLd | ServiceJsonLd | BreadcrumbListJsonLd;

export interface JsonLdGraph {
  '@context': 'https://schema.org';
  '@graph': JsonLdNode[];
}
