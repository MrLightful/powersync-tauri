import { PowerSyncContext } from '@powersync/react'
import { PowerSyncDatabase } from '@powersync/web'
import { ReactNode, Suspense, useEffect, useState } from 'react'
import { AppSchema } from '@/components/providers/AppSchema.ts'
import BackendConnector from '@/lib/BackendConnector.ts'

const SystemProvider = ({ children }: { children: ReactNode }) => {
    const [db, setDb] = useState<PowerSyncDatabase | null>(null)

    useEffect(() => {
        const setup = async () => {
            const powerSync = new PowerSyncDatabase({
                database: { dbFilename: 'powersync2.db' },
                schema: AppSchema,
                flags: {
                    disableSSRWarning: true
                }
            })
            powerSync.connect(new BackendConnector())
            await powerSync.init()
            setDb(powerSync)
        }
        setup()
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
