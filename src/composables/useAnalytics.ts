import { site } from 'src/content/site';

/** Eventos de conversion que el sitio le manda a GA4. */
export type ConversionEvent =
  'generate_lead' | 'click_whatsapp' | 'click_phone';

interface ConversionParams {
  /** Pagina desde donde se disparo la conversion. */
  page_path: string;
}

type GtagCommand =
  | ['js', Date]
  | ['config', string]
  | ['event', ConversionEvent, ConversionParams];

declare global {
  interface Window {
    /** Cola de `gtag.js`. Espera el objeto `arguments`, no un array. */
    dataLayer?: IArguments[];
    gtag?: (...command: GtagCommand) => void;
  }
}

const GTAG_URL = 'https://www.googletagmanager.com/gtag/js';

/** Enlaces que abren un chat de WhatsApp, con o sin la app instalada. */
const WHATSAPP_HOSTS = ['wa.me', 'api.whatsapp.com'];

function conversionForLink(href: string): ConversionEvent | null {
  if (href.startsWith('tel:')) return 'click_phone';
  if (href.startsWith('whatsapp:')) return 'click_whatsapp';

  try {
    const { hostname } = new URL(href, window.location.href);
    return WHATSAPP_HOSTS.includes(hostname) ? 'click_whatsapp' : null;
  } catch {
    return null;
  }
}

/**
 * Medicion de GA4. Todo es no-op mientras no haya `VITE_GA_ID`: sin la variable
 * no se carga nada de Google y ningun llamado falla.
 */
export default function useAnalytics() {
  /** Inyecta `gtag.js`. Se llama una sola vez, desde `boot/01-analytics.ts`. */
  function loadAnalytics(): void {
    if (!site.gaId || window.gtag) return;

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag() {
      // `gtag.js` solo procesa el objeto `arguments`: un array con los mismos
      // valores queda en la cola y nunca se envia.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', site.gaId);

    const script = document.createElement('script');
    script.async = true;
    script.src = `${GTAG_URL}?id=${site.gaId}`;
    document.head.appendChild(script);
  }

  function trackEvent(name: ConversionEvent): void {
    window.gtag?.('event', name, { page_path: window.location.pathname });
  }

  /**
   * Listener delegado para `document`: mide cualquier enlace `tel:` o de
   * WhatsApp, incluidos los que se sumen despues, sin tocar cada componente.
   */
  function trackContactClick(event: MouseEvent): void {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest('a[href]');
    const href = link?.getAttribute('href');
    if (!href) return;

    const conversion = conversionForLink(href);
    if (conversion) trackEvent(conversion);
  }

  return {
    loadAnalytics,
    trackEvent,
    trackContactClick,
  };
}
