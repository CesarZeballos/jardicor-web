/** Identificador de un simbolo del sprite (`components/shared/IconSpriteComponent.vue`). */
export type IconId = string;

export interface ContactData {
  phone: string;
  /** Version del telefono apta para `href="tel:"`. */
  phoneLink: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  serviceArea: string;
}

export interface SiteData {
  name: string;
  tagline: string;
  shortDescription: string;
  /** Origen sin barra final. Se usa para canonical, Open Graph y sitemap. */
  origin: string;
  contact: ContactData;
  /**
   * Numero de WhatsApp en formato internacional sin signos, para `wa.me`.
   * Sale de `VITE_WHATSAPP_PHONE`. Si la variable no esta, ningun boton de
   * WhatsApp se renderiza.
   */
  whatsapp: string;
  /** Mensaje con el que se abre el chat. Se puede pisar por llamada. */
  whatsappMessage: string;
  /**
   * Access key de Web3Forms, el servicio que recibe el formulario de contacto y
   * lo reenvia por correo. Sale de `VITE_WEB3FORMS_KEY`. Si la variable no esta,
   * el formulario valida pero no envia.
   */
  web3formsKey: string;
}
