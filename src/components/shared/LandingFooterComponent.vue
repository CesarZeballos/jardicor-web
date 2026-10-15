<script setup lang="ts">
/**
 * Pie de la PRIMERA TANDA (landing). El sitio sale con la home y `/contacto`
 * nada mas, asi que el pie definitivo —`FooterComponent.vue`, con las columnas
 * de servicios, sectores e institucionales— se queda sin contenido. Este lo
 * reemplaza mientras tanto y conserva lo unico que no puede faltar: el NAP
 * (nombre, telefono, correo y zona), que es senal de posicionamiento local.
 *
 * Al entrar la proxima tanda se vuelve a `FooterComponent` en `MainLayout.vue`
 * y este archivo se borra.
 *
 * No usa `.footer__grid`: esa clase es una grilla de cuatro columnas armada
 * para el pie completo. Aca alcanza con la grilla simetrica de Quasar.
 */
import BrandLogoComponent from 'components/shared/BrandLogoComponent.vue';
import { site } from 'src/content/site';

const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer inv q-pt-4xl q-pb-2xl">
    <div class="wrapper">
      <div class="row q-col-gutter-y-2xl q-col-gutter-x-4xl">
        <div class="col-12 col-md-6">
          <router-link class="brand" to="/" aria-label="Jardicor, ir al inicio">
            <BrandLogoComponent :height="40" />
          </router-link>
          <p
            class="text-body2 text-content-soft q-mt-md"
            style="max-width: 30ch"
          >
            {{ site.shortDescription }}
          </p>
        </div>

        <div class="col-12 col-md-6">
          <h2 class="text-overline text-uppercase text-content-soft q-mb-md">
            Contacto
          </h2>
          <ul class="column">
            <li>
              <a :href="`tel:${site.contact.phoneLink}`">{{
                site.contact.phone
              }}</a>
            </li>
            <li>
              <a :href="`mailto:${site.contact.email}`">{{
                site.contact.email
              }}</a>
            </li>
            <li>
              <a
                :href="site.contact.instagramUrl"
                target="_blank"
                rel="noopener"
              >
                {{ site.contact.instagram }}
              </a>
            </li>
          </ul>
          <h2
            class="text-overline text-uppercase text-content-soft q-mb-md q-mt-lg"
          >
            Zona
          </h2>
          <p class="text-body2 text-content-soft">
            {{ site.contact.serviceArea }}
          </p>
        </div>
      </div>

      <div
        class="row justify-between q-gutter-md q-mt-3xl q-pt-lg border-top-line"
      >
        <p class="text-body2 text-content-soft">© {{ year }} {{ site.name }}</p>
      </div>
    </div>
  </footer>
</template>
