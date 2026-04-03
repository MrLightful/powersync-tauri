import { usePowerSync, useStatus } from "@powersync/react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  PROJECTS_TABLE,
  type ProjectRecord,
} from "@/lib/powersync/app-schema.ts";

function PowerSyncContent() {
  const status = useStatus();
  const powerSync = usePowerSync();
  const [lists, setLists] = useState<ProjectRecord[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    powerSync.watch(
      `SELECT * FROM ${PROJECTS_TABLE}`,
      [],
      {
        onResult: (result) => {
          if (result.rows) {
            const l = result.rows?.length;
            const items = Array.from({ length: l }, (_, i) =>
              result.rows?.item(i)
            );
            setLists(items);
          } else {
            setLists([]);
          }
        },
      },
      { signal: abortController.signal }
    );
    return () => {
      abortController.abort();
    };
  }, [powerSync.watch]);

  return (
    <div>
      <div className="mt-4 flex flex-row justify-center space-x-2">
        <PowerSyncConnectivityBadge connected={status.connected} />
      </div>
      <pre className="mx-auto mt-10 w-min bg-gray-100 p-3 text-left">
        {!status.connected && lists.length === 0 && "Connecting..."}
        {status.connected && lists.length === 0 && "No items found"}
        {lists.map((i) => JSON.stringify(i, null, 2)).join("\n")}
      </pre>
    </div>
  );
}

function PowerSyncConnectivityBadge({ connected }: { connected: boolean }) {
  if (connected) {
    return <Badge className="bg-green-600">Connected</Badge>;
  }
  return <Badge className="bg-yellow-500">Disconnected</Badge>;
}

export { PowerSyncContent };
