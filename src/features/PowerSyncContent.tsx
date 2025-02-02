import { useEffect, useState } from 'react'
import { usePowerSync, useStatus } from '@powersync/react'
import { Badge } from '@/components/ui/badge.tsx'
import {
    ProjectRecord,
    PROJECTS_TABLE
} from '@/features/providers/AppSchema.ts'

function PowerSyncContent() {
    const status = useStatus()
    const powerSync = usePowerSync()
    const [lists, setLists] = useState<ProjectRecord[]>([])

    useEffect(() => {
        const abortController = new AbortController()
        powerSync.watch(
            `SELECT * FROM ${PROJECTS_TABLE}`,
            [],
            {
                onResult: (result) => {
                    if (!result.rows) {
                        setLists([])
                    } else {
                        const l = result.rows!.length
                        const items = Array.from({ length: l }, (_, i) =>
                            result.rows!.item(i)
                        )
                        setLists(items)
                    }
                }
            },
            { signal: abortController.signal }
        )
        return () => {
            abortController.abort()
        }
    }, [])

    return (
        <div>
            <div className="mt-4 flex flex-row space-x-2 justify-center">
                <PowerSyncConnectivityBadge connected={status.connected} />
                <PowerSyncSyncBadge hasSynced={status.hasSynced} />
            </div>
            <pre className="text-left mx-auto w-min mt-10 bg-gray-100 p-3">
                {!status.hasSynced && lists.length === 0 && 'Syncing...'}
                {status.hasSynced && lists.length === 0 && 'No items found'}
                {lists.map((i) => JSON.stringify(i, null, 2)).join('\n')}
            </pre>
        </div>
    )
}

function PowerSyncConnectivityBadge({ connected }: { connected: boolean }) {
    if (connected) {
        return <Badge className="bg-green-600">Connected</Badge>
    } else {
        return <Badge className="bg-yellow-500">Disconnected</Badge>
    }
}

function PowerSyncSyncBadge({ hasSynced }: { hasSynced: boolean | undefined }) {
    if (hasSynced) {
        return <Badge className="bg-green-600">Synced</Badge>
    } else {
        return <Badge className="bg-yellow-500">Syncing...</Badge>
    }
}

export { PowerSyncContent }
