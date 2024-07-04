import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

const INITIAL_FAVORITE_ID_LIST: string[] = [];

const favoriteIdListSlice = createSlice({
    name: "favoriteIdList",
    initialState: {
      value: INITIAL_FAVORITE_ID_LIST,
    },
    reducers: {
      toggleFavorite: (state, action: PayloadAction<string>) => {
        const videoId = action.payload;
        const index = state.value.indexOf(videoId);
        if (index !== -1) {
          state.value.splice(index, 1);
        } else {
          state.value.push(videoId);
        }
      },
    },
  });
export const { toggleFavorite } = favoriteIdListSlice.actions;

export const storeFavoriteIdList = configureStore({
  reducer: favoriteIdListSlice.reducer,
});