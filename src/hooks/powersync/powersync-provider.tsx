import { PowerSyncContext } from '@powersync/react'
import { PowerSyncDatabase } from '@powersync/web'
import { ReactNode, useEffect, useState } from 'react'
import { AppSchema } from '@/hooks/powersync/app-schema.ts'
import BackendConnector from '@/hooks/powersync/backend-connector.ts'
import env from '@/config/env.ts'

const powerSync = new PowerSyncDatabase({
    database: { dbFilename: 'powersync.db' },
    schema: AppSchema,
    flags: {
        // Web worker causes PowerSync engine fail to start (flaky behaviour).
        // Learn more: https://github.com/romatallinn/powersync-tauri/issues/4
        useWebWorker: false
    }
})
const backend = new BackendConnector(env.POWERSYNC_URL, env.POWERSYNC_TOKEN)

const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
    const [db] = useState(powerSync)
    const [connector] = useState(backend)

    useEffect(() => {
        powerSync.init()
        powerSync.connect(connector)
    }, [db, connector])

    return (
        <PowerSyncContext.Provider value={db}>
            {children}
        </PowerSyncContext.Provider>
    )
}

export { PowerSyncProvider }
