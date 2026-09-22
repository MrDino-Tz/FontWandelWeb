/** Prefix a root-absolute public path with the Vite base (e.g. `/FontWandelWeb/` on GitHub Pages). */
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
