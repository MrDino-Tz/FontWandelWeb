/**
 * Resolve an image reference to a usable URL. Root-absolute public paths get
 * the Vite base prefix (e.g. `/FontWandelWeb/` on GitHub Pages); uploads
 * (data: URLs) and remote/blob URLs pass through untouched.
 */
export const asset = (path: string): string => {
  if (/^(data:|https?:\/\/|blob:)/.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
};
