/*import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",

  initialState: {
    location: {
      lat: null,
      lon: null
    },
    address: null
  },

  reducers: {
    // ✅ FIXED
    setLocation: (state, action) => {
      const { lat, lon } = action.payload;
      state.location.lat = lat;
      state.location.lon = lon;
    },

    // ✅ FIXED
    setAddress: (state, action) => {
      state.address = action.payload;
    }
  }
});

// ✅ EXPORT ACTIONS (FIXED)
export const { setLocation, setAddress } = mapSlice.actions;

// ✅ EXPORT REDUCER
export default mapSlice.reducer;*/

/*
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: {
    lat: 26.6112,   // ✅ DEFAULT LOCATION (VERY IMPORTANT)
    lon: 81.3589
  },
  address: ""
};

const mapSlice = createSlice({
  name: "map",
  initialState,

  reducers: {

    // ✅ SET LOCATION (CLEAN & SAFE)
    setLocation: (state, action) => {
      const { lat, lon } = action.payload;

      state.location = {
        lat,
        lon
      };
    },

    // ✅ SET ADDRESS
    setAddress: (state, action) => {
      state.address = action.payload || "";
    },

    // 🔥 OPTIONAL (VERY USEFUL)
    resetLocation: (state) => {
      state.location = {
        lat: 26.6112,
        lon: 81.3589
      };
      state.address = "";
    }
  }
});

// ✅ EXPORT ACTIONS
export const { setLocation, setAddress, resetLocation } = mapSlice.actions;

// ✅ EXPORT REDUCER
export default mapSlice.reducer;*/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: {
    lat: 26.6112,   // ✅ default location
    lon: 81.3589
  },
  address: ""
};

const mapSlice = createSlice({
  name: "map",
  initialState,

  reducers: {

    // ✅ FIXED (BEST WAY)
    setLocation: (state, action) => {
      const { lat, lon } = action.payload;

      state.location = {
        lat: lat,
        lon: lon
      };
    },

    // ✅ SET ADDRESS
    setAddress: (state, action) => {
      state.address = action.payload || "";
    },

    // ✅ RESET LOCATION
    resetLocation: (state) => {
      state.location = {
        lat: 26.6112,
        lon: 81.3589
      };
      state.address = "";
    }
  }
});

// ✅ EXPORT ACTIONS
export const { setLocation, setAddress, resetLocation } = mapSlice.actions;

// ✅ EXPORT REDUCER
export default mapSlice.reducer;


