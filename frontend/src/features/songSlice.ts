import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Adjust the import path according to your project structure

// Define Song and Statistics types
interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface Statistics {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  genreCounts: { count: number; genre: string }[];
  artistSongCounts: { count: number; artist: string }[];
  albumSongCounts: { count: number; album: string }[];
}

// Define initial state and slice
interface SongState {
  songs: Song[];
  statistics: Statistics | null;
  loading: boolean;
  error: string | null;
  success: string | null; 
}

const initialState: SongState = {
  songs: [],
  statistics: null,
  loading: false,
  error: null,
  success: null,
};

// Define a helper function for setting loading and resetting messages
const setLoadingAndResetMessages = (state: SongState) => {
  state.loading = true;
  state.error = null;
  state.success = null;
};

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsStart: setLoadingAndResetMessages,
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
      state.loading = false;
      state.success = 'Songs fetched successfully!';
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.success = null;
    },
    addSongStart: setLoadingAndResetMessages,
    addSongSuccess(state, action: PayloadAction<Song>) {
      state.songs.push(action.payload);
      state.loading = false;
      state.success = 'Song added successfully!';
    },
    addSongFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.success = null;
    },
    updateSongStart: setLoadingAndResetMessages,
    updateSongSuccess(state, action: PayloadAction<Song>) {
      state.songs = state.songs.map(song =>
        song._id === action.payload._id ? action.payload : song
      );
      state.loading = false;
      state.success = 'Song updated successfully!';
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.success = null;
    },
    deleteSongStart: setLoadingAndResetMessages,
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.songs = state.songs.filter(song => song._id !== action.payload);
      state.loading = false;
      state.success = 'Song deleted successfully!';
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.success = null;
    },
    resetSongState(state) {
      state.success = null;
      state.error = null;
    },
    fetchStatisticsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStatisticsSuccess(state, action: PayloadAction<Statistics>) {
      state.statistics = action.payload;
      state.loading = false;
    },
    fetchStatisticsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions and selectors
export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
  resetSongState,
  fetchStatisticsStart,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} = songSlice.actions;

export const selectSongState = (state: RootState): SongState => state.songs;

export default songSlice.reducer;
