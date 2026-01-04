"use client";

import { useTrackStore } from "@/stores/track-store";

/**
 * Component that demonstrates Zustand store usage
 * Shows how multiple components can access the same state
 */
export function ZustandDemo() {
  const {
    selectedTrackId,
    fetchCount,
    getSelectedTrack,
    getTrackCount,
    reset,
  } = useTrackStore();

  const selectedTrack = getSelectedTrack();

  return (
    <div className="bg-card rounded-lg border p-4 dark:border-zinc-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Zustand Store Demo</h3>
        <button
          onClick={reset}
          className="text-muted-foreground hover:text-foreground text-sm underline"
        >
          Reset Store
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <span className="text-muted-foreground">Tracks in Store:</span>{" "}
          <span className="font-semibold">{getTrackCount()}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Total Fetches:</span>{" "}
          <span className="font-semibold">{fetchCount}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Selected Track ID:</span>{" "}
          <span className="font-semibold">{selectedTrackId || "None"}</span>
        </div>
        {selectedTrack && (
          <div className="border-primary/20 bg-primary/5 mt-4 rounded border p-2">
            <p className="font-medium">{selectedTrack.title}</p>
          </div>
        )}
      </div>
    </div>
  );
}
