import { configureStore } from "@reduxjs/toolkit";
import placeReducer from "./Slice/placeSlice";
import cityReducer from "./Slice/citySlice";
import authReducer from "./Slice/AuthSlice";

const store = configureStore({
  reducer: {
    places: placeReducer,
    city: cityReducer,
    auth: authReducer,
  },
});

export default store;
