<script setup lang="ts">
import { site } from 'src/content/site';

withDefaults(defineProps<{ size?: number }>(), { size: 42 });
</script>

<template>
  <span class="brand__mark row items-center no-wrap">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
      stroke="currentColor"
      stroke-width="2.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="32" cy="32" r="24" />
      <path d="M32 8v54" />
      <path d="M14.8 14.8L32 32l17.2-17.2" />
      <path d="M9 30l23 23 23-23" />
    </svg>
    <span>
      <span class="brand__name">JARDICOR</span>
      <span class="brand__tagline">{{ site.tagline.toUpperCase() }}</span>
    </span>
  </span>
</template>
