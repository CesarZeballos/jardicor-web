<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import WhatsappIconComponent from 'components/shared/WhatsappIconComponent.vue';
import useWhatsapp from 'src/composables/useWhatsapp';
import { contactPage, thankYouPage } from 'src/content/pages';
import { site } from 'src/content/site';
import { normalizePath } from 'src/utils/url';

/**
 * CTA de WhatsApp siempre a mano: los botones del hero y de contacto quedan fuera
 * de vista en buena parte del scroll.
 *
 * No aparece en /contacto, donde el CTA ya esta en pantalla, ni en /gracias, que
 * cierra una consulta ya enviada. Sin numero cargado tampoco se renderiza. El
 * clic lo mide el listener delegado de `boot/01-analytics.ts`.
 */
const HIDDEN_PATHS = [contactPage.meta.path, thankYouPage.path];

const route = useRoute();
const { buildWhatsappLink } = useWhatsapp();
const link = buildWhatsappLink();

const visible = computed(
  () => link !== null && !HIDDEN_PATHS.includes(normalizePath(route.path)),
);
</script>

<template>
  <q-page-sticky v-if="visible" position="bottom-right" :offset="[32, 32]">
    <q-btn
      class="whatsapp-floating"
      :href="link ?? undefined"
      target="_blank"
      rel="noopener"
      :aria-label="site.whatsappFloatingLabel"
      :title="site.whatsappFloatingLabel"
      color="primary"
      text-color="on-action"
      padding="14px"
      round
      unelevated
      no-caps
      data-event="whatsapp-click"
    >
      <WhatsappIconComponent width="28" height="28" />
    </q-btn>
  </q-page-sticky>
</template>
