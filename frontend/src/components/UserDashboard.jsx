/*
import React, { useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import CategoryCard from './CategoryCard';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useSelector } from 'react-redux';

function UserDashboard() {
  const {currentCity}=useSelector(state=>state.user)
  const cateScrollRef = useRef(null);
  const shopScrollRef = useRef(null);
  const [showLeftCateButton,setShowLeftCateButton]=useState(false)
  const [showRightCateButton,setShowRightCateButton]=useState(false)
  const [showLeftShopButton,setShowLeftShopButton]=useState(false)
  const [showRightShopButton,setShowRightShopButton]=useState(false)


  const updateButton=(ref,setLeftButton,setRightButton)=>{
    const element=ref.current
    if(element){
      const scrollLeft = element.scrollLeft;
      const scrollWidth = element.scrollWidth;
      const clientWidth = element.clientWidth;

      setLeftButton(scrollLeft > 0);
      setRightButton(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }
 
  // ✅ FIXED SCROLL FUNCTION
  const scrollHandler = (direction) => {
    if (!cateScrollRef.current) return;

    cateScrollRef.current.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth"
    });
  };

  useEffect(()=>{
    const element = cateScrollRef.current;

    if(element){
      const handleScroll = ()=>{
        updateButton(cateScrollRef,setShowLeftCateButton,
        setShowRightCateButton)
        
        updateButton(shopScrollRef,setShowLeftShopButton,setShowRightShopButton)
      }

      element.addEventListener('scroll', handleScroll); // ✅ FIXED SPELLING

      // initial check
      updateButton(cateScrollRef,setShowLeftCateButton,setShowRightCateButton);

      updateButton(shopScrollRef,setShowLeftCateButton,setShowRightShopButton);


      return ()=>{
        element.removeEventListener('scroll', handleScroll); // ✅ CLEANUP
      }
    }
  },[]) // ✅ FIXED DEPENDENCY

  // ✅ categories data (same as yours)
  const categories = [
    { name: "Samosa", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
    { name: "Pizza", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400" },
    { name: "Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
    { name: "Burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400" },
    { name: "Meals", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
    { name: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400" },
    { name: "Noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400" },
    { name: "Pasta", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400" },
    { name: "Dosa", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400" },
    { name: "Idli", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400" },
    { name: "Chole Bhature", image: "https://images.unsplash.com/photo-1626132647523-66f5c4dfb2c2?w=400" },
    { name: "Momos", image: "https://images.unsplash.com/photo-1625944525903-b4d4a3f3c9f4?w=400" },
    { name: "Ice Cream", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400" },
    { name: "Shakes", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400" },
    { name: "Rolls", image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=400" },
    { name: "Paratha", image: "https://images.unsplash.com/photo-1601050690117-94f5f6fae5a4?w=400" },
    { name: "Paneer", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400" }
  ];

  return (
    <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto'>

      <Nav />

      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>

        <h1 className='text-gray-800 text-2xl sm:text-3xl'>
          Inspiration for your first order
        </h1>

        <div className='w-full relative'>

          {showLeftCateButton && (
            <button
              onClick={() => scrollHandler("left")}
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10'
            >
              <FaChevronCircleLeft />
            </button>
          )}

          <div
            ref={cateScrollRef}
            className='w-full flex overflow-x-auto gap-3 pb-2 scroll-smooth'
          >
            {categories.map((cate, index) => (
              <CategoryCard key={index} data={cate} />
            ))}
          </div>
            
          {showRightCateButton && (
            <button
              onClick={() => scrollHandler("right")}
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10'
            >
              <FaChevronCircleRight />
            </button>
          )}

        </div>

        <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
          <h1 className='text-gray-800 text-2xl sm:text-3xl'>
          Best Shop in {currentCity}
        </h1>

///////////

           <div className='w-full relative'>

          {showLeftShopButton && (
            <button
              onClick={() => scrollHandler(shopScrollRef,"left")}
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10'
            >
              <FaChevronCircleLeft />
            </button>
          )}

          <div 
            ref={cateScrollRef}
            className='w-full flex overflow-x-auto gap-3 pb-2 scroll-smooth'
          >
            {categories.map((cate, index) => (
              <CategoryCard key={index} data={cate} />
            ))}
          </div>
            
          {showRightShopButton && (
            <button
              onClick={() => scrollHandler(shopScrollRef,"right")}
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10'
            >
              <FaChevronCircleRight />
            </button>
          )}

        </div>

        </div>

      </div>
    </div>
  );
}

export default UserDashboard;
*/

/*
import React, { useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import CategoryCard from './CategoryCard';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useSelector } from 'react-redux';

function UserDashboard() {
  const { currentCity,shopInMyCity } = useSelector(state => state.user);

  const cateScrollRef = useRef(null);
  const shopScrollRef = useRef(null);

  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      const scrollLeft = element.scrollLeft;
      const scrollWidth = element.scrollWidth;
      const clientWidth = element.clientWidth;

      setLeftButton(scrollLeft > 0);
      setRightButton(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  // ✅ FIXED scroll handler
  const scrollHandler = (ref, direction) => {
    if (!ref.current) return;

    ref.current.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const cateElement = cateScrollRef.current;
    const shopElement = shopScrollRef.current;

    if (cateElement) {
      const handleCateScroll = () => {
        updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
      };

      cateElement.addEventListener('scroll', handleCateScroll);
      updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);

      return () => {
        cateElement.removeEventListener('scroll', handleCateScroll);
      };
    }

    if (shopElement) {
      const handleShopScroll = () => {
        updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
      };

      shopElement.addEventListener('scroll', handleShopScroll);
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);

      return () => {
        shopElement.removeEventListener('scroll', handleShopScroll);
      };
    }

  }, []);

  const categories = [
    { name: "Samosa", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
    { name: "Pizza", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400" },
    { name: "Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
    { name: "Burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400" },
    { name: "Meals", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
    { name: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400" },
    { name: "Noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400" },
    { name: "Pasta", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400" },
    { name: "Dosa", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400" },
    { name: "Idli", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400" },
    { name: "Chole Bhature", image: "https://images.unsplash.com/photo-1626132647523-66f5c4dfb2c2?w=400" },
    { name: "Momos", image: "https://images.unsplash.com/photo-1625944525903-b4d4a3f3c9f4?w=400" },
    { name: "Ice Cream", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400" },
    { name: "Shakes", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400" },
    { name: "Rolls", image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=400" },
    { name: "Paratha", image: "https://images.unsplash.com/photo-1601050690117-94f5f6fae5a4?w=400" },
    { name: "Paneer", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400" }
  ];

  return (
    <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto'>

      <Nav />

      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>

        <h1 className='text-gray-800 text-2xl sm:text-3xl'>
          Inspiration for your first order
        </h1>

        <div className='w-full relative'>

          {showLeftCateButton && (
            <button
              onClick={() => scrollHandler(cateScrollRef, "left")}
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10'
            >
              <FaChevronCircleLeft />
            </button>
          )}

          <div
            ref={cateScrollRef}
            className='w-full flex overflow-x-auto gap-3 pb-2 scroll-smooth'
          >
            {categories.map((cate, index) => (
              <CategoryCard  name={cate.category} image={cate.image} key={index} />
            ))}
          </div>

          {showRightCateButton && (
            <button
              onClick={() => scrollHandler(cateScrollRef, "right")}
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10'
            >
              <FaChevronCircleRight />
            </button>
          )}

        </div>

        <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
          <h1 className='text-gray-800 text-2xl sm:text-3xl'>
            Best Shop in {currentCity}
          </h1>

          <div className='w-full relative'>

            {showLeftShopButton && (
              <button
                onClick={() => scrollHandler(shopScrollRef, "left")}
                className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10'
              >
                <FaChevronCircleLeft />
              </button>
            )}

            <div
              ref={shopScrollRef}   // ✅ FIXED
              className='w-full flex overflow-x-auto gap-3 pb-2 scroll-smooth'
            >
              {shopInMyCity?.map((shop, index) => (
                <CategoryCard name={shop.name}  image={shop.image} key={index}  />
              ))}
            </div>

            {showRightShopButton && (
              <button
                onClick={() => scrollHandler(shopScrollRef, "right")}
                className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10'
              >
                <FaChevronCircleRight />
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default UserDashboard;*/


/*
import React, { useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import CategoryCard from './CategoryCard';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard';

function UserDashboard() {
  const { currentCity,shopInMyCity,itemsInMyCity } = useSelector(state => state.user);

  const cateScrollRef = useRef(null);
  const shopScrollRef = useRef(null);

  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      const scrollLeft = element.scrollLeft;
      const scrollWidth = element.scrollWidth;
      const clientWidth = element.clientWidth;

      setLeftButton(scrollLeft > 0);
      setRightButton(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scrollHandler = (ref, direction) => {
    if (!ref.current) return;

    ref.current.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const cateElement = cateScrollRef.current;
    const shopElement = shopScrollRef.current;

    if (cateElement) {
      const handleCateScroll = () => {
        updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
      };

      cateElement.addEventListener('scroll', handleCateScroll);
      updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);

      return () => {
        cateElement.removeEventListener('scroll', handleCateScroll);
      };
    }

    if (shopElement) {
      const handleShopScroll = () => {
        updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
      };

      shopElement.addEventListener('scroll', handleShopScroll);
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);

      return () => {
        shopElement.removeEventListener('scroll', handleShopScroll);
      };
    }

  }, []);

  const categories = [
    { name: "Samosa", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
    { name: "Pizza", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400" },
    { name: "Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
    { name: "Burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400" },
    { name: "Meals", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
    { name: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400" },
    { name: "Noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400" },
    { name: "Pasta", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400" },
    { name: "Dosa", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400" },
    { name: "Idli", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400" },
    { name: "Chole Bhature", image: "https://images.unsplash.com/photo-1626132647523-66f5c4dfb2c2?w=400" },
    { name: "Momos", image: "https://images.unsplash.com/photo-1625944525903-b4d4a3f3c9f4?w=400" },
    { name: "Ice Cream", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400" },
    { name: "Shakes", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400" },
    { name: "Rolls", image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=400" },
    { name: "Paratha", image: "https://images.unsplash.com/photo-1601050690117-94f5f6fae5a4?w=400" },
    { name: "Paneer", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400" }
  ];

  return (
    <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto'>

      <Nav />

      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>

        <h1 className='text-gray-800 text-2xl sm:text-3xl'>
          Inspiration for your first order
        </h1>

        <div className='w-full relative'>

          {showLeftCateButton && (
            <button onClick={() => scrollHandler(cateScrollRef, "left")}
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg z-10'>
              <FaChevronCircleLeft />
            </button>
          )}

          <div ref={cateScrollRef}
            className='w-full flex overflow-x-auto gap-3 pb-2 scroll-smooth'>
            {categories.map((cate, index) => (
              <CategoryCard name={cate.name} image={cate.image} key={index} />
            ))}
          </div>

          {showRightCateButton && (
            <button onClick={() => scrollHandler(cateScrollRef, "right")}
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg z-10'>
              <FaChevronCircleRight />
            </button>
          )}

        </div>

        <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
          <h1 className='text-gray-800 text-2xl sm:text-3xl'>
            Best Shop in {currentCity}
          </h1>

          <div className='w-full relative'>

            {showLeftShopButton && (
              <button onClick={() => scrollHandler(shopScrollRef, "left")}
                className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg z-10'>
                <FaChevronCircleLeft />
              </button>
            )}

            <div ref={shopScrollRef}
              className='w-full flex overflow-x-auto gap-3 pb-2 scroll-smooth'>
              {shopInMyCity?.map((shop, index) => (
                <CategoryCard name={shop.name} image={shop.image} key={index} />
              ))}
            </div>

            {showRightShopButton && (
              <button onClick={() => scrollHandler(shopScrollRef, "right")}
                className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg z-10'>
                <FaChevronCircleRight />
              </button>
            )}

          </div> 

        </div>

        <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
            <h1 className='text-gray-800 text-2xl sm:text-3xl'>
            Suggested Food Items
            </h1>
            <div className='w-full h-auto flex flex-wrap gap-[20px] justify-center '>
            {itemsInMyCity?.map((item,index)=>{
              <FoodCard key={index} data={item} />
            })}
            </div>
        </div>

      </div>
    
    </div>
  );
}

export default UserDashboard;*/




/*
import React, { useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import CategoryCard from './CategoryCard';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard';

function UserDashboard() {
  const { currentCity, shopInMyCity, itemsInMyCity } = useSelector(state => state.user);

  const cateScrollRef = useRef(null);
  const shopScrollRef = useRef(null);

  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      const scrollLeft = element.scrollLeft;
      const scrollWidth = element.scrollWidth;
      const clientWidth = element.clientWidth;

      setLeftButton(scrollLeft > 0);
      setRightButton(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scrollHandler = (ref, direction) => {
    if (!ref.current) return;

    ref.current.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const cateElement = cateScrollRef.current;
    const shopElement = shopScrollRef.current;

    if (cateElement) {
      const handleCateScroll = () => {
        updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
      };

      cateElement.addEventListener('scroll', handleCateScroll);
      updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);

      return () => {
        cateElement.removeEventListener('scroll', handleCateScroll);
      };
    }

    if (shopElement) {
      const handleShopScroll = () => {
        updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
      };

      shopElement.addEventListener('scroll', handleShopScroll);
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);

      return () => {
        shopElement.removeEventListener('scroll', handleShopScroll);
      };
    }

  }, []);

  const categories = [
    { name: "Samosa", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
    { name: "Pizza", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400" },
    { name: "Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
    { name: "Burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400" },
    { name: "Meals", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
    { name: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400" },
    { name: "Noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400" },
    { name: "Pasta", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400" },
    { name: "Dosa", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400" },
    { name: "Idli", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400" },
    { name: "Chole Bhature", image: "https://images.unsplash.com/photo-1626132647523-66f5c4dfb2c2?w=400" },
    { name: "Momos", image: "https://images.unsplash.com/photo-1625944525903-b4d4a3f3c9f4?w=400" },
    { name: "Ice Cream", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400" },
    { name: "Shakes", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400" },
    { name: "Rolls", image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=400" },
    { name: "Paratha", image: "https://images.unsplash.com/photo-1601050690117-94f5f6fae5a4?w=400" },
    { name: "Paneer", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400" }
  ];

  return (
    <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto'>

      <Nav />

      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>

        <h1 className='text-gray-800 text-2xl sm:text-3xl'>
          Inspiration for your first order
        </h1>

        <div className='w-full relative'>

          {showLeftCateButton && (
            <button onClick={() => scrollHandler(cateScrollRef, "left")}
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg z-10'>
              <FaChevronCircleLeft />
            </button>
          )}

          <div ref={cateScrollRef}
            className='w-full flex overflow-x-auto gap-3 pb-2 scroll-smooth'>
            {categories.map((cate, index) => (
              <CategoryCard name={cate.name} image={cate.image} key={index} />
            ))}
          </div>

          {showRightCateButton && (
            <button onClick={() => scrollHandler(cateScrollRef, "right")}
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg z-10'>
              <FaChevronCircleRight />
            </button>
          )}

        </div>

        <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
          <h1 className='text-gray-800 text-2xl sm:text-3xl'>
            Best Shop in {currentCity}
          </h1>

          <div className='w-full relative'>

            {showLeftShopButton && (
              <button onClick={() => scrollHandler(shopScrollRef, "left")}
                className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg z-10'>
                <FaChevronCircleLeft />
              </button>
            )}

            <div ref={shopScrollRef}
              className='w-full flex overflow-x-auto gap-3 pb-2 scroll-smooth'>
              {shopInMyCity?.map((shop, index) => (
                <CategoryCard name={shop.name} image={shop.image} key={index} />
              ))}
            </div>

            {showRightShopButton && (
              <button onClick={() => scrollHandler(shopScrollRef, "right")}
                className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg z-10'>
                <FaChevronCircleRight />
              </button>
            )}

          </div>

        </div>

        
        <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
          <h1 className='text-gray-800 text-2xl sm:text-3xl'>
            Suggested Food Items
          </h1>

          <div className='w-full h-auto flex flex-wrap gap-[20px] justify-center'>

            {itemsInMyCity
              ?.filter(item => item.image)
              .map((item, index) => (
                <FoodCard
                  key={index}
                  name={item.name}
                  image={item.image}
                  foodType={item.foodType} // ✅ FIXED
                  rating={item.rating}   // ✅ ADD THIS
                  price={item.price}
                />
              ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default UserDashboard;*/


import React, { useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import CategoryCard from './CategoryCard';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard';


function UserDashboard() {
  const { currentCity, shopInMyCity, itemsInMyCity } = useSelector(state => state.user);

  const cateScrollRef = useRef(null);
  const shopScrollRef = useRef(null);

  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      const scrollLeft = element.scrollLeft;
      const scrollWidth = element.scrollWidth;
      const clientWidth = element.clientWidth;

      setLeftButton(scrollLeft > 0);
      setRightButton(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scrollHandler = (ref, direction) => {
    if (!ref.current) return;

    ref.current.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const cateElement = cateScrollRef.current;
    const shopElement = shopScrollRef.current;

    if (cateElement) {
      const handleCateScroll = () => {
        updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
      };

      cateElement.addEventListener('scroll', handleCateScroll);
      updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);

      return () => {
        cateElement.removeEventListener('scroll', handleCateScroll);
      };
    }

    if (shopElement) {
      const handleShopScroll = () => {
        updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
      };

      shopElement.addEventListener('scroll', handleShopScroll);
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);

      return () => {
        shopElement.removeEventListener('scroll', handleShopScroll);
      };
    }

  }, []);

  const categories = [
    { name: "Samosa", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
    { name: "Pizza", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400" },
    { name: "Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
    { name: "Burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400" },
    { name: "Meals", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
    { name: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400" },
    { name: "Noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400" },
    { name: "Pasta", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400" },
    { name: "Dosa", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400" },
    { name: "Idli", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400" },
    { name: "Chole Bhature", image: "https://images.unsplash.com/photo-1626132647523-66f5c4dfb2c2?w=400" },
    { name: "Momos", image: "https://images.unsplash.com/photo-1625944525903-b4d4a3f3c9f4?w=400" },
    { name: "Ice Cream", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400" },
    { name: "Shakes", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400" },
    { name: "Rolls", image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=400" },
    { name: "Paratha", image: "https://images.unsplash.com/photo-1601050690117-94f5f6fae5a4?w=400" },
    { name: "Paneer", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400" }
  ];

  return (
    <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto'>

      <Nav />

      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>

        <h1 className='text-gray-800 text-2xl sm:text-3xl'>
          Inspiration for your first order
        </h1>

        <div className='w-full relative'>

          {showLeftCateButton && (
            <button onClick={() => scrollHandler(cateScrollRef, "left")}
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg z-10'>
              <FaChevronCircleLeft />
            </button>
          )}

          <div ref={cateScrollRef}
            className='w-full flex overflow-x-auto gap-3 pb-2 scroll-smooth'>
            {categories.map((cate, index) => (
              <CategoryCard name={cate.name} image={cate.image} key={index} />
            ))}
          </div>

          {showRightCateButton && (
            <button onClick={() => scrollHandler(cateScrollRef, "right")}
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg z-10'>
              <FaChevronCircleRight />
            </button>
          )}

        </div>

        <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
          <h1 className='text-gray-800 text-2xl sm:text-3xl'>
            Best Shop in {currentCity}
          </h1>

          <div className='w-full relative'>

            {showLeftShopButton && (
              <button onClick={() => scrollHandler(shopScrollRef, "left")}
                className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg z-10'>
                <FaChevronCircleLeft />
              </button>
            )}

            <div ref={shopScrollRef}
              className='w-full flex overflow-x-auto gap-3 pb-2 scroll-smooth'>
              {shopInMyCity?.map((shop) => (
                <CategoryCard
                  key={shop._id}
                  name={shop.name}
                  image={shop.image}
                />
              ))}
            </div>

            {showRightShopButton && (
              <button onClick={() => scrollHandler(shopScrollRef, "right")}
                className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg z-10'>
                <FaChevronCircleRight />
              </button>
            )}

          </div>
        </div>

        <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
          <h1 className='text-gray-800 text-2xl sm:text-3xl'>
            Suggested Food Items
          </h1>

          <div className='w-full h-auto flex flex-wrap gap-[20px] justify-center'>

            {itemsInMyCity
              ?.filter(item => item.image)
              .map((item) => (
                <FoodCard
                  key={item._id}   // ✅ FIXED
                  id={item._id}    // ✅ FIXED (CRITICAL)
                  name={item.name}
                  image={item.image}
                  foodType={item.foodType}
                  rating={item.rating}
                  price={item.price}
                  shop={item.shop}
                />
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserDashboard;


