/*
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { ClipLoader } from "react-spinners";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux"; 


const serverUrl = "http://localhost:8000";

function SignUp() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [err, setErr] = useState("");
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()

  const navigate = useNavigate();

  // ================= NORMAL SIGNUP =================
  const handleSignUp = async () => {
    setLoading(true)
    setErr("");

    if (!fullName || !email || !password || !mobile) {
      setErr("Please fill all fields");
      return;
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullName,
          email,
          password,
          mobile,
          role,
        },
        { withCredentials: true }
      );

      
      setErr("")
      setLoading(false)
      dispatch(setUserData(result.data))
      alert("Signup successful!");
      navigate("/signin");

    } catch (error) {
      setErr(error?.response?.data?.message)            
      setLoading(false)
    }
  };

  // ================= GOOGLE SIGNUP =================
  const handleGoogleAuth = async () => {
    setErr("");

    if (!mobile) {
      setErr("Mobile number is required");
      return;
    }

    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullName: user.displayName,
          email: user.email,
          role,
          mobile,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(data))

      alert("Google signup successful");

      navigate("/");

    } catch (error) {
      console.log(error);
      setErr(error?.response?.data?.message || "Google signup failed");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Vingo
        </h1>

        <p className="text-gray-600 mb-8">
          Create your account to get started with delicious food deliveries
        </p>

        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your Full Name"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

      
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

      
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Mobile
          </label>

          <input
            type="text"
            placeholder="Enter your Mobile Number"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

       
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
              style={{ border: `1px solid ${borderColor}` }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </div>

    
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Role</label>

          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                style={
                  role === r
                    ? {
                        backgroundColor: primaryColor,
                        color: "white",
                        border: "none",
                      }
                    : {
                        border: `1px solid ${primaryColor}`,
                        color: "#333",
                      }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

  
        <button
          className="w-full font-semibold py-2 rounded-lg transition duration-200 text-white hover:bg-[#e64323]"
          style={{ backgroundColor: primaryColor }}
          onClick={handleSignUp} disabled={loading}
        > {loading?<ClipLoader size={20} color="white"/>:"Sign Up"}
          
        </button>

     
        {err && (
          <p className="text-red-500 text-center mt-3 text-sm">* {err}</p>
        )}

        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-200"
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>

    
        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account ?{" "}
          <span className="text-[#ff4d2d]">Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;*/



import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { ClipLoader } from "react-spinners";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux"; 


const serverUrl = "http://localhost:8000";

function SignUp() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [err, setErr] = useState("");
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()

  const navigate = useNavigate();

  // ================= NORMAL SIGNUP =================
const handleSignUp = async () => {
  setLoading(true);
  setErr("");

  // ✅ 1. EMPTY CHECK
  if (!fullName || !email || !password || !mobile) {
    setErr("Please fill all fields");
    setLoading(false);
    return;
  }

  // ✅ 2. PASSWORD VALIDATION
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!passwordRegex.test(password)) {
    setErr(
      "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character"
    );
    setLoading(false);
    return;
  }

  // ✅ 3. MOBILE VALIDATION (👉 YAHAN ADD KARNA HAI)
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    setErr("Enter a valid 10-digit mobile number");
    setLoading(false);
    return;
  }

  // ✅ 4. API CALL
  try {
    const result = await axios.post(
      `${serverUrl}/api/auth/signup`,
      {
        fullName,
        email,
        password,
        mobile,
        role,
      },
      { withCredentials: true }
    );

    setErr("");
    setLoading(false);
    dispatch(setUserData(result.data));
    alert("Signup successful!");
    navigate("/signin");

  } catch (error) {
    setErr(error?.response?.data?.message || "Signup failed");
    setLoading(false);
  }
};

  // ================= GOOGLE SIGNUP =================
  const handleGoogleAuth = async () => {
    setErr("");

    if (!mobile) {
      setErr("Mobile number is required");
      return;
    }

    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullName: user.displayName,
          email: user.email,
          role,
          mobile,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(data))

      alert("Google signup successful");

      navigate("/");

    } catch (error) {
      console.log(error);
      setErr(error?.response?.data?.message || "Google signup failed");
    }
  };
return (
  <div
    className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
    style={{
      backgroundImage:
        "url('https://i.pinimg.com/1200x/a3/50/71/a35071ed9d3ab9d1ee4ea12724ba3f2d.jpg')",
        backgroundPosition: "center 70%"
    }}
  >
    {/* 🔥 DARK OVERLAY */}
    <div className="absolute inset-0 bg-black/60"></div>

    {/* 🔥 GLASS CARD */}
    <div className="relative bg-black/40 backdrop-blur-md rounded-xl shadow-xl w-full max-w-md p-8 border border-white/20">

      <h1 className="text-3xl font-bold mb-2 text-white">
        Spicy Bites
      </h1>

      <p className="text-gray-300 mb-8">
        Create your account to get started with delicious food deliveries
      </p>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-gray-300 font-medium mb-1">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Enter your Full Name"
          className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg px-3 py-2 focus:outline-none"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-300 font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your Email"
          className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg px-3 py-2 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Mobile */}
      <div className="mb-4">
        <label className="block text-gray-300 font-medium mb-1">
          Mobile
        </label>
        <input
          type="tel"
          placeholder="Enter your Mobile Number"
          className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg px-3 py-2 focus:outline-none"
          value={mobile}
          maxLength={10}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) setMobile(value);
          }}
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-gray-300 font-medium mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg px-3 py-2 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
      </div>

      {/* Role */}
      <div className="mb-6">
        <label className="block text-gray-300 font-medium mb-1">Role</label>
        <div className="flex gap-2">
          {["user", "owner", "deliveryBoy"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className="flex-1 border rounded-lg px-3 py-2 text-center font-medium text-white"
              style={
                role === r
                  ? { backgroundColor: primaryColor, border: "none" }
                  : { border: `1px solid white` }
              }
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Signup */}
      <button
        className="w-full font-semibold py-2 rounded-lg text-white bg-green-500 hover:bg-green-600"
        onClick={handleSignUp}
        disabled={loading}
      >
        {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
      </button>

      {err && (
        <p className="text-red-400 text-center mt-3 text-sm">* {err}</p>
      )}

      {/* Google */}
      <button
        className="w-full mt-4 flex items-center justify-center gap-2 border border-white/30 text-white rounded-lg px-4 py-2 hover:bg-white/10"
        onClick={handleGoogleAuth}
      >
        <FcGoogle size={20} />
        <span>Sign up with Google</span>
      </button>

      <p
        className="text-center mt-6 cursor-pointer text-gray-300"
        onClick={() => navigate("/signin")}
      >
        Already have an account ?{" "}
        <span className="text-orange-400">Sign In</span>
      </p>
    </div>
  </div>
);
}

export default SignUp;
