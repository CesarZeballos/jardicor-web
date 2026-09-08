<script setup lang="ts">
import PageHeaderComponent from 'components/shared/PageHeaderComponent.vue';
import { worksPage } from 'src/content/pages';
import useSeo from 'src/composables/useSeo';
import useJsonLd from 'src/composables/useJsonLd';

const { applySeo } = useSeo();
const { breadcrumbs, applyJsonLd } = useJsonLd();

applySeo(worksPage.meta);
applyJsonLd([
  breadcrumbs([
    { name: 'Inicio', path: '/' },
    { name: worksPage.name, path: worksPage.meta.path },
  ]),
]);
</script>

<template>
  <q-page padding>
    <PageHeaderComponent :h1="worksPage.h1" />
  </q-page>
</template>
