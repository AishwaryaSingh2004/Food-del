/*import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux"; // ✅ FIXED
import { setShopInMyCity } from "../redux/userSlice";   // ✅ FIXED

function useGetItemsByCity() {

  const dispatch = useDispatch();
  const { currentCity } = useSelector(state => state.user);

  useEffect(() => {

    console.log("GetCurrentUser running");

    const fetchItems = async () => {
      try {

        const result = await axios.get(
          `${serverUrl}/api/item/get-by-city/${currentCity}`,
          { withCredentials: true }
        );

        dispatch(setItemsInMyCity(result.data)); // ✅ FIXED
        console.log("User data:", result.data);

      } catch (error) {
        console.log("No logged in user");
      }
    };

    fetchItems(); // ✅ FIXED

  }, [dispatch, currentCity]); // ✅ FIXED dependency

  return null;
};

export default useGetItemsByCity;*/


import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setItemsInMyCity } from "../redux/userSlice"; // ✅ FIXED IMPORT

function useGetItemsByCity() {

  const dispatch = useDispatch();
  const { currentCity } = useSelector(state => state.user);

  useEffect(() => {

    console.log("GetCurrentUser running");

    const fetchItems = async () => {
      try {

        const result = await axios.get(
          `${serverUrl}/api/item/get-by-city/${currentCity}`
        ); // ✅ REMOVED withCredentials

        dispatch(setItemsInMyCity(result.data));
        console.log("User data:", result.data);

      } catch (error) {
        console.log(error.response?.data || error.message); // ✅ FIXED LOG
      }
    };

    if (currentCity) {
      fetchItems();
    }

  }, [dispatch, currentCity]);

  return null;
};

export default useGetItemsByCity;
