import  authSlice  from "./reducers/authReducer.js"
import  basketSlice  from "./reducers/basketReducer.js"
import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

export const store = configureStore({
  reducer: {
    auth: persistReducer({key: 'auth', storage}, authSlice),
    basket: persistReducer({key: "basket", storage}, basketSlice)
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}}),
        ],
})
const persistor = persistStore(store)

store.subscribe(() => console.log(store.getState()))

export default store; 