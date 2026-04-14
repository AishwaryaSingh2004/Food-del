import React, { useState } from "react";
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";
import { TbReceipt2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function Nav() {
  const { userData, currentCity, cartItems } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const role = userData?.role;

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      localStorage.removeItem("user");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div className="w-full h-20 flex items-center justify-between md:justify-center gap-7 px-5 fixed top-0 z-50 bg-[#fff9f6]">

      {/* 🔥 MOBILE SEARCH */}
      {showSearch && role === "user" && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] h-[70px] bg-white shadow-xl rounded-lg flex items-center gap-5 px-4 z-50">
          
          <div className="flex items-center gap-2 px-2 border-r-2 border-gray-300">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="truncate text-gray-600">
              {currentCity|| "Detecting location..."}
            </div>
          </div>

          <div className="flex-1 flex items-center gap-2">
            <RxCross2
              size={22}
              className="text-[#ff4d2d] cursor-pointer"
              onClick={() => setShowSearch(false)}
            />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="w-full px-3 text-gray-700 outline-none"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Logo */}
      <h1 className="text-3xl font-bold text-[#ff4d2d]">Vingo</h1>

      {/* 💻 DESKTOP SEARCH */}
      {role === "user" && (
        <div className="hidden md:flex w-full md:w-3/5 lg:w-2/5 h-[70px] bg-white shadow-xl rounded-lg items-center gap-5 px-4 mx-auto">
          
          <div className="flex items-center gap-2 px-2 border-r-2 border-gray-300">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="truncate text-gray-600">
              {currentCity || "Detecting location..."}
            </div>
          </div>

          <div className="flex-1 flex items-center gap-2">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="w-full px-3 text-gray-700 outline-none"
            />
          </div>
        </div>
      )}

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        {/* Mobile Search Icon */}
        {role === "user" && (
          showSearch ? (
            <RxCross2 size={25} className="text-[#ff4d2d] md:hidden cursor-pointer" onClick={() => setShowSearch(false)} />
          ) : (
            <IoIosSearch size={25} className="text-[#ff4d2d] md:hidden cursor-pointer" onClick={() => setShowSearch(true)} />
          )
        )}

        {/* OWNER UI */}
        {role === "owner" && (
          <>
            {myShopData && (
              <>
                {/* Add Food */}
                <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium hover:scale-105 transition" onClick={()=>navigate("/add-item")}>
                  <FaPlus size={16} />
                  <span>Add Food Item</span>
                </button>

                <button className="md:hidden flex items-center justify-center px-3 py-2 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium" onClick={()=>navigate("/add-item")}>
                  <FaPlus size={16} />
                </button>
              </>
            )}

    
            {/* Owner Orders */}
            <div className="hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium" onClick={()=>navigate("/my-orders")}>
              <TbReceipt2 size={16} />
              <span>My Orders</span>
              <span className="absolute -right-2 -top-2 text-xs text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">
                0
              </span>
            </div>
          </>
        )}

        {/* ✅ FIXED: DELIVERY BOY UI (MOVED OUTSIDE) */}
{role === "deliveryBoy" && (
  <div
    className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium"
    onClick={() => navigate("/delivery")}
  >
    <TbReceipt2 size={16} />
    <span>My Deliveries</span>
  </div>
)}

        {/* USER UI */}
        {role === "user" && (
          <>
            {/* Cart */}
            <div className="relative cursor-pointer" onClick={()=>navigate("/cart")}>
              <LuShoppingCart size={25} className="text-[#ff4d2d]" />
              <span className="absolute -top-2 -right-2 bg-[#ff4d2d] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            </div>

            {/* My Orders */}
            <button className="px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium" onClick={()=>navigate("/my-orders")}>
              My Orders
            </button>
          </>
        )}

        {/* PROFILE */}
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-lg shadow-xl font-semibold cursor-pointer"
            onClick={() => setShowInfo((prev) => !prev)}
          >
            {userData?.fullName?.charAt(0) || "U"}
          </div>

          {showInfo && (
            <div className="absolute top-12 right-0 w-44 bg-white shadow-2xl rounded-xl p-5 flex flex-col gap-3 z-50">
              <div className="text-[17px] font-semibold">
                {userData?.fullName || "User"}
              </div>

              {role === "user" && (
                <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer" onClick={()=>navigate("/my-orders")} >
                  My Orders
                </div>
              )}  

              <div
                className="text-[#ff4d2d] font-semibold cursor-pointer"
                onClick={handleLogOut}
              >
                Log Out
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Nav;