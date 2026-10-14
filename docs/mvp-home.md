# MVP de la home — estado y pendientes

Estado al 10 de octubre de 2026, rama `seo-configuration`.

El MVP es la **primera tanda**: home + `/contacto` (más `/gracias` y la 404). Servicios,
sectores, Trabajos y Nosotros siguen en `active: false` y no entran en este alcance.

---

## 1. Primera tanda: SEO técnico

### URL del sitio centralizada

- `VITE_SITE_URL` es la única fuente de la URL base: canonical, Open Graph, JSON-LD,
  sitemap y `robots.txt` salen de ahí. Hoy vale `https://jardicor-web.pages.dev`.
- Es obligatoria: sin ella fallan `yarn dev` y `yarn build`.
- Todas las URLs absolutas llevan barra final (`/contacto/`), coherente con
  `dirStyle: 'nested'`. Antes el canonical apuntaba a una URL que Cloudflare redirige.

### Bloqueo de indexación en `*.pages.dev`

- `public/_headers` manda `X-Robots-Tag: noindex` solo en los subdominios de
  Cloudflare. No afecta al dominio propio.
- `robots.txt` sigue con `Allow: /` para que Google pueda leer el `noindex`.

### Meta tags

- Se corrigió `<html lang>`: salía `en` (default de unhead) y Quasar lo pisaba con
  `en-US` al hidratar. Ahora es `es-AR` en el HTML estático y en el navegador.
- Se sumó `og:image` (1200×630) a todas las páginas indexables.
- Se ajustaron 8 meta descriptions al rango de 140–160 caracteres, sin tocar copy visible.

### Datos estructurados

- `LocalBusiness` con `logo`, `areaServed` (Córdoba Capital + zona norte) y `address`
  opcional: no se emite hasta tener un domicilio real.
- Imágenes nuevas desde la marca: `public/logo.png` (512×512) y `public/og-image.png`.

### Conversiones para GA4

- `gtag.js` se carga solo si existe `VITE_GA_ID`. Sin ID no se carga nada de Google.
- Eventos: `click_whatsapp`, `click_phone` (listener delegado: cualquier enlace nuevo
  queda medido solo) y `generate_lead` (con el OK de Web3Forms). Todos con `page_path`.

### Página `/gracias`

- `noindex`, fuera del sitemap y sin enlaces. El formulario navega ahí después de un
  envío confirmado. No dispara eventos al cargar.

### Ya estaba resuelto y se verificó

- Title, description, canonical y Open Graph en el HTML estático, únicos por página.
- JSON-LD `FAQPage` (desde los mismos datos del acordeón), `Service` y `BreadcrumbList`.
- Un solo H1 por página.
- Las páginas con `active: false` no se generan, no van al sitemap ni se enlazan.

---

## 2. Segunda tanda: auditoría del 6 de octubre

La auditoría (PageSpeed, Prueba de resultados enriquecidos, validador de schema.org y
revisión responsive) se hizo sobre el sitio publicado, que todavía no tenía la primera
tanda. Estos hallazgos ya estaban resueltos en la rama: `noindex` en `pages.dev`,
`<html lang>`, `/gracias` y canonical con el dominio provisorio. Pilar y sector dan 404
porque están en `active: false`: no son una falla del MVP.

### Rendimiento: CSS y fuentes que bloqueaban el render

PageSpeed móvil daba 91, con LCP de 2,9 s y ~1.050 ms de bloqueo de render.

- **CSS crítico con `beasties`.** `vite-ssg` lo usa solo si está instalado: inyecta en
  cada HTML el CSS del primer pantallazo y pasa la hoja completa al final del `body`.
  También precarga las fuentes que usa ese CSS. La hoja ya no bloquea el render.
- **Fuentes autoalojadas con `@fontsource`.** Outfit (500, 600) e IBM Plex Sans (400, 500,
  600), solo el subconjunto latino. Se sacó la hoja de Google Fonts, que sumaba ~750 ms
  y dos conexiones a otros dominios.
- El CSS sin usar (~29 KiB) sigue en la hoja, pero ya no bloquea. No se purga: Quasar
  arma clases de forma dinámica y el riesgo de romper estilos es alto.

### Textos internos fuera del sitio publicado

- Las marcas de trabajo —preguntas del FAQ con `pending: true` y la nota de foto
  faltante— se ven solo en `yarn dev` (`site.showPendingContent`). El build publica
  sin ellas, y el FAQ visible coincide con el JSON-LD.
- El FAQ "¿Tienen personal y máquinas propias?" ya tiene respuesta confirmada: personal
  y maquinaria propios, y alianza con Ducati para el equipamiento.
- Mientras falte la foto, el hero muestra el isotipo de Jardicor sobre la trama de
  curvas de nivel (`BrandMarkComponent`, extraído de `BrandLogoComponent`).

### Datos estructurados

- `LocalBusiness` suma `image` (provisoria: `og-image.png`). `address` sigue sin
  emitirse hasta tener el domicilio confirmado; `priceRange` no se emite.
- No se agregó `BreadcrumbList` a la home: una lista de un elemento no aporta nada.

### Botón flotante de WhatsApp

- `WhatsappFloatingButtonComponent`: `QPageSticky` abajo a la derecha con un `QBtn`
  redondo. Borde crema en lugar de sombra, para que se despegue también sobre paneles
  oscuros.
- No aparece en `/contacto` ni en `/gracias`, ni sin `VITE_WHATSAPP_PHONE`. El clic se
  mide con el listener de `click_whatsapp`.

### Corrección de paso

- Cloudflare sirve `/contacto/` con barra y el router la conserva, así que el CTA de la
  barra de navegación dejaba de apuntar a `#contacto` en esa página. Se compara ahora
  con `normalizePath()` (`utils/url.ts`).

---

## 3. Lo que falta para cerrar el MVP

### Bloqueantes de contenido (necesitan al cliente)

| Pendiente                 | Por qué bloquea                                                                                                                  | Dónde se cambia                                     |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| **Foto real del hero**    | Hoy el hero muestra el isotipo de forma provisoria. La foto también pasa a ser el LCP y la `image` de `LocalBusiness`.           | `heroImage.src` en `src/content/home.ts`            |
| **WhatsApp Business**     | Los botones abren `351 306 0922` y el teléfono publicado es `351 392 3565`. Hay que confirmar que la diferencia sea intencional. | `VITE_WHATSAPP_PHONE`                               |
| **Domicilio verificable** | `LocalBusiness` sale sin `address`.                                                                                              | `address` en `src/content/site.ts`                  |
| **Razón social y CUIT**   | `LocalBusiness` sale sin `legalName` / `taxID`.                                                                                  | `localBusiness()` en `src/composables/useJsonLd.ts` |

### Para revisar con el cliente

- **FAQ "¿Trabajan en nuestra zona?"** nombra barrios sueltos (Cerro de las Rosas, Urca,
  Villa Belgrano, Argüello…), sin atarlos a un segmento comercial. Choca con la regla de
  no atraer búsquedas residenciales, y además entra al JSON-LD `FAQPage`. Como es copy
  validado, no se tocó: hay que decidir con el cliente si se reformula.

### Configuración y despliegue

- [ ] Cargar en Cloudflare Pages: `VITE_SITE_URL`, `VITE_WHATSAPP_PHONE`,
      `VITE_WEB3FORMS_KEY` y, cuando exista, `VITE_GA_ID`. Sin `VITE_SITE_URL` el
      deploy falla.
- [ ] Confirmar que la access key de Web3Forms apunta a la casilla correcta.
- [ ] Probar un envío real del formulario de punta a punta: llega el correo, navega a
      `/gracias` y, con GA activo, se registra `generate_lead` una sola vez.
- [ ] Verificar en el deploy que `_headers` aplica: `curl -I https://jardicor-web.pages.dev`
      tiene que devolver `X-Robots-Tag: noindex`.
- [ ] Repetir la auditoría sobre el deploy: PageSpeed móvil de la home y `/contacto`,
      Prueba de resultados enriquecidos y `/gracias/` respondiendo 200 con `noindex`.

### Dominio propio (cuando se contrate)

- [ ] Conectar el dominio en Cloudflare Pages.
- [ ] Cambiar `VITE_SITE_URL` en `.env` y en Cloudflare, y redeployar.
- [ ] Revisar que canonical, `og:url`, JSON-LD y `sitemap.xml` usen el dominio nuevo.

### Medición

- [ ] Crear la propiedad de GA4 y cargar `VITE_GA_ID`.
- [ ] Marcar `generate_lead`, `click_whatsapp` y `click_phone` como eventos clave en GA4.
- [ ] Dar de alta el dominio en Search Console y enviar `sitemap.xml`.
- [ ] Validar la home con la Prueba de resultados enriquecidos de Google
      (`LocalBusiness` y `FAQPage`).

### Control de calidad final

- [ ] `yarn build` sin errores y revisión visual contra `design/home-render.png`.
- [ ] Lighthouse en mobile sobre la home (rendimiento, accesibilidad y SEO), con la foto
      real del hero ya cargada.
- [ ] Probar en Safari de iPhone y en un Android real, incluido el botón flotante.
- [ ] Probar la vista previa al compartir la URL (WhatsApp, LinkedIn) para confirmar
      `og:image`.

### Limpieza menor (no bloquea)

- `showSuccessToast` y el mensaje de éxito de `ContactService` quedaron sin uso desde
  que el envío navega a `/gracias`.
