<script setup lang="ts">
/**
 * Sprite de iconos. Se renderiza una sola vez, en el layout, y queda inline en el
 * HTML prerenderizado de cada pagina: los `<use href="#...">` resuelven sin pedir
 * un archivo aparte y sin esperar hidratacion.
 *
 * El set es propio (documento de arranque): Quasar espera Material Icons o Font
 * Awesome y ninguno de los dos dice nada del rubro.
 */
</script>

<template>
  <svg
    width="0"
    height="0"
    style="position: absolute"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <!-- Interfaz -->
      <g id="i-arrow"><path d="M4 12H19.5M13.5 6l6 6-6 6" /></g>
      <g id="i-chevron"><path d="M6 9.5l6 6 6-6" /></g>
      <g id="i-menu"><path d="M3.5 7h17M3.5 12h17M3.5 17h17" /></g>
      <g id="i-close"><path d="M6 6l12 12M18 6L6 18" /></g>
      <g id="i-phone">
        <path
          d="M15.5 21C8.6 21 3 15.4 3 8.5V6a1.5 1.5 0 0 1 1.5-1.5h2.2a1 1 0 0 1 .95.68l1 3a1 1 0 0 1-.28 1.06L7 10.6a11.5 11.5 0 0 0 6.4 6.4l1.36-1.37a1 1 0 0 1 1.06-.28l3 1a1 1 0 0 1 .68.95v2.2A1.5 1.5 0 0 1 18 21z"
        />
      </g>
      <g id="i-mail">
        <path d="M3.5 6h17v12h-17z" />
        <path d="M3.5 6.6L12 13l8.5-6.4" />
      </g>
      <g id="i-pin">
        <path d="M12 21.5S19 15.5 19 10A7 7 0 0 0 5 10c0 5.5 7 11.5 7 11.5z" />
        <circle cx="12" cy="10" r="2.6" />
      </g>

      <!-- Servicios -->
      <g id="s-maintenance">
        <path d="M4.5 30C14 26.5 26 33 35.5 29.5" />
        <path d="M6.5 23.5C15 20.5 25 26 33.5 23" />
        <path d="M8.5 17C16 14.5 24 19 31.5 16.5" />
        <path d="M10.5 10.5C17 8.5 23 12 29.5 10" />
      </g>
      <g id="s-landscaping">
        <path d="M4.5 31.5C13 31.5 15 21 21 17c5-3.5 9-5 14-5.5" />
        <circle cx="11" cy="24" r="2.4" />
        <circle cx="25" cy="26.5" r="2.4" />
        <circle cx="30.5" cy="19" r="2.4" />
      </g>
      <g id="s-irrigation">
        <path d="M6 32h28" />
        <path d="M20 32v-7" />
        <path d="M11 25a9 9 0 0 1 18 0" />
        <path d="M14.5 25a5.5 5.5 0 0 1 11 0" />
        <path d="M17.5 25a2.5 2.5 0 0 1 5 0" />
      </g>
      <g id="s-pruning">
        <path d="M9 33h22" />
        <path d="M20 33V19" />
        <path d="M20 19l-7-7" />
        <path d="M20 19l7-7" />
        <path d="M16.5 15.5L15 9" />
        <path d="M23.5 15.5L25 9" />
      </g>
      <g id="s-infrastructure">
        <path d="M4 31h32" />
        <path d="M7 31V13.5h26V31" />
        <path d="M7 19h26M7 25h26" />
        <path d="M16 13.5V19M25 13.5V19" />
        <path d="M11.5 19v6M20.5 19v6M29.5 19v6" />
        <path d="M16 25v6M25 25v6" />
      </g>
      <g id="s-site">
        <path d="M4.5 12V6.5H10" />
        <path d="M30 6.5h5.5V12" />
        <path d="M35.5 28v5.5H30" />
        <path d="M10 33.5H4.5V28" />
        <circle cx="13.5" cy="16" r="3.6" />
        <path
          d="M26.5 12s3.6 3.6 3.6 6a3.6 3.6 0 0 1-7.2 0c0-2.4 3.6-6 3.6-6z"
        />
        <path
          d="M12 24.5h16a1.6 1.6 0 0 1 1.6 1.6v1.8a1.6 1.6 0 0 1-1.6 1.6H12a1.6 1.6 0 0 1-1.6-1.6v-1.8A1.6 1.6 0 0 1 12 24.5z"
        />
      </g>

      <!-- Sectores -->
      <g id="c-companies">
        <path d="M5 34h30" />
        <path d="M9 34V9h13v25" />
        <path d="M22 34V18h9v16" />
        <path d="M13 14h5M13 20h5M13 26h5M26 24h2" />
      </g>
      <g id="c-neighborhoods">
        <path d="M4 34h32" />
        <path d="M12 34V15" />
        <path d="M28 34V15" />
        <path d="M12 20h16" />
        <path d="M15.5 15L20 10.5 24.5 15" />
      </g>
      <g id="c-industrial">
        <path d="M4 34h32" />
        <path d="M7 34V21l7 4v-4l7 4v-4l7 4" />
        <path d="M28 34V12h5v22" />
        <path d="M12 29h3M19 29h3M26 29h3" />
      </g>
      <g id="c-buildings">
        <path d="M6 34h28" />
        <path d="M11 34V7h18v27" />
        <path
          d="M15.5 13h3M15.5 20h3M15.5 27h3M21.5 13h3M21.5 20h3M21.5 27h3"
        />
      </g>
      <g id="c-municipalities">
        <path d="M5 34h30" />
        <path d="M6 19L20 9.5 34 19" />
        <path d="M11 34V22M17 34V22M23 34V22M29 34V22" />
        <path d="M8 22h24" />
      </g>
      <g id="c-studios">
        <path d="M6 33h28" />
        <path d="M9.5 29.5V10L28 29.5z" />
        <path d="M9.5 22.5h8.5" />
      </g>
    </defs>
  </svg>
</template>
