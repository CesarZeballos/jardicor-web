<script setup lang="ts">
/**
 * Encabezado de las paginas que todavia no tienen diseno. Pone el unico H1 del
 * documento y nada mas: el resto de las secciones entra despues, sin mover esto.
 */
defineProps<{ h1: string }>();
</script>

<template>
  <section>
    <div class="wrapper">
      <h1 style="max-width: 22ch">{{ h1 }}</h1>
      <p
        class="row items-center q-gutter-sm text-body2 text-content-soft q-mt-xl"
      >
        <span class="pending">En diseño</span>
        El contenido de esta página se define en la próxima etapa.
      </p>
    </div>
  </section>
</template>
