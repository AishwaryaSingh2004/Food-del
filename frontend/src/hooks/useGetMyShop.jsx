/*
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { setMyShopData } from "../redux/ownerSlice";

const useGetMyShop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/shop/get-my`,
          { withCredentials: true }
        );

        dispatch(setMyShopData(res.data));
      } catch (error) {
        // ❌ DO NOT overwrite user if API fails
        console.log("Auth check failed (using localStorage instead)");
      }
    };

    fetchShop()

  }, [])

};

export default useGetMyShop;*/

/*
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux"; // ✅ ADD
import { setMyShopData } from "../redux/ownerSlice";

const useGetMyShop = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user); // ✅ ADD

  useEffect(() => {
    // 🚨 WAIT for user
    if (!userData) return;

    const fetchShop = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/shop/get-my`,
          { withCredentials: true }
        );

        console.log("SHOP DATA:", res.data); // ✅ DEBUG

        dispatch(setMyShopData(res.data));
      } catch (error) {
        console.log("Shop fetch failed:", error);
      }
    };

    fetchShop();

  }, [userData]); // ✅ IMPORTANT

};

export default useGetMyShop;*/

import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

const useGetMyShop = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    // 🚨 WAIT for user
    if (!userData) return;

    const fetchShop = async () => {
      try {

        // ✅ GET TOKEN
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          return;
        }

        const res = await axios.get(
          `${serverUrl}/api/shop/get-my`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ FIXED
            },
          }
        );

        console.log("SHOP DATA:", res.data);

        dispatch(setMyShopData(res.data));

      } catch (error) {
        console.log(
          "Shop fetch failed:",
          error.response?.data || error.message
        );
      }
    };

    fetchShop();

  }, [userData, dispatch]); // ✅ include dispatch

};

export default useGetMyShop;