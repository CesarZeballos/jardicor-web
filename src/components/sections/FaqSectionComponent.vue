<script setup lang="ts">
import IconComponent from 'components/shared/IconComponent.vue';
import { FaqItem } from 'src/commons/interfaces/content';

/**
 * `<details>` nativo en vez de QExpansionItem, por decision de sistema: no
 * necesita JavaScript, el contenido esta en el HTML inicial sin hidratacion y el
 * navegador ya resuelve teclado y accesibilidad. El FAQ es la seccion que mas
 * trabaja para el posicionamiento, asi que es la que menos conviene atar a JS.
 *
 * Como arranca cerrado y el alto lo define el `summary`, tampoco hay salto de
 * layout al hidratar.
 */
defineProps<{ title: string; items: FaqItem[] }>();
</script>

<template>
  <section class="q-py-3xl q-py-md-5xl">
    <div class="wrapper">
      <div class="measure q-mb-2xl q-mx-auto text-center">
        <h2>{{ title }}</h2>
      </div>

      <div class="faq q-mx-auto" style="max-width: 860px">
        <details
          v-for="item in items"
          :key="item.question"
          class="border-bottom-line"
        >
          <summary
            class="text-h6 row items-center justify-between no-wrap q-py-lg"
          >
            {{ item.question }}
            <IconComponent name="i-chevron" class="q-ml-lg" />
          </summary>
          <p class="faq__answer text-content-soft q-pb-lg">
            <template v-if="item.pending">
              <span class="pending">Respuesta pendiente</span><br />
            </template>
            {{ item.answer }}
          </p>
        </details>
      </div>
    </div>
  </section>
</template>
