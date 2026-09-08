import { Plugin } from 'vue';
import { Notify, Quasar } from 'quasar';
import { boot } from './index';

/** Forma minima del contexto de SSR que espera el install de Quasar. */
interface QuasarSsrContext {
  req: { headers: Record<string, string> };
  res: { setHeader: () => void };
}

/** Opciones del install: solo la lista de plugins de Quasar que usa el sitio. */
interface QuasarOptions {
  plugins: { Notify: typeof Notify };
}

type QuasarPlugin = Plugin<[QuasarOptions, QuasarSsrContext | undefined]>;

/**
 * Quasar entra solo como libreria de componentes: los campos del formulario de
 * contacto y los avisos de envio. El resto del sistema visual es CSS propio
 * sobre `css/app.scss`.
 *
 * `Notify` es el unico plugin instalado. Ningun componente lo llama directo: el
 * unico que lo usa es `composables/useToast.ts`, que le fija la posicion, los
 * colores del sistema y cuanto dura cada aviso.
 *
 * En el prerenderizado Quasar espera el `ssrContext` que normalmente le pasa su
 * propio servidor: escribe ahi los meta tags y lee el user-agent para detectar
 * plataforma. Como el HTML lo genera vite-ssg, le damos un contexto minimo —
 * nadie lo lee despues, solo evita que el install reviente.
 */
export default boot(({ app, isClient }) => {
  const ssrContext: QuasarSsrContext | undefined = isClient
    ? undefined
    : {
        req: { headers: { 'user-agent': '' } },
        res: { setHeader: () => undefined },
      };

  // El tercer argumento no esta en los tipos publicos de Quasar: lo usa su propio
  // servidor de SSR, que aca no existe.
  app.use(
    Quasar as unknown as QuasarPlugin,
    { plugins: { Notify } },
    ssrContext,
  );
});
