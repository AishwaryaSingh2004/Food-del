/*
import React from 'react';
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";

function FoodCard({ name, image, foodType }) {
  const isVeg = foodType?.toLowerCase().trim() === "veg";

  return (
    <div className='w-[250px] rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col'>
      
     
      <div className='relative w-full h-[170px] bg-white'>
        
        
        <div className='absolute top-3 right-3 bg-white rounded-full p-2 shadow'>
          {isVeg ? (
            <FaLeaf className="text-green-600 text-lg" />   // ✅ GREEN VEG
          ) : (
            <FaDrumstickBite className="text-red-600 text-lg" /> // ✅ RED NON-VEG
          )}
        </div>
        
        <img 
          src={image} 
          alt={name} 
          className='w-full h-full object-cover'
        />
      </div>

      
      <div className='p-2 text-center text-sm font-medium text-gray-800'>
        {name}
      </div>

          <div className='flex-1 flex flex-col p-4'>
          <h1 className='font-semibold text-gray-900 text-base truncate'>{name}</h1>
          </div>
    </div>
  );
}

export default FoodCard;*/


/*
import React from 'react';
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

function FoodCard({ name, image, foodType }) {
  const isVeg = foodType?.toLowerCase().trim() === "veg";

  const renderStars=(rating)=>{.  //r=3
        const stars=[];
        for (let i=0; i<=5; i++){
            stars.push(
                (i<=rating)?(
                    <FaStar className='text-yellow-500 text-lg' />
                ):(
                    <FaRegStar className='text-yellow-500 text-lg' />
                )
            )
        }
return stars
  }
  return (
    <div className='w-[250px] rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col'>
      
      
      <div className='relative w-full h-[170px] bg-white'>
        
        
        <div className='absolute top-3 right-3 bg-white rounded-full p-2 shadow'>
          {isVeg ? (
            <FaLeaf className="text-green-600 text-lg" />
          ) : (
            <FaDrumstickBite className="text-red-600 text-lg" />
          )}
        </div>
        
        <img 
          src={image} 
          alt={name} 
          className='w-full h-full object-cover'
        />
      </div>

      
      <div className='p-3 text-center font-semibold text-gray-800'>
        <h1 className='font-semibold text-gray-900 text-base truncate'>{name}</h1>

        <div className='flex items-center gap-1 mt-1'>
          {renderStars(data.rating?.average || 0 )}
        </div>
      </div>

    </div>
  );
}

export default FoodCard;*/

/*
import React from 'react';
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

function FoodCard({ name, image, foodType, rating }) {
  const isVeg = foodType?.toLowerCase().trim() === "veg";

  const renderStars = (ratingValue) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= ratingValue ? (
          <FaStar key={i} className='text-yellow-500 text-lg' />
        ) : (
          <FaRegStar key={i} className='text-yellow-500 text-lg' />
        )
      );
    }
    return stars;
  };

  return (
    <div className='w-[250px] rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col'>
      
      <div className='relative w-full h-[170px] bg-white'>
        
        <div className='absolute top-3 right-3 bg-white rounded-full p-2 shadow'>
          {isVeg ? (
            <FaLeaf className="text-green-600 text-lg" />
          ) : (
            <FaDrumstickBite className="text-red-600 text-lg" />
          )}
        </div>
        
        <img 
          src={image} 
          alt={name} 
          className='w-full h-full object-cover'
        />
      </div>

      <div className='p-3 text-center font-semibold text-gray-800'>
        <h1 className='font-semibold text-gray-900 text-base truncate'>{name}</h1>

        <div className='flex items-center justify-center gap-1 mt-1'>
          {renderStars(rating?.average || 0)}

          <span className='text-xs text-gray-500'>
            ({rating?.count || 0})
          </span>
        </div>
      </div>

          <div className='flex items-center justify-between mt-auto pt-3'>
          <span className='font-bold text-gray-900 text-lg'>
            {price}
          </span>
          </div>


    </div>
  );
}

export default FoodCard;*/

/*
import React, { useState } from 'react';   // ✅ FIXED
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from '../redux/userSlice';

function FoodCard({ name, image, foodType, rating, price }) {
  const isVeg = foodType?.toLowerCase().trim() === "veg";

  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch()
  const renderStars = (ratingValue) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= ratingValue ? (
          <FaStar key={i} className='text-yellow-500 text-lg' />
        ) : (
          <FaRegStar key={i} className='text-yellow-500 text-lg' />
        )
      );
    }
    return stars;
  };

  const handleIncrease = () => {
    const newQty = quantity + 1
    setQuantity(newQty)
  }
  const handleDecrease = () => {
    if (quantity > 0) {
      const newQty = quantity - 1
      setQuantity(newQty)
    }

  }

  return (
    <div className='w-[250px] rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col'>

      <div className='relative w-full h-[170px] bg-white'>

        <div className='absolute top-3 right-3 bg-white rounded-full p-2 shadow'>
          {isVeg ? (
            <FaLeaf className="text-green-600 text-lg" />
          ) : (
            <FaDrumstickBite className="text-red-600 text-lg" />
          )}
        </div>

        <img
          src={image}
          alt={name}
          className='w-full h-full object-cover'
        />
      </div>

      <div className='p-3 text-center font-semibold text-gray-800'>
        <h1 className='font-semibold text-gray-900 text-base truncate'>{name}</h1>

        <div className='flex items-center justify-center gap-1 mt-1'>
          {renderStars(rating?.average || 0)}
          <span className='text-xs text-gray-500'>
            ({rating?.count || 0})
          </span>
        </div>
      </div>

      <div className='flex items-center justify-between px-3 pb-3 mt-auto'>
        <span className='font-bold text-gray-900 text-lg'>
          ₹{price || 0}
        </span>

        
        <div className='flex items-center border rounded-full overflow-hidden shadow-sm'>
          <button
            onClick={() => setQuantity(prev => Math.max(0, prev - 1))}
            className='px-2 py-1 hover:bg-gray-100 transition'
          >
            <FaMinus size={12} />
          </button>

          <span className='px-2'>{quantity}</span>

          <button
            onClick={() => setQuantity(prev => prev + 1)}
            className='px-2 py-1 hover:bg-gray-100 transition'
          >
            <FaPlus sixe={12} />
          </button>
          <button className='bg-[#ff4d2d] text-white px-3 py-2 transition-colors ' onClick={=> dispatch(addToCart({
            id: data._id,
            name: data.name,
            price:data.price,
            image:data.image,
            shop:data.shop,
            quantity,
            foodType:data.foodType
          }))}>
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;*/


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from '../redux/userSlice';

function FoodCard({ name, image, foodType, rating, price, id, shop }) {
  const isVeg = foodType?.toLowerCase().trim() === "veg";

  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.user);

  const renderStars = (ratingValue) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= ratingValue ? (
          <FaStar key={i} className='text-yellow-500 text-lg' />
        ) : (
          <FaRegStar key={i} className='text-yellow-500 text-lg' />
        )
      );
    }
    return stars;
  };

  return (
    <div className='w-[250px] rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col'>

      <div className='relative w-full h-[170px] bg-white'>
        <div className='absolute top-3 right-3 bg-white rounded-full p-2 shadow'>
          {isVeg ? (
            <FaLeaf className="text-green-600 text-lg" />
          ) : (
            <FaDrumstickBite className="text-red-600 text-lg" />
          )}
        </div>

        <img src={image} alt={name} className='w-full h-full object-cover' />
      </div>

      <div className='p-3 text-center font-semibold text-gray-800'>
        <h1 className='font-semibold text-gray-900 text-base truncate'>{name}</h1>

        <div className='flex items-center justify-center gap-1 mt-1'>
          {renderStars(rating?.average || 0)}
          <span className='text-xs text-gray-500'>
            ({rating?.count || 0})
          </span>
        </div>
      </div>

      <div className='flex items-center justify-between px-3 pb-3 mt-auto'>
        <span className='font-bold text-gray-900 text-lg'>
          ₹{price || 0}
        </span>

        <div className='flex items-center border rounded-full overflow-hidden shadow-sm'>

          <button
            onClick={() => setQuantity(prev => Math.max(0, prev - 1))}
            className='px-2 py-1 hover:bg-gray-100 transition'
          >
            <FaMinus size={12} />
          </button>

          <span className='px-2'>{quantity}</span>

          <button
            onClick={() => setQuantity(prev => prev + 1)}
            className='px-2 py-1 hover:bg-gray-100 transition'
          >
            <FaPlus size={12} />
          </button>

          <button
            className={`${cartItems.some(i => i.id === id) ? "bg-gray-800" : "bg-[#ff4d2d]"} text-white px-3 py-2 transition-colors`}
            onClick={() => {
              if (quantity > 0) {
                dispatch(addToCart({
                  _id: id,
                  id,
                  name,
                  price,
                  image,
                  shop,
                  quantity,
                  foodType
                }));
              }
            }}
          >
            <FaShoppingCart />
          </button>

        </div>
      </div>
    </div>
  );
}

export default FoodCard;

/*
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from '../redux/userSlice';

function FoodCard({ name, image, foodType, rating, price, id, shop }) {
  const isVeg = foodType?.toLowerCase().trim() === "veg";

  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.user);

  const renderStars = (ratingValue) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= ratingValue ? (
          <FaStar key={i} className='text-yellow-500 text-lg' />
        ) : (
          <FaRegStar key={i} className='text-yellow-500 text-lg' />
        )
      );
    }
    return stars;
  };

  return (
    <div className='w-[250px] rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col'>

      <div className='relative w-full h-[170px] bg-white'>
        <div className='absolute top-3 right-3 bg-white rounded-full p-2 shadow'>
          {isVeg ? (
            <FaLeaf className="text-green-600 text-lg" />
          ) : (
            <FaDrumstickBite className="text-red-600 text-lg" />
          )}
        </div>

        <img src={image} alt={name} className='w-full h-full object-cover' />
      </div>

      <div className='p-3 text-center font-semibold text-gray-800'>
        <h1 className='font-semibold text-gray-900 text-base truncate'>{name}</h1>

        <div className='flex items-center justify-center gap-1 mt-1'>
          {renderStars(rating?.average || 0)}
          <span className='text-xs text-gray-500'>
            ({rating?.count || 0})
          </span>
        </div>
      </div>

      <div className='flex items-center justify-between px-3 pb-3 mt-auto'>
        <span className='font-bold text-gray-900 text-lg'>
          ₹{price || 0}
        </span>

        <div className='flex items-center border rounded-full overflow-hidden shadow-sm'>

          <button
            onClick={() => setQuantity(prev => Math.max(0, prev - 1))}
            className='px-2 py-1 hover:bg-gray-100 transition'
          >
            <FaMinus size={12} />
          </button>

          <span className='px-2'>{quantity}</span>

          <button
            onClick={() => setQuantity(prev => prev + 1)}
            className='px-2 py-1 hover:bg-gray-100 transition'
          >
            <FaPlus size={12} />
          </button>

          <button
            className={`${cartItems.some(i => i.id === id) ? "bg-gray-800" : "bg-[#ff4d2d]"} text-white px-3 py-2 transition-colors`}
            onClick={() => {
              if (quantity > 0) {
                dispatch(addToCart({
                  id,
                  name,
                  price,
                  image,
                  shop: shop?._id || shop,   // ✅ FIXED
                  quantity,
                  foodType
                }));
              }
            }}
          >
            <FaShoppingCart />
          </button>

        </div>
      </div>
    </div>
  );
}

export default FoodCard;*/
