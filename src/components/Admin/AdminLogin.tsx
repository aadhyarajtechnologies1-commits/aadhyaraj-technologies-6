import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";

import { auth } from "../../lib/firebase";
import { Mail, Lock } from "lucide-react";

const provider = new GoogleAuthProvider();

// 🔐 ONLY ADMIN EMAIL
const ADMIN_EMAILS = [
  "aadhyaraj.technologies1@gmail.com",
  "info@aadhyarajtech.com"
];

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetMsg, setResetMsg] = useState("");

  const navigate = useNavigate();

  // =========================
  // EMAIL LOGIN
  // =========================
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      const userEmail = res.user.email?.toLowerCase();
       const ADMIN_EMAILS = [
      "aadhyaraj.technologies1@gmail.com",
      "info@aadhyarajtech.com"
      ];

     if (!ADMIN_EMAILS.includes(userEmail || "")) {
        await signOut(auth);
        setError("❌ You are not an admin user");
        return;
      }

      navigate("/admin/dashboard");

    } catch (err: any) {
      console.log("EMAIL LOGIN ERROR:", err.code);
      setError(err.code || "Login failed");
    }
  };

  // =========================
  // PASSWORD RESET
  // =========================
  const handlePasswordReset = async () => {
    setError("");
    setResetMsg("");

    if (!email) {
      setError("Please enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetMsg("📩 If this email exists as an admin account, a password reset link will be sent to the registered admin email.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // =========================
  // GOOGLE LOGIN
  // =========================
  const handleGoogleLogin = async () => {
    setError("");

    try {
      const res = await signInWithPopup(auth, provider);

      const userEmail = res.user.email?.toLowerCase();

      const ADMIN_EMAILS = [
      "aadhyaraj.technologies1@gmail.com",
      "info@aadhyarajtech.com"
      ];

      if (!ADMIN_EMAILS.includes(userEmail || "")) {
        await signOut(auth);
        setError("❌ This Google account is not authorized");
        return;
      }

      navigate("/admin/dashboard");

    } catch (err: any) {
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE */}
      <div className="md:w-1/2 flex flex-col items-center justify-center bg-[#dff5d8] p-10 text-center">

        <img src="/logo3.png" className="w-28 h-28 object-contain" />

        <h1 className="text-3xl font-black text-cyan-600 mt-6">
          AadhyaRaj Technologies
        </h1>

        <p className="text-green-700 text-lg mt-3 font-semibold">
          Admin Control Panel
        </p>

        <p className="text-green-600 text-sm mt-3 max-w-sm">
          Secure dashboard for managing leads, applications and analytics.
        </p>

        <a
          href="/"
          className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Back to Website
        </a>
      </div>

      {/* RIGHT SIDE */}
      <div className="md:w-1/2 flex items-center justify-center bg-white p-8">

        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border">

          {/* TITLE */}
          <h2 className="text-2xl font-black text-blue-700 mb-6">
            Admin Login
          </h2>

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 text-red-600 text-xs p-3 mb-3 rounded font-bold">
              {error}
            </div>
          )}

          {/* SUCCESS RESET MESSAGE */}
          {resetMsg && (
            <div className="bg-green-100 text-green-700 text-xs p-3 mb-3 rounded font-bold">
              {resetMsg}
            </div>
          )}

          {/* EMAIL LOGIN FORM */}
          <form onSubmit={handleEmailLogin} className="space-y-4">

            {/* EMAIL INPUT */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 py-3 border rounded-lg text-sm"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD INPUT */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 border rounded-lg text-sm"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 text-xs"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handlePasswordReset}
                className="text-xs text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
            >
              Login
            </button>

          </form>

          {/* OR */}
          <div className="text-center my-4 text-blue-600 font-bold text-sm">
            OR
          </div>

          {/* GOOGLE LOGIN */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-blue-600 border border-blue-600 py-3 rounded-lg font-bold"
          >
            Continue with Google
          </button>

        </div>
      </div>
    </div>
  );
}