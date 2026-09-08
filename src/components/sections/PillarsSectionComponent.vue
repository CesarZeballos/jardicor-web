<script setup lang="ts">
import { pillars, pillarsClosing, pillarsSection } from 'src/content/home';
</script>

<template>
  <section class="q-py-3xl q-py-md-5xl inv">
    <div class="wrapper">
      <!-- En px y no en ch: `ch` se mide contra la fuente de cuerpo a 16px, no
           contra el titular, y estrangularia el H2. -->
      <div class="q-mb-2xl" style="max-width: 900px">
        <h2>{{ pillarsSection.title }}</h2>
      </div>

      <div class="row q-col-gutter-2xl">
        <div
          v-for="pillar in pillars"
          :key="pillar.title"
          class="col-12 col-md-6"
        >
          <div style="max-width: 46ch">
            <h3 class="text-h5 q-mb-sm">{{ pillar.title }}</h3>
            <p class="text-content-soft">{{ pillar.text }}</p>
          </div>
        </div>
      </div>

      <!-- La franja va fuera de la grilla para que la linea corte de punta a punta. -->
      <div class="q-mt-3xl q-pt-xl border-top-line">
        <p class="text-h3">{{ pillarsClosing }}</p>
      </div>
    </div>
  </section>
</template>
