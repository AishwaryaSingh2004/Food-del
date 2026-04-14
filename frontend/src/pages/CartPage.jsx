

/*
import React from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItemCard from '../components/CartItemCard';

function CartPage() {
  const navigate = useNavigate();
  const { cartItems,totalAmount } = useSelector((state) => state.user);

  return (
    <div className='min-h-screen bg-[#fff9f6] flex justify-center p-6'>
      
      <div className='w-full max-w-[800px]'>

        <div className='flex items-center gap-[20px] mb-6'>
          <IoIosArrowRoundBack
            size={28}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className='text-lg font-bold text-gray-700'>
            Your Cart
          </h1>
        </div>

        {cartItems?.length === 0 ? (
          <p className='text-gray-500 text-lg text-center'>
            Your Cart is Empty
          </p>
        ) : (<>
          <div className='space-y-4'>
            {cartItems?.map((item, index) => (
              <CartItemCard data={item} key={index} />
            ))}
          </div>
          <div className='mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center border' >
            <h1 className='text-lg font-semibold'>Total Amount</h1>
            <span className='text-xl font-bold text-[#ff4d2d] '>{totalAmount}</span>
          </div>
          </>
        )}

      </div>
    </div>
  );
}

export default CartPage;*/


/*8
import React from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItemCard from '../components/CartItemCard';

function CartPage() {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.user); // ✅ removed totalAmount

  // ✅ CALCULATE TOTAL HERE
  const totalAmount = cartItems.reduce((total, item) => {
    return total + (Number(item.price) * Number(item.quantity));
  }, 0);

  return (
    <div className='min-h-screen bg-[#fff9f6] flex justify-center p-6'>
      
      <div className='w-full max-w-[800px]'>

        <div className='flex items-center gap-[20px] mb-6'>
          <IoIosArrowRoundBack
            size={28}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className='text-lg font-bold text-gray-700'>
            Your Cart
          </h1>
        </div>

        {cartItems?.length === 0 ? (
          <p className='text-gray-500 text-lg text-center'>
            Your Cart is Empty
          </p>
        ) : (
          <>
            <div className='space-y-4'>
              {cartItems.map((item, index) => (
                <CartItemCard data={item} key={index} />
              ))}
            </div>

            <div className='mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center border'>
              <h1 className='text-lg font-semibold'>Total Amount</h1>

              {
              <span className='text-xl font-bold text-[#ff4d2d]'>
                ₹{totalAmount}
              </span>
            </div>
            <div>
                <button className='b-[#ff4d2d] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#e64526] transition '>Proceed to Checkout</button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default CartPage;*/


import React from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItemCard from '../components/CartItemCard';

function CartPage() {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.user);

  // ✅ SAFE TOTAL CALCULATION
  const totalAmount = cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return total + (price * quantity);
  }, 0);

  return (
    <div className='min-h-screen bg-[#fff9f6] flex justify-center p-6'>
      
      <div className='w-full max-w-[800px]'>

        {/* HEADER */}
        <div className='flex items-center gap-[20px] mb-6'>
          <IoIosArrowRoundBack
            size={28}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className='text-lg font-bold text-gray-700'>
            Your Cart
          </h1>
        </div>

        {/* EMPTY CART */}
        {cartItems?.length === 0 ? (
          <p className='text-gray-500 text-lg text-center'>
            Your Cart is Empty
          </p>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className='space-y-4'>
              {cartItems.map((item, index) => (
                <CartItemCard data={item} key={index} />
              ))}
            </div>

            {/* TOTAL */}
            <div className='mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center border'>
              <h1 className='text-lg font-semibold'>Total Amount</h1>

              <span className='text-xl font-bold text-[#ff4d2d]'>
                ₹{totalAmount}
              </span>
            </div>

            {/* CHECKOUT BUTTON */}
            <div className='mt-4 flex justify-end'>
              <button className='bg-[#ff4d2d] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#e64526] transition cursor-pointer' onClick={()=>navigate("/checkout")}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default CartPage;