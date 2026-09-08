import { cpSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import { indexablePages, prerenderedRoutes } from './src/utils/siteMap';
import { absoluteUrl } from './src/utils/url';
import { site } from './src/content/site';

/*
 * Este archivo cumple el papel de `quasar.config.js` en un proyecto con el CLI de
 * Quasar. El CLI no se usa porque no genera sitios estaticos y este sitio existe
 * para ser indexado: el prerenderizado lo resuelve vite-ssg.
 */

const OUT_DIR = 'dist';

/** Ruta que se prerenderiza solo para producir el `404.html` del hosting. */
const NOT_FOUND_ROUTE = '/404';

const sassVariables = fileURLToPath(
  new URL('./src/css/quasar.variables.scss', import.meta.url),
);

/**
 * La mayoria de los hostings estaticos sirven `404.html` cuando no encuentran un
 * archivo. vite-ssg no lo genera solo: se prerenderiza la ruta `/404` —que cae en
 * el catch-all del router— y se mueve el HTML resultante a la raiz.
 */
function moveNotFoundPage(): void {
  cpSync(join(OUT_DIR, '404', 'index.html'), join(OUT_DIR, '404.html'));
  // La carpeta se borra para que la 404 no quede accesible como una pagina mas.
  rmSync(join(OUT_DIR, '404'), { recursive: true, force: true });
}

function writeSitemap(): void {
  const today = new Date().toISOString().slice(0, 10);
  const urls = indexablePages
    .map(
      (page) =>
        '  <url>\n' +
        `    <loc>${absoluteUrl(page.path)}</loc>\n` +
        `    <lastmod>${today}</lastmod>\n` +
        `    <priority>${page.priority.toFixed(1)}</priority>\n` +
        '  </url>',
    )
    .join('\n');

  writeFileSync(
    join(OUT_DIR, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );

  // El footer es la unica via de acceso a las paginas de sector: el sitemap
  // refuerza esa senal para que Google las rastree bien.
  writeFileSync(
    join(OUT_DIR, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`,
  );
}

export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    // Quasar entra solo como libreria de componentes: los campos del formulario.
    // El resto del sistema visual es CSS propio sobre `src/css/app.scss`.
    //
    // `runMode: 'ssr-client'` es lo que hace que Quasar hidrate el HTML del build
    // en vez de volver a montar la pagina de cero. Se registra una sola vez: los
    // hooks de configuracion de un plugin son globales al build, asi que dos
    // instancias —una por entorno— terminan pisandose las banderas y el cliente
    // se queda sin hidratar. El entorno de servidor se corrige con `define`.
    //
    // `astAutoImport: false` no es opcional: con la via de AST (el default) el
    // plugin emite un import por cada USO del componente en vez de uno por
    // componente, y el bundle no compila —`Identifier _component_q_btn has
    // already been declared`— apenas una pagina usa dos `<q-btn>`. La via basada
    // en regex deduplica bien. El costo es que los source maps del template son
    // menos exactos.
    quasar({ sassVariables, runMode: 'ssr-client', astAutoImport: false }),
  ],

  environments: {
    ssr: {
      // Unica diferencia con el cliente: durante el prerenderizado no hay
      // navegador. Sin esto, Quasar ejecuta codigo de `window` dentro de Node.
      define: { __QUASAR_SSR_SERVER__: true, __QUASAR_SSR_CLIENT__: false },
      // Quasar tiene que entrar al bundle del servidor para que esas banderas se
      // reemplacen. Si queda externalizada, Node carga el fuente crudo y falla.
      resolve: { noExternal: ['quasar'] },
    },
  },

  // Mismos alias que expone el CLI de Quasar, para que los imports se escriban
  // igual que en el resto de los proyectos.
  resolve: {
    alias: {
      src: fileURLToPath(new URL('./src', import.meta.url)),
      app: fileURLToPath(new URL('.', import.meta.url)),
      components: fileURLToPath(new URL('./src/components', import.meta.url)),
      layouts: fileURLToPath(new URL('./src/layouts', import.meta.url)),
      pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
      boot: fileURLToPath(new URL('./src/boot', import.meta.url)),
      assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
      stores: fileURLToPath(new URL('./src/stores', import.meta.url)),
    },
  },

  build: { outDir: OUT_DIR },

  server: {
    port: 5173,
  },

  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    // Una carpeta por ruta con su index.html: URLs limpias sin depender de reglas
    // de reescritura del hosting.
    dirStyle: 'nested',
    // Las rutas de servicio y de sector son dinamicas: el crawler no las descubre
    // solo, hay que enumerarlas.
    includedRoutes: () => [...prerenderedRoutes, NOT_FOUND_ROUTE],
    onFinished: () => {
      moveNotFoundPage();
      writeSitemap();
    },
  },
});
