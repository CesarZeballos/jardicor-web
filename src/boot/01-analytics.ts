import { site } from 'src/content/site';
import useAnalytics from 'src/composables/useAnalytics';
import { boot } from './index';

/**
 * GA4, solo en el navegador y solo si hay `VITE_GA_ID`. No entra al HTML del
 * prerender: el script se inyecta al hidratar.
 *
 * El listener va en fase de captura para medir el clic aunque algun componente
 * corte la propagacion.
 */
export default boot(({ isClient }) => {
  if (!isClient || !site.gaId) return;

  const { loadAnalytics, trackContactClick } = useAnalytics();
  loadAnalytics();
  document.addEventListener('click', trackContactClick, { capture: true });
});
