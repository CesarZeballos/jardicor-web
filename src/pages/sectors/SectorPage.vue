<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import PageHeaderComponent from 'components/shared/PageHeaderComponent.vue';
import { findSector } from 'src/content/sectors';
import useSeo from 'src/composables/useSeo';
import useJsonLd from 'src/composables/useJsonLd';

/**
 * Las seis paginas de sector comparten una sola plantilla: lo unico propio de
 * cada una es su bloque de texto de contexto, que vive en `content/sectors.ts`.
 *
 * Regla de canibalizacion: el texto de sector no se comparte con el de servicio
 * aunque el componente visual sea el mismo. Las de servicio explican el como,
 * estas explican el contexto.
 */
const route = useRoute();
const sector = computed(() => findSector(String(route.params.slug)));

const { applySeo } = useSeo();
const { breadcrumbs, applyJsonLd } = useJsonLd();

if (sector.value) {
  applySeo(sector.value.meta);
  applyJsonLd([
    breadcrumbs([
      { name: 'Inicio', path: '/' },
      { name: sector.value.name, path: sector.value.meta.path },
    ]),
  ]);
}
</script>

<template>
  <q-page padding>
    <PageHeaderComponent v-if="sector" :h1="sector.h1" />
  </q-page>
</template>
