import { PageMeta } from '../commons/interfaces/content';
import { homeMeta } from '../content/home';
import { simplePages, thankYouPage } from '../content/pages';
import { services } from '../content/services';
import { sectors } from '../content/sectors';

/**
 * Todas las paginas indexables del sitio, en un solo lugar.
 *
 * Este modulo lo consumen dos cosas distintas: el router de la aplicacion y el
 * build (para saber que rutas prerenderizar y que meter en el sitemap). Por eso
 * no importa nada de Vue ni usa alias: tiene que poder cargarse tambien desde la
 * configuracion de Vite, fuera del contexto de la app.
 *
 * Una pagina con `active: false` desaparece de las tres: router, prerender y
 * sitemap. Es el mecanismo de publicacion por tandas.
 */
export const indexablePages: PageMeta[] = [
  homeMeta,
  ...simplePages.filter((page) => page.active).map((page) => page.meta),
  ...services
    .filter((service) => service.active)
    .map((service) => service.meta),
  ...sectors.filter((sector) => sector.active).map((sector) => sector.meta),
];

/**
 * Rutas que el build tiene que prerenderizar, en orden. Incluye `/gracias`, que
 * se genera con `noindex` pero no entra al sitemap: el sitemap lee
 * `indexablePages`, no esta lista.
 */
export const prerenderedRoutes: string[] = [
  ...indexablePages.map((page) => page.path),
  thankYouPage.path,
];
