import { useHead } from '@unhead/vue';
import { FaqItem } from 'src/commons/interfaces/content';
import {
  BreadcrumbListJsonLd,
  FaqPageJsonLd,
  JsonLdGraph,
  JsonLdNode,
  LocalBusinessJsonLd,
  ServiceJsonLd,
} from 'src/commons/interfaces/jsonLd';
import { site } from 'src/content/site';
import { absoluteUrl } from 'src/utils/url';

/** Ancla del negocio. Todo `Service` referencia este mismo nodo. */
export const BUSINESS_ID = `${site.origin}/#jardicor`;

export default function useJsonLd() {
  /**
   * PENDIENTE DEL CLIENTE: faltan razon social, CUIT y domicilio verificable para
   * completar el bloque (`legalName`, `address`, `taxID`). El domicilio se carga
   * en `site.address`; mientras sea `null`, el bloque sale sin `address`.
   */
  function localBusiness(): LocalBusinessJsonLd {
    const node: LocalBusinessJsonLd = {
      '@type': 'LocalBusiness',
      '@id': BUSINESS_ID,
      name: site.name,
      description:
        'Mantenimiento y parquización de espacios verdes para empresas, consorcios y predios industriales en Córdoba.',
      url: `${site.origin}/`,
      logo: `${site.origin}${site.logo}`,
      telephone: site.contact.phone.replace(/\s/g, ''),
      email: site.contact.email,
      areaServed: [
        { '@type': 'City', name: 'Córdoba Capital' },
        { '@type': 'Place', name: 'Zona norte de Córdoba' },
      ],
      knowsAbout: [
        'Mantenimiento de espacios verdes',
        'Parquización y obra verde',
        'Riego y eficiencia hídrica',
        'Poda y arbolado',
      ],
      sameAs: [site.contact.instagramUrl],
    };

    if (site.address) {
      node.address = {
        '@type': 'PostalAddress',
        ...site.address,
        addressCountry: 'AR',
      };
    }

    return node;
  }

  /**
   * Las preguntas marcadas como pendientes quedan fuera: el marcado le afirma a
   * Google algo como definitivo, y esa respuesta todavia no esta confirmada.
   */
  function faqPage(items: FaqItem[]): FaqPageJsonLd {
    return {
      '@type': 'FAQPage',
      mainEntity: items
        .filter((item) => !item.pending)
        .map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
    };
  }

  function service(data: {
    name: string;
    description: string;
    path: string;
  }): ServiceJsonLd {
    return {
      '@type': 'Service',
      name: data.name,
      description: data.description,
      url: absoluteUrl(data.path),
      serviceType: data.name,
      provider: { '@id': BUSINESS_ID },
      areaServed: [{ '@type': 'City', name: 'Córdoba' }],
    };
  }

  function breadcrumbs(
    links: { name: string; path: string }[],
  ): BreadcrumbListJsonLd {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: links.map((link, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: link.name,
        item: absoluteUrl(link.path),
      })),
    };
  }

  /** Inyecta el grafo en el `<head>`. Queda en el HTML prerenderizado, sin hidratacion. */
  function applyJsonLd(nodes: JsonLdNode[]) {
    const graph: JsonLdGraph = {
      '@context': 'https://schema.org',
      '@graph': nodes,
    };
    useHead({
      script: [
        { type: 'application/ld+json', innerHTML: JSON.stringify(graph) },
      ],
    });
  }

  return {
    localBusiness,
    faqPage,
    service,
    breadcrumbs,
    applyJsonLd,
  };
}
