import { Notify, QNotifyCreateOptions } from 'quasar';

/**
 * Boton de accion de un aviso. Se pasa tal cual a un `QBtn`, asi que va como
 * enlace real —con `href`— y no como manejador: funciona con clic del medio,
 * muestra el destino al pasar por encima y no depende de JavaScript propio.
 */
export interface ToastAction {
  label: string;
  href: string;
  target: string;
  rel: string;
  /** Engancha el evento de conversion cuando entre GA4. */
  'data-event': string;
}

/** Cuanto queda en pantalla un aviso que se cierra solo, en milisegundos. */
const SUCCESS_TIMEOUT = 7000;

/** Tipografia de los botones de accion. Es la misma que usa Notify en el mensaje. */
const ACTION_FONT_SIZE = '14px';

/** Opciones que comparten todos los avisos del sitio. */
const BASE_OPTIONS: QNotifyCreateOptions = {
  position: 'top',
};

/**
 * Cierre del aviso en pantalla, o `null` si no hay ninguno.
 *
 * Vive en el modulo, no en el composable, porque la regla es "un aviso a la
 * vez" en toda la aplicacion: si el estado fuera de cada llamada a `useToast`,
 * dos componentes distintos no se coordinarian. Solo se escribe desde el
 * navegador —un aviso nace de una interaccion— asi que el prerenderizado nunca
 * lo toca.
 */
let dismissCurrent: (() => void) | null = null;

/**
 * Muestra un aviso y descarta el anterior.
 *
 * Sin esto los avisos se apilan: tres envios fallidos dejan tres carteles
 * superpuestos, cada uno con su boton de WhatsApp.
 */
function replaceCurrent(options: QNotifyCreateOptions): void {
  dismissCurrent?.();
  dismissCurrent = Notify.create({ ...BASE_OPTIONS, ...options });
}

/**
 * Avisos de la aplicacion. Unico lugar que habla con `Notify`: el resto del
 * sitio pide un exito o un fallo y no decide ni color, ni posicion, ni duracion.
 *
 * Los colores salen del sistema (`css/quasar.variables.scss`), no de la paleta
 * por defecto de Quasar. El exito va con el verde de marca a fondo pleno. El
 * fallo, en cambio, se resuelve como todo lo demas en este sitio: con borde, no
 * con color plano —el fondo es el crema de la pagina y el rojo `alert-600`
 * queda como acento en el borde—. Un cartel rojo entero grita mas fuerte de lo
 * que el problema amerita. Los dos combinan texto y fondo a 5,9:1, sobre el
 * minimo AA.
 */
export default function useToast() {
  function showSuccessToast(message: string): void {
    replaceCurrent({
      message,
      color: 'primary',
      textColor: 'on-action',
      timeout: SUCCESS_TIMEOUT,
      progress: true,
    });
  }

  /**
   * El aviso de fallo NO se cierra solo: lleva un boton de accion y desaparecer
   * mientras alguien lo va a tocar es peor que quedarse. Se cierra con "Cerrar".
   *
   * Ese boton va como una accion mas y no con la opcion `closeBtn` de Notify,
   * que arma su `QBtn` sin `no-caps` y lo deja en mayusculas.
   */
  function showErrorToast(message: string, actions: ToastAction[] = []): void {
    replaceCurrent({
      message,
      color: 'background',
      textColor: 'content',
      classes: 'border-alert-600 border-thick',
      timeout: 0,
      // Con accion el texto necesita su propia linea: si no, el boton lo aprieta.
      multiLine: actions.length > 0,
      // Los botones acompanan al mensaje en vez de taparlo: `dense` les saca el
      // alto de 48px del sistema y `size` iguala su tipografia a la del texto.
      // Va en pixeles y no en `sm`, que los deja en 10px contra los 14 del
      // mensaje y se pasa para el otro lado.
      actions: [...actions, { label: 'Cerrar' }].map((action) => ({
        ...action,
        flat: true,
        dense: true,
        noCaps: true,
        // Sin esto "Enviar por WhatsApp" se parte en dos lineas y el boton mide
        // el doble de alto que el de al lado.
        noWrap: true,
        size: ACTION_FONT_SIZE,
        color: 'content',
      })),
    });
  }

  return { showSuccessToast, showErrorToast };
}
