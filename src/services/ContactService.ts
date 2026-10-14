import { site } from 'src/content/site';

export interface SurveyRequest {
  name: string;
  organization: string;
  phone: string;
  email: string;
  surfaceArea: string;
  message: string;
  /**
   * Campo trampa. Va oculto en el formulario: una persona nunca lo completa, un
   * bot que rellena todo si. Web3Forms descarta el envio cuando llega con valor.
   */
  botcheck: string;
}

export type SubmitStatus =
  'initial' | 'sending' | 'sent' | 'error' | 'not-configured';

/**
 * El envio exitoso no trae mensaje: el formulario navega a `/gracias`, que es
 * donde se le confirma al usuario que la consulta llego.
 */
export type SubmitResult =
  | { status: 'sent' }
  | { status: Exclude<SubmitStatus, 'sent'>; message: string };

/**
 * Etiqueta de cada campo, en el orden en que se leen.
 *
 * Es la unica fuente para las dos salidas: el correo que arma Web3Forms —que
 * usa las claves del cuerpo tal como llegan— y el mensaje de respaldo por
 * WhatsApp. Van en espanol porque son contenido de cara al cliente: es lo que
 * lee en su bandeja o en el chat, no nombres de codigo.
 */
const FIELD_LABELS = {
  name: 'Nombre',
  organization: 'Organización',
  phone: 'Teléfono',
  email: 'Correo',
  surfaceArea: 'Superficie aproximada',
  message: 'Mensaje',
} as const;

/** Orden en que los campos entran al correo y al mensaje de WhatsApp. */
const FIELD_ORDER: (keyof typeof FIELD_LABELS)[] = [
  'name',
  'organization',
  'phone',
  'email',
  'surfaceArea',
  'message',
];

/** Los seis campos del formulario, ya con su etiqueta de cara al cliente. */
type LabeledFields = {
  [Label in (typeof FIELD_LABELS)[keyof typeof FIELD_LABELS]]: string;
};

/** Los campos que son de Web3Forms y no del formulario. */
interface Web3FormsMeta {
  access_key: string;
  subject: string;
  from_name: string;
  /** Correo del consultante: hace que "Responder" en el correo le llegue a el. */
  replyto: string;
  botcheck: string;
}

/** Cuerpo que espera la API de Web3Forms. */
type Web3FormsPayload = Web3FormsMeta & LabeledFields;

/** Lo que devuelve la API. El `message` viene en ingles, no se muestra al usuario. */
interface Web3FormsResponse {
  success: boolean;
  message: string;
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/** Respuesta cuando la API rechaza el envio. */
const API_ERROR_RESULT: SubmitResult = {
  status: 'error',
  message: 'No pudimos enviar la consulta. Intentá de nuevo más tarde.',
};

/**
 * Prefijo internacional que el campo de telefono muestra como `prefix` y que por
 * eso no entra al `v-model`. Se agrega aca para que el numero llegue completo al
 * correo y al chat: sin esto, al cliente le llega `351 3923565` y no sabe de
 * donde es. El 9 es el que WhatsApp necesita para un celular argentino.
 */
export const PHONE_PREFIX = '+549';

/** Texto con el que se completan los campos opcionales que quedaron vacios. */
const EMPTY_FIELD = 'No indicado';

/** Encabezado del mensaje de respaldo. Explica por que la consulta llega por chat. */
const FALLBACK_INTRO =
  'Hola, intenté enviar una consulta desde el formulario del sitio y no se pudo enviar. Les paso los datos por acá:';

/**
 * Unico punto del sitio que sabe como se manda una consulta.
 *
 * El envio lo resuelve Web3Forms: el formulario postea a su API y ellos reenvian
 * la consulta a la casilla asociada a la access key. No hay backend propio.
 *
 * Mientras `site.web3formsKey` este vacio, el formulario valida y avisa que
 * todavia no envia, en vez de simular un exito que no ocurre.
 */
class ContactService {
  async submitInquiry(request: SurveyRequest): Promise<SubmitResult> {
    if (!site.web3formsKey) {
      return {
        status: 'not-configured',
        message: `Todavía no está conectado el envío del formulario. Escribinos a ${site.contact.email} o llamanos al ${site.contact.phone}.`,
      };
    }

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(this.buildPayload(request)),
      });

      const data: Web3FormsResponse = await response.json();

      if (!response.ok || !data.success) {
        return API_ERROR_RESULT;
      }

      return { status: 'sent' };
    } catch {
      return {
        status: 'error',
        message:
          'No pudimos enviar la consulta. Revisá tu conexión y volvé a intentarlo.',
      };
    }
  }

  buildFallbackMessage(request: SurveyRequest): string {
    const lines = FIELD_ORDER.filter((field) => request[field]).map(
      (field) => `${FIELD_LABELS[field]}: ${this.readField(request, field)}`,
    );

    return `${FALLBACK_INTRO}\n\n${lines.join('\n')}`;
  }

  private readField(
    request: SurveyRequest,
    field: keyof typeof FIELD_LABELS,
  ): string {
    if (field !== 'phone') return request[field];

    return `${PHONE_PREFIX} ${request.phone}`;
  }

  private buildPayload(request: SurveyRequest): Web3FormsPayload {
    return {
      access_key: site.web3formsKey,
      subject: `Consulta desde el sitio — ${request.name}`,
      from_name: site.name,
      replyto: request.email,
      botcheck: request.botcheck,
      [FIELD_LABELS.name]: request.name,
      [FIELD_LABELS.organization]: request.organization || EMPTY_FIELD,
      [FIELD_LABELS.phone]: this.readField(request, 'phone'),
      [FIELD_LABELS.email]: request.email,
      [FIELD_LABELS.surfaceArea]: request.surfaceArea || EMPTY_FIELD,
      [FIELD_LABELS.message]: request.message || EMPTY_FIELD,
    };
  }
}

export default new ContactService();
