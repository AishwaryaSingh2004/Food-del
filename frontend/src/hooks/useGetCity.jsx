

/*
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCity, setState } from "../redux/userSlice";

const useGetCity = () => {
  const dispatch = useDispatch();
  const { userData, city } = useSelector((state) => state.user);

  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  useEffect(() => {
    // ✅ 1. Run only if user is logged in
    if (!userData) return;

    // ✅ 2. Prevent refetch if city already exists (IMPORTANT FIX)
    if (city) return;

    // ✅ 3. Check geolocation support
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      dispatch(setCity("Location not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          );

          console.log("City Data:", result.data);

          const cityName =
            result?.data?.results?.[0]?.city ||
            result?.data?.results?.[0]?.state ||
            result?.data?.results?.[0]?.county ||
            "Unknown";

          // ✅ 4. Dispatch only if valid
          if (cityName) {
            dispatch(setCity(cityName));
          }
        } catch (error) {
          console.log("Error fetching city:", error);
          dispatch(setCity("Unable to detect"));
        }
      },
      (error) => {
        console.log("Location permission denied", error);

        // ✅ 5. Handle permission denied properly
        dispatch(setCity(result?.data?.results[0].city ));
        dispatch(setState(result?.data?.results[0].state ));
        console.log(result?.data?.results[0].state );
      }
    );
  }, [userData, city, dispatch, apiKey]);

  return null;
};

export default useGetCity;*/
/*
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentAddress, setCurrentCity, setCurrentState } from "../redux/userSlice";

const useGetCity = () => {
  const dispatch = useDispatch();
  const { userData, city } = useSelector((state) => state.user);

  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  useEffect(() => {
    console.log( { userData, city });

    if (!userData) return;

    // ✅ FIXED CONDITION
    if (city && city !== "Unknown" && city !== "Permission denied") return;

    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      dispatch(setCurrentCity("Location not supported"));
      dispatch(setCurrentState("Unknown"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log("LOCATION SUCCESS", position);

        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          );

          console.log("City Data:", result.data);

          const data = result?.data?.results?.[0];

          const cityName =
            data?.city || data?.state || data?.county || "Unknown";

          dispatch(setCity(cityName));
          dispatch(setState(data?.state || "Unknown"));

        } catch (error) {
          console.log("Error fetching city:", error);
          dispatch(setCity("Unable to detect"));
          dispatch(setState("Unknown"));
        }
      },
      (error) => {
        console.log("LOCATION ERROR:", error);

        dispatch(setCurrentCity("Permission denied"));
        dispatch(setCurrentState("Unknown"));
      }
    );
  }, [userData, city, dispatch, apiKey]);

  return null;
};

export default useGetCity;*/

/*
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice";

const useGetCity = () => {
  const dispatch = useDispatch();

  // ✅ FIXED: correct state name
  const { userData, currentCity } = useSelector((state) => state.user);

  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  useEffect(() => {
    console.log({ userData, currentCity });

    if (!userData) return;

    // ✅ FIXED condition
    if (
      currentCity &&
      currentCity !== "Unknown" &&
      currentCity !== "Permission denied"
    )
      return;

    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      dispatch(setCurrentCity("Location not supported"));
      dispatch(setCurrentState("Unknown"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log("LOCATION SUCCESS", position);

        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          dispatch(setLocation({lat:latitude,lon:longitude}))

          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          );

          console.log("City Data:", result.data);

          const data = result?.data?.results?.[0];

          const cityName =
            data?.city || data?.state || data?.county || "Unknown";

          // ✅ FIXED dispatch
          dispatch(setCurrentCity(cityName));
          dispatch(setCurrentState(data?.state || "Unknown"));
          dispatch(
            setCurrentAddress(
              data?.formatted || `${cityName}, ${data?.state || ""}`
            )
          );
        } catch (error) {
          console.log("Error fetching city:", error);
          dispatch(setCurrentCity("Unable to detect"));
          dispatch(setCurrentState("Unknown"));
        }
      },
      (error) => {
        console.log("LOCATION ERROR:", error);

        dispatch(setCurrentCity("Permission denied"));
        dispatch(setCurrentState("Unknown"));
      }
    );
    console.log(result.data.results[0] );
  }, [userData, currentCity, dispatch, apiKey]);

  return null;
};

export default useGetCity;*/

/*
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice";

// ✅ IMPORT THIS
import { setLocation } from "../redux/mapSlice";

const useGetCity = () => {
  const dispatch = useDispatch();

  const { userData, currentCity } = useSelector((state) => state.user);

  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  useEffect(() => {
    console.log({ userData, currentCity });

    if (!userData) return;

    if (
      currentCity &&
      currentCity !== "Unknown" &&
      currentCity !== "Permission denied"
    )
      return;

    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      dispatch(setCurrentCity("Location not supported"));
      dispatch(setCurrentState("Unknown"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log("LOCATION SUCCESS", position);

        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // ✅ SAVE LOCATION IN REDUX
          dispatch(setLocation({ lat: latitude, lon: longitude }));

          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          );

          console.log("City Data:", result.data);

          const data = result?.data?.results?.[0];

          const cityName =
            data?.city || data?.state || data?.county || "Unknown";

          dispatch(setCurrentCity(cityName));
          dispatch(setCurrentState(data?.state || "Unknown"));

          dispatch(
            setCurrentAddress(
              data?.formatted || `${cityName}, ${data?.state || ""}`
            )
          );

        } catch (error) {
          console.log("Error fetching city:", error);
          dispatch(setCurrentCity("Unable to detect"));
          dispatch(setCurrentState("Unknown"));
        }
      },
      (error) => {
        console.log("LOCATION ERROR:", error);

        dispatch(setCurrentCity("Permission denied"));
        dispatch(setCurrentState("Unknown"));
      }
    );

  }, [userData, currentCity, dispatch, apiKey]);

  return null;
};

export default useGetCity;*/

/*
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice";

import { setLocation } from "../redux/mapSlice";

const useGetCity = () => {
  const dispatch = useDispatch();

  const { userData, currentCity } = useSelector((state) => state.user);

  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  useEffect(() => {
    console.log({ userData, currentCity });

    if (!userData) return;

    if (
      currentCity &&
      currentCity !== "Unknown" &&
      currentCity !== "Permission denied"
    )
      return;

    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      dispatch(setCurrentCity("Location not supported"));
      dispatch(setCurrentState("Unknown"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log("LOCATION SUCCESS", position);

        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          dispatch(setLocation({ lat: latitude, lon: longitude }));

          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          );

          // ✅ EXACT LIKE VIDEO
          console.log(result.data.results[0]);

          const data = result?.data?.results?.[0];

          const cityName =
            data?.city || data?.state || data?.county || "Unknown";

          dispatch(setCurrentCity(cityName));
          dispatch(setCurrentState(data?.state || "Unknown"));

          dispatch(
            setCurrentAddress(
              data?.formatted || `${cityName}, ${data?.state || ""}`
            )
          );

        } catch (error) {
          console.log("Error fetching city:", error);
          dispatch(setCurrentCity("Unable to detect"));
          dispatch(setCurrentState("Unknown"));
        }
      },
      (error) => {
        console.log("LOCATION ERROR:", error);

        dispatch(setCurrentCity("Permission denied"));
        dispatch(setCurrentState("Unknown"));
      }
    );

  }, [userData, currentCity, dispatch, apiKey]);

  return null;
};

export default useGetCity;*/


/*
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice";
import { setLocation } from "../redux/mapSlice";

const useGetCity = () => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);

  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  useEffect(() => {
    if (!userData) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // ✅ Save lat/lon
          dispatch(setLocation({ lat: latitude, lon: longitude }));

          // ✅ API call
          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          );

          // ✅ EXACT SAME CONSOLE AS VIDEO
         // console.log(result.data.results[0]);
         console.log(result.data.results[0].address_line2);

          const data = result?.data?.results?.[0];

          // ✅ Save city/state
          dispatch(setCurrentCity(data?.city));
          dispatch(setCurrentState(data?.state));

          // ✅ Save address
          dispatch(
            setCurrentAddress(
              data?.address_line2 || data?.address_line1
            )
          );

        } catch (error) {
          console.log(error);
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }, [userData]);

  return null;
};

export default useGetCity;*/

/*
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice";

// ✅ IMPORTANT: add setAddress
import { setLocation, setAddress } from "../redux/mapSlice";

const useGetCity = () => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);

  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  useEffect(() => {
    if (!userData) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // ✅ Save lat/lon
          dispatch(setLocation({ lat: latitude, lon: longitude }));

          // ✅ API call
          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          );

          const data = result?.data?.results?.[0];

          // ✅ SAME CONSOLE AS VIDEO
          console.log(data);

          // ✅ Save city/state
          dispatch(setCurrentCity(data?.city));
          dispatch(setCurrentState(data?.state));

          // ✅ MAIN FIX (FULL ADDRESS)
          dispatch(setCurrentAddress(data?.formatted));
          dispatch(setAddress(data?.formatted)); // 🔥 VERY IMPORTANT

        } catch (error) {
          console.log(error);
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }, [userData]);

  return null;
};

export default useGetCity;*/

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

const useGetCity = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  // ✅ THIS PREVENTS DOUBLE CALL
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!userData || hasFetched.current) return;

    hasFetched.current = true; // 🔥 STOP SECOND CALL

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // ✅ Save lat/lon
          dispatch(setLocation({ lat: latitude, lon: longitude }));

          // ✅ API call
          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          );

          const data = result?.data?.results?.[0];

          console.log("CITY DATA:", data);

          // ✅ Save city/state
          dispatch(setCurrentCity(data?.city));
          dispatch(setCurrentState(data?.state));

          // ✅ Save full address
          dispatch(setCurrentAddress(data?.formatted));
          dispatch(setAddress(data?.formatted)();

        } catch (error) {
          console.log(error);
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }, [userData, dispatch, apiKey]);

  return null;
};

export default useGetCity;*/

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

const useGetCity = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  // ✅ THIS PREVENTS DOUBLE CALL
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!userData || hasFetched.current) return;

    hasFetched.current = true; // 🔥 STOP SECOND CALL

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // ✅ Save lat/lon
          dispatch(setLocation({ lat: latitude, lon: longitude }));

          // ✅ API call
          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          );
          console.log(result.data);

          const data = result?.data?.results?.[0];

          console.log("CITY DATA:", data);

          // ✅ Save city/state
          dispatch(setCurrentCity(data?.city||data?.county));
          dispatch(setCurrentState(data?.state));

          // ✅ Save full address
          dispatch(setCurrentAddress(data?.formatted));
          dispatch(setAddress(data?.formatted)); // ✅ FIXED

        } catch (error) {
          console.log(error);
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }, [userData, dispatch, apiKey]);

  return null;
};

export default useGetCity;

*/


import { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice";

import { setLocation, setAddress } from "../redux/mapSlice";

const useGetCity = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!userData || hasFetched.current) return;
    if (!navigator.geolocation) return;

    hasFetched.current = true;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          dispatch(setLocation({ lat: latitude, lon: longitude }));

          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          );

          const data = result?.data?.results?.[0];

          if (!data) return; // ✅ FIXED

          dispatch(setCurrentCity(data?.city || data?.county));
          dispatch(setCurrentState(data?.state));

          dispatch(setCurrentAddress(data?.formatted));
          dispatch(setAddress(data?.formatted));

        } catch (error) {
          console.log(error);
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }, [userData, dispatch, apiKey]);

  return null;
};

export default useGetCity;