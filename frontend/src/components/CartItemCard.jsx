/*import React from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from 'react-redux';

function CartItemCard({ data, handleIncrease, handleDecrease }) {
    const dispatch=useDispatch()
    const handleIncrease=(id,currentQty)=>{
        dispatch(updateQuantity({id,quantity:currentQty+1}))
    }
        const handleDecrease=(id,currentQty)=>{
            if(currentQty>0){
                dispatch(updateQuantity({id,quantity:currentQty-1}))
            }
            
    }

  const imageUrl = data.image?.startsWith("http")
    ? data.image
    : `http://localhost:8000${data.image}`;

  return (
    <div className='flex items-center justify-between bg-white p-4 rounded-xl border border-black mb-4'>

      
      <div className='flex items-center gap-4'>

        
        <img 
          src={imageUrl}
          alt={data.name}
          className='w-20 h-20 object-cover rounded-lg border'
        />

        
        <div className='flex flex-col'>

          <h2 className='text-lg font-semibold text-gray-800 mb-1'>
            {data.name}
          </h2>

          <p className='text-gray-500 text-sm mb-1'>
            ₹{data.price} x {data.quantity}
          </p>

          <p className='text-gray-700'>
            ₹{data.price * data.quantity}
          </p>

        </div>
      </div>

      
      <div className='flex items-center gap-3 '>

        
        <button
          onClick={() => handleDecrease(data._id,data.quantity)}
          className='w-7 h-7 flex items-center justify-center border rounded bg-gray-100 hover:bg-gray-200 cursor-pointer'
        >
          <FaMinus size={12} />
        </button>

        
        <span className='text-sm font-medium'>
          {data.quantity}
        </span>

       
        <button
          onClick={() => handleIncrease(data._id,data.quantity)}
          className='w-7 h-7 flex items-center justify-center border rounded bg-gray-100 hover:bg-gray-200 cursor-pointer'
        >
          <FaPlus size={12} />
        </button>
        <button className='p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200'>
            <CiTrash size={18} />
        </button>
      </div>

    </div>
  );
}

export default CartItemCard;*/

/*
import React from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { removeCartItems, updateQuantity } from '../redux/userSlice'; // ✅ IMPORT

function CartItemCard({ data }) {

  const dispatch = useDispatch();

  // ✅ FIXED FUNCTIONS (no conflict)
  const handleIncrease = () => {
    dispatch(updateQuantity({
      id: data.id, // ⚠️ use id (not _id)
      quantity: data.quantity + 1
    }));
  };

  const handleDecrease = () => {
    if (data.quantity > 1) {
      dispatch(updateQuantity({
        id: data.id,
        quantity: data.quantity - 1
      }));
    }
  };

  const imageUrl = data.image?.startsWith("http")
    ? data.image
    : `http://localhost:8000${data.image}`;

  return (
    <div className='flex items-center justify-between bg-white p-4 rounded-xl border border-black mb-4'>

      
      <div className='flex items-center gap-4'>

        <img 
          src={imageUrl}
          alt={data.name}
          className='w-20 h-20 object-cover rounded-lg border'
        />

        <div className='flex flex-col'>
          <h2 className='text-lg font-semibold text-gray-800 mb-1'>
            {data.name}
          </h2>

          <p className='text-gray-500 text-sm mb-1'>
            ₹{data.price} x {data.quantity}
          </p>

          <p className='text-gray-700'>
            ₹{data.price * data.quantity}
          </p>
        </div>
      </div>

      
      <div className='flex items-center gap-3'>

        <button
          onClick={handleDecrease}
          className='w-7 h-7 flex items-center justify-center border border-gray-200 rounded bg-gray-100 hover:bg-gray-200'
        >
          <FaMinus size={12} />
        </button>

        <span className='text-sm font-medium'>
          {data.quantity}
        </span>

        <button
          onClick={handleIncrease}
          className='w-7 h-7 flex items-center justify-center border border-gray-200 rounded bg-gray-100 hover:bg-gray-200'
        >
          <FaPlus size={12} />
        </button>

       
        <button className='p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200' onClick={()=>dispatch(removeCartItems(data.id))}>
          <CiTrash size={18} />
        </button>

      </div>

    </div>
  );
}

export default CartItemCard;*/


import React from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from 'react-redux';

// ✅ FIXED IMPORT
import { removeCartItem, updateQuantity } from '../redux/userSlice';

function CartItemCard({ data }) {

  const dispatch = useDispatch();

  // ✅ INCREASE
  const handleIncrease = () => {
    dispatch(updateQuantity({
      id: data.id,
      quantity: data.quantity + 1
    }));
  };

  // ✅ DECREASE
  const handleDecrease = () => {
    if (data.quantity > 1) {
      dispatch(updateQuantity({
        id: data.id,
        quantity: data.quantity - 1
      }));
    }
  };

  const handleRemove = () => {
    dispatch(removeCartItem(data.id)); // ✅ FIXED
  };

  const imageUrl = data.image?.startsWith("http")
    ? data.image
    : `http://localhost:8000${data.image}`;

  return (
    <div className='flex items-center justify-between bg-white p-4 rounded-xl border border-black mb-4'>

      <div className='flex items-center gap-4'>
        <img 
          src={imageUrl}
          alt={data.name}
          className='w-20 h-20 object-cover rounded-lg border'
        />

        <div className='flex flex-col'>
          <h2 className='text-lg font-semibold text-gray-800 mb-1'>
            {data.name}
          </h2>

          <p className='text-gray-500 text-sm mb-1'>
            ₹{data.price} x {data.quantity}
          </p>

          <p className='text-gray-700'>
            ₹{data.price * data.quantity}
          </p>
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <button
          onClick={handleDecrease}
          className='w-7 h-7 flex items-center justify-center border border-gray-200 rounded bg-gray-100 hover:bg-gray-200'
        >
          <FaMinus size={12} />
        </button>

        <span className='text-sm font-medium'>
          {data.quantity}
        </span>

        <button
          onClick={handleIncrease}
          className='w-7 h-7 flex items-center justify-center border border-gray-200 rounded bg-gray-100 hover:bg-gray-200'
        >
          <FaPlus size={12} />
        </button>

        {/* ✅ FIXED DELETE */}
        <button 
          className='p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200'
          onClick={handleRemove}
        >
          <CiTrash size={18} />
        </button>
      </div>

    </div>
  );
}

export default CartItemCard;