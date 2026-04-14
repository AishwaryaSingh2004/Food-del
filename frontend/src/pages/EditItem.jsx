import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function EditItem() {
    const navigate = useNavigate();
    const { itemId } = useParams();

    const [currentItem, setCurrentItem] = useState(null);
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

    // ✅ handle image preview
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBackendImage(file);
            setFrontendImage(URL.createObjectURL(file));
        }
    };

    // ✅ submit updated item
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

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

            const result = await axios.put(
                `${serverUrl}/api/item/edit-item/${itemId}`,
                formData,
                { withCredentials: true }
            );

            console.log("✅ Item Updated:", result.data);

            alert("Item updated successfully ✅");

            navigate("/");

        } catch (error) {
            console.error(
                "❌ Error:",
                error.response?.data?.message || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    // ✅ fetch item by id
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const result = await axios.get(
                    `${serverUrl}/api/item/get-by-id/${itemId}`,
                    { withCredentials: true }
                );
                setCurrentItem(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchItem();
    }, [itemId]) ;

    // ✅ set initial values
    useEffect(() => {
        if (currentItem) {
            setName(currentItem.name || "");
            setPrice(currentItem.price || "");
            setCategory(currentItem.category || "");
            setFoodType(currentItem.foodType || "Veg");
            setFrontendImage(currentItem.image || null);
        }
    }, [currentItem]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#f8f8f8] relative">

            {/* BACK BUTTON */}
            <div
                className="absolute top-5 left-5"
                onClick={() => navigate(-1)}
            >
                <IoIosArrowRoundBack
                    size={30}
                    className="text-[#ff4d2d] cursor-pointer"
                />
            </div>

            {/* CARD */}
            <div className="w-[320px] bg-white shadow-lg rounded-xl p-5">

                {/* HEADER */}
                <div className="flex flex-col items-center mb-4">
                    <div className="bg-orange-100 p-2 rounded-full">
                        <FaUtensils className="text-[#ff4d2d] w-5 h-5" />
                    </div>
                    <h2 className="mt-2 text-base font-semibold">
                        Edit Food
                    </h2>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-3">

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Food Name"
                        className="w-full border rounded-md px-3 py-2 text-sm"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        className="w-full border rounded-md px-2 py-2 text-sm"
                    />

                    {/* ✅ SAFE IMAGE */}
                    {frontendImage && (
                        <img
                            src={frontendImage}
                            alt="preview"
                            className="w-full h-32 object-cover rounded-md"
                        />
                    )}

                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                        className="w-full border rounded-md px-3 py-2 text-sm"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 text-sm"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <select
                        value={foodType}
                        onChange={(e) => setFoodType(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 text-sm"
                    >
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#ff4d2d] text-white py-2 rounded-md"
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default EditItem;