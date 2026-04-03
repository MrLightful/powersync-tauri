import { TooltipProvider } from "@radix-ui/react-tooltip";
import { type ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AppErrorPage from "@/features/errors/app-error.tsx";
import { PowerSyncProvider } from "@/lib/powersync/powersync-provider.tsx";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<>Loading...</>}>
      <ErrorBoundary FallbackComponent={AppErrorPage}>
        <PowerSyncProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </PowerSyncProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
