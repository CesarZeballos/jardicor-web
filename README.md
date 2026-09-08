# Jardicor · Sitio web

Sitio de Jardicor · Constructora Verde. Su objetivo es el posicionamiento en
buscadores para captar empresas, consorcios y predios industriales en Córdoba.

## Stack

| Capa                | Elección                                                            |
| ------------------- | ------------------------------------------------------------------- |
| Framework           | Vue 3 + Vite                                                        |
| Renderizado         | **SSG**: las 17 páginas se prerenderizan en el build con `vite-ssg` |
| Ruteo               | Vue Router, una URL indexable por página                            |
| Meta por página     | `@unhead/vue` (`src/seo/meta.ts`)                                   |
| Datos estructurados | JSON-LD propio (`src/seo/jsonld.ts`)                                |
| Componentes de UI   | Quasar vía `@quasar/vite-plugin`: campos del formulario y avisos    |
| Estilos             | SCSS propio sobre `src/css/quasar.variables.scss`                   |

**Por qué no el CLI de Quasar.** El sitio necesita SSG y el CLI de Quasar no lo
tiene: la extensión que lo daba (`quasar-app-extension-ssg`) quedó sin releases
desde mayo de 2024 y pide `@quasar/app-vite ^1`, dos majors atrás del actual.
Quasar entra entonces como librería de componentes con su plugin oficial de Vite,
y el prerenderizado lo resuelve `vite-ssg`.

Quasar en SSR necesita banderas de compilación que normalmente inyecta su propio
CLI (`__QUASAR_SSR_SERVER__` y compañía). Acá las pone su plugin de Vite con
`runMode: 'ssr-client'`, más un `define` para el entorno de servidor. El plugin se
registra **una sola vez**: sus hooks de configuración son globales al build, así
que dos instancias se pisan las banderas y el cliente se queda sin hidratar.

## Comandos

Este proyecto usa **yarn**, nunca `npm`.

```bash
yarn install
```

Copiar `.env.example` a `.env` y completarlo. Son dos variables:
`VITE_WHATSAPP_PHONE`, sin la cual los botones de WhatsApp no se renderizan, y
`VITE_WEB3FORMS_KEY`, sin la cual el formulario de contacto valida pero no
envía.

```bash
yarn dev
```

```bash
yarn build
```

`build` corre `vue-tsc` primero, después prerenderiza las 17 páginas y por último
escribe `sitemap.xml`, `robots.txt` y `404.html` en `dist/`. El resultado es
estático: se sirve sin servidor Node.

```bash
yarn preview
```

```bash
yarn lint
```

## Estructura

La organización sigue la de los otros proyectos de la organización: mismas carpetas,
mismos sufijos de archivo y mismos alias de import (`src/`, `components/`, `layouts/`,
`pages/`, `boot/`).

```
src/
├─ boot/          Corren antes de montar la app, en orden
├─ commons/       interfaces/ + inputsValidators.ts
├─ components/    buttons · inputs · sections · shared
├─ composables/   useSeo · useJsonLd · useWhatsapp · useToast
├─ content/       Todo el copy y la configuración de páginas
├─ css/           quasar.variables.scss + app.scss
├─ layouts/       MainLayout.vue (QLayout + QHeader + QPageContainer)
├─ pages/         Una carpeta por sección, componentes *Page.vue
├─ router/        index.ts (opciones) + routes.ts
├─ services/      ContactService.ts
└─ utils/         siteMap.ts · url.ts
```

## Layout

`MainLayout.vue` usa la composición de Quasar — `q-layout` › `q-header` +
`q-page-container` — y cada página es un `<q-page>`. Dos desvíos deliberados, los
dos por CLS: `q-header` lleva `height-hint` para que el HTML prerenderizado ya
traiga el `padding-top` definitivo, y el pie va como `<footer>` en el flujo en vez
de `q-footer`, que se posiciona fuera del flujo y haría saltar medio viewport al
hidratar.

Las páginas de contenido usan `<q-page padding>`; `app.scss` redefine
`.q-layout-padding` a la escala del sitio manteniendo su comportamiento responsive.

## Sistema visual

`src/css/quasar.variables.scss` es la configuración del sistema, no una lista de
colores: desde ahí Quasar genera la escala tipográfica (`$h1`…`$h6` estilizan los
tags **y** producen `.text-h1`…`.text-h6`), el espaciado (`$spaces` → `.q-pa-lg`,
`.q-mt-2xl`), los botones (`$button-*`) y los campos (`$field-*`).

En el markup no se escribe CSS para nada de eso: un título es `<h3 class="text-h4">`,
una separación es `q-mb-lg`, un color es `text-content-soft`. **Los componentes no
llevan `<style>`** — la composición de cada bloque vive en `src/css/app.scss`.

`app.scss` agrega lo que Quasar no da: las clases de color propias generadas desde
`$custom-colors`, y `.inv`, que redefine esas variables y se pinta a sí misma, así
que un panel oscuro es una sola clase en el markup.

⚠️ Dos cuidados al tocar esos archivos: `quasar.variables.scss` se inyecta antes que
las variables de Quasar, así que un nombre repetido le pisa las suyas; y en
`app.scss` nunca va el atajo `margin`, porque le gana a las utilidades `q-mt-*`.

## Publicación por tandas

Cada servicio, sector y página secundaria tiene un campo `active` en su archivo
de `src/content/`. Ponerlo en `false` saca la página del router, del footer y del
sitemap de una sola vez, sin tocar componentes ni diseño.

La primera tanda definida en `jardicor-decisiones-home.md` es Mantenimiento ·
Empresas y corporativos · Barrios cerrados y desarrollos · Estudios de
arquitectura y paisajismo. Hoy están las seis publicadas para poder desarrollarlas.

## Reglas de SEO que el código sostiene

- **Un H1 por página**, sin excepciones. Los encabezados del footer son `h2`.
- **Canonical y `<title>` únicos** por página. Ninguna repite el de otra.
- **Páginas de sector solo enlazadas desde el footer**, con el texto del enlace
  cargando la búsqueda (`Mantenimiento para consorcios`, no `Consorcios`), y
  presentes en el sitemap para que no queden huérfanas.
- **Las etiquetas del mapa de cobertura son texto real** dentro del SVG, nunca
  trazado. Y ningún nombre de barrio aparece suelto: siempre atado a su segmento
  comercial, para no atraer búsquedas residenciales.
- **El FAQ usa `<details>` nativo**, no un componente hidratado: el contenido
  está en el HTML inicial y no depende de JavaScript.
- Las respuestas del FAQ marcadas como `pendiente` no entran al JSON-LD.

## Pendientes que bloquean el lanzamiento

| Pendiente                        | Qué bloquea                                                     | Dónde se cambia                                     |
| -------------------------------- | --------------------------------------------------------------- | --------------------------------------------------- |
| WhatsApp Business                | El CTA de WhatsApp no se renderiza hasta que haya número        | `whatsapp` en `src/content/site.ts`                 |
| Access key de Web3Forms          | Sin la key el formulario valida pero no envía                   | `VITE_WEB3FORMS_KEY` en `.env`                      |
| Foto real del hero               | Se muestra el slot con la nota de material faltante             | `heroImage.src` en `src/content/home.ts`            |
| Razón social, CUIT y domicilio   | El JSON-LD de `LocalBusiness` va incompleto                     | `localBusiness()` en `src/composables/useJsonLd.ts` |
| Dominio                          | Canonical, Open Graph y sitemap apuntan a un dominio provisorio | `origin` en `src/content/site.ts`                   |
| Analítica (GA4 + Search Console) | No hay medición de conversiones                                 | Sin implementar                                     |

Los CTA de WhatsApp y el botón de envío ya llevan `data-event` para engancharles
los eventos de conversión cuando entre GA4.
