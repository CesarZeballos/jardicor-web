# Jardicor Web

Sitio de Jardicor · Constructora Verde. Su razón de existir es el **posicionamiento
en buscadores** para captar empresas, consorcios y predios industriales en Córdoba.
Cada decisión técnica se mide contra eso.

## Stack

- **Framework**: Vue 3 (Composition API) + Vite 8 — NO el CLI de Quasar
- **Renderizado**: SSG. Las 17 páginas se prerenderizan en el build con `vite-ssg`
- **Lenguaje**: TypeScript estricto
- **UI**: Quasar v2 vía `@quasar/vite-plugin`, para los campos del formulario y
  los avisos de envío (`Notify`)
- **Estilos**: SCSS propio sobre `src/css/quasar.variables.scss`
- **`<head>` por página**: `@unhead/vue` (title, description, canonical, Open Graph)
- **Datos estructurados**: JSON-LD propio, sin librería

**Por qué no el CLI de Quasar.** El sitio necesita SSG y el CLI no lo tiene: la
extensión que lo daba (`quasar-app-extension-ssg`) no tiene releases desde mayo de
2024 y pide `@quasar/app-vite ^1`, dos majors atrás del actual. `vite.config.ts`
cumple el papel de `quasar.config.js`.

## Comandos

Antes del primer `yarn dev`: copiar `.env.example` a `.env` y completarlo.

```bash
yarn dev             # Dev server en el puerto 5173
yarn build           # vue-tsc + prerender de las 17 páginas → /dist
yarn preview         # Sirve /dist como lo haría el hosting
yarn lint            # ESLint (.js, .ts, .vue)
yarn format          # Prettier
yarn typecheck       # vue-tsc --noEmit
```

Este proyecto usa **yarn** — nunca `npm`. No hay suite de tests: `yarn test` es un no-op.

## Estructura

```
src/
├── boot/                   # Corren antes de montar la app, en orden (patrón del CLI de Quasar)
│   ├── index.ts            # Tipo BootContext + helper boot()
│   └── 00-quasar.ts        # Instala Quasar (y le arma el ssrContext del prerender)
├── commons/
│   ├── interfaces/         # content.ts · site.ts · jsonLd.ts
│   └── inputsValidators.ts # Reglas de validación de los campos de Quasar
├── components/
│   ├── buttons/            # WhatsappButtonComponent
│   ├── inputs/             # ContactFormComponent
│   ├── sections/           # Las 8 secciones de la home
│   └── shared/             # Navbar, Footer, marca, iconos, slot de foto
├── composables/            # useSeo · useJsonLd · useWhatsapp · useToast
├── content/                # TODO el copy y la configuración de páginas
├── css/
│   ├── quasar.variables.scss   # Colores de marca + $custom-colors + escalas
│   └── app.scss                # Genera las clases de utilidad + capa base
├── layouts/MainLayout.vue  # QLayout > QHeader + QPageContainer + pie
├── pages/                  # Una carpeta por sección, componentes *Page.vue
├── router/                 # index.ts (opciones) + routes.ts
├── services/               # ContactService (envío del formulario)
└── utils/                  # siteMap.ts · url.ts
```

### Alias de import

Los mismos que expone el CLI de Quasar, definidos en `vite.config.ts` y `tsconfig.json`:
`src/`, `app/`, `components/`, `layouts/`, `pages/`, `boot/`, `assets/`, `stores/`.

## Arquitectura

### Capas (página → dato)

1. **Page** (`pages/`) — nivel de ruta, aplica SEO y JSON-LD, compone secciones
2. **Component** (`components/`) — solo UI, recibe props
3. **Composable** (`composables/`) — lógica reutilizable
4. **Service** (`services/`) — lo único que habla con un backend
5. **Content** (`content/`) — el copy y la configuración, sin lógica

### Contenido data-driven

Ningún texto de cara al usuario se escribe dentro de un componente: todo vive en
`src/content/`. Eso permite tocar copy sin tocar componentes.

**Publicación por tandas.** Cada servicio, sector y página secundaria tiene un
campo `active`. Ponerlo en `false` saca la página del router, del footer y del
sitemap de una sola vez. No se comenta código ni se borran archivos.

### Composición de layout y páginas

La misma que el resto de los proyectos de la organización:

```html
<!-- layouts/MainLayout.vue -->
<q-layout view="hHh lpR fff">
  <q-header bordered :height-hint="85"> <NavbarComponent /> </q-header>
  <q-page-container id="content"> <router-view /> </q-page-container>
  <FooterComponent />
</q-layout>

<!-- pages/*/XxxPage.vue -->
<q-page padding>
  <!-- contenido -->
</q-page>
```

**`height-hint` no es opcional.** QLayout saca la cabecera del flujo y le reserva
el alto como `padding-top` del contenedor, pero recién puede medirla en el
navegador: sin el dato, el HTML del build sale con el valor por defecto (50px) y
salta al hidratar. `height-hint` tiene que coincidir con `.navbar__row` más el
borde de `bordered`. Si cambia el alto de la barra, cambia el número.

**El pie no es un `QFooter`.** QFooter está pensado para la barra fija de una
aplicación: también se posiciona fuera del flujo y le reserva el alto al
contenedor. En un pie de contenido de ~500px eso es medio viewport de salto al
hidratar. Va como `<footer>` en el flujo, al final del layout.

**`<q-page padding>` en las páginas de contenido, `<q-page>` en la home.** El
`padding` aplica `.q-layout-padding`, que `app.scss` redefine a la escala del
sitio (96/128px, y 48/64 en mobile) manteniendo el mecanismo responsive de
Quasar. La home no lo usa porque sus secciones sangran de lado a lado: ahí la
calle la pone `.wrapper` dentro de cada sección.

### Renderizado

`vite-ssg` prerenderiza cada ruta de `utils/siteMap.ts` y deja el HTML completo en
`dist/`. Las rutas de servicio y de sector son dinámicas (`/servicios/:slug`), así
que hay que enumerarlas en `ssgOptions.includedRoutes` — el crawler no las descubre.

El build también escribe `sitemap.xml`, `robots.txt` y `404.html` (`onFinished`).

### Quasar sin su CLI

Quasar necesita banderas de compilación que normalmente inyecta su propio CLI.
Acá las pone su plugin de Vite con `runMode: 'ssr-client'`, más un `define` para el
entorno de servidor en `vite.config.ts`.

**El plugin se registra UNA sola vez.** Los hooks de configuración de un plugin son
globales al build: dos instancias —una por entorno— se pisan las banderas y el
cliente se queda sin hidratar.

**`astAutoImport: false` tampoco es opcional.** Con la vía de AST —el default— el
plugin emite un import por cada _uso_ del componente en vez de uno por componente,
y el build muere con `Identifier _component_q_btn has already been declared` apenas
una página usa dos `<q-btn>`. La vía basada en regex deduplica bien.

## Quasar primero, siempre

**Antes de escribir una línea propia —CSS, markup o lógica— hay que buscar si
Quasar ya lo resuelve.** No aplica solo al estilo: aplica a todo lo que un
componente hace.

La regla vale incluso cuando la solución propia parece más corta. Lo que ya
existe está probado, es accesible, viene traducido al sistema por
`quasar.variables.scss` y no suma código a mantener.

| Necesidad                     | Lo que ya existe                        | No escribir                        |
| ----------------------------- | --------------------------------------- | ---------------------------------- |
| Contar caracteres de un campo | `counter` de `QInput`                   | Un contador propio                 |
| Limitar el largo de un campo  | `maxlength`                             | Un `watch` que corta el valor      |
| Aceptar solo cierto formato   | `mask` (`###`, `time`…)                 | Un `keydown` que filtra teclas     |
| Texto fijo dentro del campo   | `prefix` / `suffix`                     | Un span posicionado al lado        |
| Validar                       | `rules` + `commons/inputsValidators.ts` | Validación suelta en el componente |
| Avisar algo al usuario        | `Notify`, vía `composables/useToast.ts` | Un cartel propio                   |
| Padding, margen, grilla       | Las clases de utilidad                  | Una regla en `app.scss`            |

Solo se escribe algo propio cuando Quasar no lo tiene, o cuando lo que trae
choca de frente con el diseño —y esos casos están enumerados en **Qué NO tomamos
de Quasar, a propósito**.

Y cuando se suma un componente o un plugin de Quasar, hay que agregar su
`@import` a `css/quasar-core.sass`: el CSS está recortado a lo que se usa.

## Sistema visual

`quasar.variables.scss` **es la configuración del sistema**, no una lista de colores.
Quasar genera desde ese archivo la escala tipográfica, el espaciado, los botones y
los campos. Todo lo que se pueda declarar como variable se declara ahí.

| Variable                            | Qué genera                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| `$h1`…`$h6`                         | Estiliza los tags `h1`–`h6` **y** genera `.text-h1`…`.text-h6`                       |
| `clamp()` dentro de `$h1` y `$h2`   | El titular responsive, sin una sola media query                                      |
| `$subtitle1`, `$overline`, `$body2` | `.text-subtitle1` (bajada), `.text-overline` (etiqueta), `.text-body2` (texto chico) |
| `$spaces`                           | `.q-pa-lg`, `.q-mt-2xl`, `.q-px-5xl`… en los nueve escalones del diseño              |
| `$flex-gutter`                      | `.q-col-gutter-2xl`, `.q-col-gutter-x-4xl`…                                          |
| `$primary`, `$accent`, `$negative`  | `.text-primary`, `.bg-primary` y `--q-primary`                                       |
| `$custom-colors`                    | Las clases propias que arma `app.scss`                                               |
| `$button-*`                         | Alto, radio, tipografía y padding de `QBtn`                                          |
| `$field-*`                          | Los campos del formulario                                                            |

**No se escribe CSS para nada de eso.** Un título va `<h3 class="text-h4">`, una
separación va `q-mb-lg`, un color va `text-content-soft`. Si hace falta un valor
que no existe, se agrega el escalón a la variable, no una regla nueva.

### Qué NO tomamos de Quasar, a propósito

- **Sombras** (`.shadow-*`). El sistema declara elevación con borde o con fondo.
- **Las grillas asimétricas.** El hero, la fila de servicios y los pasos se
  expresan mejor con `grid-template-columns`. Las simétricas sí usan `row` /
  `col-12 col-md-6`.
- **`QExpansionItem`.** El FAQ va con `<details>` nativo, por SEO.
- **`q-gutter-*` en cajas con borde o padding.** No es equivalente a `gap`: trabaja
  con márgenes negativos en el contenedor y tira el contenido hacia arriba. Donde el
  diseño separa con `gap`, la regla va en `app.scss`; la dirección y la alineación
  sí salen de `row` / `column` / `items-*`.

### Colores propios

`app.scss` recorre `$custom-colors` y genera `.text-*`, `.bg-*`, `.border-*`,
`.border-top/bottom/left-*`. Cada clase emite `var(--q-clave, #fallback)`.

**Inversión de paneles:** `.inv` redefine esas variables y se pinta a sí misma. Un
panel oscuro es una sola clase en el markup: `<section class="section inv">`. Nada
adentro necesita saber sobre qué fondo está.

### El CSS de Quasar es a medida

`src/css/quasar-core.sass` reemplaza a `quasar/src/css/index.sass`, que trae el CSS
de los ~70 componentes del framework. Este sitio usa seis. **Al sumar un componente
de Quasar hay que agregar su `@import` ahí**; si falta, renderiza sin estilos.

Ese recorte es lo que deja lugar para `flex-addon.sass` —el `cssAddon` del CLI, que
el referente también tiene activado— sin engordar el bundle: 32 KB gzip contra los
39 de la versión completa sin addon. El addon es lo que hace responsive al
espaciado: `q-py-3xl q-py-md-5xl` es 64px en mobile y 128 desde `md`.

### Dónde vive el CSS

Tres lugares, en este orden de preferencia:

1. **Una clase de Quasar en el markup** — padding, margin, alineación, columnas,
   visibilidad. Es la primera opción siempre.
2. **Un `style` inline** — un `max-width` que aparece una sola vez, al lado del
   markup que lo necesita. Si el mismo valor se repite, deja de ser un one-off y
   pasa a ser una clase (por eso existe `.measure`).
3. **`app.scss`** — lo que Quasar no tiene: color, `.inv`, SVG, grillas
   asimétricas, coreografía de hover, `gap`.

**Los componentes no llevan `<style>`.** Hoy no hay un solo bloque de estilo dentro
de un `.vue`, y conviene que siga así.

### Dos trampas al escribir en app.scss

1. **Nunca usar el atajo `margin`.** `.footer__title { margin: 0 0 16px }` tiene la
   misma especificidad que `.q-mt-lg` y, como `app.scss` carga después de Quasar,
   le gana y la utilidad deja de funcionar. Va siempre el lado puntual
   (`margin-bottom`). Los resets globales (`p`, `ul`, `h1`–`h6`) van con selector
   de etiqueta, que pierde contra cualquier clase.
2. **Verificar el nombre de cada variable nueva.** `quasar.variables.scss` se
   inyecta **antes** que `node_modules/quasar/src/css/variables.sass`, que declara
   las suyas con `!default`: un nombre repetido le pisa la variable a Quasar. Ya
   pasó con `$sizes`, que es su mapa de breakpoints — definirlo rompió la grilla de
   flex y los campos del formulario se colapsaron. Por eso la escala tipográfica no
   está en un mapa propio: vive en `$h1`…`$h6`, que es donde Quasar la espera.

### Breakpoints

Los de Quasar: `xs` hasta 599, `sm` hasta 1023, `md` hasta 1439. Lo responsive sale
de sus clases: `col-md-6` para la grilla, `q-py-md-5xl` para el espaciado, `gt-sm` /
`lt-md` para mostrar y esconder, y `clamp()` para los titulares. Las media queries
que quedan en `app.scss` son solo estructurales — las cuatro grillas asimétricas y
el `hover` — no hay ninguna que pise un tamaño de fuente ni un escalón de espaciado.

## Reglas de SEO que el código sostiene

- **Un H1 por página**, sin excepciones. Los encabezados del footer son `h2`.
- **Canonical y `<title>` únicos** por página. Ninguna repite el de otra.
- **Páginas de sector solo enlazadas desde el footer**, con el texto del enlace
  cargando la búsqueda (`Mantenimiento para consorcios`, no `Consorcios`), y en el
  sitemap para que no queden huérfanas.
- **Las etiquetas del mapa de cobertura son texto real** dentro del SVG, nunca
  trazado. Ningún nombre de barrio aparece suelto: siempre atado a su segmento
  comercial, para no atraer búsquedas residenciales.
- **El FAQ usa `<details>` nativo**, no un componente hidratado: el contenido está
  en el HTML inicial y no depende de JavaScript.
- Las respuestas del FAQ con `pending: true` no entran al JSON-LD.
- **Regla de canibalización**: las páginas de servicio explican el _cómo_, las de
  sector el _contexto_. No compartir bloques de texto entre unas y otras.

## Convenciones

- **Composition API con `<script setup lang="ts">`** en todo componente nuevo
- **Sin `<style>` en los componentes.** El estilo va en `app.scss` o sale de una
  clase de utilidad
- **Nombres en inglés** para archivos, carpetas, variables y funciones. El
  contenido de cara al usuario y los slugs de URL van en español
- Sufijos: `*Page.vue`, `*Layout.vue`, `*Component.vue`, `use*.ts`, `*Service.ts`
- **Props**: `withDefaults(defineProps<{...}>(), {...})`
- **Nada de `Record<string, unknown>` ni `any`** — siempre una interfaz explícita
- Los botones son `QBtn` con `unelevated no-caps`; `no-caps` no es opcional, Quasar
  pone los labels en mayúsculas por defecto y eso rompe el tono del sitio
- Los componentes de Quasar van en kebab y **no se importan**: los resuelve la
  auto-importación del plugin (`<q-btn>`, `<q-page padding>`). Los componentes
  propios van en PascalCase y sí se importan (`<NavbarComponent />`)
- Prettier: comillas simples, punto y coma

## Pendientes que bloquean el lanzamiento

| Pendiente                        | Qué bloquea                                                | Dónde se cambia                                 |
| -------------------------------- | ---------------------------------------------------------- | ----------------------------------------------- |
| Confirmar el WhatsApp Business   | Hoy el CTA usa el número del brochure                      | `VITE_WHATSAPP_PHONE` en `.env`                 |
| Access key de Web3Forms          | Sin la key el formulario valida pero no envía              | `VITE_WEB3FORMS_KEY` en `.env`                  |
| Foto real del hero               | Se muestra el slot con la nota de material faltante        | `heroImage.src` en `content/home.ts`            |
| Razón social, CUIT, domicilio    | El JSON-LD de `LocalBusiness` va incompleto                | `localBusiness()` en `composables/useJsonLd.ts` |
| Dominio                          | Canonical, Open Graph y sitemap usan un dominio provisorio | `origin` en `content/site.ts`                   |
| Analítica (GA4 + Search Console) | No hay medición de conversiones                            | Sin implementar                                 |

Los CTA de WhatsApp y el botón de envío ya llevan `data-event` para engancharles
los eventos de conversión cuando entre GA4.

## Cómo trabajar acá

- Leer `src/content/` antes de tocar un componente: casi siempre el cambio es de dato.
- Las variables de entorno se leen en `content/site.ts`, nunca en un componente, y
  siempre con acceso opcional (`import.meta.env?.X`): ese módulo también lo carga
  `vite.config.ts` desde Node, donde `import.meta.env` no existe.
- Antes de escribir cualquier cosa, buscar si Quasar ya la resuelve — ver
  **Quasar primero, siempre**. Si es CSS y no existe la clase, agregar el escalón
  a la variable antes de escribir una regla nueva.
- Verificar con `yarn build` y revisión visual contra `design/home-render.png`.
- Las instrucciones del usuario siempre pesan más que este archivo.
