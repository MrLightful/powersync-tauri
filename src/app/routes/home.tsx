import BuiltWith from '@/features/built-with'
import GithubStarButton from '@/features/github-star-button.tsx'
import { PowerSyncContent } from '@/features/powersync-content.tsx'

export function HomePage() {
    return (
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
    )
}

// Necessary for react router to lazy load.
export const Component = HomePage
