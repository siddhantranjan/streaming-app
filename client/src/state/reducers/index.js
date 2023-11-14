import { combineReducers } from "redux";
import streamSlice from "./stream-slice";
import userSlice from "./user-slice";

export const rootReducer = combineReducers({
    users: userSlice,
    streams: streamSlice
})