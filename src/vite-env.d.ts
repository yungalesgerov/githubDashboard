interface ImportMetaEnv {
    readonly VITE_GITHUB_PAT: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }