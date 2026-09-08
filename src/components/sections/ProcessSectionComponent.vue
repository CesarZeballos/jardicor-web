<script setup lang="ts">
import { hero, processSection, steps } from 'src/content/home';
</script>

<template>
  <section class="q-py-3xl q-py-md-5xl">
    <div class="wrapper">
      <div class="measure q-mb-2xl">
        <h2>{{ processSection.title }}</h2>
      </div>

      <div class="steps">
        <div v-for="step in steps" :key="step.number" class="step q-pt-md">
          <div class="step__header row items-start no-wrap">
            <span class="step__number">{{ step.number }}</span>
            <h3 class="text-h4">{{ step.title }}</h3>
          </div>
          <p class="text-content-soft">{{ step.text }}</p>
        </div>
      </div>

      <div class="row items-center q-gutter-md q-mt-4xl">
        <q-btn
          href="#contacto"
          :label="hero.primaryCta"
          color="primary"
          text-color="on-action"
          unelevated
          no-caps
        />
        <p class="text-body2 text-content-soft">Sin costo y sin compromiso.</p>
      </div>
    </div>
  </section>
</template>
