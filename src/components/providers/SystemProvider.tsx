import { PowerSyncContext } from '@powersync/react'
import { PowerSyncDatabase } from '@powersync/web'
import { ReactNode, Suspense, useEffect, useState } from 'react'
import { AppSchema } from '@/components/providers/AppSchema.ts'
import BackendConnector from '@/lib/BackendConnector.ts'

const powerSync = new PowerSyncDatabase({
    database: { dbFilename: 'powersync2.db' },
    schema: AppSchema,
    flags: {
        // Web worker causes PowerSync engine fail to start (flaky behaviour).
        // Learn more: https://github.com/romatallinn/powersync-tauri/issues/4
        useWebWorker: false
    }
})
const backend = new BackendConnector()

const SystemProvider = ({ children }: { children: ReactNode }) => {
    const [db] = useState(powerSync)
    const [connector] = useState(backend)

    useEffect(() => {
        powerSync.init()
        powerSync.connect(connector)
    }, [db, connector])

    return (
        <Suspense fallback={<>Loading...</>}>
            <PowerSyncContext.Provider value={db}>
                {children}
            </PowerSyncContext.Provider>
        </Suspense>
    )
}

export { SystemProvider }
