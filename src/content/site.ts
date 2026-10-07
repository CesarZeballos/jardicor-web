import { SiteData } from '../commons/interfaces/site';

/**
 * Datos institucionales del sitio. Unico lugar donde viven telefono, correo y
 * dominio: ningun componente los escribe a mano.
 *
 * PENDIENTES DEL CLIENTE (documento de arranque, punto 3.7):
 * · TODO: razon social, CUIT y domicilio verificable para completar el JSON-LD.
 *   El domicilio va en `address`, abajo; hasta entonces no se emite.
 * · confirmar que el numero de `VITE_WHATSAPP_PHONE` sea el WhatsApp Business
 * · access key de Web3Forms en `VITE_WEB3FORMS_KEY`, con la casilla donde se
 *   quieren recibir las consultas
 * · dominio definitivo: cambiar `VITE_SITE_URL` en `.env` y en Cloudflare Pages
 */
export const site: SiteData = {
  name: 'Jardicor · Constructora Verde',
  tagline: 'Constructora Verde',
  shortDescription:
    'Gestión, obra y mantenimiento de espacios verdes en Córdoba.',
  // Hoy apunta a `*.pages.dev`, provisorio hasta conectar el dominio.
  origin: (import.meta.env?.VITE_SITE_URL ?? '').replace(/\/+$/, ''),
  ogImage: '/og-image.png',
  logo: '/logo.png',
  // TODO: domicilio verificable del cliente. No cargar uno de ejemplo.
  address: null,
  contact: {
    phone: '+54 351 392 3565',
    phoneLink: '+543513923565',
    email: 'jardicorespaciosverdes@gmail.com',
    instagram: '@jardicordoba',
    instagramUrl: 'https://instagram.com/jardicordoba',
    serviceArea: 'Zona norte de Córdoba y alrededores',
  },
  // `import.meta.env` se lee con acceso opcional porque este modulo tambien lo
  // carga `vite.config.ts` para escribir el sitemap, y ahi corre en Node, donde
  // esa propiedad no existe. Sin la guarda, el build muere antes de empezar.
  // Vale para todas las variables de entorno de este archivo.
  whatsapp: import.meta.env?.VITE_WHATSAPP_PHONE ?? '',
  whatsappMessage:
    'Hola, quiero solicitar un relevamiento técnico para un predio en Córdoba.',
  web3formsKey: import.meta.env?.VITE_WEB3FORMS_KEY ?? '',
  gaId: import.meta.env?.VITE_GA_ID ?? '',
};
