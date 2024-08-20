import './global.css'
import { SystemProvider } from '@/components/providers/SystemProvider.tsx'
import { PowerSyncContent } from '@/components/molecules/PowerSyncContent.tsx'
import BuiltWithLogos from '@/components/molecules/BuiltWithLogos.tsx'
import GithubStarButton from '@/components/molecules/GithubStarButton.tsx'
import { TooltipProvider } from './components/ui/tooltip'

function App() {
    return (
        <SystemProvider>
            <TooltipProvider>
                <div className="mx-32 my-32 m-auto text-center space-y-3">
                    <BuiltWithLogos />
                    <h1 className="text-3xl items-center">
                        Welcome to PowerSync Tauri!
                    </h1>
                    <GithubStarButton />
                    <PowerSyncContent />
                </div>
            </TooltipProvider>
        </SystemProvider>
    )
}

export default App
