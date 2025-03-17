import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist"; // ✅ Import persistStore
import placeReducer from "./Slice/placeSlice";
import cityReducer from "./Slice/citySlice";
import authReducer from "./Slice/AuthSlice";
import adminReducer from "./Slice/adminSlice";
import adminCitySlice from "./Slice/adminCitySlice";
import adminPlaceSlice from "./Slice/adminPlaceSlice";
// ✅ Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // ✅ Persist only auth state
};

// ✅ Combine reducers
const rootReducer = combineReducers({
  places: placeReducer,
  city: cityReducer,
  auth: authReducer,
  admin: adminReducer,
  adminCity: adminCitySlice,
  adminPlaces: adminPlaceSlice,
});

// ✅ Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Avoid serialization warnings
    }),
});

// ✅ Create persistor
export const persistor = persistStore(store); // ✅ Ensure persistor is correctly defined

export default store;
