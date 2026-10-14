<script setup lang="ts">
import { outlinedInfo } from '@quasar/extras/material-icons-outlined';
import { privacyNotice } from 'src/content/site';
</script>

<template>
  <q-btn
    flat
    round
    no-caps
    :icon="outlinedInfo"
    color="content-soft"
    :aria-label="privacyNotice.buttonLabel"
  >
    <q-menu
      max-width="280px"
      anchor="top middle"
      self="bottom middle"
      :offset="[0, 8]"
      class="bg-surface text-content border-line q-pa-md"
    >
      <p
        v-for="(paragraph, index) in privacyNotice.paragraphs"
        :key="index"
        class="text-body2"
        :class="{ 'q-mt-sm': index > 0 }"
      >
        {{ paragraph }}
      </p>
    </q-menu>
  </q-btn>
</template>
