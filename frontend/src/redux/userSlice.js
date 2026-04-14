/*
import { createSlice } from "@reduxjs/toolkit";


const savedUser = localStorage.getItem("user");

const initialState = {
  userData: savedUser ? JSON.parse(savedUser) : null,
  city: localStorage.getItem("city") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState:
  {
    userData:null,
    currentCity:null,
    currentState:null,
    currentAddress:null,
    shopInMyCity:null
  },
  reducers: {
    // ✅ Set user + persist
    setUserData: (state, action) => {
      state.userData = action.payload;
    
      // 🔥 persist user (fix refresh issue)
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    // ✅ Set city + persist
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;

      // 🔥 persist city (fix city not showing after refresh)
      localStorage.setItem("city", action.payload);
    },

    setCurrentState: (state, action) => {
      state.currentState = action.payload;

      // 🔥 persist city (fix city not showing after refresh)
      localStorage.setItem("state", action.payload);
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;

      // 🔥 persist city (fix city not showing after refresh)
      localStorage.setItem("address", action.payload);
    },

    setShopInMyCity: (state, action) => {
      state.currentShopInMyCity = action.payload;

      // 🔥 persist city (fix city not showing after refresh)
      localStorage.setItem("address", action.payload);
    },


    // ✅ Logout (important)
    logoutUser: (state) => {
      state.userData = null;
      state.city = null;

      localStorage.removeItem("user");
      localStorage.removeItem("city");
    },
  },
});

export const { setUserData, setCurrentAddress, setCurrentCity, setCurrentState, setShopInMyCity} = userSlice.actions;

export default userSlice.reducer;
*/


/*import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");

const initialState = {
  userData: savedUser ? JSON.parse(savedUser) : null,
  currentCity: localStorage.getItem("city") || null,
  currentState: localStorage.getItem("state") || null,
  currentAddress: localStorage.getItem("address") || null,
  shopInMyCity: null
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
      state.shopInMyCity = action.payload; // ✅ fixed key
    },
    setItemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload; // ✅ fixed key
    },

    logoutUser: (state) => {
      state.userData = null;
      state.currentCity = null; // ✅ fixed key

      localStorage.removeItem("user");
      localStorage.removeItem("city");
    },
  },
});

export const { setUserData, setCurrentAddress, setCurrentCity, setCurrentState, setShopInMyCity, setItemsInMyCity } = userSlice.actions;

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
  cartItems:[{
    id:null,
    name:null,
    price:null,
    image:null,
    shop:null,
    quantity:null,
    foodType:null
  }]
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

      localStorage.removeItem("user");
      localStorage.removeItem("city");
    },
    addToCart:(state,action)=>{
      const cartItem=action.payload
      const existingItem=state.cartItems.some(i=>i.id==cartItem.id)
      if(existingItem){
        existingItem.quantity+=cartItem.quantity
      }else{
        state.cartItems.push(cartItem)
      }
    }
  },
});

export const {
  setUserData,
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
  setShopInMyCity,
  setItemsInMyCity,
  addToCart
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
  cartItems: []   // ✅ FIXED (empty array)
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

      localStorage.removeItem("user");
      localStorage.removeItem("city");
    },

    addToCart: (state, action) => {
      const cartItem = action.payload;

      // ✅ FIX: use find instead of some
      const existingItem = state.cartItems.find(i => i.id === cartItem.id);

      if (existingItem) {
        existingItem.quantity += cartItem.quantity; // ✅ now works
      } else {
        state.cartItems.push(cartItem);
      }
      
    }
  },

      updateQuantity:{state,action}=>{
        const [id,quantity]=action.payload
        const item=state.cartItems.find(i=>i.id==id)
        if(item){
          item.quantity=quantity
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
  updateQuantity
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
  totalAmount:0
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
      localStorage.removeItem("user");
      localStorage.removeItem("city");
    },

    // ✅ ADD TO CART
    addToCart: (state, action) => {
      const cartItem = action.payload;

      const existingItem = state.cartItems.find(
        i => i.id === cartItem.id
      );

      if (existingItem) {
        existingItem.quantity += cartItem.quantity;
      } else {
        state.cartItems.push(cartItem);
      }

      state.totalAmount=state.cartItems.reduce((sum,i)=>sum+i.price.price*i.quantity,0)

    },

    // ✅ FIXED UPDATE QUANTITY
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.cartItems.find(i => i.id === id);

      if (item) {
        item.quantity = quantity;
      }
      state.totalAmount=state.cartItems.reduce((sum,i)=>sum+i.price.price*i.quantity,0)
    },

    removeCartItem:(state,action)=>{
      state.cartItems=state.cartItems.filter(i=>i.id!==action.payload)
      state.totalAmount=state.cartItems.reduce((sum,i)=>sum+i.price.price*i.quantity,0)
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
  removeCartItem
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
  totalAmount:0,
  myOrders:null
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
      localStorage.removeItem("user");
      localStorage.removeItem("city");
    },

    // ✅ FIXED ADD TO CART
    addToCart: (state, action) => {
      const cartItem = action.payload;

      const existingItem = state.cartItems.find(
        i => i.id === cartItem.id
      );

      if (existingItem) {
        existingItem.quantity += cartItem.quantity;
      } else {
        state.cartItems.push({
          ...cartItem,
          shop: cartItem.shop   // ✅ FIX: ensure shopId is stored
        });
      }

      // ✅ FIXED total calculation
      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + Number(i.price) * Number(i.quantity),
        0
      );
    },

    // ✅ FIXED UPDATE QUANTITY
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.cartItems.find(i => i.id === id);

      if (item) {
        item.quantity = quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + Number(i.price) * Number(i.quantity),
        0
      );
    },

    removeCartItem:(state,action)=>{
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload);

      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + Number(i.price) * Number(i.quantity),
        0
      );
    },

    setMyOrders:(state,action)=>{
      state.myOrders=action.payload
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
  setMyOrders
} = userSlice.actions;

export default userSlice.reducer;*/



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

export default userSlice.reducer;
