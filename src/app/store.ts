import { combineReducers, configureStore } from "@reduxjs/toolkit"
// import type { version } from "react"
import storage from 'redux-persist/lib/storage'
import { usersAPI } from "../features/users/usersAPI"
import {persistReducer, persistStore} from 'redux-persist'
import userSlice  from '../features/login/userSlice'
import { loginAPI } from "../features/login/loginAPI"
import { todoAPI } from "../features/todos/todosApi"

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    [usersAPI.reducerPath]: usersAPI.reducer,
    // More reducers below
    [loginAPI.reducerPath]: loginAPI.reducer,
    [todoAPI.reducerPath]: todoAPI.reducer,

    user: userSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,

    //middleware
    // The purpose of the middleware is because RTK Query APIs (usersAPI and loginAPI) ude it to handle caching, invallidation, polling and other features
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
    //for each reducer there must be a middleware
        .concat(usersAPI.middleware)
        .concat(loginAPI.middleware)
        .concat(todoAPI.middleware)
})

export const persistedStore = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
// The RootState had to be moved to its own ts file since there was a Your todosApi.ts imports this type from store.ts: But store.ts already imports todoAPI. That creates a circular dependency: since 
// store.ts imports todoAPI
// todosApi.ts imports store.ts
// todoAPI is accessed before it finishes initializing