import type { GetTracksQuery } from "@/__generated__/graphql";
import { create } from "zustand";

type Track = GetTracksQuery["tracksForHome"][number];

interface TrackStore {
  // State
  tracks: Track[];
  selectedTrackId: string | null;
  fetchCount: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  setTracks: (tracks: Track[]) => void;
  selectTrack: (trackId: string) => void;
  clearSelection: () => void;
  incrementFetchCount: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;

  // Computed
  getSelectedTrack: () => Track | undefined;
  getTrackCount: () => number;
}

/**
 * Zustand store for managing track data from GraphQL
 * Demonstrates state management with Zustand
 */
export const useTrackStore = create<TrackStore>((set, get) => ({
  // Initial state
  tracks: [],
  selectedTrackId: null,
  fetchCount: 0,
  isLoading: false,
  error: null,

  // Actions
  setTracks: (tracks) => set({ tracks, error: null }, false),

  selectTrack: (trackId) => set({ selectedTrackId: trackId }, false),

  clearSelection: () => set({ selectedTrackId: null }, false),

  incrementFetchCount: () =>
    set((state) => ({ fetchCount: state.fetchCount + 1 }), false),

  setLoading: (isLoading) => set({ isLoading }, false),

  setError: (error) => set({ error }, false),

  reset: () =>
    set(
      {
        tracks: [],
        selectedTrackId: null,
        fetchCount: 0,
        isLoading: false,
        error: null,
      },
      false,
    ),

  // Computed values
  getSelectedTrack: () => {
    const { tracks, selectedTrackId } = get();
    return tracks.find((track) => track.id === selectedTrackId);
  },

  getTrackCount: () => {
    return get().tracks.length;
  },
}));
