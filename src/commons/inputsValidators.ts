/**
 * Reglas de validacion para los campos de Quasar. Se agregan aca las que se
 * repitan en mas de un formulario, no dentro del componente.
 */

export type ValidationRule = (value: string) => true | string;

export function requiredField(label: string): ValidationRule {
  return (value: string) => (value ?? '').trim().length > 0 || `Falta ${label}`;
}

/**
 * Mismo patron que usa el resto de los proyectos de la organizacion: exige un
 * dominio con punto y una extension de dos letras o mas, asi no pasan cosas como
 * `juan@gmail` ni `juan@gmail.c`.
 */
const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validEmail: ValidationRule = (value: string) =>
  EMAIL_PATTERN.test((value ?? '').toLowerCase()) || 'Revisá el correo';

/** Digitos que tiene un numero argentino sin el 0 de larga distancia ni el 15. */
export const PHONE_DIGITS = 10;

/**
 * La mascara del campo ya impide escribir letras y corta en diez digitos, pero
 * no obliga a completarlos: sin esta regla `351 12` pasa la validacion.
 */
export const completePhone: ValidationRule = (value: string) =>
  (value ?? '').replace(/\D/g, '').length === PHONE_DIGITS ||
  // El hint del campo ya aclara lo del 0 y el 15: repetirlo aca es ruido.
  `Revisá el teléfono: van ${PHONE_DIGITS} números`;
