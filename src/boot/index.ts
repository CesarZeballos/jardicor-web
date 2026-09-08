import { App } from 'vue';
import { Router } from 'vue-router';

/**
 * Los boot files corren una sola vez, antes de que la aplicacion se monte, y en
 * el orden en que estan listados aca. Es el mismo mecanismo que usa el CLI de
 * Quasar; como el build lo maneja Vite, el orquestador es `main.ts`.
 */
export interface BootContext {
  app: App;
  router: Router;
  /** `false` durante el prerenderizado del build. */
  isClient: boolean;
}

export type BootCallback = (context: BootContext) => void;

export function boot(callback: BootCallback): BootCallback {
  return callback;
}
