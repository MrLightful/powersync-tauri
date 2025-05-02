import './global.css'

import { PowerSyncContent } from '@/features/powersync-content'
import BuiltWith from '@/features/built-with'
import GithubStarButton from '@/features/github-star-button'
import AppProvider from '@/app/provider'

function App() {
    return (
        <AppProvider>
            <div className="flex h-screen">
                <div className="m-auto text-center space-y-3">
                    <BuiltWith />
                    <h1 className="text-3xl items-center">
                        Welcome to PowerSync Tauri!
                    </h1>
                    <GithubStarButton />
                    <PowerSyncContent />
                </div>
            </div>
        </AppProvider>
    )
}

export default App
