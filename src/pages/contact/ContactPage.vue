<script setup lang="ts">
import ContactSectionComponent from 'components/sections/ContactSectionComponent.vue';
import { contactPage } from 'src/content/pages';
import useSeo from 'src/composables/useSeo';
import useJsonLd from 'src/composables/useJsonLd';

const { applySeo } = useSeo();
const { breadcrumbs, applyJsonLd } = useJsonLd();

applySeo(contactPage.meta);
applyJsonLd([
  breadcrumbs([
    { name: 'Inicio', path: '/' },
    { name: contactPage.name, path: contactPage.meta.path },
  ]),
]);
</script>

<template>
  <!-- Sin `padding`: igual que la home, porque la seccion de contacto es un panel
       invertido que tiene que sangrar de lado a lado. La calle la pone `.wrapper`. -->
  <q-page>
    <!-- Unica pagina ademas de la home en la primera tanda: lleva el mismo bloque
         de contacto, con su formulario. El H1 de la pagina es el titulo de la
         seccion. -->
    <ContactSectionComponent
      :title="contactPage.h1"
      heading-tag="h1"
      compact-top
    />
  </q-page>
</template>
