<script setup lang="ts">
import PageHeaderComponent from 'components/shared/PageHeaderComponent.vue';
import { aboutPage } from 'src/content/pages';
import useSeo from 'src/composables/useSeo';
import useJsonLd from 'src/composables/useJsonLd';

const { applySeo } = useSeo();
const { breadcrumbs, applyJsonLd } = useJsonLd();

applySeo(aboutPage.meta);
applyJsonLd([
  breadcrumbs([
    { name: 'Inicio', path: '/' },
    { name: aboutPage.name, path: aboutPage.meta.path },
  ]),
]);
</script>

<template>
  <q-page padding>
    <PageHeaderComponent :h1="aboutPage.h1" />
  </q-page>
</template>
