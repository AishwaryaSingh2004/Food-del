/*
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function useGetShopByCity() {

  const dispatch = useDispatch();
  const {currentCity}=useSelector(state=>state.user)
  useEffect(() => {

    console.log("GetCurrentUser running");

    const fetchShops = async () => {
      try {

        const result = await axios.get(
          `${serverUrl}/api/user/get-by-city/${currentCity}`,
          { withCredentials: true }
        );
        dispatch(setShopsInMyCity(result.data))
        console.log(result.data);

        console.log("User data:", result.data);   // 👈 ADD THIS

        dispatch(setUserData(result.data));

      } catch (error) {

        console.log("No logged in user");   // 👈 ADD THIS

      }
    };

    fetchUser();

  }, [dispatch]);

  return null;   // 👈 IMPORTANT

};

export default useGetShopByCity;*/

import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setShopInMyCity } from "../redux/userSlice";

function useGetShopByCity() {

  const dispatch = useDispatch();
  const { currentCity } = useSelector(state => state.user);

  useEffect(() => {

    console.log("GetCurrentUser running");

    const fetchShops = async () => {
      try {

        const result = await axios.get(
          `${serverUrl}/api/user/get-by-city/${currentCity}`
        );

        dispatch(setShopInMyCity(result.data));
        console.log("User data:", result.data);

      } catch (error) {
        console.log(error.response?.data || error.message); // ✅ FIXED
      }
    };

    if (currentCity) {
      fetchShops();
    }

  }, [dispatch, currentCity]);

  return null;
};

export default useGetShopByCity;