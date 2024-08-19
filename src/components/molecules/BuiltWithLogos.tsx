import reactLogo from '@/assets/react.svg'

export default function BuiltWithLogos() {
    // Don't want to put it to global css, so it's easier to remove.
    const logoClass = 'w-10 h-10 hover:scale-125 transition-all duration-300'
    return (
        <div className="flex flex-row space-x-3 justify-center">
            <a href="https://vitejs.dev" target="_blank">
                <img src="/vite.svg" className={logoClass} alt="Vite logo" />
            </a>
            <a href="https://tauri.app" target="_blank">
                <img src="/tauri.svg" className={logoClass} alt="Tauri logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
                <img src={reactLogo} className={logoClass} alt="React logo" />
            </a>
            <a href="https://ui.shadcn.com" target="_blank">
                <img
                    src="/shadcn.svg"
                    className={logoClass}
                    alt="Shadcn UI logo"
                />
            </a>
            <a href="https://powersync.com" target="_blank">
                <img
                    src="/powersync.svg"
                    className={logoClass}
                    alt="PowerSync logo"
                />
            </a>
        </div>
    )
}
