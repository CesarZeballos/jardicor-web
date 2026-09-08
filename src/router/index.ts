import { RouterScrollBehavior } from 'vue-router';
import routes from './routes';

/**
 * Opciones del router. A diferencia de un proyecto con el CLI de Quasar, aca la
 * instancia la crea vite-ssg —necesita controlarla para prerenderizar cada ruta—,
 * asi que este modulo expone la configuracion y no el router ya construido.
 */
const scrollBehavior: RouterScrollBehavior = (to, _from, savedPosition) => {
  if (savedPosition) return savedPosition;
  if (to.hash) return { el: to.hash, behavior: 'smooth' };
  return { top: 0 };
};

export default {
  routes,
  scrollBehavior,
};
