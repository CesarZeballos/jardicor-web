<script setup lang="ts">
import { IconId } from 'src/commons/interfaces/site';

/**
 * Referencia a un simbolo del sprite. El `viewBox` cambia segun la familia: los
 * de interfaz estan dibujados sobre 24, los de servicio y sector sobre 40.
 */
withDefaults(
  defineProps<{
    name: IconId;
    /** Lado del cuadro de dibujo del simbolo, no el tamano en pantalla. */
    box?: 24 | 40;
    stroke?: number;
  }>(),
  { box: 24, stroke: 1.5 },
);
</script>

<template>
  <svg
    :viewBox="`0 0 ${box} ${box}`"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <use :href="`#${name}`" />
  </svg>
</template>
