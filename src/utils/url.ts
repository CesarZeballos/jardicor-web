import { site } from '../content/site';

/**
 * URL absoluta de una ruta, siempre con barra final.
 *
 * La barra no es estetica: el build deja una carpeta por ruta con su
 * `index.html` (`dirStyle: 'nested'`) y Cloudflare Pages redirige `/contacto` a
 * `/contacto/`. Un canonical sin barra apuntaria a una URL que redirige.
 *
 * Recibe el origen por parametro porque `vite.config.ts` la usa desde Node, donde
 * `site.origin` llega vacio: ahi el valor sale de `loadEnv`.
 */
export function buildAbsoluteUrl(origin: string, path: string): string {
  return path.endsWith('/') ? `${origin}${path}` : `${origin}${path}/`;
}

/**
 * Ruta sin barra final, en el formato de `PageMeta.path`. Hace falta para comparar
 * contra `route.path`: Cloudflare sirve `/contacto/` y el router conserva la barra.
 */
export function normalizePath(path: string): string {
  return path.replace(/\/+$/, '') || '/';
}

/** URL absoluta de una ruta del sitio, dentro de la aplicacion. */
export function absoluteUrl(path: string): string {
  return buildAbsoluteUrl(site.origin, path);
}
