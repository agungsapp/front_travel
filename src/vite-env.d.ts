/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_API_BASE_URL: string;
  // Tambahkan variabel lain jika ada (misalnya, REACT_APP_IMAGE_BASE_URL)
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}