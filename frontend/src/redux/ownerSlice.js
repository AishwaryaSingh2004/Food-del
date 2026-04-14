
import { createSlice } from "@reduxjs/toolkit";

// 🔥 Load user from localStorage (for refresh fix)
const savedUser = localStorage.getItem("user");

const initialState = {
  userData: savedUser ? JSON.parse(savedUser) : null,
  city: localStorage.getItem("city") || null,
};

const ownerSlice = createSlice({
  name: "owner",
  initialState:{
    myShopData:null
  },
  reducers:{
    setMyShopData:(state,action)=>{
        state.myShopData=action.payload
    }
  }    
})
export const {setMyShopData} = ownerSlice.actions;
export default ownerSlice.reducer;