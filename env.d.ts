/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ASKUI_WORKSPACE_ID: string
    readonly VITE_ASKUI_API_KEY: string
    readonly VITE_QUALITYWATCHER_TOKEN: string
    readonly VITE_QUALITYWATCHER_URL: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}