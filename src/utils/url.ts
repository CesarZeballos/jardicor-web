import { site } from '../content/site';

/**
 * URL absoluta de una ruta del sitio. Sin barra final salvo la home.
 *
 * Vive en `utils` y no en un composable porque tambien la usa la configuracion
 * de Vite para escribir el sitemap, fuera del contexto de la aplicacion.
 */
export function absoluteUrl(path: string): string {
  return path === '/' ? `${site.origin}/` : `${site.origin}${path}`;
}
