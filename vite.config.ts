import path from 'path'
import react from '@vitejs/plugin-react'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), wasm(), topLevelAwait()],

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 1420,
        strictPort: true,
        watch: {
            // 3. tell vite to ignore watching `src-tauri`
            ignored: ['**/src-tauri/**']
        }
    },

    // Shadcn UI
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },

    // PowerSync
    optimizeDeps: {
        // Don't optimize these packages as they contain web workers and WASM files.
        // https://github.com/vitejs/vite/issues/11672#issuecomment-1415820673
        exclude: ['@journeyapps/wa-sqlite', '@powersync/web'],

        // But include js-logger from @powersync/web, otherwise app breaks.
        // https://github.com/powersync-ja/powersync-js/pull/267
        include: ['@powersync/web > js-logger']
    },
    worker: {
        format: 'es',
        plugins: () => [wasm(), topLevelAwait()]
    }
})
