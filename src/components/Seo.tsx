import { useEffect } from 'react';

export function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    const fullTitle = title.includes('Mairaj Abbas') ? title : `${title} | Mairaj Abbas`;
    document.title = fullTitle;
    const entries: Record<string, string> = { description, 'og:title': fullTitle, 'og:description': description, 'twitter:title': fullTitle, 'twitter:description': description };
    Object.entries(entries).forEach(([name, content]) => {
      const selector = name.startsWith('og:') ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      document.querySelector(selector)?.setAttribute('content', content);
    });
  }, [title, description]);
  return null;
}
