/*import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function AddItem() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [category, setCategory] = useState("");
    const [foodType, setFoodType] = useState("Veg")
    const categories = ["Snacks",
        "Main Course",
        "Desserts",
        "Pizza",
        "Burgers",
        "Sandwiches",
        "South Indian",
        "North Indian",
        "Chinese",
        "Fast Food",
        "Others"]
    const handleImage = (e) => {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);

            if (backendImage) {
                formData.append("image", backendImage);
            }

            // ⚠️ change this endpoint later to item API
            const result = await axios.post(
                `${serverUrl}/api/item/create`,
                formData,
                { withCredentials: true }
            );

            console.log(result.data);
            navigate(-1); // go back

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#f8f8f8] relative">

            {/* BACK BUTTON /}
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
                        Add Food
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
                            placeholder="Enter Food Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm 
                            outline-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* IMAGE *}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Food Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600
                            outline-none focus:outline-none focus:ring-2 focus:ring-orange-500
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
                    <div>
                        <label className="text-xs text-gray-600">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm 
                            outline-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-600">Select Category</label>
                        <select

                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm 
                            outline-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="">select category</option>
                            {categories.map((cate, index) => (
                                <option value="cafe" key={index}></option>
                            ))}
                        </select>
                    </div>


                    



                    {/* BUTTON /}
                    <button
                        type="submit"
                        className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition duration-200"
                    >
                        Save
                    </button>

                </form>
            </div>
        </div>
    );
}

export default AddItem;*/

/*
import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function AddItem() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [category, setCategory] = useState("");
    const [foodType, setFoodType] = useState("Veg");
    const [loading, setLoading] = useState(false);

    const categories = [
        "Snacks",
        "Main Course",
        "Desserts",
        "Pizza",
        "Burgers",
        "Sandwiches",
        "South Indian",
        "North Indian",
        "Chinese",
        "Fast Food",
        "Others",
    ];

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBackendImage(file);
            setFrontendImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !category) {
            alert("Please fill all required fields");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", Number(price));
            formData.append("category", category);
            formData.append("foodType", foodType);

            if (backendImage) {
                formData.append("image", backendImage);
            }

            const result = await axios.post(
                `${serverUrl}/api/item/add-item`,
                formData,
                { withCredentials: true }
            );

            // ✅ CLEAN CONSOLE OUTPUT
            console.log("✅ Item Created:", result.data.item);

            alert("Item added successfully ✅");

            navigate(-1);

        } catch (error) {
            // ✅ CLEAN ERROR OUTPUT
            console.error(
                "❌ Error:",
                error.response?.data?.message || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#f8f8f8] relative">

           
            <div
                className="absolute top-5 left-5"
                onClick={() => navigate(-1)}
            >
                <IoIosArrowRoundBack
                    size={30}
                    className="text-[#ff4d2d] cursor-pointer"
                />
            </div>

           
            <div className="w-[320px] bg-white shadow-lg rounded-xl p-5">

               
                <div className="flex flex-col items-center mb-4">
                    <div className="bg-orange-100 p-2 rounded-full">
                        <FaUtensils className="text-[#ff4d2d] w-5 h-5" />
                    </div>
                    <h2 className="mt-2 text-base font-semibold">
                        Add Food
                    </h2>
                </div>

              
                <form onSubmit={handleSubmit} className="space-y-3">

                    <input
                        type="text"
                        placeholder="Enter Food Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm"
                    />

                    {frontendImage && (
                        <img
                            src={frontendImage}
                            alt="preview"
                            className="w-full h-32 object-cover rounded-md"
                        />
                    )}

                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat, i) => (
                            <option key={i} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <select
                        value={foodType}
                        onChange={(e) => setFoodType(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#ff4d2d] text-white py-2 rounded-md text-sm font-semibold hover:bg-orange-600 transition disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default AddItem;*/

/*
import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function AddItem() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [category, setCategory] = useState("");
    const [foodType, setFoodType] = useState("Veg");
    const [loading, setLoading] = useState(false);

    const categories = [
        "Snacks","Main Course","Desserts","Pizza","Burgers",
        "Sandwiches","South Indian","North Indian","Chinese",
        "Fast Food","Others"
    ];

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBackendImage(file);
            setFrontendImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !category) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            // ✅ GET TOKEN
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Login first ❌");
                return;
            }

            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", Number(price));
            formData.append("category", category);
            formData.append("foodType", foodType);

            if (backendImage) {
                formData.append("image", backendImage);
            }

            // ✅ SEND TOKEN IN HEADER
            const res = await axios.post(
                `${serverUrl}/api/item/add-item`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("✅ Item Added:", res.data);

            alert("Item added successfully ✅");
            navigate(-1);

        } catch (error) {
            console.log(
                "❌ Error:",
                error.response?.data?.message || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#f8f8f8] relative">

            <div className="absolute top-5 left-5" onClick={() => navigate(-1)}>
                <IoIosArrowRoundBack size={30} className="text-[#ff4d2d] cursor-pointer" />
            </div>

            <div className="w-[320px] bg-white shadow-lg rounded-xl p-5">

                <div className="flex flex-col items-center mb-4">
                    <div className="bg-orange-100 p-2 rounded-full">
                        <FaUtensils className="text-[#ff4d2d]" />
                    </div>
                    <h2 className="mt-2 font-semibold">Add Food</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">

                    <input
                        type="text"
                        placeholder="Food Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />

                    <input type="file" onChange={handleImage} />

                    {frontendImage && (
                        <img src={frontendImage} className="h-32 w-full object-cover rounded" />
                    )}

                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />

                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border px-3 py-2 rounded">
                        <option value="">Select Category</option>
                        {categories.map((c, i) => (
                            <option key={i} value={c}>{c}</option>
                        ))}
                    </select>

                    <select value={foodType} onChange={(e) => setFoodType(e.target.value)} className="w-full border px-3 py-2 rounded">
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#ff4d2d] text-white py-2 rounded"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default AddItem;*/


import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function AddItem() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [category, setCategory] = useState("");
    const [foodType, setFoodType] = useState("Veg");
    const [loading, setLoading] = useState(false);

    const categories = [
        "Snacks","Main Course","Desserts","Pizza","Burgers",
        "Sandwiches","South Indian","North Indian","Chinese",
        "Fast Food","Others"
    ];

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBackendImage(file);
            setFrontendImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !category) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            if (!token) {
                alert("Login first ❌");
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", Number(price));
            formData.append("category", category);
            formData.append("foodType", foodType);

            if (backendImage) {
                formData.append("image", backendImage);
            }

            const res = await axios.post(
                `${serverUrl}/api/item/add-item`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log("✅ Item Added:", res.data);

            alert("Item added successfully ✅");
            navigate(-1);

        } catch (error) {
            console.log(
                "❌ Error:",
                error.response?.data?.message || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#f8f8f8] relative">

            <div className="absolute top-5 left-5" onClick={() => navigate(-1)}>
                <IoIosArrowRoundBack size={30} className="text-[#ff4d2d] cursor-pointer" />
            </div>

            <div className="w-[320px] bg-white shadow-lg rounded-xl p-5">

                <div className="flex flex-col items-center mb-4">
                    <div className="bg-orange-100 p-2 rounded-full">
                        <FaUtensils className="text-[#ff4d2d]" />
                    </div>
                    <h2 className="mt-2 font-semibold">Add Food</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">

                    <input
                        type="text"
                        placeholder="Food Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />

                    <input type="file" onChange={handleImage} />

                    {frontendImage && (
                        <img src={frontendImage} className="h-32 w-full object-cover rounded" />
                    )}

                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Select Category</option>
                        {categories.map((c, i) => (
                            <option key={i} value={c}>{c}</option>
                        ))}
                    </select>

                    <select
                        value={foodType}
                        onChange={(e) => setFoodType(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#ff4d2d] text-white py-2 rounded"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default AddItem;