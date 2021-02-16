import { configureStore } from "@reduxjs/toolkit";

import character from "./reducers/character";

const store = configureStore({
  reducer: {
    character
  }
});

export type RootState = ReturnType<typeof store.getState>
export type StoreDispatch = typeof store.dispatch

export default store;