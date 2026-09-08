<script setup lang="ts">
import IconSpriteComponent from 'components/shared/IconSpriteComponent.vue';
import NavbarComponent from 'components/shared/NavbarComponent.vue';
// PRIMERA TANDA (landing): pie reducido. Volver a `FooterComponent` cuando
// entren las paginas de servicio, sector e institucionales.
import LandingFooterComponent from 'components/shared/LandingFooterComponent.vue';

const HEADER_HEIGHT = 85;
</script>

<template>
  <q-layout view="hHh lpR fff">
    <IconSpriteComponent />
    <a class="skip-link" href="#content">Saltar al contenido</a>

    <q-header bordered :height-hint="HEADER_HEIGHT">
      <NavbarComponent />
    </q-header>

    <q-page-container id="content">
      <router-view />
    </q-page-container>
    <LandingFooterComponent />
  </q-layout>
</template>
