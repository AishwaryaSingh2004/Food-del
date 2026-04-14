/*import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import ownerSlice from "./ownerSlice"
export const store=configureStore({
    reducer:{
        user:userSlice,
        owner:ownerSlice
    }
})*/


import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import ownerSlice from "./ownerSlice";
import mapSlice from "./mapSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    owner: ownerSlice,
    map: mapSlice
  },
  devTools: true, // ✅ IMPORTANT (this enables Redux DevTools like left side)
});