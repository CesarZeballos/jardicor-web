<script setup lang="ts">
import useSeo from 'src/composables/useSeo';

const { applyNoIndex } = useSeo();
applyNoIndex('Página no encontrada | Jardicor');
</script>

<template>
  <q-page padding>
    <div class="wrapper">
      <p class="text-overline text-uppercase text-content-soft q-mb-sm">
        Error 404
      </p>
      <h1>No encontramos esta página</h1>
      <p class="measure text-subtitle1 text-content-soft q-mt-lg">
        Puede que la dirección haya cambiado. Volvé al inicio o escribinos y te
        orientamos.
      </p>
      <div class="row items-center q-gutter-md q-mt-xl">
        <q-btn
          to="/"
          label="Ir al inicio"
          color="primary"
          text-color="on-action"
          unelevated
          no-caps
        />
        <q-btn
          to="/contacto"
          label="Contacto"
          color="primary"
          outline
          unelevated
          no-caps
        />
      </div>
    </div>
  </q-page>
</template>
