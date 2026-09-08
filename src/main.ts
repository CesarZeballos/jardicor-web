import { ViteSSG } from 'vite-ssg';

// Las hojas de estilo van antes que los componentes a proposito: los imports se
// evaluan en orden, y asi la capa base queda por debajo de los estilos de cada
// componente. Al reves, una regla de base con la misma especificidad le ganaria
// a la del componente por ser posterior en la cascada.
import './css/quasar-core.sass';
import './css/app.scss';

import App from './App.vue';
import routerOptions from './router';
import { BootCallback } from './boot';
import quasarBoot from './boot/00-quasar';

/** Orden de ejecucion de los boot files. Importa: correr uno antes que otro cambia
 *  que tiene disponible el siguiente. */
const bootFiles: BootCallback[] = [quasarBoot];

export const createApp = ViteSSG(
  App,
  routerOptions,
  ({ app, router, isClient }) => {
    bootFiles.forEach((run) => run({ app, router, isClient }));
  },
);
