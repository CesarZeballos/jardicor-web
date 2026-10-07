<script setup lang="ts">
import { thankYouPage } from 'src/content/pages';
import useSeo from 'src/composables/useSeo';

/**
 * Destino del formulario despues de un envio confirmado. No dispara ningun
 * evento: `generate_lead` sale del formulario al recibir el OK de Web3Forms, asi
 * una recarga o un acceso directo a esta URL no cuentan como conversion.
 */
const { applyNoIndex } = useSeo();
applyNoIndex(thankYouPage.title);
</script>

<template>
  <q-page padding>
    <div class="wrapper">
      <h1>{{ thankYouPage.h1 }}</h1>
      <p class="measure text-subtitle1 text-content-soft q-mt-lg">
        {{ thankYouPage.lead }}
      </p>
      <q-btn
        to="/"
        :label="thankYouPage.homeLinkLabel"
        color="primary"
        text-color="on-action"
        class="q-mt-xl"
        unelevated
        no-caps
      />
    </div>
  </q-page>
</template>
