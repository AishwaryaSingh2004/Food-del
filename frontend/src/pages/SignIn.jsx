/*import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const serverUrl = "http://localhost:8000";

function SignIn() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch()

  const navigate = useNavigate();

  // ================= NORMAL LOGIN =================
  const handleSignIn = async () => {
    setErr("");

    if (!email || !password) {
      setErr("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data))

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleAuth = async () => {
    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Google User:", user);

      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: user.email,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data))

      alert("Google login successful");

      navigate("/");
    } catch (error) {
      console.log(error);
      setErr("Google login failed");
    } finally {
      setLoading(false);
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
          Sign In to your account to get started with delicious food deliveries.
        </p>

        {/* Email *}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>

          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        {/* Password *}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          <div
            className="text-right mb-4 text-[#ff4d2d] font-medium cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password
          </div>
        </div>

        {/* Sign In Button *}
        <button
          className="w-full font-semibold py-2 rounded-lg transition duration-200 text-white hover:bg-[#e64323]"
          style={{ backgroundColor: primaryColor }}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ClipLoader size={20} color="white" />
          ) : (
            "Sign In"
          )}
        </button>

        {/* Error *}
        {err && (
          <p className="text-red-500 text-center mt-3 text-sm">* {err}</p>
        )}

        {/* Google Login *}
        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-200"
          onClick={handleGoogleAuth}
          disabled={loading}
        >
          <FcGoogle size={20} />
          <span>Sign In with Google</span>
        </button>

        {/* Signup *}
        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Want to create a new account ?{" "}
          <span className="text-[#ff4d2d]">Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;*/

/*
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const serverUrl = "http://localhost:8000";

function SignIn() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ================= NORMAL LOGIN =================
  const handleSignIn = async () => {
    setErr("");

    if (!email || !password) {
      setErr("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );

      console.log("Login Response:", result.data);

      dispatch(setUserData(result.data));

      navigate("/"); // redirect after login
    } catch (error) {
      console.log(error);
      setErr(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleAuth = async () => {
    try {
      setErr("");
      setLoading(true);

      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Google User:", user);

      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: user.email,
        },
        { withCredentials: true }
      );

      console.log("Google Backend Response:", data);

      dispatch(setUserData(data)); // ✅ FIXED

      navigate("/"); // redirect
    } catch (error) {
      console.log(error);
      setErr("Google login failed");
    } finally {
      setLoading(false);
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
          Sign in to your account to continue
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          <div
            className="text-right mt-2 text-[#ff4d2d] font-medium cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </div>
        </div>

        
        <button
          className="w-full font-semibold py-2 rounded-lg text-white hover:bg-[#e64323]"
          style={{ backgroundColor: primaryColor }}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ClipLoader size={20} color="white" />
          ) : (
            "Sign In"
          )}
        </button>

        
        {err && (
          <p className="text-red-500 text-center mt-3 text-sm">* {err}</p>
        )}

        
        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 border-gray-400 hover:bg-gray-100"
          onClick={handleGoogleAuth}
          disabled={loading}
        >
          <FcGoogle size={20} />
          <span>Sign In with Google</span>
        </button>

        
        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Don’t have an account?{" "}
          <span className="text-[#ff4d2d] font-medium">Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;*/



/*
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const serverUrl = "http://localhost:8000";

function SignIn() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ================= NORMAL LOGIN =================
  const handleSignIn = async () => {
    setErr("");

    if (!email || !password) {
      setErr("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password }
      );

      console.log("Login Response:", result.data);

      // ✅ FIX: STORE TOKEN
      localStorage.setItem("token", result.data.token);

      // ✅ SAVE USER DATA
      dispatch(setUserData(result.data.user || result.data));

      navigate("/");

    } catch (error) {
      console.log(error);
      setErr(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleAuth = async () => {
    try {
      setErr("");
      setLoading(true);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Google User:", user);

      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: user.email,
        }
      );

      console.log("Google Backend Response:", data);

      // ✅ FIX: STORE TOKEN
      localStorage.setItem("token", data.token);

      // ✅ SAVE USER DATA
      dispatch(setUserData(data.user || data));

      navigate("/");

    } catch (error) {
      console.log(error);
      setErr("Google login failed");
    } finally {
      setLoading(false);
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
          Sign in to your account to continue
        </p>

       
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          <div
            className="text-right mt-2 text-[#ff4d2d] font-medium cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </div>
        </div>

       
        <button
          className="w-full font-semibold py-2 rounded-lg text-white hover:bg-[#e64323]"
          style={{ backgroundColor: primaryColor }}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ClipLoader size={20} color="white" />
          ) : (
            "Sign In"
          )}
        </button>

       
        {err && (
          <p className="text-red-500 text-center mt-3 text-sm">* {err}</p>
        )}

       
        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 border-gray-400 hover:bg-gray-100"
          onClick={handleGoogleAuth}
          disabled={loading}
        >
          <FcGoogle size={20} />
          <span>Sign In with Google</span>
        </button>

       
        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Don't have an account?{" "}
          <span className="text-[#ff4d2d] font-medium">Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;*/



import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const serverUrl = "http://localhost:8000";

function SignIn() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ================= NORMAL LOGIN =================
  const handleSignIn = async () => {
    setErr("");

    if (!email || !password) {
      setErr("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password }
      );

      console.log("Login Response:", result.data);

      // ✅ STORE TOKEN
      localStorage.setItem("token", result.data.token);

      // ✅ STORE USER
      dispatch(setUserData(result.data.user || result.data));

      // 🔥 VERY IMPORTANT FIX
      window.location.href = "/"; // ✅ forces reload with token

    } catch (error) {
      console.log(error);
      setErr(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleAuth = async () => {
    try {
      setErr("");
      setLoading(true);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: user.email,
        }
      );

      // ✅ STORE TOKEN
      localStorage.setItem("token", data.token);

      // ✅ STORE USER
      dispatch(setUserData(data.user || data));

      // 🔥 VERY IMPORTANT FIX
      window.location.href = "/"; // ✅ reload

    } catch (error) {
      console.log(error);
      setErr("Google login failed");
    } finally {
      setLoading(false);
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
          Sign in to your account to continue
        </p>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        {/* PASSWORD */}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          <div
            className="text-right mt-2 text-[#ff4d2d] font-medium cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <button
          className="w-full font-semibold py-2 rounded-lg text-white hover:bg-[#e64323]"
          style={{ backgroundColor: primaryColor }}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ClipLoader size={20} color="white" />
          ) : (
            "Sign In"
          )}
        </button>

        {err && (
          <p className="text-red-500 text-center mt-3 text-sm">* {err}</p>
        )}

        {/* GOOGLE LOGIN */}
        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 border-gray-400 hover:bg-gray-100"
          onClick={handleGoogleAuth}
          disabled={loading}
        >
          <FcGoogle size={20} />
          <span>Sign In with Google</span>
        </button>

        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Don't have an account?{" "}
          <span className="text-[#ff4d2d] font-medium">Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
