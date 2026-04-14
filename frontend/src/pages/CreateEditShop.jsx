/*import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMyShopData } from "../redux/ownerSlice";

function CreateEditShop() {
    const navigate = useNavigate();

    const { myShopData } = useSelector((state) => state.owner);
    const { currentCity, currentState, currentAddress } = useSelector(
        (state) => state.user
    );

    const [name, setName] = useState(myShopData?.name || "");
    const [address, setAddress] = useState(myShopData?.address || "");
    const [city, setCity] = useState(myShopData?.city || currentCity);
    const [state, setState] = useState(myShopData?.state || currentState);
    const [shopState, setShopState] = useState(""); // ✅ renamed
    const [frontendImage, setFrontendImage] = useState(myShopData?.image || null)
    const dispatch=useDispatch()
    const [backendImage, setBackendImage] = useState(null)
    const handleImage = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    // ✅ Prefill when data comes
    useEffect(() => {
        if (myShopData) {
            setName(myShopData.name || "");
            setAddress(myShopData.address || "");
            setCity(myShopData.city || "");
            setShopState(myShopData.state || "");
        } else {
            // ✅ use detected location
            setCity(currentCity || "");
            setShopState(currentState || "");
            setAddress(currentAddress || "");
        }
    }, [myShopData, currentCity, currentState, currentAddress]);


    const handleSubmit=async (e)=>{
        e.preventDefault()
        try {
            const formData=new FormData()
            formData.append("name",name)
            formData.append("city",city)
            formData.append("state",state)
            formData.append("address",address)
            if(backendImage){
                formData.append("image",backendImage)
            }
            const result=await axios.post(`${serverUrl}/api/shop/create-edit`,formData,{withCredentials:true})
            dispatch(setMyShopData(result.data))
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#f8f8f8] relative">

            {/* BACK BUTTON *}
            <div
                className="absolute top-[20px] left-[20px] z-[10]"
                onClick={() => navigate(-1)}
            >
                <IoIosArrowRoundBack
                    size={28}
                    className="text-[#ff4d2d] cursor-pointer"
                />
            </div>

            {/* CARD *}
            <div className="w-[350px] bg-white shadow-md rounded-xl p-6">

                {/* HEADER *}
                <div className="flex flex-col items-center mb-4">
                    <div className="bg-orange-100 p-2 rounded-full mb-2">
                        <FaUtensils className="text-[#ff4d2d] w-6 h-6" />
                    </div>

                    <h2 className="text-lg font-semibold text-gray-800">
                        {myShopData ? "Edit Shop" : "Add Shop"}
                    </h2>
                </div>

                {/* FORM *}
                <form className="space-y-3" onSubmit={handleSubmit}>

                    {/* NAME *}
                    <div>
                        <label className="text-xs text-gray-600">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Shop Name"
                            //className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm 
  outline-none focus:outline-none focus:ring-2  focus:ring-orange-500"


                        />
                    </div>

                    {/* IMAGE *}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Shop Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600
  outline-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
  file:mr-3 file:py-1 file:px-3 file:border file:border-gray-300 
  file:rounded file:bg-gray-100 file:text-gray-700 file:cursor-pointer" onChange={handleImage} />
  {frontendImage && <div className="mt-4">
                        <img src={frontendImage} alt="" className="w-full h-48 object-cover rounded-lg border" />
                    </div>}
                    

                    </div>

                    {/* CITY + STATE *}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"
                            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-sm 
    outline-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />

                        <input
                            type="text"
                            value={shopState}
                            onChange={(e) => setShopState(e.target.value)}
                            placeholder="State"
                            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-sm 
    outline-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* ADDRESS *}
                    <div>
                        <label className="text-xs text-gray-600">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter Shop Address"
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                <button className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition duration-200 cursor-pointer">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateEditShop; */




import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux"; // ✅ FIX
import { useNavigate } from "react-router-dom";
import { setMyShopData } from "../redux/ownerSlice";
import axios from "axios"; // ✅ FIX
import { serverUrl } from "../App"; // ✅ FIX
import { ClipLoader } from "react-spinners";

function CreateEditShop() {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // ✅ FIX

    const { myShopData } = useSelector((state) => state.owner);
    const { currentCity, currentState, currentAddress } = useSelector(
        (state) => state.user
    );

    const [name, setName] = useState(myShopData?.name || "");
    const [address, setAddress] = useState(myShopData?.address || "");
    const [city, setCity] = useState(myShopData?.city || currentCity);
    const [shopState, setShopState] = useState(myShopData?.state || currentState); // ✅ FIX
    const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);
    const [backendImage, setBackendImage] = useState(null);
    const [loading,setLoading]=useState(false)

    const handleImage = (e) => {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    };

    useEffect(() => {
        if (myShopData) {
            setName(myShopData.name || "");
            setAddress(myShopData.address || "");
            setCity(myShopData.city || "");
            setShopState(myShopData.state || "");
        } else {
            setCity(currentCity || "");
            setShopState(currentState || "");
            setAddress(currentAddress || "");
        }
    }, [myShopData, currentCity, currentState, currentAddress]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("city", city);
            formData.append("state", shopState); // ✅ FIX
            formData.append("address", address);

            if (backendImage) {
                formData.append("image", backendImage);
            }

            const result = await axios.post(
                `${serverUrl}/api/shop/create-edit`,
                formData,
                { withCredentials: true }
            );

            dispatch(setMyShopData(result.data));
            setLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#f8f8f8] relative">

            {/* BACK BUTTON */}
            <div
                className="absolute top-[20px] left-[20px] z-[10]"
                onClick={() => navigate(-1)}
            >
                <IoIosArrowRoundBack
                    size={28}
                    className="text-[#ff4d2d] cursor-pointer"
                />
            </div>

            {/* CARD */}
            <div className="w-[350px] bg-white shadow-md rounded-xl p-6">

                {/* HEADER */}
                <div className="flex flex-col items-center mb-4">
                    <div className="bg-orange-100 p-2 rounded-full mb-2">
                        <FaUtensils className="text-[#ff4d2d] w-6 h-6" />
                    </div>

                    <h2 className="text-lg font-semibold text-gray-800">
                        {myShopData ? "Edit Shop" : "Add Shop"}
                    </h2>
                </div>

                {/* FORM */}
                <form className="space-y-3" onSubmit={handleSubmit}>

                    {/* NAME */}
                    <div>
                        <label className="text-xs text-gray-600">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Shop Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm 
                            outline-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* IMAGE */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Shop Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600
                            outline-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                            file:mr-3 file:py-1 file:px-3 file:border file:border-gray-300 
                            file:rounded file:bg-gray-100 file:text-gray-700 file:cursor-pointer"
                        />

                        {frontendImage && (
                            <div className="mt-4">
                                <img
                                    src={frontendImage}
                                    alt=""
                                    className="w-full h-48 object-cover rounded-lg border"
                                />
                            </div>
                        )}
                    </div>

                    {/* CITY + STATE */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"
                            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-sm 
                            outline-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />

                        <input
                            type="text"
                            value={shopState}
                            onChange={(e) => setShopState(e.target.value)}
                            placeholder="State"
                            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-sm 
                            outline-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* ADDRESS */}
                    <div>
                        <label className="text-xs text-gray-600">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter Shop Address"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-sm 
                            outline-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition duration-200 cursor-pointer" disabled={loading}
                    > 
                    {loading?<ClipLoader size={20} color='white'/>:"Save"}
                        
                    </button>

                </form>
            </div>
        </div>
    );
}

export default CreateEditShop;