<script setup lang="ts">
import BrandLogoComponent from 'components/shared/BrandLogoComponent.vue';
import { site } from 'src/content/site';
import { activeServices } from 'src/content/services';
import { activeSectors } from 'src/content/sectors';
import { aboutPage, contactPage, worksPage } from 'src/content/pages';

const year = new Date().getFullYear();
const institutionalPages = [worksPage, aboutPage, contactPage].filter(
  (page) => page.active,
);
</script>

<template>
  <footer class="footer inv q-pt-4xl q-pb-2xl">
    <div class="wrapper">
      <div class="footer__grid">
        <div>
          <router-link class="brand" to="/" aria-label="Jardicor, ir al inicio">
            <BrandLogoComponent :size="40" />
          </router-link>
          <p
            class="text-body2 text-content-soft q-mt-md"
            style="max-width: 30ch"
          >
            {{ site.shortDescription }}
          </p>
          <ul class="column q-mt-lg">
            <li v-for="page in institutionalPages" :key="page.meta.path">
              <router-link :to="page.meta.path">{{ page.name }}</router-link>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-overline text-uppercase text-content-soft q-mb-md">
            Servicios
          </h2>
          <ul class="column">
            <li v-for="service in activeServices" :key="service.slug">
              <router-link :to="service.meta.path">{{
                service.name
              }}</router-link>
            </li>
          </ul>
        </div>

        <div>
          <!-- Unica via de acceso por navegacion a las paginas de sector. El texto
               del enlace carga la busqueda: es de las pocas senales que van a tener. -->
          <h2 class="text-overline text-uppercase text-content-soft q-mb-md">
            Mantenimiento por sector
          </h2>
          <ul class="column">
            <li v-for="sector in activeSectors" :key="sector.slug">
              <router-link :to="sector.meta.path">{{
                sector.linkText
              }}</router-link>
            </li>
          </ul>
        </div>

        <div>
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
