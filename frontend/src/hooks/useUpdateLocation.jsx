/*
import { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice";

import { setLocation, setAddress } from "../redux/mapSlice";

const useUpdateLocation = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);


  // ✅ THIS PREVENTS DOUBLE CALL
  const hasFetched = useRef(false);

  useEffect(() => {
    const updateLocation=async (lat,lon) => {
        const result=await axios.post(`${serverUrl}/api/user/update-location`,{lat,lon},
            {withCredentials:true})
            console.log(result.data);
    }

    navigator.geolocation.watchPosition((pos)=>{
        updateLocation(pos.coords.latitude,pos.coords.longitude)
    })

  }, [userData]);


};

export default useUpdateLocation;*/




/*
import { useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { serverUrl } from "../App";

const useUpdateLocation = () => {
  const { userData } = useSelector((state) => state.user);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!userData || hasFetched.current) return;

    if (!navigator.geolocation) return;

    hasFetched.current = true;

    const updateLocation = async (lat, lon) => {
      console.log("SENDING:", lat, lon); // 🔥 debug

      try {
        const result = await axios.post(
          `${serverUrl}/api/user/update-location`,
          { lat, lon },
          { withCredentials: true }
        );

        console.log(result.data); // ✅ should print "location updated"
      } catch (err) {
        console.log("ERROR:", err.response?.data);
      }
    };

    // ✅ FIX: use getCurrentPosition (stable, single call)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        // ✅ IMPORTANT validation
        if (lat !== undefined && lon !== undefined) {
          updateLocation(lat, lon);
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }, [userData]);
};

export default useUpdateLocation;*/



import { useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { serverUrl } from "../App";

const useUpdateLocation = () => {
  const { userData } = useSelector((state) => state.user);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!userData || hasFetched.current) return;
    if (!navigator.geolocation) return;

    hasFetched.current = true;

    const updateLocation = async (lat, lon) => {
      console.log("SENDING:", lat, lon);

      try {
        const token = localStorage.getItem("token"); // ✅ GET TOKEN

        const result = await axios.post(
          `${serverUrl}/api/user/update-location`,
          { lat, lon },
          {
            headers: {
              Authorization: `Bearer ${token}` // ✅ SEND TOKEN
            }
          }
        );

        console.log("SUCCESS:", result.data);

      } catch (err) {
        console.log("ERROR:", err.response?.data);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        if (lat !== undefined && lon !== undefined) {
          updateLocation(lat, lon);
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }, [userData]);
};

export default useUpdateLocation;