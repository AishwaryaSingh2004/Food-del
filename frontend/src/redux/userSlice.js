
/*
import { createSlice } from "@reduxjs/toolkit";
import { updateorderStatus } from "../../../backend/controllers/order.controller";

const savedUser = localStorage.getItem("user");

const initialState = {
  userData: savedUser ? JSON.parse(savedUser) : null,
  currentCity: localStorage.getItem("city") || null,
  currentState: localStorage.getItem("state") || null,
  currentAddress: localStorage.getItem("address") || null,
  shopInMyCity: null,
  itemsInMyCity: null,
  cartItems: [],
  totalAmount: 0,

  // ✅ FIX: must be array
  myOrders: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
      localStorage.setItem("city", action.payload);
    },

    setCurrentState: (state, action) => {
      state.currentState = action.payload;
      localStorage.setItem("state", action.payload);
    },

    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
      localStorage.setItem("address", action.payload);
    },

    setShopInMyCity: (state, action) => {
      state.shopInMyCity = action.payload;
    },

    setItemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload;
    },

    logoutUser: (state) => {
      state.userData = null;
      state.currentCity = null;
      state.myOrders = []; // ✅ FIX
      localStorage.removeItem("user");
      localStorage.removeItem("city");
    },

    // ✅ ADD TO CART (FIXED ID)
    addToCart: (state, action) => {
      const cartItem = action.payload;

      const existingItem = state.cartItems.find(
        i => i._id === cartItem._id
      );

      if (existingItem) {
        existingItem.quantity += cartItem.quantity;
      } else {
        state.cartItems.push({
          ...cartItem,
          shop: cartItem.shop
        });
      }

      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + Number(i.price) * Number(i.quantity),
        0
      );
    },

    // ✅ UPDATE QUANTITY (FIXED ID)
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;

      const item = state.cartItems.find(i => i._id === _id);

      if (item) {
        item.quantity = quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + Number(i.price) * Number(i.quantity),
        0
      );
    },

    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        i => i._id !== action.payload
      );

      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + Number(i.price) * Number(i.quantity),
        0
      );
    },

    // ✅ IMPORTANT
    setMyOrders: (state, action) => {
      state.myOrders = action.payload || [];
    },

    addMyOrder:(state,action)=>{
      state.myOrders=[action.payload,...state.myOrders]
    },


   updateorderStatus: (state, action) => {
  const { orderId, shopId, status } = action.payload;

  const order = state.myOrders.find(o => o._id === orderId);

  if (order) {
    const shopOrder = order.shopOrders.find(
      s => s.shop === shopId || s.shop?._id === shopId
    );

    if (shopOrder) {
      shopOrder.status = status;
    }
  }
}

  }
});

export const {
  setUserData,
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
  setShopInMyCity,
  setItemsInMyCity,
  addToCart,
  updateQuantity,
  removeCartItem,
  setMyOrders,
  addMyOrder,
  updateorderStatus
} = userSlice.actions;

export default userSlice.reducer;*/



/*
import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");

const initialState = {
  userData: savedUser ? JSON.parse(savedUser) : null,
  currentCity: localStorage.getItem("city") || null,
  currentState: localStorage.getItem("state") || null,
  currentAddress: localStorage.getItem("address") || null,
  shopInMyCity: null,
  itemsInMyCity: null,
  cartItems: [],
  totalAmount: 0,
  myOrders: [],
  searchItems:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
      localStorage.setItem("city", action.payload);
    },

    setCurrentState: (state, action) => {
      state.currentState = action.payload;
      localStorage.setItem("state", action.payload);
    },

    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
      localStorage.setItem("address", action.payload);
    },

    setShopInMyCity: (state, action) => {
      state.shopInMyCity = action.payload;
    },

    setItemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload;
    },

    logoutUser: (state) => {
      state.userData = null;
      state.currentCity = null;
      state.myOrders = [];
      localStorage.removeItem("user");
      localStorage.removeItem("city");
    },

    // ✅ ADD TO CART
    addToCart: (state, action) => {
      const cartItem = action.payload;

      const existingItem = state.cartItems.find(
        i => i._id === cartItem._id
      );

      if (existingItem) {
        existingItem.quantity += cartItem.quantity;
      } else {
        state.cartItems.push({
          ...cartItem,
          shop: cartItem.shop
        });
      }

      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + Number(i.price) * Number(i.quantity),
        0
      );
    },

    // ✅ UPDATE QUANTITY
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;

      const item = state.cartItems.find(i => i._id === _id);

      if (item) {
        item.quantity = quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + Number(i.price) * Number(i.quantity),
        0
      );
    },

    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        i => i._id !== action.payload
      );

      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + Number(i.price) * Number(i.quantity),
        0
      );
    },

    setMyOrders: (state, action) => {
      state.myOrders = action.payload || [];
    },

    addMyOrder: (state, action) => {
      state.myOrders = [action.payload, ...state.myOrders];
    },

    // ✅ FINAL FIXED STATUS UPDATE
    updateorderStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;

      const order = state.myOrders.find(o => o._id === orderId);

      if (order) {
        const shopOrder = order.shopOrders.find(
          s => s.shop === shopId || s.shop?._id === shopId
        );

        if (shopOrder) {
          shopOrder.status = status;
        }
      }
    },
    setSearchItems:(state,action)=>{
      state.searchItems=action.payload
    }
  }
});

export const {
  setUserData,
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
  setShopInMyCity,
  setItemsInMyCity,
  addToCart,
  updateQuantity,
  removeCartItem,
  setMyOrders,
  addMyOrder,
  updateorderStatus,
  setSearchItems
} = userSlice.actions;

export default userSlice.reducer;*/




/*
import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");
const savedCart = localStorage.getItem("cart");

const initialState = {
  userData: savedUser ? JSON.parse(savedUser) : null,
  currentCity: localStorage.getItem("city") || null,
  currentState: localStorage.getItem("state") || null,
  currentAddress: localStorage.getItem("address") || null,
  shopInMyCity: null,
  itemsInMyCity: null,
  cartItems: savedCart ? JSON.parse(savedCart) : [],
  totalAmount: 0,
  myOrders: [],
  searchItems: [],
  socket:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
      localStorage.setItem("city", action.payload);
    },

    setCurrentState: (state, action) => {
      state.currentState = action.payload;
      localStorage.setItem("state", action.payload);
    },

    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
      localStorage.setItem("address", action.payload);
    },

    setShopInMyCity: (state, action) => {
      state.shopInMyCity = action.payload;
    },

    setItemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload;
    },

     setSocket: (state, action) => {
      state.socket = action.payload;
    },

    logoutUser: (state) => {
      state.userData = null;
      state.currentCity = null;
      state.currentState = null;
      state.currentAddress = null;
      state.myOrders = [];
      state.cartItems = [];
      state.totalAmount = 0;

      localStorage.removeItem("user");
      localStorage.removeItem("city");
      localStorage.removeItem("state");
      localStorage.removeItem("address");
      localStorage.removeItem("cart");
    },

    // ✅ ADD TO CART
    addToCart: (state, action) => {
      const cartItem = action.payload;

      const existingItem = state.cartItems.find(
        i => i._id === cartItem._id
      );

      if (existingItem) {
        existingItem.quantity += cartItem.quantity;
      } else {
        state.cartItems.push({
          ...cartItem,
          shop: cartItem.shop
        });
      }

      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + Number(i.price) * Number(i.quantity),
        0
      );

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    // ✅ UPDATE QUANTITY
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;

      const item = state.cartItems.find(i => i._id === _id);

      if (item) {
        item.quantity = quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + Number(i.price) * Number(i.quantity),
        0
      );

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        i => i._id !== action.payload
      );

      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + Number(i.price) * Number(i.quantity),
        0
      );

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setMyOrders: (state, action) => {
      state.myOrders = action.payload || [];
    },

    addMyOrder: (state, action) => {
      state.myOrders = [action.payload, ...state.myOrders];
    },

    updateorderStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;

      const order = state.myOrders.find(o => o._id === orderId);

      if (order) {
        const shopOrder = order.shopOrders.find(
          s => s.shop === shopId || s.shop?._id === shopId
        );

        if (shopOrder) {
          shopOrder.status = status;
        }
      }
    },

    setSearchItems: (state, action) => {
      state.searchItems = action.payload || [];
    }
  }
});

export const {
  setUserData,
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
  setShopInMyCity,
  setItemsInMyCity,
  addToCart,
  updateQuantity,
  removeCartItem,
  setMyOrders,
  addMyOrder,
  updateorderStatus,
  setSearchItems,
  setSocket
} = userSlice.actions;

export default userSlice.reducer;
*/

import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");
const savedCart = localStorage.getItem("cart");

const parsedCart = savedCart ? JSON.parse(savedCart) : [];

// ✅ FIX: calculate total on reload
const calculateTotal = (cart) => {
  return cart.reduce(
    (sum, i) => sum + Number(i.price) * Number(i.quantity),
    0
  );
};

const initialState = {
  userData: savedUser ? JSON.parse(savedUser) : null,
  currentCity: localStorage.getItem("city") || null,
  currentState: localStorage.getItem("state") || null,
  currentAddress: localStorage.getItem("address") || null,
  shopInMyCity: null,
  itemsInMyCity: null,
  cartItems: parsedCart,
  totalAmount: calculateTotal(parsedCart), // ✅ FIX
  myOrders: [],
  searchItems: [],
  socket: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
      localStorage.setItem("city", action.payload);
    },

    setCurrentState: (state, action) => {
      state.currentState = action.payload;
      localStorage.setItem("state", action.payload);
    },

    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
      localStorage.setItem("address", action.payload);
    },

    setShopInMyCity: (state, action) => {
      state.shopInMyCity = action.payload;
    },

    setItemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload;
    },

    setSocket: (state, action) => {
      state.socket = action.payload;
    },

    logoutUser: (state) => {
      state.userData = null;
      state.currentCity = null;
      state.currentState = null;
      state.currentAddress = null;
      state.myOrders = [];
      state.cartItems = [];
      state.totalAmount = 0;

      localStorage.removeItem("user");
      localStorage.removeItem("city");
      localStorage.removeItem("state");
      localStorage.removeItem("address");
      localStorage.removeItem("cart");
    },

    // ✅ ADD TO CART
    addToCart: (state, action) => {
      const cartItem = action.payload;

      const existingItem = state.cartItems.find(
        i => i._id === cartItem._id
      );

      if (existingItem) {
        existingItem.quantity += cartItem.quantity;
      } else {
        state.cartItems.push({
          ...cartItem,
          shop: cartItem.shop
        });
      }

      state.totalAmount = calculateTotal(state.cartItems);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    // ✅ UPDATE QUANTITY
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;

      const item = state.cartItems.find(i => i._id === _id);

      if (item) {
        item.quantity = quantity;
      }

      state.totalAmount = calculateTotal(state.cartItems);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        i => i._id !== action.payload
      );

      state.totalAmount = calculateTotal(state.cartItems);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setMyOrders: (state, action) => {
      state.myOrders = action.payload || [];
    },

    addMyOrder: (state, action) => {
      state.myOrders = [action.payload, ...state.myOrders];
    },

    updateorderStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;

      const order = state.myOrders.find(o => o._id === orderId);

      if (order) {
        const shopOrder = order.shopOrders.find(
          s => s.shop === shopId || s.shop?._id === shopId
        );

        if (shopOrder) {
          shopOrder.status = status;
        }
      }
    },

    setSearchItems: (state, action) => {
      state.searchItems = action.payload || [];
    }
  }
});

export const {
  setUserData,
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
  setShopInMyCity,
  setItemsInMyCity,
  addToCart,
  updateQuantity,
  removeCartItem,
  setMyOrders,
  addMyOrder,
  updateorderStatus,
  setSearchItems,
  setSocket
} = userSlice.actions;

export default userSlice.reducer;