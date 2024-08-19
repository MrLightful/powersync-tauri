/// <reference types="vite/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_POWERSYNC_URL: string
    readonly VITE_POWERSYNC_TOKEN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
