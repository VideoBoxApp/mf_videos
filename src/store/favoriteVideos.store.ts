import { videosService } from "@/services/VideosService/videosService";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { storeFavoriteIdList } from "./favoriteIdList.store";
import { ResponseData } from "@/types/ResponseData";

const INITIAL_FAVORITE_VIDEOS: any = {};

const favoriteVideosSlice = createSlice({
  name: "favoriteVideos",
  initialState: {
    value: INITIAL_FAVORITE_VIDEOS,
  },
  reducers: {
    setFavoriteVideos: (state, payload: any) => {
      state.value = payload;
    },
  },
});
export const { setFavoriteVideos } = favoriteVideosSlice.actions;

export const storeFavoriteVideos = configureStore({
  reducer: favoriteVideosSlice.reducer,
});

const getFavoriteVideos = async () => {
  await videosService
    .getFavoriteVideos(storeFavoriteIdList.getState().value)
    .then((response: ResponseData) => {
    
      storeFavoriteVideos.dispatch(setFavoriteVideos(response.data.items));
    })
    .catch((error: any) => {
      alert("Error: " + error.summary);
    });
};

storeFavoriteIdList.subscribe(() => {
  getFavoriteVideos();
});
