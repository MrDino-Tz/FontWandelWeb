import { useEffect, useState } from 'react';
import { apiGet } from '../api';
import {
  articles as localArticles,
  references as localReferences,
  type Article,
} from './content';
import localWhitepapers from './whitepapers.json';

export interface Whitepaper {
  title: string;
  description: string;
  readLink?: string;
}

/**
 * Support content, live from the API when reachable, bundled data otherwise
 * (e.g. the static GitHub Pages demo with no backend).
 */
export function useSupportData() {
  const [articles, setArticles] = useState<Article[]>(localArticles);
  const [references, setReferences] = useState<Article[]>(localReferences);
  const [whitepapers, setWhitepapers] = useState<Whitepaper[]>(
    localWhitepapers as Whitepaper[],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [a, r, w] = await Promise.all([
          apiGet<Article[]>('/articles'),
          apiGet<Article[]>('/references'),
          apiGet<Whitepaper[]>('/whitepapers'),
        ]);
        if (!cancelled) {
          setArticles(a);
          setReferences(r);
          setWhitepapers(w);
        }
      } catch {
        /* backend unreachable — keep bundled data */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { articles, references, whitepapers };
}
