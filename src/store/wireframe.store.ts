import { createSlice, configureStore } from "@reduxjs/toolkit";
import { storePlayerElement } from "./playerElement.store";

const INITIAL_WIREFRAME: any = "" 

const wireframeSlice = createSlice({
  name: "wireframe",
  initialState: {
    value: INITIAL_WIREFRAME,
  },
  reducers: {
    setWireframe: (state) => {
      state.value = storePlayerElement.getState().value
    },
  },
});

export const { setWireframe } = wireframeSlice.actions;

export const storeWireframe = configureStore({
  reducer: wireframeSlice.reducer,
});
