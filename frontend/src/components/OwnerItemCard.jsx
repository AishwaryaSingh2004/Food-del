/*import React from 'react';
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";


function OwnerItemCard ({ data }) {
  return (
    <div className='flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] w-full max-w-2xl'>
        <div className='w-36 h-full flex-shrink-0 bg-gray-50'>
            <img src={data.image} alt="" className='w-full h-full object-cover' />
        </div> 
        <div className='flex flex-col justify-between p-3 flex-1'>
            <div>
            <h2 className='text-base font-semibold text-[#ff4d2d]'>{data.name}</h2>
            <p><span className='font-medium text-gray-70'>Category:</span> {data.category}</p>
            <p><span className='font-medium text-gray-70'>Food Type: </span>{data.foodType}</p>
            </div>
            <div className='flex items-center justify-between'>
                <div><span>Price:</span>{data.price}</div>
               
               </div>
               <FaPen />
                <FaTrashAlt />
        </div>
    </div>
  );
}

export default OwnerItemCard;*/



/*
import React from 'react';
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { setMyShopData } from '../redux/ownerSlice';

function OwnerItemCard({ data, onEdit, onDelete }) {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleDeleteItem=async (itemId) => {
    try {
        const result=await axios.get(`${serverUrl}/api/item/delete/${data._id}`,
        {withCredentials:true})
        setMyShopData(result.data)
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <div className='flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] w-full max-w-2xl'>

        
        <div className='w-36 h-32 flex-shrink-0 bg-gray-50'>
            {data.image ? (
                <img
                    src={data.image}
                    alt="food"
                    className='w-full h-full object-cover'
                />
            ) : (
                <div className='w-full h-full flex items-center justify-center text-gray-400 text-sm'>
                    No Image
                </div>
            )}
        </div>

        
        <div className='flex flex-col justify-between p-3 flex-1'>

            
            <div>
                <h2 className='text-base font-semibold text-[#ff4d2d]'>
                    {data.name}
                </h2>

                <p className='text-sm text-gray-600'>
                    <span className='font-medium'>Category:</span> {data.category}
                </p>

                <p className='text-sm text-gray-600'>
                    <span className='font-medium'>Food Type:</span> {data.foodType}
                </p>
            </div>

            
            <div className='flex items-center justify-between mt-2'>

                
                <div className='text-sm font-semibold text-gray-800'>
                    ₹{data.price}
                </div>

                
                <div className='flex gap-3 text-gray-600' onClick={()=>navigate(`/edit-item/${data._id}`)}>

                    <FaPen
                        className='cursor-pointer hover:text-blue-500 transition'
                        onClick={() => onEdit?.(data)}
                        title="Edit"
                    />
                    
                
                    <FaTrashAlt
                        className='cursor-pointer hover:text-red-500 transition'
                        onClick={() => onDelete?.(data._id)}
                        title="Delete"
                    />

                </div>
            </div>

        </div>
    </div>
  );
}

export default OwnerItemCard;*/


import React from 'react';
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import { setMyShopData } from '../redux/ownerSlice';

function OwnerItemCard({ data }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ✅ DELETE ITEM (FIXED: stopPropagation)
    const handleDeleteItem = async (e) => {
        e.stopPropagation(); // 🔥 prevents unwanted navigation

        try {
            const confirmDelete = window.confirm("Delete this item?");
            if (!confirmDelete) return;

            const result = await axios.delete(
                `${serverUrl}/api/item/delete/${data._id}`,
                { withCredentials: true }
            );

            // ✅ update redux instantly
            dispatch(setMyShopData(result.data.shop));

        } catch (error) {
            console.log("❌ Delete Error:", error.response?.data || error.message);
        }
    };

    return (
        <div className='flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] w-full max-w-2xl'>

            {/* IMAGE */}
            <div className='w-36 h-32 flex-shrink-0 bg-gray-50'>
                {data.image ? (
                    <img
                        src={data.image}
                        alt="food"
                        className='w-full h-full object-cover'
                    />
                ) : (
                    <div className='w-full h-full flex items-center justify-center text-gray-400 text-sm'>
                        No Image
                    </div>
                )}
            </div>

            {/* DETAILS */}
            <div className='flex flex-col justify-between p-3 flex-1'>

                {/* TOP */}
                <div>
                    <h2 className='text-base font-semibold text-[#ff4d2d]'>
                        {data.name}
                    </h2>

                    <p className='text-sm text-gray-600'>
                        <span className='font-medium'>Category:</span> {data.category}
                    </p>

                    <p className='text-sm text-gray-600'>
                        <span className='font-medium'>Food Type:</span> {data.foodType}
                    </p>
                </div>

                {/* BOTTOM */}
                <div className='flex items-center justify-between mt-2'>

                    {/* PRICE */}
                    <div className='text-sm font-semibold text-gray-800'>
                        ₹{data.price}
                    </div>

                    {/* ACTIONS */}
                    <div className='flex gap-4 text-gray-600'>

                        {/* EDIT */}
                        <FaPen
                            className='cursor-pointer hover:text-blue-500 transition'
                            onClick={(e) => {
                                e.stopPropagation(); // optional safety
                                navigate(`/edit-item/${data._id}`);
                            }}
                            title="Edit"
                        />

                        {/* DELETE */}
                        <FaTrashAlt
                            className='cursor-pointer hover:text-red-500 transition'
                            onClick={(e) => handleDeleteItem(e)}
                            title="Delete"
                        />

                    </div>
                </div>

            </div>
        </div>
    );
}

export default OwnerItemCard;