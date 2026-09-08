<script setup lang="ts">
import WhatsappIconComponent from 'components/shared/WhatsappIconComponent.vue';
import useWhatsapp from 'src/composables/useWhatsapp';

/**
 * Bloqueante externo (documento de arranque, punto 3.7): sin numero cargado en
 * `VITE_WHATSAPP_PHONE` no hay a donde enlazar, asi que el boton no se
 * renderiza — no queda un enlace roto ni un CTA que no lleva a nada.
 */
const props = withDefaults(
  defineProps<{
    label?: string;
    variant?: 'primary' | 'secondary';
    block?: boolean;
    /** Pisa el mensaje por defecto del sitio. */
    message?: string;
  }>(),
  { label: 'WhatsApp', variant: 'secondary', block: false, message: undefined },
);

const { buildWhatsappLink } = useWhatsapp();
const link = buildWhatsappLink(props.message);
</script>

<template>
  <q-btn
    v-if="link"
    :href="link"
    target="_blank"
    rel="noopener"
    :color="variant === 'primary' ? 'primary' : undefined"
    :text-color="variant === 'primary' ? 'on-action' : 'primary'"
    :outline="variant === 'secondary'"
    :class="{ 'full-width': block }"
    unelevated
    no-caps
    data-event="whatsapp-click"
  >
    <WhatsappIconComponent class="q-mr-sm" width="20" height="20" />
    {{ label }}
  </q-btn>
</template>
