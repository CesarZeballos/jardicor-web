/* eslint-disable */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_PHONE?: string;
  readonly VITE_WEB3FORMS_KEY?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_GA_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
  }
}
