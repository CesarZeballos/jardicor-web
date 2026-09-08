import { RouteRecordRaw } from 'vue-router';
import { SimplePage } from 'src/commons/interfaces/content';
import {
  aboutPage,
  contactPage,
  servicesPage,
  worksPage,
} from 'src/content/pages';
import { activeServices } from 'src/content/services';
import { activeSectors } from 'src/content/sectors';

/**
 * Las URLs son las del mapa del sitio validado y van en espanol: son parte del
 * contenido indexable, no del codigo. Los archivos y carpetas, en cambio, siguen
 * la convencion en ingles del resto del proyecto.
 *
 * Una pagina con `active: false` no llega a entrar al router.
 */
const simplePages: { page: SimplePage; component: () => Promise<unknown> }[] = [
  {
    page: servicesPage,
    component: () => import('pages/services/ServicesPage.vue'),
  },
  { page: worksPage, component: () => import('pages/works/WorksPage.vue') },
  { page: aboutPage, component: () => import('pages/about/AboutPage.vue') },
  {
    page: contactPage,
    component: () => import('pages/contact/ContactPage.vue'),
  },
];

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/home/HomePage.vue'),
    name: 'home',
  },
  ...(simplePages
    .filter(({ page }) => page.active)
    .map(({ page, component }) => ({
      path: page.meta.path,
      component,
      name: page.meta.path,
    })) as RouteRecordRaw[]),
  // Una ruta para las paginas de servicio y otra para las de sector: el
  // contenido lo resuelve el slug contra los archivos de `content/`. Sin ningun
  // item activo la ruta no se registra, asi el slug cae en el catch-all y
  // devuelve la 404 en vez de una pagina sin contenido.
  ...(activeServices.length
    ? [
        {
          path: '/servicios/:slug',
          component: () => import('pages/services/ServiceDetailPage.vue'),
          name: 'service-detail',
        },
      ]
    : []),
  ...(activeSectors.length
    ? [
        {
          path: '/sectores/:slug',
          component: () => import('pages/sectors/SectorPage.vue'),
          name: 'sector',
        },
      ]
    : []),
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    name: 'not-found',
  },
];

export default routes;
