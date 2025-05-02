import { PowerSyncProvider } from '@/hooks/powersync/powersync-provider.tsx'
import { ReactNode, Suspense } from 'react'
import { TooltipProvider } from '@radix-ui/react-tooltip'

export default function AppProvider({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<>Loading...</>}>
            <PowerSyncProvider>
                <TooltipProvider>{children}</TooltipProvider>
            </PowerSyncProvider>
        </Suspense>
    )
}
