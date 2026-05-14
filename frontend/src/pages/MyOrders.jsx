
/*
import React from 'react';
import { useSelector } from 'react-redux';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import useGetMyOrders from "../hooks/useGetMyOrders";
import UserOrderCard from '../components/UserOrderCard';
import OwnerOrderCard from '../components/OwnerOrderCard';

function MyOrders() {
     useGetMyOrders();
    const { userData, myOrders } = useSelector(state => state.user);
    const navigate = useNavigate();

    return (
        <div className='w-full min-h-screen bg-[#fff9f6] flex justify-center px-4'>

            <div className='w-full max-w-[800px] p-4'>

               
                <div className='flex items-center gap-[20px] mb-6'>
                    <IoIosArrowRoundBack
                        size={28}
                        className="text-[#ff4d2d] cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <h1 className='text-2xl font-bold text-gray-700'>
                        My Orders
                    </h1>
                </div>

                
                {(!myOrders || myOrders.length === 0) && (
                    <div className='text-center text-gray-500 mt-10'>
                        
                    </div>
                )}

             
                <div className='space-y-6'>
                    {myOrders?.map((order) => {

                        if (!userData) return null;

                        if (userData.role === "user") {
                            return <UserOrderCard data={order} key={order._id} />;
                        }

                        if (userData.role === "owner") {
                            return <OwnerOrderCard data={order} key={order._id} />;
                        }

                        return null;
                    })}
                </div>

            </div>
        </div>
    );
}

export default MyOrders;*/


/*
import React from 'react';
import { useSelector } from 'react-redux';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import useGetMyOrders from "../hooks/useGetMyOrders";
import UserOrderCard from '../components/UserOrderCard';
import OwnerOrderCard from '../components/OwnerOrderCard';

function MyOrders() {
    useGetMyOrders();

    const { userData, myOrders } = useSelector(state => state.user);
    const navigate = useNavigate();

    return (
        <div className='w-full min-h-screen bg-[#fff9f6] flex justify-center px-4'>
            <div className='w-full max-w-[800px] p-4'>

                
                <div className='flex items-center gap-[20px] mb-6'>
                    <IoIosArrowRoundBack
                        size={28}
                        className="text-[#ff4d2d] cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <h1 className='text-2xl font-bold text-gray-700'>
                        My Orders
                    </h1>
                </div>

               
                {(!myOrders || myOrders.length === 0) && (
                    <div className='text-center text-gray-500 mt-10'>
                        No orders found
                    </div>
                )}

               
                <div className='space-y-6'>
                    {myOrders?.length > 0 && myOrders.map((order) => {

                        if (!userData) return null;

                        if (userData.role === "user") {
                            return <UserOrderCard data={order} key={order._id} />;
                        }

                        if (userData.role === "owner") {
                            return <OwnerOrderCard data={order} key={order._id} />;
                        }

                        return null;
                    })}
                </div>

            </div>
        </div>
    );
}

export default MyOrders;*/





/*
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import useGetMyOrders from "../hooks/useGetMyOrders";
import UserOrderCard from '../components/UserOrderCard';
import OwnerOrderCard from '../components/OwnerOrderCard';
import { useEffect } from 'react';

function MyOrders() {
    useGetMyOrders();

    const { userData, myOrders,socket } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch=useDispatch()
    useEffect(()=>{
socket?.on('newOrder',(data)=>{
if(data,shopOrders?.owner._id==userData._id){
    dispatch(setMyOrders([data,...myOrders]))
}
})
return ()=>{
    socket?.off('newOrder')
}

    },[socket])

    return (
        <div className='w-full min-h-screen bg-[#fff9f6] flex justify-center px-4'>
            <div className='w-full max-w-[800px] p-4'>

               
                <div className='flex items-center gap-4 mb-6'>
                    <IoIosArrowRoundBack
                        size={28}
                        className="text-[#ff4d2d] cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <h1 className='text-2xl font-bold text-gray-700'>
                        My Orders
                    </h1>
                </div>

              
                {(!myOrders || myOrders.length === 0) && (
                    <div className='text-center text-gray-500 mt-10'>
                        No orders found
                    </div>
                )}

      
                <div className='space-y-6'>
                    {myOrders?.map((order) => {
                        if (!userData) return null;

                        if (userData.role === "user") {
                            return (
                                <UserOrderCard
                                    key={order._id}
                                    data={order}
                                />
                            );
                        }

                        if (userData.role === "owner") {
                            return (
                                <OwnerOrderCard
                                    key={order._id}
                                    data={order}
                                />
                            );
                        }

                        return null;
                    })}
                </div>

            </div>
        </div>
    );
}

export default MyOrders;*/


/*
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import useGetMyOrders from "../hooks/useGetMyOrders";
import UserOrderCard from '../components/UserOrderCard';
import OwnerOrderCard from '../components/OwnerOrderCard';
import { setMyOrders, updateorderStatus, updateRealtimeOrderStatus } from "../redux/userSlice";

function MyOrders() {
    useGetMyOrders();

    const { userData, myOrders, socket } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ✅ SOCKET FIX
    useEffect(() => {
        if (!socket || !userData) return;

        socket.on("newOrder", (data) => {
            const isOwnerOrder = data?.shopOrders?.some(
                (so) => so.owner === userData._id
            );

            if (userData.role === "owner" && isOwnerOrder) {
                dispatch(setMyOrders([data, ...(myOrders || [])]));
            }
        });

        socket.on('update-status',({orderId,shopId,status,userId})=>{
            if(userId==userData._id){
                dispatch(updateRealtimeOrderStatus(orderId,shopId,status))
            }
        })

        return () => socket?.off("newOrder");
        socket?.off("update-status");
    }, [socket, userData, myOrders, dispatch]);

    return (
        <div className='w-full min-h-screen bg-[#fff9f6] flex justify-center px-4'>
            <div className='w-full max-w-[800px] p-4'>

                <div className='flex items-center gap-4 mb-6'>
                    <IoIosArrowRoundBack
                        size={28}
                        className="text-[#ff4d2d] cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <h1 className='text-2xl font-bold text-gray-700'>
                        My Orders
                    </h1>
                </div>

              
                {!Array.isArray(myOrders) || myOrders.length === 0 ? (
                    <div className='text-center text-gray-500 mt-10'>
                        No orders found
                    </div>
                ) : (
                    <div className='space-y-6'>
                        {myOrders.map((order) => {
                            if (!userData) return null;

                            if (userData.role === "user") {
                                return <UserOrderCard key={order._id} data={order} />;
                            }

                            if (userData.role === "owner") {
                                return <OwnerOrderCard key={order._id} data={order} />;
                            }

                            return null;
                        })}
                    </div>
                )}

            </div>
        </div>
    );
}

export default MyOrders;*/




/*
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import useGetMyOrders from "../hooks/useGetMyOrders";
import UserOrderCard from '../components/UserOrderCard';
import OwnerOrderCard from '../components/OwnerOrderCard';
import { setMyOrders, updateRealtimeOrderStatus } from "../redux/userSlice";

function MyOrders() {
    useGetMyOrders();

    const { userData, myOrders, socket } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket || !userData) return;

        // ✅ NEW ORDER
        socket.on("newOrder", (data) => {
            const isOwnerOrder = data?.shopOrders?.some(
                (so) => so.owner === userData._id
            );

            if (userData.role === "owner" && isOwnerOrder) {
                dispatch(setMyOrders([data, ...(myOrders || [])]));
            }
        });

        // ✅ STATUS UPDATE (FIXED)
        socket.on("update-status", ({ orderId, shopId, status, userId }) => {
            if (userId === userData._id) {
                dispatch(updateRealtimeOrderStatus({
                    orderId,
                    shopId,
                    status
                }));
            }
        });

        // ✅ CLEANUP FIXED
        return () => {
            socket.off("newOrder");
            socket.off("update-status");
        };

    }, [socket, userData, myOrders, dispatch]);

    return (
        <div className='w-full min-h-screen bg-[#fff9f6] flex justify-center px-4'>
            <div className='w-full max-w-[800px] p-4'>

                <div className='flex items-center gap-4 mb-6'>
                    <IoIosArrowRoundBack
                        size={28}
                        className="text-[#ff4d2d] cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <h1 className='text-2xl font-bold text-gray-700'>
                        My Orders
                    </h1>
                </div>

               
                {!Array.isArray(myOrders) || myOrders.length === 0 ? (
                    <div className='text-center text-gray-500 mt-10'>
                        No orders found
                    </div>
                ) : (
                    <div className='space-y-6'>
                        {myOrders.map((order) => {
                            if (!userData) return null;

                            if (userData.role === "user") {
                                return <UserOrderCard key={order._id} data={order} />;
                            }

                            if (userData.role === "owner") {
                                return <OwnerOrderCard key={order._id} data={order} />;
                            }

                            return null;
                        })}
                    </div>
                )}

            </div>
        </div>
    );
}

export default MyOrders;*/


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import useGetMyOrders from "../hooks/useGetMyOrders";
import UserOrderCard from '../components/UserOrderCard';
import OwnerOrderCard from '../components/OwnerOrderCard';
import { setMyOrders, updateRealtimeOrderStatus } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../App";

function MyOrders() {

    useGetMyOrders();

    const { userData, myOrders, socket } =
        useSelector(state => state.user);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    // ================= DELIVERY HISTORY =================
    const [deliveries, setDeliveries] = useState([]);

    const [loadingHistory, setLoadingHistory] =
        useState(false);

    const DELIVERY_CHARGE = 50;

    // ================= GET DELIVERY HISTORY =================
    const getDeliveryHistory = async () => {

        try {

            setLoadingHistory(true);

            const token = localStorage.getItem("token");

            const res = await axios.get(
                `${serverUrl}/api/order/get-delivery-history`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDeliveries(res.data || []);

        } catch (error) {

            console.log(error);

        } finally {

            setLoadingHistory(false);

        }

    };

    // ================= SOCKET =================
    useEffect(() => {

        if (!socket || !userData) return;

        // ✅ NEW ORDER
        socket.on("newOrder", (data) => {

            const isOwnerOrder =
                data?.shopOrders?.some(
                    (so) => so.owner === userData._id
                );

            if (
                userData.role === "owner" &&
                isOwnerOrder
            ) {

                dispatch(
                    setMyOrders([
                        data,
                        ...(myOrders || [])
                    ])
                );

            }

        });

        // ✅ STATUS UPDATE
        socket.on(
            "update-status",
            ({ orderId, shopId, status, userId }) => {

                if (userId === userData._id) {

                    dispatch(
                        updateRealtimeOrderStatus({
                            orderId,
                            shopId,
                            status
                        })
                    );

                }

            }
        );

        return () => {

            socket.off("newOrder");

            socket.off("update-status");

        };

    }, [socket, userData, myOrders, dispatch]);

    // ================= DELIVERY HISTORY =================
    useEffect(() => {

        if (userData?.role === "deliveryBoy") {

            getDeliveryHistory();

        }

    }, [userData]);

    // ================= TOTAL EARNING =================
    const totalEarnings =
        deliveries.length * DELIVERY_CHARGE;

    return (

        <div className='w-full min-h-screen bg-[#fff9f6] flex justify-center px-4'>

            <div className='w-full max-w-[850px] p-4'>

                {/* HEADER */}

                <div className='flex items-center gap-4 mb-6'>

                    <IoIosArrowRoundBack
                        size={28}
                        className="text-[#ff4d2d] cursor-pointer"
                        onClick={() => navigate(-1)}
                    />

                    <h1 className='text-2xl font-bold text-gray-700'>

                        {userData?.role === "deliveryBoy"
                            ? "My Deliveries"
                            : "My Orders"
                        }

                    </h1>

                </div>

                {/* ================= DELIVERY BOY ================= */}

                {userData?.role === "deliveryBoy" && (

                    <>

                        {/* EARNINGS */}

                        <div className='bg-white rounded-2xl shadow-md p-6 mb-6 border border-orange-100'>

                            <h2 className='text-lg font-semibold text-gray-700'>

                                Total Earnings

                            </h2>

                            <h1 className='text-4xl font-bold text-green-600 mt-2'>

                                ₹{totalEarnings}

                            </h1>

                            <p className='text-sm text-gray-500 mt-2'>

                                Total Delivered Orders:
                                {" "}
                                {deliveries.length}

                            </p>

                        </div>

                        {/* LOADING */}

                        {loadingHistory && (

                            <div className='text-center text-gray-500'>

                                Loading...

                            </div>

                        )}

                        {/* EMPTY */}

                        {!loadingHistory &&
                            deliveries.length === 0 && (

                                <div className='bg-white rounded-2xl shadow-md p-10 text-center text-gray-500'>

                                    No deliveries completed yet

                                </div>

                            )}

                        {/* DELIVERY LIST */}

                        <div className='flex flex-col gap-5'>

                            {deliveries.map((delivery, index) => (

                                <div
                                    key={index}
                                    className='bg-white rounded-2xl shadow-md p-5 border border-gray-100'
                                >

                                    <div className='flex items-center justify-between mb-3'>

                                        <div>

                                            <h2 className='text-2xl font-bold text-gray-800'>

                                                {delivery.shopName}

                                            </h2>

                                            <p className='text-sm text-gray-500'>

                                                Customer:
                                                {" "}
                                                {delivery.customerName}

                                            </p>

                                        </div>

                                        <div className='bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold'>

                                            Delivered

                                        </div>

                                    </div>

                                    <div className='text-sm text-gray-600 mb-4'>

                                        📍 {delivery.address}

                                    </div>

                                    {/* ITEMS */}

                                    <div className='border rounded-xl p-4 bg-gray-50'>

                                        <h3 className='font-semibold text-lg mb-3'>

                                            Items

                                        </h3>

                                        <div className='flex flex-col gap-2'>

                                            {delivery.items.map((item, i) => (

                                                <div
                                                    key={i}
                                                    className='flex justify-between text-sm'
                                                >

                                                    <span>

                                                        {item.name}
                                                        {" × "}
                                                        {item.quantity}

                                                    </span>

                                                    <span>

                                                        ₹
                                                        {item.price * item.quantity}

                                                    </span>

                                                </div>

                                            ))}

                                        </div>

                                    </div>

                                    {/* FOOTER */}

                                    <div className='flex items-center justify-between mt-5'>

                                        <div className='text-sm text-gray-500'>

                                            Delivered At:
                                            {" "}
                                            {new Date(
                                                delivery.deliveredAt
                                            ).toLocaleString()}

                                        </div>

                                        {/* ✅ DELIVERY BOY EARNING */}

                                        <div className='text-3xl font-bold text-green-600'>

                                            ₹50

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </>

                )}

                {/* ================= USER / OWNER ================= */}

                {userData?.role !== "deliveryBoy" && (

                    <>

                        {!Array.isArray(myOrders) ||
                            myOrders.length === 0 ? (

                            <div className='text-center text-gray-500 mt-10'>

                                No orders found

                            </div>

                        ) : (

                            <div className='space-y-6'>

                                {myOrders.map((order) => {

                                    if (!userData) return null;

                                    if (userData.role === "user") {

                                        return (
                                            <UserOrderCard
                                                key={order._id}
                                                data={order}
                                            />
                                        );

                                    }

                                    if (userData.role === "owner") {

                                        return (
                                            <OwnerOrderCard
                                                key={order._id}
                                                data={order}
                                            />
                                        );

                                    }

                                    return null;

                                })}

                            </div>

                        )}

                    </>

                )}

            </div>

        </div>

    );
}

export default MyOrders;