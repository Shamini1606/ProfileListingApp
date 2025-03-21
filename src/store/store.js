// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import profilesReducer from "./profilesSlice";

const store = configureStore({
  reducer: {
    profiles: profilesReducer,
  },
});

export default store;
