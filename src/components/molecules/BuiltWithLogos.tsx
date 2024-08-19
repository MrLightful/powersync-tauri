import reactLogo from '@/assets/react.svg'

export default function BuiltWithLogos() {
    return (
        <div className="flex flex-row space-x-3 justify-center">
            <a href="https://vitejs.dev" target="_blank">
                <img src="/vite.svg" className="w-10 h-10" alt="Vite logo" />
            </a>
            <a href="https://tauri.app" target="_blank">
                <img src="/tauri.svg" className="w-10 h-10" alt="Tauri logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
                <img src={reactLogo} className="w-10 h-10" alt="React logo" />
            </a>
            <a href="https://ui.shadcn.com" target="_blank">
                <img src="/shadcn.svg" className="w-10 h-10" alt="React logo" />
            </a>
            <a href="https://powersync.com" target="_blank">
                <img
                    src="/powersync.svg"
                    className="w-10 h-10"
                    alt="React logo"
                />
            </a>
        </div>
    )
}
