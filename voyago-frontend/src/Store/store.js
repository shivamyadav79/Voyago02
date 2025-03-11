import { configureStore } from "@reduxjs/toolkit";
import placeReducer from "./Slice/placeSlice";
import cityReducer from "./Slice/citySlice";

const store = configureStore({
  reducer: {
    places: placeReducer,
    city: cityReducer,
  },
});

export default store;
