<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import PageHeaderComponent from 'components/shared/PageHeaderComponent.vue';
import { findService } from 'src/content/services';
import { servicesPage } from 'src/content/pages';
import useSeo from 'src/composables/useSeo';
import useJsonLd from 'src/composables/useJsonLd';

/**
 * Una sola ruta para las seis paginas de servicio: el contenido sale de
 * `content/services.ts`. Cuando se sumen los slots de la pagina pilar, cada
 * servicio decide cuales activa desde su propio archivo de configuracion, sin
 * tocar este componente.
 */
const route = useRoute();
const service = computed(() => findService(String(route.params.slug)));

const { applySeo } = useSeo();
const { service: serviceNode, breadcrumbs, applyJsonLd } = useJsonLd();

if (service.value) {
  applySeo(service.value.meta);
  applyJsonLd([
    serviceNode({
      name: service.value.name,
      description: service.value.summary,
      path: service.value.meta.path,
    }),
    breadcrumbs([
      { name: 'Inicio', path: '/' },
      { name: servicesPage.name, path: servicesPage.meta.path },
      { name: service.value.name, path: service.value.meta.path },
    ]),
  ]);
}
</script>

<template>
  <q-page padding>
    <PageHeaderComponent v-if="service" :h1="service.h1" />
  </q-page>
</template>
