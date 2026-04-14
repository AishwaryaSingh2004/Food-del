
import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const serverUrl = "http://localhost:8000";

function ForgotPassword() {

  const primaryColor = "#ff4d2d";

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err,setErr]=useState("")
  const [loading,setLoading]=useState(false)

  const navigate = useNavigate();

  // SEND OTP
  const handleSendOtp = async () => {
    setLoading(true)
    if (!email) {
      alert("Please enter email");
      return;
    }

    try {
      const result = await axios.post(`${serverUrl}/api/auth/send-otp`, {
        email,
      });

      console.log(result.data);
      alert("OTP sent to your email");
      setErr("")
      setStep(2);
      setLoading(false)

    } catch (error) {
      //console.error(error);
      //alert("Failed to send OTP");
      setErr(error?.response?.data?.message)
      setLoading(false)
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    setLoading(true)
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, {
        email,
        otp,
      });

      console.log(result.data);
      alert("OTP verified");
      setErr("")
      setStep(3);
      setLoading(false)

    } catch (error) {
      //console.error(error);
      //alert("Invalid OTP");
      setErr(error?.response?.data?.message)
      setLoading(false)
    }
  };

  // RESET PASSWORD
  const handleResetPassword = async () => {
    setLoading(true)

    if (!newPassword || !confirmPassword) {
      alert("Fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const result = await axios.post(`${serverUrl}/api/auth/reset-password`, {
        email,
        newPassword,
      });
      setErr("")
      console.log(result.data);
      setLoading(false)
      alert("Password reset successful");
      

      navigate("/signin");

    } catch (error) {
      //console.error(error);
      //alert("Password reset failed");
      setErr(error?.response?.data?.message)
      setLoading(false)
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">

        <div className="flex items-center gap-4 mb-4">
          <IoIosArrowRoundBack
            size={30}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signin")}
          />

          <h1 className="text-2xl font-bold text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

        {/* STEP 1 EMAIL */}
        {step === 1 && (
          <div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)} required
              />
            </div>

            <button
              onClick={handleSendOtp} disabled={loading}
              className="w-full font-semibold py-2 rounded-lg text-white hover:bg-[#e64323]"
              style={{ backgroundColor: primaryColor }}
            >
              {loading?<ClipLoader size={20} color="white"/>:"Send OTP"}
            </button>
            {err && (
          <p className="text-red-500 text-center mt-3 text-sm">* {err}</p>
        )}

          </div>
        )}

        {/* STEP 2 OTP */}
        {step === 2 && (
          <div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                Enter OTP
              </label>

              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button
              onClick={handleVerifyOtp} disabled={loading}
              className="w-full font-semibold py-2 rounded-lg text-white hover:bg-[#e64323]"
              style={{ backgroundColor: primaryColor }}
            >
              {loading?<ClipLoader size={20} color="white"/>:"Verify"}
            </button>
            {err && (
          <p className="text-red-500 text-center mt-3 text-sm">* {err}</p>
        )}

          </div>
        )}

        {/* STEP 3 RESET PASSWORD */}
        {step === 3 && (
          <div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter New Password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleResetPassword} disabled={loading}
              className="w-full font-semibold py-2 rounded-lg text-white hover:bg-[#e64323]"
              style={{ backgroundColor: primaryColor }}
            >
              {loading?<ClipLoader size={20} color="white"/>:"Reset Password"}
            </button>
            {err && (
          <p className="text-red-500 text-center mt-3 text-sm">* {err}</p>
        )}

          </div>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;