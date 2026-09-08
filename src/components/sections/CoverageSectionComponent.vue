<script setup lang="ts">
import { coverageAlt, coverageNodes, coverageSection } from 'src/content/home';

/**
 * Esquema, no mapa geografico. Las etiquetas son texto real dentro del SVG
 * —nunca trazado— para que Google las lea. Y ningun nombre de zona aparece solo:
 * siempre amarrado a su segmento, para no atraer consulta residencial.
 */
</script>

<template>
  <section class="q-pt-2xl q-pb-3xl q-pb-md-5xl">
    <!-- La trama topografica vuelve aca, y no como adorno: son curvas de nivel
         presentando la seccion de terreno. Segunda y ultima aparicion del motivo. -->
    <svg
      class="coverage__seam q-mb-2xl q-mb-md-3xl"
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 18C240 4 480 32 720 18C960 4 1200 32 1440 18" />
      <path d="M0 38C240 24 480 52 720 38C960 24 1200 52 1440 38" />
      <path d="M0 58C240 44 480 72 720 58C960 44 1200 72 1440 58" />
      <path d="M0 78C240 64 480 92 720 78C960 64 1200 92 1440 78" />
      <path d="M0 98C240 84 480 112 720 98C960 84 1200 112 1440 98" />
      <path d="M0 118C240 104 480 132 720 118C960 104 1200 132 1440 118" />
    </svg>

    <div class="wrapper">
      <!-- El unico H2 que rompe la escala: se lo lleva el que carga la keyword del
           sitio, para que el peso visual acompane al semantico. Llega al tamano
           del H1, nunca por encima, para no romper la jerarquia. -->
      <div class="q-mb-2xl">
        <h2 class="text-h1">{{ coverageSection.title }}</h2>
      </div>

      <div class="q-my-2xl">
        <svg
          class="coverage__map"
          viewBox="0 0 1200 380"
          role="img"
          :aria-label="coverageAlt"
        >
          <path
            class="ring ring--north"
            d="M150 270C360 160 840 160 1050 270"
          />
          <path class="corridor" d="M822 204 1088 108" />

          <text class="city" x="600" y="300" text-anchor="middle">CÓRDOBA</text>
          <text class="segment" x="600" y="322" text-anchor="middle">
            Av. de Circunvalación
          </text>

          <template v-for="node in coverageNodes" :key="node.area">
            <circle
              class="node"
              :class="{ 'node--focus': node.highlighted }"
              :cx="node.x"
              :cy="node.y"
              :r="node.highlighted ? 10 : 8"
            />
            <text class="area" :x="node.x" :y="node.areaY" text-anchor="middle">
              {{ node.area }}
            </text>
            <text
              class="segment"
              :x="node.x"
              :y="node.segmentY"
              text-anchor="middle"
            >
              {{ node.segment }}
            </text>
          </template>
        </svg>
      </div>

      <p class="measure text-subtitle1 text-content-soft">
        {{ coverageSection.lead }}
      </p>
    </div>
  </section>
</template>
