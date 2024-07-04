import { createSlice, configureStore } from "@reduxjs/toolkit";
import { setWireframe, storeWireframe } from "./wireframe.store";

const INITIAL_PLAYER: string = "";

const playerElementSlice = createSlice({
  name: "playerElement",
  initialState: {
    value: INITIAL_PLAYER,
  },
  reducers: {
    setPlayerElement: (state, payload: any) => {
      state.value = payload;
    },
  },
});

export const { setPlayerElement } = playerElementSlice.actions;

export const storePlayerElement = configureStore({
  reducer: playerElementSlice.reducer,
});

storePlayerElement.subscribe(() => {
  storeWireframe.dispatch(setWireframe());
});
