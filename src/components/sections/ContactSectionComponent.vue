<script setup lang="ts">
import BrandLogoComponent from 'components/shared/BrandLogoComponent.vue';
import IconComponent from 'components/shared/IconComponent.vue';
import WhatsappButtonComponent from 'components/buttons/WhatsappButtonComponent.vue';
import ContactFormComponent from 'components/inputs/ContactFormComponent.vue';
import { site } from 'src/content/site';
import { contactSection } from 'src/content/home';

/**
 * En la home el titulo es un H2; en /contacto la seccion abre la pagina y su
 * titulo pasa a ser el H1.
 */
withDefaults(
  defineProps<{
    title?: string;
    headingTag?: 'h1' | 'h2';
    /** Menos aire arriba cuando la seccion abre la pagina, pegada a la cabecera. */
    compactTop?: boolean;
  }>(),
  { title: contactSection.title, headingTag: 'h2', compactTop: false },
);
</script>

<template>
  <section
    id="contacto"
    class="q-pb-3xl q-pb-md-5xl inv"
    :class="compactTop ? 'q-pt-2xl q-pt-md-3xl' : 'q-pt-3xl q-pt-md-5xl'"
  >
    <div class="wrapper">
      <div class="measure q-mb-2xl">
        <component :is="headingTag" class="text-h2">{{ title }}</component>
        <p class="text-subtitle1 q-mt-md">{{ contactSection.lead }}</p>
      </div>

      <div class="contact__grid">
        <!-- La tarjeta acompana el alto del formulario y su contenido queda
             centrado en el eje vertical. -->
        <aside
          class="contact-card bg-surface border-line column justify-center q-pa-xl"
        >
          <BrandLogoComponent :size="44" />

          <div class="contact-card__data column">
            <a :href="`tel:${site.contact.phoneLink}`">
              <IconComponent name="i-phone" />
              {{ site.contact.phone }}
            </a>
            <a :href="`mailto:${site.contact.email}`">
              <IconComponent name="i-mail" />
              {{ site.contact.email }}
            </a>
            <span>
              <IconComponent name="i-pin" />
              Zona norte de Córdoba
            </span>
          </div>

          <WhatsappButtonComponent
            variant="primary"
            label="Escribinos por WhatsApp"
            block
          />
        </aside>

        <ContactFormComponent />
      </div>
    </div>
  </section>
</template>
