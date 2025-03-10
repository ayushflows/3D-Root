import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GoogleLogin = () => {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult.code);
        const { email, name, image } = result.data.user;
        const token = result.data.token;
        const obj = { email, name, token, image };
        localStorage.setItem("user-info", JSON.stringify(obj));
        navigate("/dashboard");
      } else {
        throw new Error(authResult);
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-[100vw] overflow-hidden bg-[#090014]">
      {/* ✨ Subtle Animated Neon Grid Background */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-15">
        {Array.from({ length: 144 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-[12px] h-[12px] bg-purple-500/10 rounded-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: i * 0.005 }}
          />
        ))}
      </div>

      {/* ✨ Floating Glowing Shapes */}
      <div className="absolute top-16 left-16 w-40 h-40 bg-purple-600/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-16 right-16 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full animate-pulse"></div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6 flex flex-col items-center justify-center"
      >
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            3DRoot
          </span>
        </h1>
        <p className="text-lg text-gray-400 mb-8">Sign in to continue</p>

        {/* 🚀 Google Sign-In Button */}
        <motion.button
          className="flex items-center px-8 py-3 text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg rounded-full relative overflow-hidden group"
          onClick={googleLogin}
          whileHover={{ scale: 1.05 }}
        >
          {/* ✨ Glow Effect */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-30 blur-lg group-hover:opacity-50 transition-all"></span>

          {/* Google Icon */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
            alt="Google logo"
            className="w-6 h-6 mr-3 relative z-10"
          />
          <span className="relative z-10">Continue with Google</span>
        </motion.button>
      </motion.div>

      {/* ✨ Bottom Gradient Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-700/20 to-transparent"></div>
    </div>
  );
};

export default GoogleLogin;
