import { site } from 'src/content/site';

/**
 * Arma y abre el chat de WhatsApp con un mensaje precargado.
 *
 * El numero sale de `VITE_WHATSAPP_PHONE` (ver `.env.example`). Si no esta
 * cargado, `hasWhatsapp` es false y `buildWhatsappLink` devuelve null: los
 * botones no se renderizan en vez de dejar un enlace que no lleva a nada.
 */
export default function useWhatsapp() {
  const hasWhatsapp = Boolean(site.whatsapp);

  /**
   * URL de `wa.me` para poner en un `href`. Es la forma preferida sobre
   * `openWhatsapp`: un enlace real funciona con clic del medio, muestra el
   * destino al pasar por encima y anda aunque el JavaScript no haya hidratado.
   */
  function buildWhatsappLink(
    message: string = site.whatsappMessage,
  ): string | null {
    if (!site.whatsapp) return null;

    const query = message ? `?text=${encodeURIComponent(message)}` : '';
    return `https://wa.me/${site.whatsapp}${query}`;
  }

  /** Abre el chat desde codigo, para cuando no hay un `<a>` de por medio. */
  function openWhatsapp(message: string = site.whatsappMessage): void {
    if (!site.whatsapp) return;

    const text = encodeURIComponent(message);
    const webLink = `https://wa.me/${site.whatsapp}?text=${text}`;
    // Safari no abre wa.me con `window.open`: hay que mandarlo por el esquema
    // propio de la aplicacion.
    const appLink = `whatsapp://send?phone=${site.whatsapp}&text=${text}`;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
      window.location.href = appLink;
      return;
    }

    window.open(webLink, '_blank', 'noopener');
  }

  return {
    hasWhatsapp,
    buildWhatsappLink,
    openWhatsapp,
  };
}
