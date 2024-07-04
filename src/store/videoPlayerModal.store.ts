import { createSlice, configureStore } from "@reduxjs/toolkit";

const INITIAL_SHOW_VIDEO_PLAYER: boolean = false;

const showVideoPlayerModalSlice = createSlice({
  name: "showVideoPlayerModal",
  initialState: {
    value: INITIAL_SHOW_VIDEO_PLAYER,
  },
  reducers: {
    showVideoPlayer: (state) => {
      state.value = true;
    },

    hideVideoPlayer: (state) => {
      state.value = false;
    },
  },
});

export const { showVideoPlayer, hideVideoPlayer } = showVideoPlayerModalSlice.actions;

export const storeVideoPlayer = configureStore({
  reducer: showVideoPlayerModalSlice.reducer,
});
