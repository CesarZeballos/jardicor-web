<script setup lang="ts">
import PageHeaderComponent from 'components/shared/PageHeaderComponent.vue';
import { servicesPage } from 'src/content/pages';
import useSeo from 'src/composables/useSeo';
import useJsonLd from 'src/composables/useJsonLd';

const { applySeo } = useSeo();
const { breadcrumbs, applyJsonLd } = useJsonLd();

applySeo(servicesPage.meta);
applyJsonLd([
  breadcrumbs([
    { name: 'Inicio', path: '/' },
    { name: servicesPage.name, path: servicesPage.meta.path },
  ]),
]);
</script>

<template>
  <q-page padding>
    <PageHeaderComponent :h1="servicesPage.h1" />
  </q-page>
</template>
