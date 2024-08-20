import { PowerSyncContext } from '@powersync/react'
import { PowerSyncDatabase } from '@powersync/web'
import { ReactNode, Suspense, useEffect, useState } from 'react'
import { AppSchema } from '@/components/providers/AppSchema.ts'
import BackendConnector from '@/lib/BackendConnector.ts'

const SystemProvider = ({ children }: { children: ReactNode }) => {
    const [db, setDb] = useState<PowerSyncDatabase | null>(null)

    useEffect(() => {
        // TODO: This timeout is a temporary fix for the issue where PowerSync engine doesn't startup properly.
        //       Learn more: https://github.com/romatallinn/powersync-tauri/issues/4
        setTimeout(async () => {
            const powerSync = new PowerSyncDatabase({
                database: { dbFilename: 'powersync2.db' },
                schema: AppSchema,
                flags: {
                    disableSSRWarning: true
                }
            })
            await powerSync.init()
            await powerSync.connect(new BackendConnector())
            setDb(powerSync)
        }, 1000)
    }, [])

    if (!db) {
        return <>Loading...</>
    }
    return (
        <Suspense fallback={<>Loading...</>}>
            <PowerSyncContext.Provider value={db}>
                {children}
            </PowerSyncContext.Provider>
        </Suspense>
    )
}

export { SystemProvider }
