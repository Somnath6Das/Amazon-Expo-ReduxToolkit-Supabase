import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import authReducer from "./authSlice";
import cartReducer from "./cardSlice"; // You might want to rename this to cartSlice for clarity
import orderCountSlice from "./orderCountSlice";

// ✅ Only persist cart
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  auth: authReducer, // not persisted
  cart: cartReducer, // persisted
  orderCount: orderCountSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // needed for redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Export both store and persistor
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
