<script setup lang="ts">
import PhotoSlotComponent from 'components/shared/PhotoSlotComponent.vue';
import WhatsappButtonComponent from 'components/buttons/WhatsappButtonComponent.vue';
import { hero, heroImage } from 'src/content/home';
</script>

<template>
  <section class="q-py-3xl q-pt-md-4xl">
    <div class="wrapper hero__grid">
      <div>
        <h1 class="q-mb-lg">{{ hero.h1 }}</h1>
        <p
          class="text-subtitle1 text-content-soft q-mb-xl"
          style="max-width: 46ch"
        >
          {{ hero.lead }}
        </p>
        <div class="row items-center q-gutter-md">
          <q-btn
            href="#contacto"
            :label="hero.primaryCta"
            color="primary"
            text-color="on-action"
            unelevated
            no-caps
          />
          <WhatsappButtonComponent />
        </div>
      </div>

      <PhotoSlotComponent :image="heroImage" />
    </div>
  </section>
</template>
