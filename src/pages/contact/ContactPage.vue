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
    <!-- Unica pagina ademas de la home en la primera tanda: en vez del esqueleto
         de `PageHeaderComponent`, lleva el mismo bloque de contacto de la home,
         con su formulario. El H1 de la pagina es este, no el de la seccion: por
         eso el titulo va aca y la seccion se queda con su H2. -->
    <section class="q-py-3xl q-py-md-5xl">
      <div class="wrapper">
        <h1 style="max-width: 22ch">{{ contactPage.h1 }}</h1>
      </div>
    </section>
    <ContactSectionComponent />
  </q-page>
</template>
