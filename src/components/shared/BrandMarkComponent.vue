<script setup lang="ts">
/**
 * Isotipo de Jardicor, solo el simbolo. Toma el color del texto que lo rodea
 * (`currentColor`), asi sirve igual sobre fondo claro que sobre un panel `.inv`.
 */
import { useId } from 'vue';

withDefaults(defineProps<{ size?: number }>(), { size: 42 });

/**
 * Los brazos de la hoja se recortan contra el circulo, como en el SVG del
 * branding. El id tiene que ser unico: el isotipo aparece varias veces por pagina.
 */
const clipId = useId();
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="-10 -2.5 280 280"
    fill="none"
    aria-hidden="true"
    focusable="false"
    stroke="currentColor"
    stroke-width="10"
  >
    <defs>
      <clipPath :id="clipId">
        <circle cx="130" cy="125" r="110" />
      </clipPath>
    </defs>
    <circle cx="130" cy="125" r="110" />
    <path d="M130 15v250" />
    <g :clip-path="`url(#${clipId})`">
      <path d="M30 14l100 100 100-100" />
      <path d="M0 77l130 130 130-130" />
    </g>
  </svg>
</template>
