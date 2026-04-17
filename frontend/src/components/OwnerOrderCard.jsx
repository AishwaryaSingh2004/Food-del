/*
import React, { useState } from 'react';
import { MdPhone } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "../App";
import { updateorderStatus } from '../redux/userSlice';
import { useDispatch } from "react-redux";

function OwnerOrderCard({ data }) {
    const [availableBoys, setAvailableBoys] = useState([]);
    const dispatch = useDispatch();

    const handleUpdateStatus = async (orderId, shopId, status) => {
        try {
            const token = localStorage.getItem("token"); // ✅ FIX

            const result = await axios.post(
                `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // ✅ FIX
                    }
                }
            );

            dispatch(updateorderStatus({ orderId, shopId, status }));
            setAvailableBoys(result.data.availableBoys || []);

            console.log(result.data);

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div className='bg-white rounded-lg shadow p-4 space-y-4'>

            
            <div>
                <h2 className='text-lg font-semibold text-gray-800'>
                    {data?.user?.fullName}
                </h2>
                <p className='text-sm text-gray-500'>{data?.user?.email}</p>

                <p className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
                    <MdPhone />
                    <span>{data?.user?.mobile}</span>
                </p>
            </div>

            
            <div className='flex flex-col gap-2 text-gray-600 text-sm'>
                <p>{data?.deliveryAddress?.text}</p>
                <p className='text-xs text-gray-500'>
                    Lat: {data?.deliveryAddress?.latitude} , Lon {data?.deliveryAddress?.longitude}
                </p>
            </div>

            
            <div className='flex space-x-4 overflow-x-auto pb-2'>
                {data?.shopOrders?.map((shopOrder) =>
                    shopOrder?.shopOrderItems?.map((item, i) => (
                        <div key={i} className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white'>
                            <img
                                src={item?.item?.image}
                                alt=""
                                className='w-full h-24 object-cover rounded'
                            />
                            <p className='text-sm font-semibold mt-1'>
                                {item?.name}
                            </p>
                            <p className='text-xs text-gray-500'>
                                Qty: {item?.quantity} x ₹{item?.price}
                            </p>
                        </div>
                    ))
                )}
            </div>

           
            <div className='flex justify-between items-center mt-auto pt-3 border-t border-gray-100'>
                <span className='text-sm'>
                    status:{" "}
                    <span className='font-semibold capitalize text-[#ff4d2d]'>
                        {data?.shopOrders?.[0]?.status}
                    </span>
                </span>

                <select
                    className='rounded-md border px-3 py-1 text-sm border-[#ff4d2d] text-[#ff4d2d]'
                    onChange={(e) =>
                        handleUpdateStatus(
                            data?._id,
                            data?.shopOrders?.[0]?.shop?._id,
                            e.target.value
                        )
                    }
                >
                    <option value="">Change</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="out for delivery">Out For Delivery</option>
                </select>
            </div>

            
            
            {data?.shopOrders?.[0]?.status === "out for delivery" && (
                <div className="mt-3 p-3 border rounded-lg text-sm bg-orange-50">

                    <p className="font-medium mb-2">Delivery Status:</p>

                   
                    {data?.shopOrders?.[0]?.assignedDeliveryBoy ? (
                        <div className="text-green-600">
                            🚚 {data.shopOrders[0].assignedDeliveryBoy.fullName} -{" "}
                            {data.shopOrders[0].assignedDeliveryBoy.mobile}
                        </div>
                    ) : (
                        <>
                           
                            {availableBoys?.length > 0 ? (
                                <div className="space-y-1">
                                    {availableBoys.map((b, index) => (
                                        <div key={index} className="text-gray-800">
                                            {b.fullName} - {b.mobile}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-600">
                                    Waiting for delivery boy to accept
                                </div>
                            )}
                        </>
                    )}

                </div>
            )}

            
            <div className='text-right font-bold text-gray-800 text-sm'>
                Total: ₹{data?.shopOrders?.[0]?.subTotal}
            </div>

            export default OwnerOrderCard;*/



/*
import React, { useState } from 'react';
import { MdPhone } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "../App";
import { updateorderStatus } from '../redux/userSlice';
import { useDispatch } from "react-redux";

function OwnerOrderCard({ data }) {
    const [availableBoys, setAvailableBoys] = useState([]);
    const dispatch = useDispatch();

    const handleUpdateStatus = async (orderId, shopId, status) => {
        try {
            const token = localStorage.getItem("token");

            const result = await axios.post(
                `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            dispatch(updateorderStatus({ orderId, shopId, status }));
            setAvailableBoys(result.data.availableBoys || []);

            console.log(result.data);

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

  

    return (
        <div className='bg-white rounded-lg shadow p-4 space-y-4'>

          
            <div>
                <h2 className='text-lg font-semibold text-gray-800'>
                    {data?.user?.fullName}
                </h2>
                <p className='text-sm text-gray-500'>{data?.user?.email}</p>

                <p className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
                    <MdPhone />
                    <span>{data?.user?.mobile}</span>
                </p>
                {data.paymentMethod=="online"?<p>payment: {data.payment?"True":"False"}</p>:<p>Payment Method: {data.paymentMethod}</p>}
                
            </div>

           
            <div className='flex flex-col gap-2 text-gray-600 text-sm'>
                <p>{data?.deliveryAddress?.text}</p>
                <p className='text-xs text-gray-500'>
                    Lat: {data?.deliveryAddress?.latitude} , Lon {data?.deliveryAddress?.longitude}
                </p>
            </div>

     
            <div className='flex space-x-4 overflow-x-auto pb-2'>
                {data?.shopOrders?.map((shopOrder) =>
                    shopOrder?.shopOrderItems?.map((item, i) => (
                        <div key={i} className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white'>
                            <img
                                src={item?.item?.image}
                                alt=""
                                className='w-full h-24 object-cover rounded'
                            />
                            <p className='text-sm font-semibold mt-1'>
                                {item?.name}
                            </p>
                            <p className='text-xs text-gray-500'>
                                Qty: {item?.quantity} x ₹{item?.price}
                            </p>
                        </div>
                    ))
                )}
            </div>

       
            <div className='flex justify-between items-center mt-auto pt-3 border-t border-gray-100'>
                <span className='text-sm'>
                    status:{" "}
                    <span className='font-semibold capitalize text-[#ff4d2d]'>
                        {data?.shopOrders?.[0]?.status}
                    </span>
                </span>

                <select
                    className='rounded-md border px-3 py-1 text-sm border-[#ff4d2d] text-[#ff4d2d]'
                    onChange={(e) =>
                        handleUpdateStatus(
                            data?._id,
                            data?.shopOrders?.[0]?.shop?._id,
                            e.target.value
                        )
                    }
                >
                    <option value="">Change</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="out for delivery">Out For Delivery</option>
                </select>
            </div>

 
            {data?.shopOrders?.[0]?.status === "out for delivery" && (
                <div className="mt-3 p-3 border rounded-lg text-sm bg-orange-50">

                    <p className="font-medium mb-2">Delivery Status:</p>

                    {data?.shopOrders?.[0]?.assignedDeliveryBoy ? (
                        <div className="text-green-600">
                            🚚 {data.shopOrders[0].assignedDeliveryBoy.fullName} -{" "}
                            {data.shopOrders[0].assignedDeliveryBoy.mobile}
                        </div>
                    ) : (
                        <>
                            {availableBoys?.length > 0 ? (
                                <div className="space-y-1">
                                    {availableBoys.map((b, index) => (
                                        <div key={index} className="text-gray-800">
                                            {b.fullName} - {b.mobile}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-600">
                                    Waiting for delivery boy to accept
                                </div>
                            )}
                        </>
                    )}

                </div>
            )}


            <div className='text-right font-bold text-gray-800 text-sm'>
                Total: ₹{data?.shopOrders?.[0]?.subTotal}
            </div>

        </div>
    );
}

export default OwnerOrderCard;*/


/*
import React, { useState } from 'react';
import { MdPhone } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "../App";
import { updateorderStatus } from '../redux/userSlice';
import { useDispatch } from "react-redux";

function OwnerOrderCard({ data }) {
    const [availableBoys, setAvailableBoys] = useState([]);
    const dispatch = useDispatch();

    const handleUpdateStatus = async (orderId, shopId, status) => {
        try {
            const token = localStorage.getItem("token");

            const result = await axios.post(
                `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            dispatch(updateorderStatus({ orderId, shopId, status }));
            setAvailableBoys(result.data.availableBoys || []);

            console.log(result.data);

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

  

    return (
        <div className='bg-white rounded-lg shadow p-4 space-y-4'>

          
            <div>
                <h2 className='text-lg font-semibold text-gray-800'>
                    {data?.user?.fullName}
                </h2>
                <p className='text-sm text-gray-500'>{data?.user?.email}</p>

                <p className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
                    <MdPhone />
                    <span>{data?.user?.mobile}</span>
                </p>

             
                <p>payment: {data?.payment ? "True" : "False"}</p>
                
            </div>

           
            <div className='flex flex-col gap-2 text-gray-600 text-sm'>
                <p>{data?.deliveryAddress?.text}</p>
                <p className='text-xs text-gray-500'>
                    Lat: {data?.deliveryAddress?.latitude} , Lon {data?.deliveryAddress?.longitude}
                </p>
            </div>

     
            <div className='flex space-x-4 overflow-x-auto pb-2'>
                {data?.shopOrders?.map((shopOrder) =>
                    shopOrder?.shopOrderItems?.map((item, i) => (
                        <div key={i} className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white'>
                            <img
                                src={item?.item?.image}
                                alt=""
                                className='w-full h-24 object-cover rounded'
                            />
                            <p className='text-sm font-semibold mt-1'>
                                {item?.name}
                            </p>
                            <p className='text-xs text-gray-500'>
                                Qty: {item?.quantity} x ₹{item?.price}
                            </p>
                        </div>
                    ))
                )}
            </div>

       
            <div className='flex justify-between items-center mt-auto pt-3 border-t border-gray-100'>
                <span className='text-sm'>
                    status:{" "}
                    <span className='font-semibold capitalize text-[#ff4d2d]'>
                        {data?.shopOrders?.[0]?.status}
                    </span>
                </span>

                <select
                    className='rounded-md border px-3 py-1 text-sm border-[#ff4d2d] text-[#ff4d2d]'
                    onChange={(e) =>
                        handleUpdateStatus(
                            data?._id,
                            data?.shopOrders?.[0]?.shop?._id,
                            e.target.value
                        )
                    }
                >
                    <option value="">Change</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="out for delivery">Out For Delivery</option>
                </select>
            </div>

 
            {data?.shopOrders?.[0]?.status === "out for delivery" && (
                <div className="mt-3 p-3 border rounded-lg text-sm bg-orange-50">

                    <p className="font-medium mb-2">Delivery Status:</p>

                    {data?.shopOrders?.[0]?.assignedDeliveryBoy ? (
                        <div className="text-green-600">
                            🚚 {data.shopOrders[0].assignedDeliveryBoy.fullName} -{" "}
                            {data.shopOrders[0].assignedDeliveryBoy.mobile}
                        </div>
                    ) : (
                        <>
                            {availableBoys?.length > 0 ? (
                                <div className="space-y-1">
                                    {availableBoys.map((b, index) => (
                                        <div key={index} className="text-gray-800">
                                            {b.fullName} - {b.mobile}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-600">
                                    Waiting for delivery boy to accept
                                </div>
                            )}
                        </>
                    )}

                </div>
            )}


            <div className='text-right font-bold text-gray-800 text-sm'>
                Total: ₹{data?.shopOrders?.[0]?.subTotal}
            </div>

        </div>
    );
}

export default OwnerOrderCard;*/


/*
import React, { useState } from 'react';
import { MdPhone } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "../App";
import { updateorderStatus } from '../redux/userSlice';
import { useDispatch } from "react-redux";

function OwnerOrderCard({ data }) {
    const [availableBoys, setAvailableBoys] = useState([]);
    const dispatch = useDispatch();

    const handleUpdateStatus = async (orderId, shopId, status) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const result = await axios.post(
                `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            dispatch(updateorderStatus({ orderId, shopId, status }));

            // ✅ Safe fallback
            setAvailableBoys(result.data?.availableBoys || []);

        } catch (error) {
            console.log("STATUS UPDATE ERROR:", error.response?.data || error.message);
        }
    };

    return (
        <div className='bg-white rounded-lg shadow p-4 space-y-4'>

         
            <div>
                <h2 className='text-lg font-semibold text-gray-800'>
                    {data?.user?.fullName}
                </h2>
                <p className='text-sm text-gray-500'>{data?.user?.email}</p>

                <p className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
                    <MdPhone />
                    <span>{data?.user?.mobile}</span>
                </p>

       
                <p>Payment: {data?.payment ? "Paid" : "Pending"}</p>
            </div>

   
            <div className='flex flex-col gap-2 text-gray-600 text-sm'>
                <p>{data?.deliveryAddress?.text}</p>
                <p className='text-xs text-gray-500'>
                    Lat: {data?.deliveryAddress?.latitude} , Lon {data?.deliveryAddress?.longitude}
                </p>
            </div>

      
            <div className='flex space-x-4 overflow-x-auto pb-2'>
                {data?.shopOrders?.map((shopOrder) =>
                    shopOrder?.shopOrderItems?.map((item, i) => (
                        <div key={i} className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white'>
                            <img
                                src={item?.item?.image}
                                alt=""
                                className='w-full h-24 object-cover rounded'
                            />
                            <p className='text-sm font-semibold mt-1'>
                                {item?.name}
                            </p>
                            <p className='text-xs text-gray-500'>
                                Qty: {item?.quantity} x ₹{item?.price}
                            </p>
                        </div>
                    ))
                )}
            </div>

     
            <div className='flex justify-between items-center mt-auto pt-3 border-t border-gray-100'>
                <span className='text-sm'>
                    Status:{" "}
                    <span className='font-semibold capitalize text-[#ff4d2d]'>
                        {data?.shopOrders?.[0]?.status}
                    </span>
                </span>

                <select
                    className='rounded-md border px-3 py-1 text-sm border-[#ff4d2d] text-[#ff4d2d]'
                    onChange={(e) =>
                        handleUpdateStatus(
                            data?._id,
                            data?.shopOrders?.[0]?.shop?._id,
                            e.target.value
                        )
                    }
                >
                    <option value="">Change</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="out for delivery">Out For Delivery</option>
                </select>
            </div>

  
            {data?.shopOrders?.[0]?.status === "out for delivery" && (
                <div className="mt-3 p-3 border rounded-lg text-sm bg-orange-50">

                    <p className="font-medium mb-2">Delivery Status:</p>

                    {data?.shopOrders?.[0]?.assignedDeliveryBoy ? (
                        <div className="text-green-600">
                            🚚 {data.shopOrders[0].assignedDeliveryBoy.fullName} -{" "}
                            {data.shopOrders[0].assignedDeliveryBoy.mobile}
                        </div>
                    ) : (
                        <>
                            {availableBoys?.length > 0 ? (
                                <div className="space-y-1">
                                    {availableBoys.map((b, index) => (
                                        <div key={index} className="text-gray-800">
                                            {b.fullName} - {b.mobile}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-600">
                                    Waiting for delivery boy to accept
                                </div>
                            )}
                        </>
                    )}

                </div>
            )}

     
            <div className='text-right font-bold text-gray-800 text-sm'>
                Total: ₹{data?.shopOrders?.[0]?.subTotal}
            </div>

        </div>
    );
}

export default OwnerOrderCard;*/



import React from 'react';
import { MdPhone } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "../App";
import { updateorderStatus } from '../redux/userSlice';
import { useDispatch } from "react-redux";

function OwnerOrderCard({ data }) {
    const dispatch = useDispatch();

    const handleUpdateStatus = async (orderId, shopId, status) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const result = await axios.post(
                `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // ✅ update redux
            dispatch(updateorderStatus({
                orderId,
                shopId,
                status
            }));

            console.log("UPDATED:", result.data);

        } catch (error) {
            console.log("STATUS UPDATE ERROR:", error.response?.data || error.message);
        }
    };

    const shopOrder = data?.shopOrders?.[0];

    return (
        <div className='bg-white rounded-lg shadow p-4 space-y-4'>

            {/* USER INFO */}
            <div>
                <h2 className='text-lg font-semibold text-gray-800'>
                    {data?.user?.fullName}
                </h2>
                <p className='text-sm text-gray-500'>{data?.user?.email}</p>

                <p className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
                    <MdPhone />
                    <span>{data?.user?.mobile}</span>
                </p>

                <p className='gap-2 text-sm text-gray-600'>Payment: {data?.payment ? "Paid" : "Pending"}</p>
            </div>

            {/* ADDRESS */}
            <div className='text-sm text-gray-600'>
                <p>{data?.deliveryAddress?.text}</p>
                <p className='text-xs text-gray-500'>
                    Lat: {data?.deliveryAddress?.latitude} , Lon {data?.deliveryAddress?.longitude}
                </p>
            </div>

            {/* ITEMS */}
            <div className='flex space-x-4 overflow-x-auto pb-2'>
                {shopOrder?.shopOrderItems?.map((item, i) => (
                    <div key={i} className='flex-shrink-0 w-40 border rounded-lg p-2'>
                        <img
                            src={item?.item?.image}
                            alt=""
                            className='w-full h-24 object-cover rounded'
                        />
                        <p className='text-sm font-semibold mt-1'>{item?.name}</p>
                        <p className='text-xs text-gray-500'>
                            Qty: {item?.quantity} x ₹{item?.price}
                        </p>
                    </div>
                ))}
            </div>

            {/* STATUS */}
            <div className='flex justify-between items-center pt-3 border-t'>
                <span className='text-sm'>
                    Status:{" "}
                    <span className='font-semibold capitalize text-[#ff4d2d]'>
                        {shopOrder?.status}
                    </span>
                </span>

                <select
                    className='border px-3 py-1 text-sm text-[#ff4d2d]'
                    onChange={(e) =>
                        handleUpdateStatus(
                            data?._id,
                            shopOrder?.shop?._id,
                            e.target.value
                        )
                    }
                >
                    <option value="">Change</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="out for delivery">Out For Delivery</option>
                </select>
            </div>

            {/* DELIVERY STATUS */}
            {shopOrder?.status === "out for delivery" && (
                <div className="mt-3 p-3 border rounded bg-orange-50 text-sm">

                    <p className="font-medium mb-2">Delivery Status:</p>

                    {shopOrder?.assignedDeliveryBoy ? (
                        <div className="text-green-600">
                            🚚 {shopOrder.assignedDeliveryBoy.fullName} -{" "}
                            {shopOrder.assignedDeliveryBoy.mobile}
                        </div>
                    ) : (
                        <div className="text-gray-600">
                            Waiting for delivery boy to accept...
                        </div>
                    )}
                </div>
            )}

            {/* TOTAL */}
            <div className='text-right font-bold text-sm'>
                Total: ₹{shopOrder?.subTotal}
            </div>

        </div>
    );
}

export default OwnerOrderCard;