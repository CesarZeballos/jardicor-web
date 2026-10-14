<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import ContactService, {
  PHONE_PREFIX,
  SurveyRequest,
} from 'src/services/ContactService';
import useToast, { ToastAction } from 'src/composables/useToast';
import useWhatsapp from 'src/composables/useWhatsapp';
import useAnalytics from 'src/composables/useAnalytics';
import PrivacyInfoComponent from 'components/shared/PrivacyInfoComponent.vue';
import { thankYouPage } from 'src/content/pages';
import {
  completePhone,
  requiredField,
  validEmail,
} from 'src/commons/inputsValidators';

const PHONE_MASK = '### #######';

const MAX_LENGTH = {
  name: 80,
  organization: 80,
  surfaceArea: 40,
  message: 1000,
} as const;

const emptyRequest: SurveyRequest = {
  name: '',
  organization: '',
  phone: '',
  email: '',
  surfaceArea: '',
  message: '',
  botcheck: '',
};

const request = reactive<SurveyRequest>({ ...emptyRequest });

const fieldProps = {
  outlined: true,
  stackLabel: true,
  dark: true,
  bgColor: 'surface',
  noErrorIcon: true,
} as const;

const router = useRouter();
const { showErrorToast } = useToast();
const { trackEvent } = useAnalytics();
const { buildWhatsappLink } = useWhatsapp();

const sending = ref(false);

async function onSubmit(): Promise<void> {
  sending.value = true;
  const result = await ContactService.submitInquiry({ ...request });
  sending.value = false;

  // La conversion se cuenta aca, con el OK de Web3Forms, y una sola vez por
  // envio: `/gracias` no dispara nada al cargar.
  if (result.status === 'sent') {
    trackEvent('generate_lead');
    Object.assign(request, emptyRequest);
    await router.push(thankYouPage.path);
    return;
  }

  showErrorToast(result.message, buildFallbackActions());
}

function buildFallbackActions(): ToastAction[] {
  const link = buildWhatsappLink(ContactService.buildFallbackMessage(request));
  if (!link) return [];

  return [
    {
      label: 'Enviar por WhatsApp',
      href: link,
      target: '_blank',
      rel: 'noopener',
      'data-event': 'whatsapp-click',
    },
  ];
}
</script>

<template>
  <q-form greedy class="contact-form" @submit="onSubmit">
    <input
      v-model="request.botcheck"
      class="hidden"
      type="text"
      name="botcheck"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
    />

    <q-input
      v-bind="fieldProps"
      v-model="request.name"
      lazy-rules
      label="Nombre"
      autocomplete="name"
      :maxlength="MAX_LENGTH.name"
      :rules="[requiredField('el nombre')]"
    />
    <q-input
      v-bind="fieldProps"
      v-model="request.organization"
      label="Organización · opcional"
      autocomplete="organization"
      :maxlength="MAX_LENGTH.organization"
    />
    <q-input
      v-bind="fieldProps"
      v-model="request.phone"
      lazy-rules
      type="tel"
      label="Teléfono"
      autocomplete="tel"
      :mask="PHONE_MASK"
      :prefix="PHONE_PREFIX"
      hint="Sin el 0 y sin el 15"
      :rules="[requiredField('el teléfono'), completePhone]"
    />
    <q-input
      v-bind="fieldProps"
      v-model="request.email"
      lazy-rules
      type="email"
      label="Correo"
      autocomplete="email"
      :rules="[requiredField('el correo'), validEmail]"
    />
    <q-input
      v-bind="fieldProps"
      v-model="request.surfaceArea"
      class="contact-form__wide"
      label="Superficie aproximada · opcional"
      placeholder="Ej.: 2 ha o 4.000 m²"
      :maxlength="MAX_LENGTH.surfaceArea"
    />
    <q-input
      v-bind="fieldProps"
      v-model="request.message"
      class="contact-form__wide"
      type="textarea"
      rows="4"
      label="Mensaje · opcional"
      counter
      :maxlength="MAX_LENGTH.message"
    />

    <div class="contact-form__footer row items-center q-gutter-md q-mt-sm">
      <q-btn
        type="submit"
        :label="sending ? 'Enviando…' : 'Enviar consulta'"
        color="primary"
        text-color="on-action"
        padding="16px 24px"
        :disable="sending"
        unelevated
        no-caps
        data-event="form-submit"
      />
      <PrivacyInfoComponent />
      <p class="text-body2 text-content-soft">
        Respondemos dentro del mismo día hábil.
      </p>
    </div>
  </q-form>
</template>
