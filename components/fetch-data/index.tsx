"use client";

import { gql } from "@/__generated__/gql";
import type { GetTracksQuery } from "@/__generated__/graphql";
import { apolloClient } from "@/components/apollo-provider";
import { Button } from "@/components/ui/button";
import { useTrackStore } from "@/stores/track-store";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useRef } from "react";

/**
 * Example GraphQL query to fetch tracks
 */
const GET_TRACKS = gql(`
  query GetTracks {
    tracksForHome {
      id
      title
      thumbnail
      length
      modulesCount
      author {
        id
        name
        photo
      }
    }
  }
`);

/**
 * Component that fetches GraphQL data and manages it with Zustand
 * Demonstrates integration of GraphQL (Apollo) + Zustand state management
 */
export function FetchData() {
  const [getTracks, { loading, error, data }] =
    useLazyQuery<GetTracksQuery>(GET_TRACKS);

  // Zustand store
  const {
    tracks,
    selectedTrackId,
    fetchCount,
    isLoading,
    error: storeError,
    setTracks,
    selectTrack,
    clearSelection,
    incrementFetchCount,
    setLoading,
    setError,
    getSelectedTrack,
    getTrackCount,
  } = useTrackStore();

  // Track previous fetchCount to detect reset
  const prevFetchCountRef = useRef(fetchCount);
  // Track previous loading state to detect when fetch completes
  const prevLoadingRef = useRef(loading);

  // Sync Apollo state with Zustand
  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  useEffect(() => {
    setError(error?.message || null);
  }, [error, setError]);

  // Update tracks and increment counter when fetch completes successfully
  useEffect(() => {
    // Fetch completed: loading changed from true to false and we have data
    // This means a fetch was just completed, so we should count it
    if (prevLoadingRef.current && !loading && data?.tracksForHome) {
      setTracks(data.tracksForHome);
      incrementFetchCount();
    }
    prevLoadingRef.current = loading;
  }, [loading, data, setTracks, incrementFetchCount]);

  // Clear Apollo cache when store is reset (fetchCount goes to 0)
  useEffect(() => {
    if (prevFetchCountRef.current > 0 && fetchCount === 0) {
      // Store was reset - clear Apollo cache for this query
      apolloClient.cache.evict({ fieldName: "tracksForHome" });
      apolloClient.cache.gc();
    }
    prevFetchCountRef.current = fetchCount;
  }, [fetchCount]);

  const handleFetch = () => {
    // Use network-only to always fetch fresh data from the server
    getTracks({ fetchPolicy: "network-only" });
  };

  const selectedTrack = getSelectedTrack();

  return (
    <div className="space-y-6">
      {/* Zustand State Display - macht die Integration sichtbar */}
      <div className="bg-muted/50 rounded-lg border p-4 dark:border-zinc-800">
        <h3 className="text-muted-foreground mb-2 text-sm font-semibold tracking-wide uppercase">
          Zustand Store State
        </h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Tracks:</span>{" "}
            <span className="font-semibold">{getTrackCount()}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Fetches:</span>{" "}
            <span className="font-semibold">{fetchCount}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Loading:</span>{" "}
            <span className="font-semibold">{isLoading ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button onClick={handleFetch} disabled={loading}>
          {loading ? "Loading..." : "Fetch Data (GraphQL)"}
        </Button>
        {selectedTrackId && (
          <Button variant="outline" onClick={clearSelection}>
            Clear Selection
          </Button>
        )}
      </div>

      {/* Error Display */}
      {(error || storeError) && (
        <div className="bg-destructive/10 text-destructive rounded-md p-4">
          <p className="font-semibold">Error:</p>
          <p>{error?.message || storeError}</p>
        </div>
      )}

      {/* Tracks Display */}
      {tracks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tracks ({getTrackCount()})</h2>
          <div className="grid gap-4">
            {tracks.map((track) => (
              <div
                key={track.id}
                className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
                  selectedTrackId === track.id
                    ? "border-primary bg-primary/10 shadow-md"
                    : "dark:border-zinc-800"
                }`}
                onClick={() => selectTrack(track.id)}
              >
                <h3 className="font-semibold">{track.title}</h3>
                <p className="text-muted-foreground text-sm">
                  by {track.author.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {track.modulesCount} Module • {track.length} seconds
                </p>
                {selectedTrackId === track.id && (
                  <p className="text-primary mt-2 text-xs">✓ Selected</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Track Detail */}
      {selectedTrack && (
        <div className="border-primary bg-primary/5 rounded-lg border p-4">
          <h3 className="mb-2 font-semibold">Selected Track (Zustand):</h3>
          <p className="font-medium">{selectedTrack.title}</p>
          <p className="text-muted-foreground text-sm">
            by {selectedTrack.author.name}
          </p>
        </div>
      )}
    </div>
  );
}
