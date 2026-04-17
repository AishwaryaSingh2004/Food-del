
/*
import React, { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { IoLocationSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import { useSelector, useDispatch } from 'react-redux';

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import axios from "axios";
import { setLocation, setAddress } from "../redux/mapSlice";


// ✅ RECENTER MAP
function RecenterMap({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    if (lat !== null && lon !== null) {
      map.setView([lat, lon], 18);
    }
  }, [lat, lon, map]);

  return null;
}


function CheckOut() {
  const { location, address } = useSelector(state => state.map);
  const { cartItems,totalAmount } = useSelector(state => state.user);
  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_GEOAPIKEY;
  const deliveryFee=totalAmount>500?0:40
  const AmountWithDeliveryFee=totalAmount+deliveryFee

  // ✅ GET ADDRESS FROM LAT LNG
  const getAddressByLatLng = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`
      );

      const data = res?.data?.results?.[0];

      const preciseAddress = [
        data?.housenumber,
        data?.street,
        data?.suburb,
        data?.city,
        data?.state,
        data?.postcode
      ].filter(Boolean).join(", ");

      console.log("ADDRESS:", preciseAddress);

      dispatch(setAddress(preciseAddress));

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ UPDATE ADDRESS WHEN LOCATION CHANGES
  useEffect(() => {
    if (location?.lat !== null && location?.lon !== null) {
      getAddressByLatLng(location.lat, location.lon);
    }
  }, [location?.lat, location?.lon]);

  // ✅ DRAG HANDLER
  const onDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng();

    console.log({
      latitude: lat,
      longitude: lng
    });

    dispatch(setLocation({ lat, lon: lng }));
  };

  // ✅ CURRENT LOCATION BUTTON
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          dispatch(setLocation({ lat: latitude, lon: longitude }));

        } catch (error) {
          console.log(error);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // ✅ SEARCH ADDRESS → LAT LNG
  const getLatingByAddress = async () => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apiKey}`
      );

      console.log("FULL RESPONSE:", result.data);
      console.log("FEATURES:", result.data.features);

      const data = result?.data?.features?.[0]?.properties;

      if (data) {
        dispatch(setLocation({
          lat: data.lat,
          lon: data.lon
        }));

        dispatch(setAddress(data.formatted));
      }

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ SYNC INPUT WITH REDUX ADDRESS
  useEffect(() => {
    setAddressInput(address || "");
  }, [address]);

  return (
    <div className='min-h-screen bg-[#fff9f6]'>

      <div className='p-6'>
        <IoIosArrowRoundBack
          size={28}
          className="text-[#ff4d2d] cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className='flex justify-center mt-20'>
        <div className='w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6'>

          <h1 className='text-xl font-bold text-gray-800'>
            Checkout
          </h1>

          <section className='mt-4'>
            <h2 className='text-lg font-semibold mb-2 flex items-center gap-2 text-gray-700'>
              <IoLocationSharp className='text-[#ff4d2d]' />
              Delivery Location
            </h2>

            <div className='flex gap-2 mb-3'>
              
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className='flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]'
                placeholder='Enter Your Delivery Address'
              />

              <button
                className='bg-[#ff4d2d] text-white px-3 py-2 rounded-lg flex items-center justify-center'
                onClick={getLatingByAddress}
              >
                <IoIosSearch size={17} />
              </button>

              <button
                className='bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center justify-center'
                onClick={getCurrentLocation}
              >
                <TbCurrentLocation size={17} />
              </button>
            </div>

            <div className='rounded-xl border overflow-hidden'>
              <div className='h-64 w-full'>

                {location?.lat !== null && location?.lon !== null && (
                  <MapContainer
                    center={[location.lat, location.lon]}
                    zoom={18}
                    scrollWheelZoom={true}
                    className="w-full h-full"
                  >
                    
                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <RecenterMap lat={location.lat} lon={location.lon} />

                    <Marker
                      position={[location.lat, location.lon]}
                      draggable={true}
                      eventHandlers={{ dragend: onDragEnd }}
                    >
                      <Popup>
                        {address || "Your Location"}
                      </Popup>
                    </Marker>

                  </MapContainer>
                )}

              </div>
            </div>

          </section>

          <section className='mt-6'>
            <h2 className='text-lg font-semibold mb-3 text-gray-800'>Payment Method</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

              <div
                className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition ${
                  paymentMethod === "cod"
                    ? "border-[#ff4d2d] bg-orange-50 shadow"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <span>💵</span>
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">Pay when order arrives</p>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition ${
                  paymentMethod === "online"
                    ? "border-[#ff4d2d] bg-orange-50 shadow"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPaymentMethod("online")}
              >
                <span>💳</span>
                <div>
                  <p className="font-medium">UPI / Card / Netbanking</p>
                  <p className="text-sm text-gray-500">Pay Securely Online</p>
                </div>
              </div>

            </div>
          </section>

          <section>
             <h2 className='text-lg font-semibold mb-3'>Order Summary</h2>
             <div className='rounded-xl border bg-gray-50 p-4 space-y-2'>
                {cartItems.map((item,index)=>(
                  <div key={index} className='flex justify-between text-sm text-gray-700'>
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>

                ))}
                <hr className='border-gray-200 my-2' />
                <div className='flex justify-between font-medium text-gray-800'>
                  <span>Subtotal</span>
                  <span>{totalAmount}</span>
                </div>
                <div className='flex justify-between text-gray-700'>
                  <span>Delivery Fee</span>
                  <span>{deliveryFee==0?"Free":deliveryFee}</span>
                </div>
                <div className='flex justify-between text-lg font-bold text-[#ff4d2d] pt-2 '>
                  <span>Total</span>
                  <span>{AmountWithDeliveryFee}</span>
                </div>
             </div>
          </section>
        </div>
      </div>


    </div>
  );
}

export default CheckOut;*/

/*
import React, { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { IoLocationSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import { useSelector, useDispatch } from 'react-redux';

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import axios from "axios";
import { setLocation, setAddress } from "../redux/mapSlice";


// ✅ RECENTER MAP
function RecenterMap({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    if (lat !== null && lon !== null) {
      map.setView([lat, lon], 18);
    }
  }, [lat, lon, map]);

  return null;
}


function CheckOut() {
  const { location, address } = useSelector(state => state.map);
  const { cartItems } = useSelector(state => state.user); // ❗ removed broken totalAmount
  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_GEOAPIKEY;
  // ✅ ADD THIS LINE INSIDE CheckOut()
  //const serverUrl = import.meta.env.VITE_SERVER_URL;

  // ✅ FIX: calculate subtotal manually (no UI change)
  const totalAmount = cartItems.reduce((total, item) => {
    const price = Number(item.price || item.cost || 0);
    const quantity = Number(item.quantity || item.qty || 0);
    return total + price * quantity;
  }, 0);

  const deliveryFee = totalAmount > 500 ? 0 : 40;
  const AmountWithDeliveryFee = totalAmount + deliveryFee;

  // ✅ GET ADDRESS FROM LAT LNG
  const getAddressByLatLng = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`
      );

      const data = res?.data?.results?.[0];

      const preciseAddress = [
        data?.housenumber,
        data?.street,
        data?.suburb,
        data?.city,
        data?.state,
        data?.postcode
      ].filter(Boolean).join(", ");

      dispatch(setAddress(preciseAddress));

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ UPDATE ADDRESS WHEN LOCATION CHANGES
  useEffect(() => {
    if (location?.lat !== null && location?.lon !== null) {
      getAddressByLatLng(location.lat, location.lon);
    }
  }, [location?.lat, location?.lon]);

  // ✅ DRAG HANDLER
  const onDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng();

    dispatch(setLocation({ lat, lon: lng }));
  };

  // ✅ CURRENT LOCATION BUTTON
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // ✅ SEARCH ADDRESS → LAT LNG
  const getLatingByAddress = async () => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apiKey}`
      );

      const data = result?.data?.features?.[0]?.properties;

      if (data) {
        dispatch(setLocation({
          lat: data.lat,
          lon: data.lon
        }));

        dispatch(setAddress(data.formatted));
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/order/place-order`, {
        paymentMethod,
        deliveryAddress: {
          text: addressInput,
          latitude: location.lat,
          longitude: location.lon
        },
        totalAmount,
        cartItems
      }, { withCredentials: true })
      console.log(result.data);
    } catch (error) {

    }
  }

  // ✅ SYNC INPUT WITH REDUX ADDRESS
  useEffect(() => {
    setAddressInput(address || "");
  }, [address]);

  return (
    <div className='min-h-screen bg-[#fff9f6]'>

      <div className='p-6'>
        <IoIosArrowRoundBack
          size={28}
          className="text-[#ff4d2d] cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className='flex justify-center mt-20'>
        <div className='w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6'>

          <h1 className='text-xl font-bold text-gray-800'>
            Checkout
          </h1>

          <section className='mt-4'>
            <h2 className='text-lg font-semibold mb-2 flex items-center gap-2 text-gray-700'>
              <IoLocationSharp className='text-[#ff4d2d]' />
              Delivery Location
            </h2>

            <div className='flex gap-2 mb-3'>

              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className='flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]'
                placeholder='Enter Your Delivery Address'
              />

              <button
                className='bg-[#ff4d2d] text-white px-3 py-2 rounded-lg flex items-center justify-center'
                onClick={getLatingByAddress}
              >
                <IoIosSearch size={17} />
              </button>

              <button
                className='bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center justify-center'
                onClick={getCurrentLocation}
              >
                <TbCurrentLocation size={17} />
              </button>
            </div>

            <div className='rounded-xl border overflow-hidden'>
              <div className='h-64 w-full'>

                {location?.lat !== null && location?.lon !== null && (
                  <MapContainer
                    center={[location.lat, location.lon]}
                    zoom={18}
                    scrollWheelZoom={true}
                    className="w-full h-full"
                  >

                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <RecenterMap lat={location.lat} lon={location.lon} />

                    <Marker
                      position={[location.lat, location.lon]}
                      draggable={true}
                      eventHandlers={{ dragend: onDragEnd }}
                    >
                      <Popup>
                        {address || "Your Location"}
                      </Popup>
                    </Marker>

                  </MapContainer>
                )}

              </div>
            </div>

          </section>

          <section className='mt-6'>
            <h2 className='text-lg font-semibold mb-3 text-gray-800'>Payment Method</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

              <div
                className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition ${paymentMethod === "cod"
                    ? "border-[#ff4d2d] bg-orange-50 shadow"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <span>💵</span>
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">Pay when order arrives</p>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition ${paymentMethod === "online"
                    ? "border-[#ff4d2d] bg-orange-50 shadow"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
                onClick={() => setPaymentMethod("online")}
              >
                <span>💳</span>
                <div>
                  <p className="font-medium">UPI / Card / Netbanking</p>
                  <p className="text-sm text-gray-500">Pay Securely Online</p>
                </div>
              </div>

            </div>
          </section>

          <section>
            <h2 className='text-lg font-semibold mb-3'>Order Summary</h2>
            <div className='rounded-xl border bg-gray-50 p-4 space-y-2'>
              {cartItems.map((item, index) => (
                <div key={index} className='flex justify-between text-sm text-gray-700'>
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <hr className='border-gray-200 my-2' />
              <div className='flex justify-between font-medium text-gray-800'>
                <span>Subtotal</span>
                <span>{totalAmount}</span>
              </div>
              <div className='flex justify-between text-gray-700'>
                <span>Delivery Fee</span>
                <span>{deliveryFee == 0 ? "Free" : deliveryFee}</span>
              </div>
              <div className='flex justify-between text-lg font-bold text-[#ff4d2d] pt-2 '>
                <span>Total</span>
                <span>{AmountWithDeliveryFee}</span>
              </div>
            </div>
          </section>
          <button className='w-full bg-[#ff4d2d] hover:bg-[#e64526] text-white py-3 rounded-xl font-semibold' onClick={handlePlaceOrder} > {paymentMethod == "cod" ? "Place Order" : "Pay & Place Order"}</button>
        </div>
      </div>

    </div>
  );
}

export default CheckOut;
*/



import React, { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { IoLocationSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import { useSelector, useDispatch } from 'react-redux';
import { addMyOrder } from "../redux/userSlice";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import axios from "axios";
import { setLocation, setAddress } from "../redux/mapSlice";


// ✅ RECENTER MAP
function RecenterMap({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    if (lat !== null && lon !== null) {
      map.setView([lat, lon], 18);
    }
  }, [lat, lon, map]);

  return null;
}


function CheckOut() {
  const { location, address } = useSelector(state => state.map);
  const { cartItems } = useSelector(state => state.user);
  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  // ✅ FIX 1: DEFINE serverUrl
  const serverUrl = "http://localhost:8000";

  // ✅ FIX 2: SAFE reduce
  const totalAmount = (cartItems || []).reduce((total, item) => {
    const price = Number(item.price || item.cost || 0);
    const quantity = Number(item.quantity || item.qty || 0);
    return total + price * quantity;
  }, 0);

  const deliveryFee = totalAmount > 500 ? 0 : 40;
  const AmountWithDeliveryFee = totalAmount + deliveryFee;

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`
      );

      const data = res?.data?.results?.[0];

      const preciseAddress = [
        data?.housenumber,
        data?.street,
        data?.suburb,
        data?.city,
        data?.state,
        data?.postcode
      ].filter(Boolean).join(", ");

      dispatch(setAddress(preciseAddress));

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location?.lat !== null && location?.lon !== null) {
      getAddressByLatLng(location.lat, location.lon);
    }
  }, [location?.lat, location?.lon]);

  const onDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng();
    dispatch(setLocation({ lat, lon: lng }));
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getLatingByAddress = async () => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apiKey}`
      );

      const data = result?.data?.features?.[0]?.properties;

      if (data) {
        dispatch(setLocation({
          lat: data.lat,
          lon: data.lon
        }));

        dispatch(setAddress(data.formatted));
      }

    } catch (error) {
      console.log(error);
    }
  };

  /*
  const handlePlaceOrder = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/order/place-order`, {
        paymentMethod,
        deliveryAddress: {
          text: addressInput,
          latitude: location.lat,
          longitude: location.lon
        },
        totalAmount,
        cartItems
      }, { withCredentials: true });

      console.log(result.data);
      navigate("/order-placed")
    } catch (error) {
      // ✅ FIX 3: SHOW ERROR
      console.log(error.response?.data || error.message);
    }
  };
*/

  const handlePlaceOrder = async () => {
  try {
    // ✅ GET TOKEN
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token); // debug

    if (!token) {
      console.log("No token found");
      return;
    }

    const result = await axios.post(
      `${serverUrl}/api/order/place-order`,
      {
        paymentMethod,
        deliveryAddress: {
          text: addressInput,
          latitude: location.lat,
          longitude: location.lon
        },
        totalAmount,
        cartItems
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ FIXED
        },
      }
    );

    if(paymentMethod=="cod"){
    dispatch(addMyOrder(result.data))
    //console.log(result.data);
    navigate("/order-placed");
    }else{
      const orderId=result.data.orderId
      const razorOrder=result.data.razorOrder
      openRazorpayWindow(orderId,razorOrder)
    }
   

  } catch (error) {
    console.log(
      error.response?.data || error.message
    );
  }
};

/* const openRazorpayWindow=(orderId,razorOrder)=>{

  const options={
    key:import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount:razorOrder.amount,
    currency:"INR",
    name:"Vingo",
    description:"Food Delivery Website",
    order_id:razorOrder.id,
    handler:async function (response) {
      try {
        const result=await axios.get(`${serverUrl}/api/order/verify-payment`,{
         razorpay_payment_id:response.razorpay_payment_id,
         orderId
        },{withCredentials:true})
        dispatch(addMyOrder(result.data))
        navigate("/order-placed");
      } catch (error) {
        console.log(error);
      }
    },

  }

  const rzp=new window.Razorpay(options)
  rzp.open()
}*/







const openRazorpayWindow = (orderId, razorOrder) => {

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: razorOrder.amount,
    currency: "INR",
    name: "Vingo",
    description: "Food Delivery Website",
    order_id: razorOrder.id,

    // ✅ ENABLE ALL METHODS (IMPORTANT)
    method: {
      upi: true,
      card: true,
      netbanking: true,
      wallet: true
    },

    // ✅ SAFE UI ORDER (NO CRASH)
    config: {
      display: {
        sequence: [
          "block.upi",
          "block.card",
          "block.netbanking",
          "block.wallet"
        ]
      }
    },

    handler: async function (response) {
      try {
        const result = await axios.post(
          `${serverUrl}/api/order/verify-payment`,
          {
            razorpay_payment_id: response.razorpay_payment_id,
            orderId
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        dispatch(addMyOrder(result.data));
        navigate("/order-placed");

      } catch (error) {
        console.log(error);
      }
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};


  useEffect(() => {
    setAddressInput(address || "");
  }, [address]);

  return (
    <div className='min-h-screen bg-[#fff9f6]'>

      <div className='p-6'>
        <IoIosArrowRoundBack
          size={28}
          className="text-[#ff4d2d] cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className='flex justify-center mt-20'>
        <div className='w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6'>

          <h1 className='text-xl font-bold text-gray-800'>
            Checkout
          </h1>

          <section className='mt-4'>
            <h2 className='text-lg font-semibold mb-2 flex items-center gap-2 text-gray-700'>
              <IoLocationSharp className='text-[#ff4d2d]' />
              Delivery Location
            </h2>

            <div className='flex gap-2 mb-3'>

              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className='flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]'
                placeholder='Enter Your Delivery Address'
              />

              <button
                className='bg-[#ff4d2d] text-white px-3 py-2 rounded-lg flex items-center justify-center'
                onClick={getLatingByAddress}
              >
                <IoIosSearch size={17} />
              </button>

              <button
                className='bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center justify-center'
                onClick={getCurrentLocation}
              >
                <TbCurrentLocation size={17} />
              </button>
            </div>

            <div className='rounded-xl border overflow-hidden'>
              <div className='h-64 w-full'>

                {location?.lat !== null && location?.lon !== null && (
                  <MapContainer
                    center={[location.lat, location.lon]}
                    zoom={18}
                    scrollWheelZoom={true}
                    className="w-full h-full"
                  >

                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <RecenterMap lat={location.lat} lon={location.lon} />

                    <Marker
                      position={[location.lat, location.lon]}
                      draggable={true}
                      eventHandlers={{ dragend: onDragEnd }}
                    >
                      <Popup>
                        {address || "Your Location"}
                      </Popup>
                    </Marker>

                  </MapContainer>
                )}

              </div>
            </div>

          </section>

          <section className='mt-6'>
            <h2 className='text-lg font-semibold mb-3 text-gray-800'>Payment Method</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

              <div
                className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition ${paymentMethod === "cod"
                    ? "border-[#ff4d2d] bg-orange-50 shadow"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <span>💵</span>
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">Pay when order arrives</p>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition ${paymentMethod === "online"
                    ? "border-[#ff4d2d] bg-orange-50 shadow"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
                onClick={() => setPaymentMethod("online")}
              >
                <span>💳</span>
                <div>
                  <p className="font-medium">UPI / Card / Netbanking</p>
                  <p className="text-sm text-gray-500">Pay Securely Online</p>
                </div>
              </div>

            </div>
          </section>

          <section>
            <h2 className='text-lg font-semibold mb-3'>Order Summary</h2>
            <div className='rounded-xl border bg-gray-50 p-4 space-y-2'>
              {cartItems.map((item, index) => (
                <div key={index} className='flex justify-between text-sm text-gray-700'>
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <hr className='border-gray-200 my-2' />
              <div className='flex justify-between font-medium text-gray-800'>
                <span>Subtotal</span>
                <span>{totalAmount}</span>
              </div>
              <div className='flex justify-between text-gray-700'>
                <span>Delivery Fee</span>
                <span>{deliveryFee == 0 ? "Free" : deliveryFee}</span>
              </div>
              <div className='flex justify-between text-lg font-bold text-[#ff4d2d] pt-2 '>
                <span>Total</span>
                <span>{AmountWithDeliveryFee}</span>
              </div>
            </div>
          </section>

          <button className='w-full bg-[#ff4d2d] hover:bg-[#e64526] text-white py-3 rounded-xl font-semibold' onClick={handlePlaceOrder}>
            {paymentMethod == "cod" ? "Place Order" : "Pay & Place Order"}
          </button>

        </div>
      </div>

    </div>
  );
}

export default CheckOut;