<script setup lang="ts">
import BrandMarkComponent from 'components/shared/BrandMarkComponent.vue';
import { site } from 'src/content/site';

withDefaults(defineProps<{ size?: number }>(), { size: 42 });
</script>

<template>
  <span class="brand__mark row items-center no-wrap">
    <BrandMarkComponent :size="size" />
    <span>
      <span class="brand__name">JARDICOR</span>
      <span class="brand__tagline">{{ site.tagline.toUpperCase() }}</span>
    </span>
  </span>
</template>
