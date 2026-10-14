import { ViteSSG } from 'vite-ssg';

// Las hojas de estilo van antes que los componentes a proposito: los imports se
// evaluan en orden, y asi la capa base queda por debajo de los estilos de cada
// componente. Al reves, una regla de base con la misma especificidad le ganaria
// a la del componente por ser posterior en la cascada.
// Fuentes autoalojadas, solo el subconjunto latino (cubre tildes y ene) y los
// pesos que usa el sistema. Antes venian de Google Fonts: una hoja externa que
// bloqueaba el render ~750 ms en movil y dos conexiones a otros dominios.
import '@fontsource/ibm-plex-sans/latin-400.css';
import '@fontsource/ibm-plex-sans/latin-500.css';
import '@fontsource/ibm-plex-sans/latin-600.css';
import '@fontsource/outfit/latin-500.css';
import '@fontsource/outfit/latin-600.css';
import './css/quasar-core.sass';
import './css/app.scss';

import App from './App.vue';
import routerOptions from './router';
import { BootCallback } from './boot';
import quasarBoot from './boot/00-quasar';
import analyticsBoot from './boot/01-analytics';

/** Orden de ejecucion de los boot files. Importa: correr uno antes que otro cambia
 *  que tiene disponible el siguiente. */
const bootFiles: BootCallback[] = [quasarBoot, analyticsBoot];

export const createApp = ViteSSG(
  App,
  routerOptions,
  ({ app, router, isClient }) => {
    bootFiles.forEach((run) => run({ app, router, isClient }));
  },
);
