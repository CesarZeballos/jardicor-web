import {
  CoverageNode,
  FaqItem,
  HeroImage,
  HomeSection,
  PageMeta,
  Pillar,
  ProcessStep,
} from '../commons/interfaces/content';

export const homeMeta: PageMeta = {
  title: 'Mantenimiento de espacios verdes en Córdoba | Jardicor',
  description:
    'Mantenimiento de espacios verdes para empresas, consorcios y predios industriales en Córdoba. Alcance y frecuencia definidos. Relevamiento sin costo.',
  path: '/',
  priority: 1,
};

export const hero = {
  h1: 'Mantenimiento de espacios verdes en Córdoba — empresas, consorcios y predios industriales',
  lead: 'Contratos de mantenimiento con frecuencia programada, alcance definido por escrito y un responsable a cargo. Cuadrillas propias en la zona norte de Córdoba.',
  primaryCta: 'Solicitá un relevamiento técnico',
};

/**
 * Imagen del hero. Define el LCP, asi que se carga con prioridad y sin lazy.
 * Mientras `src` sea null se dibuja el slot con la trama topografica y la nota
 * de material faltante: es deliberado, no una foto de banco que despues hay que
 * arrancar. Reemplazar la foto es cambiar estas tres lineas.
 */
export const heroImage: HeroImage = {
  src: null,
  alt: 'Cuadrilla de Jardicor trabajando en el mantenimiento de una superficie verde extensa en Córdoba',
  note: 'Cuadrilla uniformada trabajando en superficie extensa. Es la foto que define la primera impresión del sitio y hoy no la tenemos.',
};

export const servicesSection: HomeSection = { title: 'Qué hacemos' };

export const pillarsSection: HomeSection = {
  title:
    'No contratás horas de jardinería. Contratás la gestión de tu espacio verde.',
};

/**
 * Regla de contenido: cero numeros en esta seccion. Ni cuadrillas, ni hectareas,
 * ni anios, ni contadores. Todo lo que se afirma aca es cualitativo.
 */
export const pillars: Pillar[] = [
  {
    title: 'Hay alguien del otro lado',
    text: 'No dependemos de una sola persona. Cada servicio tiene una cuadrilla asignada, un capitán que controla la ejecución en el predio y un encargado general que supervisa el funcionamiento.',
  },
  {
    title: 'El alcance está por escrito',
    text: 'Frecuencia definida, agenda de tareas y responsable operativo identificado desde el primer día. Sabés qué incluye el abono y qué se cotiza aparte.',
  },
  {
    title: 'Respondemos el mismo día hábil',
    text: 'El objetivo es contestar toda consulta comercial dentro del mismo día hábil. Si entra fuera de horario, al siguiente.',
  },
  {
    title: 'Seguimiento técnico del paisaje',
    text: 'Trabajamos con paisajistas y viveristas para revisar estado del paisaje, riego, sanidad, poda y reposiciones cuando el predio lo requiere. El espacio verde no sólo se corta y se limpia: se cuida.',
  },
];

export const pillarsClosing =
  'Puntualidad, orden, respeto dentro del predio, cuidado de las instalaciones del cliente y limpieza al terminar. Eso no se negocia.';

export const sectorsSection: HomeSection = { title: 'Con quiénes trabajamos' };

export const coverageSection: HomeSection = {
  title: 'Mantenimiento de espacios verdes en la zona norte de Córdoba',
  lead: 'Trabajamos también fuera de la zona norte. Contanos dónde está tu predio y coordinamos una visita.',
};

/** Texto alternativo del esquema. Nombra las zonas siempre junto a su segmento. */
export const coverageAlt =
  'Esquema de la zona norte de Córdoba, donde Jardicor mantiene espacios verdes para barrios cerrados, consorcios, parques industriales y el corredor comercial hacia Villa Allende.';

export const coverageNodes: CoverageNode[] = [
  {
    area: 'Cerro de las Rosas',
    segment: 'espacios comunes y consorcios',
    x: 205,
    y: 246,
    areaY: 300,
    segmentY: 320,
  },
  {
    area: 'Urca',
    segment: 'consorcios y administraciones',
    x: 378,
    y: 204,
    areaY: 160,
    segmentY: 180,
  },
  {
    area: 'Villa Belgrano',
    segment: 'barrios cerrados y desarrollos',
    x: 600,
    y: 188,
    areaY: 136,
    segmentY: 156,
  },
  {
    area: 'Argüello',
    segment: 'barrios cerrados y desarrollos',
    x: 822,
    y: 204,
    areaY: 248,
    segmentY: 268,
  },
  {
    area: 'Los Boulevares',
    segment: 'parques industriales y empresas',
    x: 995,
    y: 246,
    areaY: 300,
    segmentY: 320,
    highlighted: true,
  },
  {
    area: 'Villa Allende',
    segment: 'corredor comercial',
    x: 1105,
    y: 95,
    areaY: 52,
    segmentY: 72,
  },
];

export const processSection: HomeSection = {
  title: 'Del primer llamado al servicio funcionando',
};

export const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Relevamiento',
    text: 'Coordinamos la visita dentro de los días siguientes. Miramos superficie y accesos, estado del césped, canteros y arbolado, riego, necesidades de poda, horarios permitidos y disposición de residuos. Y preguntamos qué esperás, qué problemas tuviste antes y qué querés que quede incluido o excluido.',
  },
  {
    number: '02',
    title: 'Alcance y presupuesto',
    text: 'Definimos qué tareas incluye el servicio y con qué frecuencia. El presupuesto sale de ahí, con el detalle por escrito de qué entra en el abono y qué se cotiza aparte.',
  },
  {
    number: '03',
    title: 'Puesta en marcha',
    text: 'Aprobada la propuesta, coordinamos el inicio y armamos la agenda de tareas. Si el predio necesita una puesta a punto antes de entrar en régimen, se hace primero.',
  },
  {
    number: '04',
    title: 'Ejecución y seguimiento',
    text: 'Cada predio tiene su cuadrilla y su responsable operativo. Mantenemos contacto periódico con tu referente para revisar cómo viene el servicio.',
  },
];

export const faqSection: HomeSection = {
  title: 'Lo que preguntan antes de contratar',
};

/**
 * La seccion que mas trabaja para el posicionamiento: va con `FAQPage` en JSON-LD
 * para poder aparecer desplegada en los resultados.
 */
export const homeFaq: FaqItem[] = [
  {
    question: '¿Cuánto cuesta el mantenimiento de un predio?',
    answer:
      'No hay precio de lista. El valor depende de la superficie, la frecuencia, la complejidad del predio, su estado inicial, la cantidad de personal y maquinaria necesarios y el alcance que se defina. Por eso el primer paso siempre es un relevamiento: no tiene costo y no compromete a nada.',
  },
  {
    question: '¿Qué incluye el abono y qué se cotiza aparte?',
    answer:
      'El abono cubre las tareas y frecuencias acordadas en la propuesta: corte, desmalezado, bordeado, limpieza y retiro de residuos verdes de las superficies definidas. Todo lo que queda fuera —podas de gran porte, reposición de plantas, obras de mejora— se cotiza por separado y se avisa antes. El detalle queda por escrito desde el primer día.',
  },
  {
    question: '¿Pueden hacerse cargo de todo el predio?',
    answer:
      'Sí, y es lo que mejor funciona. Dentro del mismo contrato resolvemos mantenimiento, riego, poda, retiro de residuos, recuperación de sectores degradados y obras de mejora. Un solo proveedor y un solo interlocutor para todo el espacio verde.',
  },
  {
    question: '¿Tienen personal y máquinas propias?',
    answer:
      'Sí. Trabajamos con personal y maquinaria propios. Además, somos aliados de Ducati, la marca de herramientas de jardín, con la que equipamos a nuestras cuadrillas.',
  },
  {
    question: '¿Pueden facturar?',
    answer:
      'Sí. Jardicor factura como empresa y entrega la documentación fiscal y previsional que requiera el área de compras o administración. La documentación se ordena antes del inicio del servicio.',
  },
  {
    question: '¿Trabajan en nuestra zona?',
    answer:
      'Nuestro foco es la zona norte de Córdoba: Cerro de las Rosas, Urca, Villa Belgrano, Argüello, Los Boulevares y el corredor hacia Villa Allende. También tomamos trabajos fuera de esa zona. Contanos dónde está tu predio y coordinamos una visita.',
  },
  {
    question: '¿Quién responde si aparece un problema?',
    answer:
      'Cada contrato tiene un responsable operativo identificado. El capitán controla la ejecución en el predio y el encargado general supervisa el funcionamiento del servicio. Siempre hay a quién llamar.',
  },
  {
    question: '¿En cuánto tiempo responden una consulta?',
    answer:
      'El objetivo es responder dentro del mismo día hábil. Si la consulta entra fuera de horario, al siguiente. Si hace falta información técnica adicional, confirmamos la recepción y avisamos cuándo volvemos con la respuesta.',
  },
];

export const contactSection: HomeSection = {
  title: 'Pedí tu relevamiento',
  lead: 'Contanos qué predio necesitás mantener y coordinamos una visita. El relevamiento no tiene costo y no compromete a nada. Respondemos dentro del mismo día hábil.',
};
