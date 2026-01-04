"use client";

import { gql } from "@/__generated__/gql";
import type { GetTracksQuery } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import { useLazyQuery } from "@apollo/client";

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
 * Component that fetches and displays GraphQL data on button click
 */
export function FetchData() {
  const [getTracks, { loading, error, data }] =
    useLazyQuery<GetTracksQuery>(GET_TRACKS);

  const handleFetch = () => {
    getTracks();
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleFetch} disabled={loading}>
        {loading ? "Loading Data..." : "Fetch Data"}
      </Button>

      {error && (
        <div className="bg-destructive/10 text-destructive rounded-md p-4">
          <p className="font-semibold">Error:</p>
          <p>{error.message}</p>
        </div>
      )}

      {data && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tracks:</h2>
          <div className="grid gap-4">
            {data.tracksForHome.map((track) => (
              <div
                key={track.id}
                className="rounded-lg border p-4 dark:border-zinc-800"
              >
                <h3 className="font-semibold">{track.title}</h3>
                <p className="text-muted-foreground text-sm">
                  by {track.author.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {track.modulesCount} Module • {track.length} seconds
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
