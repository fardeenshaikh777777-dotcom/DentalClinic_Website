/* Vite ambient types for this project.
   Declared manually (instead of the `vite/client` reference) so the
   `?raw` module shape is stable across tooling. */

declare module "*?raw" {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
