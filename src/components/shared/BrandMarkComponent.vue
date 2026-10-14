<script setup lang="ts">
/**
 * Isotipo de Jardicor, solo el simbolo. Toma el color del texto que lo rodea
 * (`currentColor`), asi sirve igual sobre fondo claro que sobre un panel `.inv`.
 */
withDefaults(defineProps<{ size?: number }>(), { size: 42 });
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    focusable="false"
    stroke="currentColor"
    stroke-width="2.6"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="32" cy="32" r="24" />
    <path d="M32 8v54" />
    <path d="M14.8 14.8L32 32l17.2-17.2" />
    <path d="M9 30l23 23 23-23" />
  </svg>
</template>
