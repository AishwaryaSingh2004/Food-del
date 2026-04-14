/*
import React, { useEffect, useState, useRef } from 'react';
import Nav from "../components/Nav";
import { useSelector } from 'react-redux';
import axios from "axios";
import { serverUrl } from "../App";
import DeliveryBoyTracking from './DeliveryBoyTracking';

function DeliveryBoy() {
  const { userData } = useSelector(state => state.user);

  const [currentOrder, setCurrentOrder] = useState(null);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [availableAssignments, setAvailableAssignments] = useState([]);
  const [otp,setOtp]=useState("")
  const [loading, setLoading] = useState(false);

  const hasFetched = useRef(false);

  // ================= GET ASSIGNMENTS =================
  const getAssignments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      setLoading(true);

      const result = await axios.get(
        `${serverUrl}/api/order/get-assignments`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const unique = [
        ...new Map(result.data.map(a => [a.assignmentId, a])).values()
      ];

      setAvailableAssignments(unique);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= GET CURRENT ORDER =================
  const getCurrentOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const result = await axios.get(
        `${serverUrl}/api/order/get-current-order`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setCurrentOrder(result.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ================= ACCEPT ORDER =================
  const acceptOrder = async (assignmentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.get(
        `${serverUrl}/api/order/accept-order/${assignmentId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setAvailableAssignments(prev =>
        prev.filter(a => a.assignmentId !== assignmentId)
      );

      await getCurrentOrder();
      getAssignments();

    } catch (error) {
      console.log(error);
    }
  };

/*
  const sendOtp = async (orderId,ShopOrderId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        `${serverUrl}/api/order/send-delivery-otp`,{
          orderId,ShopOrderId
        }
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setAvailableAssignments(prev =>
        prev.filter(a => a.assignmentId !== assignmentId)
      );

      await getCurrentOrder();
      getAssignments();

    } catch (error) {
      console.log(error);
    }
  };
*






const sendOtp = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    await axios.post(
      `${serverUrl}/api/order/send-delivery-otp`,
      {
        orderId:currentOrder._id,
        shopOrderId:currentOrder.shopOrder._id
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    // ✅ Refresh order (OTP doesn't affect assignments list)
    await getCurrentOrder();

  } catch (error) {
    console.log(error);
  }
};

const verifyOtp = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    await axios.post(
      `${serverUrl}/api/order/send-delivery-otp`,
      {
        orderId:currentOrder._id,
        shopOrderId:currentOrder.shopOrder._id,
        otp
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    // ✅ Refresh order (OTP doesn't affect assignments list)
    await getCurrentOrder();

  } catch (error) {
    console.log(error);
  }
};

  // ================= USE EFFECT =================
  useEffect(() => {
    if (userData && !hasFetched.current) {
      hasFetched.current = true;

      getAssignments();
      getCurrentOrder();

      const interval = setInterval(() => {
        getAssignments();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [userData]);

  return (
    <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6]'>

      <Nav />

      <div className='w-full max-w-[800px] flex flex-col gap-5 items-center mt-10'>

       
        <div className='bg-white rounded-2xl shadow-md px-6 py-5 w-[90%] text-center'>
          <h1 className='text-xl font-semibold text-[#ff4d2d]'>
            Welcome, {userData?.fullName || "User"}
          </h1>

          <p className='text-sm text-[#ff4d2d]'>
            Latitude: {userData?.location?.coordinates?.[1] || "--"} ,{" "}
            Longitude: {userData?.location?.coordinates?.[0] || "--"}
          </p>
        </div>

 
        {currentOrder && (
          <div className='bg-white rounded-2xl shadow-md px-5 py-4 w-[90%]'>

            <h2 className='text-lg font-bold text-gray-700 mb-3'>
              📦 Current Order
            </h2>

            <div className='border rounded-lg p-3 bg-gray-50'>

              <p className='font-semibold text-sm text-gray-800'>
                {currentOrder?.shopOrder?.shop?.name}
              </p>

              <p className='text-sm text-gray-600'>
                {currentOrder?.deliveryAddress?.text}
              </p>

              <p className='text-xs text-gray-500 mt-1'>
                {currentOrder?.shopOrder?.shopOrderItems?.length || 0} item | ₹{currentOrder?.shopOrder?.subTotal || 0}
              </p>

            </div>

         
            <DeliveryBoyTracking data={currentOrder} />


            {!showOtpBox ? (
              <button
                onClick={() => setShowOtpBox(true)}
                className='mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-green-600 active:scale-95 transition-all duration-200'
              >
                Mark As Delivered
              </button>
            ) : (
              <div className='mt-4 p-4 border rounded-xl bg-gray-50'>
                <p className='text-sm'>
                  Enter OTP sent to{" "}
                  <span className='font-semibold'>
                    {currentOrder?.user?.fullName}
                  </span>
                </p>

                <input
                  type="text"
                  placeholder="Enter OTP"
                  className='mt-2 w-full border px-3 py-2 rounded-lg outline-none' onChange={(e)=>sendOtp(e.target.value)} value={otp}
                />

                <button className='mt-3 w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all' onClick={verifyOtp}>
                  Submit OTP
                </button>
              </div>
            )}

          </div>
        )}

        
        {!currentOrder && (
          <div className='bg-white rounded-2xl p-5 shadow-md w-[90%]'>

            <h1 className='text-lg font-bold mb-4'>Available Orders</h1>

            {loading ? (
              <p className='text-center text-gray-400'>Loading...</p>
            ) : (
              <div className='space-y-4'>
                {availableAssignments.map((a) => (
                  <div key={a.assignmentId} className='border p-4 rounded-lg flex justify-between'>

                    <div>
                      <p className='font-semibold'>{a.shopName}</p>
                      <p className='text-sm text-gray-500'>
                        {a.deliveryAddress?.text}
                      </p>
                    </div>

                    <button
                      onClick={() => acceptOrder(a.assignmentId)}
                      className='bg-orange-500 text-white px-3 py-1 rounded'
                    >
                      Accept
                    </button>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default DeliveryBoy;*/



/*
import React, { useEffect, useState, useRef } from 'react';
import Nav from "../components/Nav";
import { useSelector } from 'react-redux';
import axios from "axios";
import { serverUrl } from "../App";
import DeliveryBoyTracking from './DeliveryBoyTracking';

function DeliveryBoy() {
  const { userData } = useSelector(state => state.user);

  const [currentOrder, setCurrentOrder] = useState(null);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [availableAssignments, setAvailableAssignments] = useState([]);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const hasFetched = useRef(false);

  // ================= GET ASSIGNMENTS =================
  const getAssignments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      setLoading(true);

      const result = await axios.get(
        `${serverUrl}/api/order/get-assignments`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const unique = [
        ...new Map(result.data.map(a => [a.assignmentId, a])).values()
      ];

      setAvailableAssignments(unique);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= GET CURRENT ORDER =================
  const getCurrentOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const result = await axios.get(
        `${serverUrl}/api/order/get-current-order`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setCurrentOrder(result.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ================= ACCEPT ORDER =================
  const acceptOrder = async (assignmentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        `${serverUrl}/api/order/accept-order/${assignmentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setAvailableAssignments(prev =>
        prev.filter(a => a.assignmentId !== assignmentId)
      );

      await getCurrentOrder();
      getAssignments();

    } catch (error) {
      console.log(error);
    }
  };

  // ================= SEND OTP =================
  const sendOtp = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        `${serverUrl}/api/order/send-delivery-otp`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrder._id
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("OTP Sent Successfully");

    } catch (error) {
      console.log(error);
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        `${serverUrl}/api/order/verify-delivery-otp`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrder._id,
          otp
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Order Delivered ✅");

      setOtp("");
      setShowOtpBox(false);

      await getCurrentOrder();
      getAssignments();

    } catch (error) {
      console.log(error);
    }
  };

  // ================= USE EFFECT =================
  useEffect(() => {
    if (userData && !hasFetched.current) {
      hasFetched.current = true;

      getAssignments();
      getCurrentOrder();

      const interval = setInterval(() => {
        getAssignments();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [userData]);

  return (
    <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6]'>

      <Nav />

      <div className='w-full max-w-[800px] flex flex-col gap-5 items-center mt-10'>

      
        <div className='bg-white rounded-2xl shadow-md px-6 py-5 w-[90%] text-center'>
          <h1 className='text-xl font-semibold text-[#ff4d2d]'>
            Welcome, {userData?.fullName || "User"}
          </h1>

          <p className='text-sm text-[#ff4d2d]'>
            Latitude: {userData?.location?.coordinates?.[1] || "--"} ,{" "}
            Longitude: {userData?.location?.coordinates?.[0] || "--"}
          </p>
        </div>

       
        {currentOrder && (
          <div className='bg-white rounded-2xl shadow-md px-5 py-4 w-[90%]'>

            <h2 className='text-lg font-bold text-gray-700 mb-3'>
              📦 Current Order
            </h2>

            <div className='border rounded-lg p-3 bg-gray-50'>
              <p className='font-semibold text-sm'>
                {currentOrder?.shopOrder?.shop?.name}
              </p>

              <p className='text-sm text-gray-600'>
                {currentOrder?.deliveryAddress?.text}
              </p>

              <p className='text-xs text-gray-500 mt-1'>
                {currentOrder?.shopOrder?.shopOrderItems?.length || 0} items | ₹{currentOrder?.shopOrder?.subTotal || 0}
              </p>
            </div>

            <DeliveryBoyTracking data={currentOrder} />

            {!showOtpBox ? (
              <button
                onClick={() => {
                  setShowOtpBox(true);
                  sendOtp(); // ✅ CALL HERE
                }}
                className='mt-4 w-full bg-green-500 text-white py-2 rounded-xl'
              >
                Mark As Delivered
              </button>
            ) : (
              <div className='mt-4 p-4 border rounded-xl bg-gray-50'>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)} // ✅ FIXED
                  className='w-full border px-3 py-2 rounded-lg'
                />

                <button
                  onClick={verifyOtp}
                  className='mt-3 w-full bg-orange-500 text-white py-2 rounded-lg'
                >
                  Submit OTP
                </button>
              </div>
            )}

          </div>
        )}

  
        {!currentOrder && (
          <div className='bg-white rounded-2xl p-5 w-[90%]'>

            <h1 className='text-lg font-bold mb-4'>Available Orders</h1>

            {loading ? (
              <p className='text-center text-gray-400'>Loading...</p>
            ) : (
              availableAssignments.map((a) => (
                <div key={a.assignmentId} className='border p-4 rounded-lg flex justify-between'>

                  <div>
                    <p className='font-semibold'>{a.shopName}</p>
                    <p className='text-sm text-gray-500'>
                      {a.deliveryAddress?.text}
                    </p>
                  </div>

                  <button
                    onClick={() => acceptOrder(a.assignmentId)}
                    className='bg-orange-500 text-white px-3 py-1 rounded'
                  >
                    Accept
                  </button>

                </div>
              ))
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default DeliveryBoy;*/


/*
import React, { useEffect, useState, useRef } from 'react';
import Nav from "../components/Nav";
import { useSelector } from 'react-redux';
import axios from "axios";
import { serverUrl } from "../App";
import DeliveryBoyTracking from './DeliveryBoyTracking';

function DeliveryBoy() {
  const { userData } = useSelector(state => state.user);

  const [currentOrder, setCurrentOrder] = useState(null);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [availableAssignments, setAvailableAssignments] = useState([]);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const hasFetched = useRef(false);

  // ================= GET ASSIGNMENTS =================
  const getAssignments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      setLoading(true);

      const result = await axios.get(
        `${serverUrl}/api/order/get-assignments`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const unique = [
        ...new Map(result.data.map(a => [a.assignmentId, a])).values()
      ];

      setAvailableAssignments(unique);

    } catch (error) {
      console.log("GET ASSIGNMENTS ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= GET CURRENT ORDER =================
  const getCurrentOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const result = await axios.get(
        `${serverUrl}/api/order/get-current-order`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setCurrentOrder(result.data);

    } catch (error) {
      console.log("GET CURRENT ORDER ERROR:", error.response?.data || error.message);
    }
  };

  // ================= ACCEPT ORDER =================
  const acceptOrder = async (assignmentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        `${serverUrl}/api/order/accept-order/${assignmentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setAvailableAssignments(prev =>
        prev.filter(a => a.assignmentId !== assignmentId)
      );

      await getCurrentOrder();
      getAssignments();

    } catch (error) {
      console.log("ACCEPT ERROR:", error.response?.data || error.message);
    }
  };

  // ================= SEND OTP =================
  const sendOtp = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      if (!currentOrder?._id || !currentOrder?.shopOrder?._id) {
        console.log("Order data missing");
        return;
      }

      await axios.post(
        `${serverUrl}/api/order/send-delivery-otp`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrder._id
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("OTP Sent Successfully");

    } catch (error) {
      console.log("SEND OTP ERROR:", error.response?.data || error.message);
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      if (!otp) {
        alert("Please enter OTP");
        return;
      }

      await axios.post(
        `${serverUrl}/api/order/verify-delivery-otp`,
        {
          orderId: currentOrder?._id,
          shopOrderId: currentOrder?.shopOrder?._id,
          otp
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Order Delivered ✅");

      setOtp("");
      setShowOtpBox(false);

      await getCurrentOrder();
      getAssignments();

    } catch (error) {
      console.log("VERIFY OTP ERROR:", error.response?.data || error.message);
    }
  };

  // ================= USE EFFECT =================
  useEffect(() => {
    if (userData && !hasFetched.current) {
      hasFetched.current = true;

      getAssignments();
      getCurrentOrder();

      const interval = setInterval(() => {
        getAssignments();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [userData]);

  return (
    <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6]'>

      <Nav />

      <div className='w-full max-w-[800px] flex flex-col gap-5 items-center mt-10'>


        <div className='bg-white rounded-2xl shadow-md px-6 py-5 w-[90%] text-center'>
          <h1 className='text-xl font-semibold text-[#ff4d2d]'>
            Welcome, {userData?.fullName || "User"}
          </h1>

          <p className='text-sm text-[#ff4d2d]'>
            Latitude: {userData?.location?.coordinates?.[1] || "--"} ,{" "}
            Longitude: {userData?.location?.coordinates?.[0] || "--"}
          </p>
        </div>

      
        {currentOrder && (
          <div className='bg-white rounded-2xl shadow-md px-5 py-4 w-[90%]'>

            <h2 className='text-lg font-bold text-gray-700 mb-3'>
              📦 Current Order
            </h2>

            <div className='border rounded-lg p-3 bg-gray-50'>
              <p className='font-semibold text-sm'>
                {currentOrder?.shopOrder?.shop?.name}
              </p>

              <p className='text-sm text-gray-600'>
                {currentOrder?.deliveryAddress?.text}
              </p>

              <p className='text-xs text-gray-500 mt-1'>
                {currentOrder?.shopOrder?.shopOrderItems?.length || 0} items | ₹{currentOrder?.shopOrder?.subTotal || 0}
              </p>
            </div>

            <DeliveryBoyTracking data={currentOrder} />

            {!showOtpBox ? (
              <button
                onClick={() => {
                  setShowOtpBox(true);
                  sendOtp();
                }}
                className='mt-4 w-full bg-green-500 text-white py-2 rounded-xl'
              >
                Mark As Delivered
              </button>
            ) : (
              <div className='mt-4 p-4 border rounded-xl bg-gray-50'>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className='w-full border px-3 py-2 rounded-lg'
                />

                <button
                  onClick={verifyOtp}
                  className='mt-3 w-full bg-orange-500 text-white py-2 rounded-lg'
                >
                  Submit OTP
                </button>
              </div>
            )}

          </div>
        )}

       
        {!currentOrder && (
          <div className='bg-white rounded-2xl p-5 w-[90%]'>

            <h1 className='text-lg font-bold mb-4'>Available Orders</h1>

            {loading ? (
              <p className='text-center text-gray-400'>Loading...</p>
            ) : (
              availableAssignments.map((a) => (
                <div key={a.assignmentId} className='border p-4 rounded-lg flex justify-between'>

                  <div>
                    <p className='font-semibold'>{a.shopName}</p>
                    <p className='text-sm text-gray-500'>
                      {a.deliveryAddress?.text}
                    </p>
                  </div>

                  <button
                    onClick={() => acceptOrder(a.assignmentId)}
                    className='bg-orange-500 text-white px-3 py-1 rounded'
                  >
                    Accept
                  </button>

                </div>
              ))
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default DeliveryBoy;*/


/*
import React, { useEffect, useState, useRef } from 'react';
import Nav from "../components/Nav";
import { useSelector } from 'react-redux';
import axios from "axios";
import { serverUrl } from "../App";
import DeliveryBoyTracking from './DeliveryBoyTracking';

function DeliveryBoy() {
  const { userData } = useSelector(state => state.user);

  const [currentOrder, setCurrentOrder] = useState(null);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");

  const hasFetched = useRef(false);

  // ================= GET CURRENT ORDER =================
  const getCurrentOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const result = await axios.get(
        `${serverUrl}/api/order/get-current-order`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log("CURRENT ORDER:", result.data); // 🔥 DEBUG

      setCurrentOrder(result.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ================= SEND OTP =================
  const sendOtp = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        `${serverUrl}/api/order/send-delivery-otp`,
        {
          orderId: currentOrder?._id,
          shopOrderId: currentOrder?.shopOrder?._id   // ✅ FINAL FIX
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("OTP Sent Successfully");

    } catch (error) {
      console.log("SEND OTP ERROR:", error.response?.data || error.message);
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        `${serverUrl}/api/order/verify-delivery-otp`,
        {
          orderId: currentOrder?._id,
          shopOrderId: currentOrder?.shopOrder?._id,  // ✅ FINAL FIX
          otp
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Order Delivered ✅");

      setOtp("");
      setShowOtpBox(false);

      await getCurrentOrder();

    } catch (error) {
      console.log("VERIFY OTP ERROR:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      getCurrentOrder();
    }
  }, []);

  return (
    <div className='w-screen min-h-screen flex flex-col items-center bg-[#fff9f6]'>

      <Nav />

      <div className='w-full max-w-[800px] mt-10'>

        {currentOrder && (
          <div className='bg-white rounded-2xl shadow-md p-5'>

            <h2 className='text-lg font-bold mb-3'>📦 Current Order</h2>

            <div className='border rounded-lg p-3 bg-gray-50'>
              <p className='font-semibold text-sm'>
                {currentOrder?.shopOrder?.shop?.name}
              </p>

              <p className='text-sm text-gray-600'>
                {currentOrder?.deliveryAddress?.text}
              </p>

              <p className='text-xs text-gray-500 mt-1'>
                {currentOrder?.shopOrder?.shopOrderItems?.length || 0} items | ₹{currentOrder?.shopOrder?.subTotal || 0}
              </p>
            </div>

            <DeliveryBoyTracking data={currentOrder} />

            {!showOtpBox ? (
              <button
                onClick={() => {
                  setShowOtpBox(true);
                  sendOtp();
                }}
                className='mt-4 w-full bg-green-500 text-white py-2 rounded-xl'
              >
                Mark As Delivered
              </button>
            ) : (
              <div className='mt-4 p-4 border rounded-xl bg-gray-50'>

                <p className='text-sm mb-2'>
                  Enter OTP sent to <b>{currentOrder?.user?.fullName}</b>
                </p>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className='w-full border px-3 py-2 rounded-lg'
                />

                <button
                  onClick={verifyOtp}
                  className='mt-3 w-full bg-orange-500 text-white py-2 rounded-lg'
                >
                  Submit OTP
                </button>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default DeliveryBoy;*/


/*
import React, { useEffect, useState, useRef } from 'react';
import Nav from "../components/Nav";
import { useSelector } from 'react-redux';
import axios from "axios";
import { serverUrl } from "../App";
import DeliveryBoyTracking from './DeliveryBoyTracking';

function DeliveryBoy() {
  const { userData } = useSelector(state => state.user);

  const [currentOrder, setCurrentOrder] = useState(null);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");

  const hasFetched = useRef(false);

  // ================= GET CURRENT ORDER =================
  const getCurrentOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const result = await axios.get(
        `${serverUrl}/api/order/get-current-order`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log("CURRENT ORDER:", result.data);

      setCurrentOrder(result.data);

    } catch (error) {
      console.log(error);
    }
  };

  
  // ================= SEND OTP =================
  const sendOtp = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.post(
        `${serverUrl}/api/order/send-delivery-otp`,
        {
          orderId: currentOrder?._id , 
          shopOrderId: currentOrder?.shopOrder?._id 
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("OTP Sent Successfully");

    } catch (error) {
      console.log("SEND OTP ERROR:", error.response?.data || error.message);
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      if (!otp) {
        alert("Please enter OTP");
        return;
      }

      const res = await axios.post(
        `${serverUrl}/api/order/verify-delivery-otp`,
        {
          orderId: currentOrder?._id,
          shopOrderId: currentOrder?.shopOrder?._id,
          otp  
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Order Delivered ✅");

      setOtp("");
      setShowOtpBox(false);

      await getCurrentOrder();

    } catch (error) {
      console.log("VERIFY OTP ERROR:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      getCurrentOrder();
    }
  }, []);

  return (
    <div className='w-screen min-h-screen flex flex-col items-center bg-[#fff9f6]'>

      <Nav />

      <div className='w-full max-w-[800px] mt-10'>

        {currentOrder && (
          <div className='bg-white rounded-2xl shadow-md p-5'>

            <h2 className='text-lg font-bold mb-3'>📦 Current Order</h2>

            <div className='border rounded-lg p-3 bg-gray-50'>
              <p className='font-semibold text-sm'>
                {currentOrder?.shopOrder?.shop?.name}
              </p>

              <p className='text-sm text-gray-600'>
                {currentOrder?.deliveryAddress?.text}
              </p>

              <p className='text-xs text-gray-500 mt-1'>
                {currentOrder?.shopOrder?.shopOrderItems?.length || 0} items | ₹{currentOrder?.shopOrder?.subTotal || 0}
              </p>
            </div>

            <DeliveryBoyTracking data={currentOrder} />

            {!showOtpBox ? (
              <button
                onClick={() => {
                  if (!showOtpBox) sendOtp();   // ✅ PREVENT MULTIPLE CALLS
                  setShowOtpBox(true);
                }}
                className='mt-4 w-full bg-green-500 text-white py-2 rounded-xl'
              >
                Mark As Delivered
              </button>
            ) : (
              <div className='mt-4 p-4 border rounded-xl bg-gray-50'>

                <p className='text-sm mb-2'>
                  Enter OTP sent to <b>{currentOrder?.user?.fullName}</b>
                </p>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className='w-full border px-3 py-2 rounded-lg'
                />

                <button
                  onClick={verifyOtp}
                  className='mt-3 w-full bg-orange-500 text-white py-2 rounded-lg'
                >
                  Submit OTP
                </button>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default DeliveryBoy;*/


/*
import React, { useEffect, useState, useRef } from 'react';
import Nav from "../components/Nav";
import { useSelector } from 'react-redux';
import axios from "axios";
import { serverUrl } from "../App";
import DeliveryBoyTracking from './DeliveryBoyTracking';

function DeliveryBoy() {
  const { userData } = useSelector(state => state.user);

  const [currentOrder, setCurrentOrder] = useState(null);
  const [availableOrders, setAvailableOrders] = useState([]);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(true);

  const hasFetched = useRef(false);

  const getCurrentOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const result = await axios.get(
        `${serverUrl}/api/order/get-current-order`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setCurrentOrder(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAvailableOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        `${serverUrl}/api/order/get-assignments`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setAvailableOrders(res.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        `${serverUrl}/api/order/send-delivery-otp`,
        {
          orderId: currentOrder?._id,
          shopOrderId: currentOrder?.shopOrder?._id
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("OTP Sent Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      if (!otp) {
        alert("Enter OTP");
        return;
      }

      await axios.post(
        `${serverUrl}/api/order/verify-delivery-otp`,
        {
          orderId: currentOrder?._id,
          shopOrderId: currentOrder?.shopOrder?._id,
          otp
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Order Delivered ✅");

      setOtp("");
      setShowOtpBox(false);

      await getCurrentOrder();
      await getAvailableOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      getCurrentOrder();
      getAvailableOrders();
    }
  }, []);

  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-[#fff9f6]'>

      <Nav />

      <div className='w-full max-w-[600px] flex flex-col gap-6 items-center mt-10'>

      
        <div className='bg-white rounded-2xl shadow-md px-6 py-5 w-full text-center'>
          <h1 className='text-lg font-semibold text-[#ff4d2d]'>
            Welcome, {userData?.fullName || "User"}
          </h1>

          <p className='text-sm text-[#ff4d2d] mt-1'>
            Latitude: {userData?.location?.coordinates?.[1] || "--"} ,{" "}
            Longitude: {userData?.location?.coordinates?.[0] || "--"}
          </p>
        </div>

       
        {currentOrder && (
          <div className='bg-white rounded-2xl shadow-md p-5 w-full'>

            <h2 className='text-lg font-bold mb-3'>📦 Current Order</h2>

            <div className='border rounded-lg p-3 bg-gray-50'>
              <p className='font-semibold text-sm'>
                {currentOrder?.shopOrder?.shop?.name}
              </p>

              <p className='text-sm text-gray-600'>
                {currentOrder?.deliveryAddress?.text}
              </p>

              <p className='text-xs text-gray-500 mt-1'>
                {currentOrder?.shopOrder?.shopOrderItems?.length || 0} items | ₹
                {currentOrder?.shopOrder?.subTotal || 0}
              </p>
            </div>

            <DeliveryBoyTracking data={currentOrder} />

            {!showOtpBox ? (
              <button
                onClick={() => {
                  sendOtp();
                  setShowOtpBox(true);
                }}
                className='mt-4 w-full bg-green-500 text-white py-2 rounded-xl'
              >
                Mark As Delivered
              </button>
            ) : (
              <div className='mt-4 p-4 border rounded-xl bg-gray-50'>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className='w-full border px-3 py-2 rounded-lg'
                />

                <button
                  onClick={verifyOtp}
                  className='mt-3 w-full bg-orange-500 text-white py-2 rounded-lg'
                >
                  Submit OTP
                </button>

              </div>
            )}

          </div>
        )}

       
        {!currentOrder && (
          <div className='bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 w-full border border-gray-100'>

            <h2 className='text-lg font-semibold text-gray-800 mb-4'>
              Available Orders
            </h2>

            {loading ? (
              <div className='flex justify-center py-6'>
                <div className='w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin'></div>
              </div>
            ) : availableOrders.length > 0 ? (
              availableOrders.map((order) => (
                <div
                  key={order.assignmentId}
                  className='bg-white rounded-xl p-4 mb-3 border border-gray-100 hover:shadow-md transition'
                >
                  <p className='text-sm font-semibold text-gray-800'>
                    {order.shopName}
                  </p>

                  <p className='text-xs text-gray-500 mt-1'>
                    {order.deliveryAddress?.text}
                  </p>
                </div>
              ))
            ) : (
              <div className='flex flex-col items-center py-8 text-gray-400'>
                <div className='text-4xl mb-2'>📦</div>
                <p className='text-sm'>No Available Orders</p>
                <p className='text-xs mt-1'>You're all caught up!</p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default DeliveryBoy;*/


/*
import React, { useEffect, useState, useRef } from 'react';
import Nav from "../components/Nav";
import { useSelector } from 'react-redux';
import axios from "axios";
import { serverUrl } from "../App";
import DeliveryBoyTracking from './DeliveryBoyTracking';

function DeliveryBoy() {
  const { userData } = useSelector(state => state.user);

  const [currentOrder, setCurrentOrder] = useState(null);
  const [availableOrders, setAvailableOrders] = useState([]);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(true);

  const hasFetched = useRef(false);

  // ================= GET CURRENT ORDER =================
  const getCurrentOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${serverUrl}/api/order/get-current-order`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCurrentOrder(res.data);

    } catch (error) {
      setCurrentOrder(null); // 🔥 important
    }
  };

  // ================= GET AVAILABLE =================
  const getAvailableOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${serverUrl}/api/order/get-assignments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAvailableOrders(res.data || []);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= ACCEPT ORDER =================
  const acceptOrder = async (assignmentId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${serverUrl}/api/order/accept-assignment`,
        { assignmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order Accepted ✅");

      await getCurrentOrder();
      await getAvailableOrders();

    } catch (error) {
      console.log("ACCEPT ERROR:", error.response?.data || error.message);
    }
  };

  // ================= SEND OTP =================
  const sendOtp = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${serverUrl}/api/order/send-delivery-otp`,
        {
          orderId: currentOrder?._id,
          shopOrderId: currentOrder?.shopOrder?._id
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("OTP Sent Successfully");

    } catch (error) {
      console.log(error);
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!otp) return alert("Enter OTP");

      await axios.post(
        `${serverUrl}/api/order/verify-delivery-otp`,
        {
          orderId: currentOrder?._id,
          shopOrderId: currentOrder?.shopOrder?._id,
          otp
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order Delivered ✅");

      setOtp("");
      setShowOtpBox(false);

      await getCurrentOrder();
      await getAvailableOrders();

    } catch (error) {
      console.log(error);
    }
  };

  // ================= INIT =================
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      getCurrentOrder();
      getAvailableOrders();
    }
  }, []);

  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-[#fff9f6]'>

      <Nav />

      <div className='w-full max-w-[600px] flex flex-col gap-6 items-center mt-10'>

        
        <div className='bg-white rounded-2xl shadow-md px-6 py-5 w-full text-center'>
          <h1 className='text-lg font-semibold text-[#ff4d2d]'>
            Welcome, {userData?.fullName || "User"}
          </h1>

          <p className='text-sm text-[#ff4d2d] mt-1'>
            Latitude: {userData?.location?.coordinates?.[1] || "--"} ,
            Longitude: {userData?.location?.coordinates?.[0] || "--"}
          </p>
        </div>


        {currentOrder && (
          <div className='bg-white rounded-2xl shadow-md p-5 w-full'>

            <h2 className='text-lg font-bold mb-3'>📦 Current Order</h2>

            <div className='border rounded-lg p-3 bg-gray-50'>
              <p className='font-semibold text-sm'>
                {currentOrder?.shopOrder?.shop?.name}
              </p>

              <p className='text-sm text-gray-600'>
                {currentOrder?.deliveryAddress?.text}
              </p>

              <p className='text-xs text-gray-500 mt-1'>
                {currentOrder?.shopOrder?.shopOrderItems?.length || 0} items | ₹
                {currentOrder?.shopOrder?.subTotal || 0}
              </p>
            </div>

            <DeliveryBoyTracking data={currentOrder} />

            {!showOtpBox ? (
              <button
                onClick={() => {
                  sendOtp();
                  setShowOtpBox(true);
                }}
                className='mt-4 w-full bg-green-500 text-white py-2 rounded-xl'
              >
                Mark As Delivered
              </button>
            ) : (
              <div className='mt-4 p-4 border rounded-xl bg-gray-50'>

                <p className='text-sm mb-2'>
                  Enter OTP sent to <b>{currentOrder?.user?.fullName}</b>
                </p>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className='w-full border px-3 py-2 rounded-lg'
                />

                <button
                  onClick={verifyOtp}
                  className='mt-3 w-full bg-orange-500 text-white py-2 rounded-lg'
                >
                  Submit OTP
                </button>

              </div>
            )}

          </div>
        )}

        
        {!currentOrder && (
          <div className='bg-white rounded-2xl shadow-md p-5 w-full'>

            <h2 className='text-lg font-bold mb-4'>Available Orders</h2>

            {loading ? (
              <p className='text-center text-gray-400'>Loading...</p>
            ) : availableOrders.length > 0 ? (
              availableOrders.map((order) => (
                <div
                  key={order.assignmentId}
                  className='border p-4 mb-3 rounded-xl flex justify-between items-center'
                >
                  <div>
                    <p className='font-semibold'>{order.shopName}</p>
                    <p className='text-sm text-gray-500'>
                      {order.deliveryAddress?.text}
                    </p>
                  </div>

                  <button
                    onClick={() => acceptOrder(order.assignmentId)}
                    className='bg-orange-500 text-white px-4 py-2 rounded-lg'
                  >
                    Accept
                  </button>
                </div>
              ))
            ) : (
              <p className='text-gray-400 text-center'>No Available Orders</p>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default DeliveryBoy;*/




import React, { useEffect, useState, useRef } from 'react';
import Nav from "../components/Nav";
import { useSelector } from 'react-redux';
import axios from "axios";
import { serverUrl } from "../App";
import DeliveryBoyTracking from './DeliveryBoyTracking';

function DeliveryBoy() {
  const { userData } = useSelector(state => state.user);

  const [currentOrder, setCurrentOrder] = useState(null);
  const [availableOrders, setAvailableOrders] = useState([]);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(true);

  const hasFetched = useRef(false);

  // ================= GET CURRENT ORDER =================
  const getCurrentOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${serverUrl}/api/order/get-current-order`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCurrentOrder(res.data);

    } catch (error) {
      setCurrentOrder(null);
    }
  };

  // ================= GET AVAILABLE =================
  const getAvailableOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${serverUrl}/api/order/get-assignments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAvailableOrders(res.data || []);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= ACCEPT ORDER (✅ FIXED) =================
  const acceptOrder = async (assignmentId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.get(
        `${serverUrl}/api/order/accept-order/${assignmentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order Accepted ✅");

      await getCurrentOrder();
      await getAvailableOrders();

    } catch (error) {
      console.log("ACCEPT ERROR:", error.response?.data || error.message);
    }
  };

  // ================= SEND OTP =================
  const sendOtp = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${serverUrl}/api/order/send-delivery-otp`,
        {
          orderId: currentOrder?._id,
          shopOrderId: currentOrder?.shopOrder?._id
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("OTP Sent Successfully");

    } catch (error) {
      console.log(error);
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!otp) return alert("Enter OTP");

      await axios.post(
        `${serverUrl}/api/order/verify-delivery-otp`,
        {
          orderId: currentOrder?._id,
          shopOrderId: currentOrder?.shopOrder?._id,
          otp
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order Delivered ✅");

      setOtp("");
      setShowOtpBox(false);

      await getCurrentOrder();
      await getAvailableOrders();

    } catch (error) {
      console.log(error);
    }
  };

  // ================= INIT =================
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      getCurrentOrder();
      getAvailableOrders();
    }
  }, []);

  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-[#fff9f6]'>

      <Nav />

      <div className='w-full max-w-[600px] flex flex-col gap-6 items-center mt-10'>

        {/* WELCOME */}
        <div className='bg-white rounded-2xl shadow-md px-6 py-5 w-full text-center'>
          <h1 className='text-lg font-semibold text-[#ff4d2d]'>
            Welcome, {userData?.fullName || "User"}
          </h1>

          <p className='text-sm text-[#ff4d2d] mt-1'>
            Latitude: {userData?.location?.coordinates?.[1] || "--"} ,
            Longitude: {userData?.location?.coordinates?.[0] || "--"}
          </p>
        </div>

        {/* CURRENT ORDER */}
        {currentOrder && (
          <div className='bg-white rounded-2xl shadow-md p-5 w-full'>

            <h2 className='text-lg font-bold mb-3'>📦 Current Order</h2>

            <div className='border rounded-lg p-3 bg-gray-50'>
              <p className='font-semibold text-sm'>
                {currentOrder?.shopOrder?.shop?.name}
              </p>

              <p className='text-sm text-gray-600'>
                {currentOrder?.deliveryAddress?.text}
              </p>

              <p className='text-xs text-gray-500 mt-1'>
                {currentOrder?.shopOrder?.shopOrderItems?.length || 0} items | ₹
                {currentOrder?.shopOrder?.subTotal || 0}
              </p>
            </div>

            <DeliveryBoyTracking data={currentOrder} />

            {!showOtpBox ? (
              <button
                onClick={() => {
                  sendOtp();
                  setShowOtpBox(true);
                }}
                className='mt-4 w-full bg-green-500 text-white py-2 rounded-xl'
              >
                Mark As Delivered
              </button>
            ) : (
              <div className='mt-4 p-4 border rounded-xl bg-gray-50'>

                <p className='text-sm mb-2'>
                  Enter OTP sent to <b>{currentOrder?.user?.fullName}</b>
                </p>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className='w-full border px-3 py-2 rounded-lg'
                />

                <button
                  onClick={verifyOtp}
                  className='mt-3 w-full bg-orange-500 text-white py-2 rounded-lg'
                >
                  Submit OTP
                </button>

              </div>
            )}

          </div>
        )}

        {/* AVAILABLE ORDERS */}
        {!currentOrder && (
          <div className='bg-white rounded-2xl shadow-md p-5 w-full'>

            <h2 className='text-lg font-bold mb-4'>Available Orders</h2>

            {loading ? (
              <p className='text-center text-gray-400'>Loading...</p>
            ) : availableOrders.length > 0 ? (
              availableOrders.map((order) => (
                <div
                  key={order.assignmentId}
                  className='border p-4 mb-3 rounded-xl flex justify-between items-center'
                >
                  <div>
                    <p className='font-semibold'>
                      {order?.shopOrder?.shop?.name || "Shop"}
                    </p>

                    <p className='text-sm text-gray-500'>
                      {order.deliveryAddress?.text}
                    </p>
                  </div>

                  <button
                    onClick={() => acceptOrder(order.assignmentId)}
                    className='bg-orange-500 text-white px-4 py-2 rounded-lg'
                  >
                    Accept
                  </button>
                </div>
              ))
            ) : (
              <p className='text-gray-400 text-start'>No Available Orders</p>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default DeliveryBoy;