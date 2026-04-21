
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

                {/* ✅ SAFE EMPTY CHECK */}
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

export default MyOrders;