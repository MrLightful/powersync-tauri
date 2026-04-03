import { PowerSyncContext } from "@powersync/react";
import { PowerSyncTauriDatabase } from "@powersync/tauri-plugin";
import { invoke } from "@tauri-apps/api/core";
import { appDataDir } from "@tauri-apps/api/path";
import { type ReactNode, useEffect, useState } from "react";
import env from "@/config/env.ts";
import { AppSchema } from "@/lib/powersync/app-schema.ts";

const powerSync = new PowerSyncTauriDatabase({
  schema: AppSchema,
  database: {
    dbFilename: "powersync.db",
    dbLocationAsync: appDataDir,
  },
});

const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
  const [db] = useState(powerSync);

  useEffect(() => {
    const setup = async () => {
      await powerSync.init();
      const handle = powerSync.rustHandle;
      await invoke<void>("connect", {
        handle,
        powersyncUrl: env.POWERSYNC_URL,
        powersyncToken: env.POWERSYNC_TOKEN,
      });
    };
    setup();
  }, []);

  return (
    <PowerSyncContext.Provider value={db}>{children}</PowerSyncContext.Provider>
  );
};

export { PowerSyncProvider };
