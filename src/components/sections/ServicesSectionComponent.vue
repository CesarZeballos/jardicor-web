<script setup lang="ts">
import IconComponent from 'components/shared/IconComponent.vue';
import { services } from 'src/content/services';
import { servicesSection } from 'src/content/home';

/*
 * La home lista SIEMPRE los seis servicios: son el contenido de la seccion, no
 * un indice de paginas. `active` decide otra cosa —si el servicio tiene pagina
 * propia—, y de eso depende unicamente que la fila sea un enlace y muestre la
 * flecha. Cuando entre la proxima tanda, activar el servicio convierte su fila
 * en link sin tocar este componente.
 *
 * El hover de la fila no depende de `active`: es la coreografia de la seccion y
 * se mantiene igual en las seis. Lo que distingue a la fila que lleva a algun
 * lado es la flecha y el cursor, que en un `div` no cambia.
 */
</script>

<template>
  <section class="q-py-3xl q-py-md-5xl">
    <div class="wrapper">
      <div class="measure q-mb-2xl">
        <h2>{{ servicesSection.title }}</h2>
      </div>

      <div class="services border-top-line">
        <component
          :is="service.active ? 'router-link' : 'div'"
          v-for="service in services"
          :key="service.slug"
          class="service-row border-bottom-line q-py-lg q-px-md"
          :to="service.active ? service.meta.path : undefined"
        >
          <IconComponent
            class="service-row__icon"
            :name="service.icon"
            :box="40"
            :stroke="2"
          />
          <h3 class="text-h4">{{ service.title }}</h3>
          <p class="text-body2 text-content-soft">{{ service.summary }}</p>
          <IconComponent
            v-if="service.active"
            class="service-row__arrow"
            name="i-arrow"
          />
        </component>
      </div>
    </div>
  </section>
</template>
