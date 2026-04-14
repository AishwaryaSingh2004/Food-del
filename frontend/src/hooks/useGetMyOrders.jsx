/*
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux"; // ✅ ADD
import { setMyShopData } from "../redux/ownerSlice";

const useGetMyOrders = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user); // ✅ ADD

  useEffect(() => {
    // 🚨 WAIT for user
    if (!userData) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/order/my-order`,
          { withCredentials: true }
        );

        console.log("SHOP DATA:", res.data); // ✅ DEBUG

        dispatch(setMyShopData(res.data));
      } catch (error) {
        console.log("Shop fetch failed:", error);
      }
    };

    fetchOrders();

  }, [userData]); // ✅ IMPORTANT

};

export default useGetMyOrders;*/


/*
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setMyOrders } from "../redux/userSlice"; // ✅ FIX

const useGetMyOrders = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/order/my-orders`, // ✅ FIX
          { withCredentials: true }
        );

        console.log("ORDERS:", res.data); // ✅ FIX

        dispatch(setMyOrders(res.data)); // ✅ FIX

      } catch (error) {
        console.log("Order fetch failed:", error); // ✅ FIX
      }
    };

    fetchOrders();

  }, [userData]);
};

export default useGetMyOrders;*/


/*
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setMyOrders } from "../redux/userSlice";

const useGetMyOrders = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData) return;

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${serverUrl}/api/order/user-orders`, // ✅ FIXED ROUTE
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ FIXED AUTH
            },
          }
        );

        console.log("ORDERS:", res.data);

        dispatch(setMyOrders(res.data));

      } catch (error) {
        console.log("Order fetch failed:", error.response?.data || error.message);
      }
    };

    fetchOrders();

  }, [userData, dispatch]);
};

export default useGetMyOrders;*/

/*
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setMyOrders } from "../redux/userSlice";

const useGetMyOrders = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!userData || !token) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/order/user-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("ORDERS:", res.data);

        // ✅ HANDLE BOTH CASES
        const orders = Array.isArray(res.data)
          ? res.data
          : res.data.orders || [];

        dispatch(setMyOrders(orders));

      } catch (error) {
        console.log(
          "Order fetch failed:",
          error.response?.data || error.message
        );
      }
    };

    fetchOrders();

  }, [userData, dispatch]);
};

export default useGetMyOrders;*/

/*
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setMyOrders } from "../redux/userSlice";

const useGetMyOrders = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!userData || !token) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/order/user-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("ORDERS:", res.data);

        // ✅ ALWAYS FORCE ARRAY (FINAL SAFE FIX)
        let orders = [];

        if (Array.isArray(res.data)) {
          orders = res.data;
        } else if (Array.isArray(res.data.orders)) {
          orders = res.data.orders;
        } else {
          orders = [];
        }

        dispatch(setMyOrders(orders));

      } catch (error) {
        console.log(
          "Order fetch failed:",
          error.response?.data || error.message
        );
      }
    };

    fetchOrders();

  }, [userData, dispatch]);
};

export default useGetMyOrders;*/



import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setMyOrders } from "../redux/userSlice";

const useGetMyOrders = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ Guard condition
    if (!userData || !token) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/order/user-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("ORDERS:", res.data);

        // ✅ FORCE SAFE ARRAY (handles all backend cases)
        let orders = [];

        if (Array.isArray(res.data)) {
          orders = res.data;
        } else if (res.data && Array.isArray(res.data.orders)) {
          orders = res.data.orders;
        } else {
          console.warn("Unexpected orders format:", res.data);
        }

        dispatch(setMyOrders(orders));

      } catch (error) {
        console.log(
          "Order fetch failed:",
          error.response?.data || error.message
        );

        // ✅ Prevent UI crash
        dispatch(setMyOrders([]));
      }
    };

    fetchOrders();

  }, [userData, dispatch]);
};

export default useGetMyOrders;
