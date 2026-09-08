<script setup lang="ts">
/**
 * El sitio tiene un solo layout: todas las paginas comparten navbar y pie. Si
 * mas adelante aparece una vista sin ellos (una landing de campana, por ejemplo),
 * el layout pasa a elegirse desde el router y esto vuelve a ser un router-view.
 */
import MainLayout from 'layouts/MainLayout.vue';
</script>

<template>
  <MainLayout />
</template>
