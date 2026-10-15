<script setup lang="ts">
import BrandMarkComponent from 'components/shared/BrandMarkComponent.vue';
import { HeroImage } from 'src/commons/interfaces/content';

/**
 * Mientras no exista el material fotografico real, el hero muestra el isotipo
 * en verde, sin caja. Es deliberado: una foto de banco de
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
  <div v-else class="photo-slot column justify-end q-pa-lg">
    <BrandMarkComponent
      class="photo-slot__mark absolute-center text-primary"
      :size="240"
    />
  </div>
</template>
