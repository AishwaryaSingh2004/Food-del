/*import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const GetCurrentUser = () => {
  const dispatch=useDispatch()

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/current`,
          { withCredentials: true }
        );
        dispatch(setUserData(result.data))

      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();

  }, []);

};

export default GetCurrentUser;*/

/*
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const GetCurrentUser = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    console.log("GetCurrentUser running");

    const fetchUser = async () => {
      try {

        const result = await axios.get(
          `${serverUrl}/api/user/current`,
          { withCredentials: true }
        );

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

export default GetCurrentUser;




/*
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const GetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    console.log("GetCurrentUser running");

    const fetchUser = async () => {
      try {

        const result = await axios.get(
          `${serverUrl}/api/user/current`,
          { withCredentials: true }
        );

        console.log("User data:", result.data);

        dispatch(setUserData(result.data));

      } catch (error) {

        console.log("ERROR:", error.response?.data || error.message);

      }
    };

    fetchUser();

  }, [dispatch]);

  return null;
};

export default GetCurrentUser;*/


import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const GetCurrentUser = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    console.log("GetCurrentUser running");

    const fetchUser = async () => {
      try {

        // ✅ GET TOKEN FROM LOCALSTORAGE
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          return;
        }

        const result = await axios.get(
          `${serverUrl}/api/user/current`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ FIXED
            },
          }
        );

        console.log("User data:", result.data);

        dispatch(setUserData(result.data));

      } catch (error) {

        console.log(
          "ERROR:",
          error.response?.data || error.message
        );

      }
    };

    fetchUser();

  }, [dispatch]);

  return null;
};

export default GetCurrentUser;