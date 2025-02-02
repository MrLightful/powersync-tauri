import './global.css'
import { SystemProvider } from '@/features/providers/SystemProvider.tsx'
import { PowerSyncContent } from '@/features/PowerSyncContent.tsx'
import BuiltWithLogos from '@/features/BuiltWithLogos'
import GithubStarButton from '@/features/GithubStarButton.tsx'
import { TooltipProvider } from '@/components/ui/tooltip.tsx'

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
