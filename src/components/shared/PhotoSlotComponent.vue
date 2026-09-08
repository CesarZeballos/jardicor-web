<script setup lang="ts">
import { HeroImage } from 'src/commons/interfaces/content';

/**
 * Mientras no exista el material fotografico real, el hero muestra una trama de
 * curvas de nivel y la nota de que foto falta. Es deliberado: una foto de banco de
 * jardin residencial es la senal equivocada para este sitio.
 *
 * Cuando llegue la foto, `image.src` deja de ser null y este slot se reemplaza
 * solo — con `fetchpriority="high"` y sin lazy, porque es el LCP de la pagina.
 */
defineProps<{ image: HeroImage }>();
</script>

<template>
  <img
    v-if="image.src"
    class="photo-slot__image"
    :src="image.src"
    :alt="image.alt"
    width="600"
    height="450"
    decoding="async"
    fetchpriority="high"
  />
  <div v-else class="photo-slot bg-green-800 column justify-end q-pa-lg">
    <svg
      class="photo-slot__pattern text-green-400"
      viewBox="0 0 600 450"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 60C100 40 200 85 300 65S500 30 600 55" />
      <path d="M0 115C100 95 200 140 300 120S500 85 600 110" />
      <path d="M0 170C100 150 200 195 300 175S500 140 600 165" />
      <path d="M0 225C100 205 200 250 300 230S500 195 600 220" />
      <path d="M0 280C100 260 200 305 300 285S500 250 600 275" />
      <path d="M0 335C100 315 200 360 300 340S500 305 600 330" />
      <path d="M0 390C100 370 200 415 300 395S500 360 600 385" />
    </svg>
    <p
      class="photo-slot__note text-green-200 text-body2 border-left-green-400 q-pl-md"
      style="max-width: 34ch"
    >
      <span class="pending">Falta material</span><br />
      {{ image.note }}
    </p>
  </div>
</template>
