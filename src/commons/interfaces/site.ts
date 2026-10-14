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

/** Domicilio verificable del negocio, tal como lo pide `PostalAddress` de schema.org. */
export interface BusinessAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
}

export interface SiteData {
  name: string;
  tagline: string;
  shortDescription: string;
  /**
   * Origen sin barra final. Sale de `VITE_SITE_URL` y se usa para canonical,
   * Open Graph y JSON-LD. El sitemap lo lee aparte, desde `vite.config.ts`.
   */
  origin: string;
  /** Imagen de Open Graph (1200x630), ruta absoluta dentro de `public/`. */
  ogImage: string;
  /** Logo del negocio para el JSON-LD, ruta absoluta dentro de `public/`. */
  logo: string;
  /**
   * Domicilio para el JSON-LD de `LocalBusiness`. `null` mientras no haya un dato
   * real: el bloque se emite sin `address` en vez de con un valor de ejemplo.
   */
  address: BusinessAddress | null;
  contact: ContactData;
  /**
   * Numero de WhatsApp en formato internacional sin signos, para `wa.me`.
   * Sale de `VITE_WHATSAPP_PHONE`. Si la variable no esta, ningun boton de
   * WhatsApp se renderiza.
   */
  whatsapp: string;
  /** Mensaje con el que se abre el chat. Se puede pisar por llamada. */
  whatsappMessage: string;
  /** Nombre accesible del boton flotante, que solo muestra el icono. */
  whatsappFloatingLabel: string;
  /**
   * Access key de Web3Forms, el servicio que recibe el formulario de contacto y
   * lo reenvia por correo. Sale de `VITE_WEB3FORMS_KEY`. Si la variable no esta,
   * el formulario valida pero no envia.
   */
  web3formsKey: string;
  /**
   * ID de medicion de GA4. Sale de `VITE_GA_ID`. Si la variable no esta, no se
   * carga `gtag.js` y los eventos de conversion no hacen nada.
   */
  gaId: string;
  /**
   * Muestra las marcas de trabajo —respuestas del FAQ sin confirmar, la nota de
   * foto faltante—. Solo en `yarn dev`: el build publica sin ellas.
   */
  showPendingContent: boolean;
}
