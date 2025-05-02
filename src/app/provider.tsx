import { PowerSyncProvider } from '@/hooks/powersync/powersync-provider.tsx'
import { ReactNode, Suspense } from 'react'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import AppErrorPage from '@/features/errors/app-error.tsx'
import { ErrorBoundary } from 'react-error-boundary'

export default function AppProvider({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<>Loading...</>}>
            <ErrorBoundary FallbackComponent={AppErrorPage}>
                <PowerSyncProvider>
                    <TooltipProvider>{children}</TooltipProvider>
                </PowerSyncProvider>
            </ErrorBoundary>
        </Suspense>
    )
}
