import { PowerSyncContext } from "@powersync/react";
import { PowerSyncDatabase } from "@powersync/web";
import { type ReactNode, useEffect, useState } from "react";
import env from "@/config/env.ts";
import { AppSchema } from "@/lib/powersync/app-schema.ts";
import BackendConnector from "@/lib/powersync/backend-connector.ts";

const powerSync = new PowerSyncDatabase({
  database: { dbFilename: "powersync.db" },
  schema: AppSchema,
  flags: {
    // Web worker causes PowerSync engine fail to start (flaky behaviour).
    // Learn more: https://github.com/romatallinn/powersync-tauri/issues/4
    useWebWorker: false,
  },
});
const backend = new BackendConnector(env.POWERSYNC_URL, env.POWERSYNC_TOKEN);

const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
  const [db] = useState(powerSync);
  const [connector] = useState(backend);

  useEffect(() => {
    powerSync.init();
    powerSync.connect(connector);
  }, [connector]);

  return (
    <PowerSyncContext.Provider value={db}>{children}</PowerSyncContext.Provider>
  );
};

export { PowerSyncProvider };
