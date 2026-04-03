import BuiltWith from "@/features/built-with";
import GithubStarButton from "@/features/github-star-button.tsx";
import { PowerSyncContent } from "@/features/powersync-content.tsx";

export function HomePage() {
  return (
    <div className="flex h-screen">
      <div className="m-auto space-y-3 text-center">
        <BuiltWith />
        <h1 className="items-center text-3xl">Welcome to PowerSync Tauri!</h1>
        <GithubStarButton />
        <PowerSyncContent />
      </div>
    </div>
  );
}

// Necessary for react router to lazy load.
export const Component = HomePage;
