<script setup lang="ts">
import IconComponent from 'components/shared/IconComponent.vue';
import { sectors } from 'src/content/sectors';
import { sectorsSection } from 'src/content/home';
</script>

<template>
  <section class="q-py-3xl q-py-md-5xl bg-surface-soft">
    <div class="wrapper">
      <div class="measure q-mb-2xl">
        <h2>{{ sectorsSection.title }}</h2>
      </div>

      <div class="row q-col-gutter-y-2xl q-col-gutter-x-4xl">
        <div
          v-for="sector in sectors"
          :key="sector.slug"
          class="col-12 col-md-6"
        >
          <IconComponent
            class="sector__icon q-mb-md"
            :name="sector.icon"
            :box="40"
            :stroke="2"
          />
          <p>
            <strong class="text-h4 block q-mb-xs">{{ sector.name }}</strong>
            <span class="text-content-soft">{{ sector.description }}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
