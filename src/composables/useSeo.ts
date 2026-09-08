import { useHead } from '@unhead/vue';
import { PageMeta } from 'src/commons/interfaces/content';
import { site } from 'src/content/site';
import { absoluteUrl } from 'src/utils/url';

/**
 * Title, description, canonical y Open Graph de una pagina. Se llama una sola vez
 * por pagina: cada una compite por una busqueda distinta, asi que ninguna hereda
 * el `<title>` del sitio.
 */
export default function useSeo() {
  function applySeo(meta: PageMeta) {
    const url = absoluteUrl(meta.path);

    useHead({
      title: meta.title,
      link: [{ rel: 'canonical', href: url }],
      meta: [
        { name: 'description', content: meta.description },
        {
          property: 'og:type',
          content: meta.path === '/' ? 'website' : 'article',
        },
        { property: 'og:site_name', content: site.name },
        { property: 'og:locale', content: 'es_AR' },
        { property: 'og:title', content: meta.title },
        { property: 'og:description', content: meta.description },
        { property: 'og:url', content: url },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
    });
  }

  function applyNoIndex(title: string) {
    useHead({
      title,
      // Una 404 no aporta nada al indice y no tiene que competir con nada.
      meta: [{ name: 'robots', content: 'noindex, follow' }],
    });
  }

  return {
    applySeo,
    applyNoIndex,
  };
}
