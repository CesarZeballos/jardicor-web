<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import BrandLogoComponent from 'components/shared/BrandLogoComponent.vue';
import IconComponent from 'components/shared/IconComponent.vue';
import { activeServices } from 'src/content/services';
import { contactPage, servicesPage } from 'src/content/pages';

const route = useRoute();
const menuOpen = ref(false);

/*
 * PRIMERA TANDA (landing): el sitio sale con la home y `/contacto` nada mas, asi
 * que el grupo Servicios del menu queda apagado. Poner en `true` lo devuelve —el
 * submenu ya se arma solo desde `activeServices`.
 */
const showFullNav: boolean = false;

/**
 * El CTA baja al formulario de la propia pagina cuando esa pagina lo tiene —la
 * home y /contacto— y en el resto lleva a /contacto. Asi el ancla nunca apunta a
 * un id que no existe en el documento, ni la ruta a la pagina que ya estamos
 * viendo.
 */
const ctaTarget = computed(() =>
  route.path === '/' || route.path === contactPage.meta.path
    ? '#contacto'
    : contactPage.meta.path,
);

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  },
);
</script>

<template>
  <div>
    <div class="wrapper navbar__row row items-center no-wrap">
      <router-link class="brand" to="/" aria-label="Jardicor, ir al inicio">
        <BrandLogoComponent />
      </router-link>

      <!-- Sin "Inicio": el logo ya vuelve al home. Trabajos y Nosotros salen del
           nav y quedan alcanzables desde el pie. -->
      <nav
        class="navbar__nav gt-sm row items-center q-ml-auto"
        aria-label="Principal"
      >
        <div v-if="showFullNav" class="navbar__group">
          <router-link
            class="row items-center q-gutter-xs"
            :to="servicesPage.meta.path"
          >
            Servicios
            <IconComponent name="i-chevron" width="16" height="16" />
          </router-link>
          <ul class="navbar__submenu bg-surface border-line q-py-sm">
            <li v-for="service in activeServices" :key="service.slug">
              <router-link :to="service.meta.path">{{
                service.name
              }}</router-link>
            </li>
          </ul>
        </div>
        <router-link :to="contactPage.meta.path">Contacto</router-link>
        <q-btn
          :href="ctaTarget"
          label="Solicitá un relevamiento"
          color="primary"
          text-color="on-action"
          class="q-ml-sm"
          unelevated
          no-caps
        />
      </nav>

      <q-btn
        class="lt-md q-ml-auto"
        color="primary"
        outline
        unelevated
        no-caps
        padding="12px"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click="menuOpen = !menuOpen"
      >
        <IconComponent
          :name="menuOpen ? 'i-close' : 'i-menu'"
          width="24"
          height="24"
        />
      </q-btn>
    </div>

    <div
      v-show="menuOpen"
      id="mobile-menu"
      class="mobile-menu lt-md border-top-line"
    >
      <nav class="wrapper" aria-label="Principal, versión móvil">
        <ul class="q-mb-lg">
          <li v-if="showFullNav">
            <router-link :to="servicesPage.meta.path">Servicios</router-link>
          </li>
          <li
            v-for="service in showFullNav ? activeServices : []"
            :key="service.slug"
            class="mobile-menu__child"
          >
            <router-link :to="service.meta.path">{{
              service.name
            }}</router-link>
          </li>
          <li>
            <router-link :to="contactPage.meta.path">Contacto</router-link>
          </li>
        </ul>
        <q-btn
          :href="ctaTarget"
          label="Solicitá un relevamiento"
          color="primary"
          text-color="on-action"
          class="full-width"
          unelevated
          no-caps
        />
      </nav>
    </div>
  </div>
</template>
