import { PowerSyncContext } from '@powersync/react'
import { PowerSyncDatabase } from '@powersync/web'
import { ReactNode, Suspense } from 'react'
import { AppSchema } from '@/components/providers/AppSchema.ts'
import BackendConnector from '@/lib/BackendConnector.ts'

const powerSync = new PowerSyncDatabase({
    database: { dbFilename: 'powersync2.db' },
    schema: AppSchema,
    flags: {
        disableSSRWarning: true
    }
})

const connector = new BackendConnector()
powerSync.connect(connector)

const SystemProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <PowerSyncContext.Provider value={powerSync}>
                {children}
            </PowerSyncContext.Provider>
        </Suspense>
    )
}

export { SystemProvider }
