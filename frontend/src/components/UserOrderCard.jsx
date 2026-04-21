/*import React from 'react';

function UserOrderCard({data}) {
  return (
    <div className='bg-white rounded-lg shadow p-4 space-y-4'>
      <div className='flex justify-between border-b pb-2'>
        <div>
            <p>
                order #{data._id}
            </p>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}

export default UserOrderCard;
*/

/*
import React from 'react';

function UserOrderCard({ data }) {
    const formatDate=(dateString)=>{
        const date=new Date(dateString)
        return date.toLocaleString('en-GB',{
            day:"2-digit",
            month:"short",
            year:"numeric"
        })
    }
    //console.log(data.createdAt);
  return (
    <div className='bg-white rounded-lg shadow p-4 space-y-4'>
      <div className='flex justify-between border-b pb-2'>
        <div>
          <p className='font-semibold'>
            Order #{data?._id.slice(-6)}
          </p>
          <p className='text-sm text-gray-500'>
            Date: {formatDate(data.createdAt)}
          </p>
        </div>
        <div className='text-right'>
            <p className='text-sm text-gray-500'>{data.paymentMethod?.toUpperCase()}</p>
            <p className='font-medium text-blue-600'>{data.shopOrders?.[0].status}</p>
          
        </div>
      </div>

      {data.shopOrders.map((shopOrder,index)=>(
        <div className='border rounded-lg p-3 bg-[#fffaf7] space-y-3' key={index} >
            <p>{shopOrder.shop.name}</p>

            <div className='flex space-x-4 overflow-x-auto pb-2'>
                {shopOrder.shopOrderItems.map((item,index)=>(
                    <div key={index} className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white' >
                        <img src={item.item.image} alt="" className='w-full h-24 object-cover rounded' />
                        <p className='text-sm font-semibold mt-1'>{item.name} </p>
                        <p className='text-xs text-gray-500'>Qty: {item.quantity} x ₹{item.price}  </p>

                    </div>
                ))}
            </div>
            <div className='flex justify-between items-center border-t pt-2'>
                <p className='font-semibold'>Subtotal: {shopOrder.subtotal}</p>
                <span className='text-sm font-medium text-blue-600'>{shopOrder.status} </span>
            </div>
        </div>
      ))}

        <div>
            <p className='font-semibold'>Total: ₹{data.totalAmount}</p>
            <button className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-2 rounded-lg text-sm '>Track Order</button>
        </div>

    </div>
  );
}

export default UserOrderCard;*/


/*
import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserOrderCard({ data }) {
    const navigate=useNavigate()
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString('en-GB', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    }
    //console.log(data.createdAt);
    return (
        <div className='bg-white rounded-lg shadow p-4 space-y-4'>
            <div className='flex justify-between border-b pb-2'>
                <div>
                    <p className='font-semibold'>
                        Order #{data?._id?.slice(-6)}
                    </p>
                    <p className='text-sm text-gray-500'>
                        Date: {formatDate(data?.createdAt)}
                    </p>
                </div>
                <div className='text-right'>
                    {data.paymentMethod=="cod"?<p className='text-sm text-gray-500'>{data?.paymentMethod?.toUpperCase()}</p> :<p className='font-medium text-blue-600'>{data?.shopOrders?.[0]?"Paid":"Pending".status}</p>}
                    
                    

                </div>
            </div>

            {data?.shopOrders?.map((shopOrder, index) => (
                <div className='border rounded-lg p-3 bg-[#fffaf7] space-y-3' key={index} >
                    <p>{shopOrder?.shop?.name}</p>

                    <div className='flex space-x-4 overflow-x-auto pb-2'>
                        {shopOrder?.shopOrderItems?.map((item, index) => (
                            <div key={index} className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white' >
                                <img src={item?.item?.image} alt="" className='w-full h-24 object-cover rounded' />
                                <p className='text-sm font-semibold mt-1'>{item?.name} </p>
                                <p className='text-xs text-gray-500'>Qty: {item?.quantity} x ₹{item?.price}  </p>

                            </div>
                        ))}
                    </div>
                    <div className='flex justify-between items-center border-t pt-2'>
                        <p className='font-semibold'>Subtotal: {shopOrder?.subTotal}</p>
                        <span className='text-sm font-medium text-blue-600'>{shopOrder?.status} </span>
                    </div>
                </div>
            ))}

            <div className='flex justify-between items-center'>
                <p className='font-semibold'>Total: ₹{data?.totalAmount}</p>
                <button className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-2 rounded-lg text-sm' onClick={()=>navigate(`/track-order/${data?._id}`)}>
                    Track Order
                </button>
            </div>

        </div>
    );
}

export default UserOrderCard;*/




/*

import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rating } from '../../../backend/controllers/item.controllers';

function UserOrderCard({ data }) {
    const navigate = useNavigate();
    const [selectedRating, setSelectedRating] = useState({}) //itemId:rating

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const handleRating = async (itemId, rating) => {
        try {
            const result = await axios.post(`${serverUrl}/api/item/rating`, { itemId, rating }, { withCredentials: true })
            setSelectedRating(prev => ({
                ...prev, [itemId]: rating
            }))
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='bg-white rounded-lg shadow p-4 space-y-4'>
            <div className='flex justify-between border-b pb-2'>
                <div>
                    <p className='font-semibold'>
                        Order #{data?._id?.slice(-6)}
                    </p>
                    <p className='text-sm text-gray-500'>
                        Date: {formatDate(data?.createdAt)}
                    </p>
                </div>

              
                <div className='text-right'>
                    <p className='text-sm text-gray-500'>
                        {data?.paymentMethod?.toUpperCase()}
                    </p>

                    <p className='text-sm text-blue-600'>
                        {data?.payment ? "Paid" : "Pending"}
                    </p>
                </div>
            </div>

            {data?.shopOrders?.map((shopOrder, index) => (
                <div
                    className='border rounded-lg p-3 bg-[#fffaf7] space-y-3'
                    key={index}
                >
                    <p>{shopOrder?.shop?.name}</p>

                    <div className='flex space-x-4 overflow-x-auto pb-2'>
                        {shopOrder?.shopOrderItems?.map((item, index) => (
                            <div
                                key={index}
                                className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white'
                            >
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

                                {shopOrder.status == "delivered" && <div className='flex space-x-1 mt-2'>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button className={`text-lg ${selectedRating[item.item._id]>=star?'text-yellow-400':'text-gray-400'}`}>★</button>
                                    ))}
                                </div>}



                            </div>
                        ))}
                    </div>

                    <div className='flex justify-between items-center border-t pt-2'>
                        <p className='font-semibold'>
                            Subtotal: {shopOrder?.subTotal}
                        </p>
                        <span className='text-sm font-medium text-blue-600'>
                            {shopOrder?.status}
                        </span>
                    </div>
                </div>
            ))}

            <div className='flex justify-between items-center'>
                <p className='font-semibold'>
                    Total: ₹{data?.totalAmount}
                </p>

                <button
                    className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-2 rounded-lg text-sm'
                    onClick={() => navigate(`/track-order/${data?._id}`)}
                >
                    Track Order
                </button>
            </div>
        </div>
    );
}

export default UserOrderCard;*/



/*
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
//import { serverUrl } from "../../../App.jsx";
import { serverUrl } from "../App.jsx";

function UserOrderCard({ data }) {
    const navigate = useNavigate();
    const [selectedRating, setSelectedRating] = useState({}); // itemId: rating

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const handleRating = async (itemId, rating) => {
        try {
            await axios.post(
                `${serverUrl}/api/item/rating`,
                { itemId, rating },
                { withCredentials: true }
            );

            setSelectedRating(prev => ({
                ...prev,
                [itemId]: rating
            }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='bg-white rounded-lg shadow p-4 space-y-4'>
            <div className='flex justify-between border-b pb-2'>
                <div>
                    <p className='font-semibold'>
                        Order #{data?._id?.slice(-6)}
                    </p>
                    <p className='text-sm text-gray-500'>
                        Date: {formatDate(data?.createdAt)}
                    </p>
                </div>

                <div className='text-right'>
                    <p className='text-sm text-gray-500'>
                        {data?.paymentMethod?.toUpperCase()}
                    </p>

                    <p className='text-sm text-blue-600'>
                        {data?.payment ? "Paid" : "Pending"}
                    </p>
                </div>
            </div>

            {data?.shopOrders?.map((shopOrder, index) => (
                <div
                    className='border rounded-lg p-3 bg-[#fffaf7] space-y-3'
                    key={index}
                >
                    <p>{shopOrder?.shop?.name}</p>

                    <div className='flex space-x-4 overflow-x-auto pb-2'>
                        {shopOrder?.shopOrderItems?.map((item, index) => (
                            <div
                                key={index}
                                className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white'
                            >
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

                                {shopOrder.status === "delivered" && (
                                    <div className='flex space-x-1 mt-2'>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => handleRating(item.item._id, star)}
                                                className={`text-lg ${selectedRating[item.item._id] >= star
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-400'
                                                    }`} onClick={() => handleRating(item.item._id,star)}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className='flex justify-between items-center border-t pt-2'>
                        <p className='font-semibold'>
                            Subtotal: {shopOrder?.subTotal}
                        </p>
                        <span className='text-sm font-medium text-blue-600'>
                            {shopOrder?.status}
                        </span>
                    </div>
                </div>
            ))}

            <div className='flex justify-between items-center'>
                <p className='font-semibold'>
                    Total: ₹{data?.totalAmount}
                </p>

                <button
                    className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-2 rounded-lg text-sm'
                    onClick={() => navigate(`/track-order/${data?._id}`)}
                >
                    Track Order
                </button>
            </div>
        </div>
    );
}

export default UserOrderCard;
*/



/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { serverUrl } from "../App.jsx"; // ✅ correct path

function UserOrderCard({ data }) {
    const navigate = useNavigate();
    const [selectedRating, setSelectedRating] = useState({});

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const handleRating = async (itemId, rating) => {
        try {
            await axios.post(
                `${serverUrl}/api/item/rating`,
                { itemId, rating },
                { withCredentials: true }
            );

            setSelectedRating(prev => ({
                ...prev,
                [itemId]: rating
            }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='bg-white rounded-lg shadow p-4 space-y-4'>
            
         
            <div className='flex justify-between border-b pb-2'>
                <div>
                    <p className='font-semibold'>
                        Order #{data?._id?.slice(-6)}
                    </p>
                    <p className='text-sm text-gray-500'>
                        Date: {formatDate(data?.createdAt)}
                    </p>
                </div>

                <div className='text-right'>
                    <p className='text-sm text-gray-500'>
                        {data?.paymentMethod?.toUpperCase()}
                    </p>

                    <p className='text-sm text-blue-600'>
                        {data?.payment ? "Paid" : "Pending"}
                    </p>
                </div>
            </div>

        
            {data?.shopOrders?.map((shopOrder, index) => (
                <div key={index} className='border rounded-lg p-3 bg-[#fffaf7] space-y-3'>
                    
                    <p>{shopOrder?.shop?.name}</p>

                    <div className='flex space-x-4 overflow-x-auto pb-2'>
                        {shopOrder?.shopOrderItems?.map((item, index) => (
                            <div key={index} className='w-40 border rounded-lg p-2 bg-white'>
                                
                                <img
                                    src={item?.item?.image}
                                    className='w-full h-24 object-cover rounded'
                                />

                                <p className='text-sm font-semibold mt-1'>
                                    {item?.name}
                                </p>

                                <p className='text-xs text-gray-500'>
                                    Qty: {item?.quantity} x ₹{item?.price}
                                </p>

                             
                                {shopOrder.status === "delivered" && (
                                    <div className='flex space-x-1 mt-2'>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => handleRating(item.item._id, star)}
                                                className={`text-lg ${
                                                    selectedRating[item.item._id] >= star
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-400'
                                                }`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>

                    <div className='flex justify-between items-center border-t pt-2'>
                        <p className='font-semibold'>
                            Subtotal: {shopOrder?.subTotal}
                        </p>
                        <span className='text-blue-600'>
                            {shopOrder?.status}
                        </span>
                    </div>
                </div>
            ))}

       
            <div className='flex justify-between items-center'>
                <p className='font-semibold'>
                    Total: ₹{data?.totalAmount}
                </p>

                <button
                    className='bg-[#ff4d2d] text-white px-4 py-2 rounded-lg'
                    onClick={() => navigate(`/track-order/${data?._id}`)}
                >
                    Track Order
                </button>
            </div>
        </div>
    );
}

export default UserOrderCard;*/



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { serverUrl } from "../App.jsx";

function UserOrderCard({ data }) {
    const navigate = useNavigate();
    const [selectedRating, setSelectedRating] = useState({});

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    // ✅ FIXED FUNCTION
    const handleRating = async (itemId, rating) => {
        try {
            console.log("Sending:", { itemId, rating });

            const res = await axios.post(
                `${serverUrl}/api/item/rating`,
                {
                    itemId,
                    rating: Number(rating) // 🔥 MAIN FIX
                },
                { withCredentials: true }
            );

            console.log("SUCCESS:", res.data);

            setSelectedRating(prev => ({
                ...prev,
                [itemId]: rating
            }));

        } catch (error) {
            console.log("❌ ERROR:", error.response?.data || error.message);
        }
    };

    return (
        <div className='bg-white rounded-lg shadow p-4 space-y-4'>

            {/* HEADER */}
            <div className='flex justify-between border-b pb-2'>
                <div>
                    <p className='font-semibold'>
                        Order #{data?._id?.slice(-6)}
                    </p>
                    <p className='text-sm text-gray-500'>
                        Date: {formatDate(data?.createdAt)}
                    </p>
                </div>

                <div className='text-right'>
                    <p className='text-sm text-gray-500'>
                        {data?.paymentMethod?.toUpperCase()}
                    </p>

                    <p className='text-sm text-blue-600'>
                        {data?.payment ? "Paid" : "Pending"}
                    </p>
                </div>
            </div>

            {/* ITEMS */}
            {data?.shopOrders?.map((shopOrder, index) => (
                <div key={index} className='border rounded-lg p-3 bg-[#fffaf7] space-y-3'>

                    <p>{shopOrder?.shop?.name}</p>

                    <div className='flex space-x-4 overflow-x-auto pb-2'>
                        {shopOrder?.shopOrderItems?.map((item, index) => (
                            <div key={index} className='w-40 border rounded-lg p-2 bg-white'>

                                <img
                                    src={item?.item?.image}
                                    className='w-full h-24 object-cover rounded'
                                />

                                <p className='text-sm font-semibold mt-1'>
                                    {item?.name}
                                </p>

                                <p className='text-xs text-gray-500'>
                                    Qty: {item?.quantity} x ₹{item?.price}
                                </p>

                                {/* ⭐ RATING */}
                                {shopOrder.status === "delivered" && (
                                    <div className='flex space-x-1 mt-2'>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => handleRating(item.item._id, star)}
                                                className={`text-lg ${
                                                    selectedRating[item.item._id] >= star
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-400'
                                                }`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>

                    <div className='flex justify-between items-center border-t pt-2'>
                        <p className='font-semibold'>
                            Subtotal: {shopOrder?.subTotal}
                        </p>
                        <span className='text-blue-600'>
                            {shopOrder?.status}
                        </span>
                    </div>
                </div>
            ))}

            {/* FOOTER */}
            <div className='flex justify-between items-center'>
                <p className='font-semibold'>
                    Total: ₹{data?.totalAmount}
                </p>

                <button
                    className='bg-[#ff4d2d] text-white px-4 py-2 rounded-lg'
                    onClick={() => navigate(`/track-order/${data?._id}`)}
                >
                    Track Order
                </button>
            </div>
        </div>
    );
}

export default UserOrderCard;
