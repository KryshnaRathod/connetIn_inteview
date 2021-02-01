import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { userDataSlice } from './userDataSlice';
import { postDataSlice } from './postDataSlice';


const rootReducer = combineReducers({
    users: userDataSlice.reducer,
    posts: postDataSlice.reducer,
})
export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})