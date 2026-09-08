<script setup lang="ts">
import HeroSectionComponent from 'components/sections/HeroSectionComponent.vue';
import ServicesSectionComponent from 'components/sections/ServicesSectionComponent.vue';
import PillarsSectionComponent from 'components/sections/PillarsSectionComponent.vue';
import SectorsSectionComponent from 'components/sections/SectorsSectionComponent.vue';
import CoverageSectionComponent from 'components/sections/CoverageSectionComponent.vue';
import ProcessSectionComponent from 'components/sections/ProcessSectionComponent.vue';
import FaqSectionComponent from 'components/sections/FaqSectionComponent.vue';
import ContactSectionComponent from 'components/sections/ContactSectionComponent.vue';
import { faqSection, homeFaq, homeMeta } from 'src/content/home';
import useSeo from 'src/composables/useSeo';
import useJsonLd from 'src/composables/useJsonLd';

const { applySeo } = useSeo();
const { localBusiness, faqPage, applyJsonLd } = useJsonLd();

applySeo(homeMeta);
applyJsonLd([localBusiness(), faqPage(homeFaq)]);
</script>

<template>
  <q-page>
    <HeroSectionComponent />
    <ServicesSectionComponent />
    <PillarsSectionComponent />
    <SectorsSectionComponent />
    <CoverageSectionComponent />
    <ProcessSectionComponent />
    <FaqSectionComponent :title="faqSection.title" :items="homeFaq" />
    <ContactSectionComponent />
  </q-page>
</template>
