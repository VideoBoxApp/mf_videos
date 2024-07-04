import { videosService } from "@/services/VideosService/videosService";
import { ResponseData } from "@/types/ResponseData";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const EMPTY_ARRAY: any = {};

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    value: EMPTY_ARRAY,
  },
  reducers: {
    setVideos: (state, payload: any) => {
      state.value = payload;
    },
  },
});


export const { setVideos } = videosSlice.actions;

export const storeVideos = configureStore({
  reducer: videosSlice.reducer,
});


const getInitialVideos = async () => {
  if (storeVideos.getState().value === EMPTY_ARRAY) {
    await videosService
      .searchVideos("")
      .then((response: ResponseData) => {
        storeVideos.dispatch(setVideos(response.data));
      })
      .catch((error: any) => {
        alert("Error: " + error.summary)
      });
  }
};

getInitialVideos();
