"use client";

import { Button } from "@/components/ui/button";
import { gql, useLazyQuery } from "@apollo/client";

/**
 * Example GraphQL query to fetch tracks
 */
const GET_TRACKS = gql`
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
`;

interface Track {
  id: string;
  title: string;
  thumbnail: string;
  length: number;
  modulesCount: number;
  author: {
    id: string;
    name: string;
    photo: string;
  };
}

interface TracksData {
  tracksForHome: Track[];
}

/**
 * Component that fetches and displays GraphQL data on button click
 */
export function FetchData() {
  const [getTracks, { loading, error, data }] =
    useLazyQuery<TracksData>(GET_TRACKS);

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
