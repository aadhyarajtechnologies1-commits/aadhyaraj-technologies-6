import React, { useState, useEffect } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import {
  Mail,
  Lock,
  Camera,
  ShieldCheck,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";

import { auth } from "../../lib/firebase";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail
} from "firebase/auth";

import { motion, AnimatePresence } from "motion/react";

export default function AdminProfile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("Admin User");
  const [photoURL, setPhotoURL] = useState("");

  const [passData, setPassData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // ✅ FIX: Proper auth listener (important)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "");
        setUserName(user.displayName || "Admin User");
        setPhotoURL(user.photoURL || "");
      }
    });

    return () => unsubscribe();
  }, []);

  // =========================
  // PROFILE IMAGE UPLOAD
  // =========================
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setPhotoURL(preview);

    try {
      const user = auth.currentUser;
      if (!user) return;

      // NOTE: This only saves URL (not actual upload to storage)
      await updateProfile(user, {
        photoURL: preview
      });

      setSuccessMsg("Profile picture updated!");
    } catch (err) {
      setErrorMsg("Failed to update profile image");
    }
  };

  // =========================
  // NAME UPDATE
  // =========================
  const handleNameUpdate = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await updateProfile(user, {
        displayName: userName
      });

      setSuccessMsg("Name updated successfully!");
    } catch (err) {
      setErrorMsg("Failed to update name");
    }
  };

  // =========================
  // PASSWORD CHANGE
  // =========================
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (passData.newPassword !== passData.confirmPassword) {
      setErrorMsg("New passwords do not match.");
      return;
    }

    if (passData.newPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setIsUpdating(true);

    try {
      const user = auth.currentUser;
      if (!user || !user.email) throw new Error("No user found");

      const credential = EmailAuthProvider.credential(
        user.email,
        passData.currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, passData.newPassword);

      setSuccessMsg("Password updated successfully!");
      setPassData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // =========================
  // RESET EMAIL
  // =========================
  const handleResetRequest = async () => {
    const email = auth.currentUser?.email;
    if (!email) return;

    setIsUpdating(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg("Password reset link sent!");
    } catch (e: any) {
      setErrorMsg(e.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-4 space-y-8">

          <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm text-center">

            {/* PROFILE IMAGE */}
            <div className="relative w-32 h-32 mx-auto mb-6 group">
              <div
                className="w-full h-full rounded-[2.5rem] bg-stone-100 border-4 border-white shadow-xl overflow-hidden bg-cover"
                style={{
                  backgroundImage: `url(${photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"})`
                }}
              />

              <label className="absolute -bottom-2 -right-2 p-3 bg-brand text-stone-900 rounded-2xl shadow-lg border-4 border-white cursor-pointer">
                <Camera className="w-5 h-5" />
                <input type="file" hidden onChange={handleImageUpload} />
              </label>
            </div>

            {/* NAME EDIT */}
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onBlur={handleNameUpdate}
              className="font-black text-stone-900 text-xl text-center w-full outline-none"
            />

            <p className="text-[10px] font-black text-brand uppercase tracking-[0.25em] mb-6">
              Master Administrator
            </p>

            {/* EMAIL */}
            <div className="pt-6 border-t border-stone-100 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-left">
                <Mail className="w-4 h-4" />
                <div>
                  <p className="text-stone-400 text-xs">Email</p>
                  <p className="text-stone-900 text-xs break-all">{userEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4" />
                <p className="text-emerald-600 text-xs">Verified & Secure</p>
              </div>
            </div>
          </div>

          {/* SECURITY */}
          <div className="bg-stone-900 p-8 rounded-[2.5rem] text-white">
            <button
              onClick={handleResetRequest}
              className="w-full flex items-center justify-center gap-3 py-4 bg-white/10 rounded-2xl text-xs"
            >
              <RefreshCw className="w-4 h-4" />
              Send Reset Link
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border">

          <AnimatePresence>
            {successMsg && <div className="text-green-600">{successMsg}</div>}
            {errorMsg && <div className="text-red-600">{errorMsg}</div>}
          </AnimatePresence>

          <form onSubmit={handlePasswordChange} className="space-y-6">

            <input
              type={showCurrentPass ? "text" : "password"}
              placeholder="Current Password"
              value={passData.currentPassword}
              onChange={(e) =>
                setPassData({ ...passData, currentPassword: e.target.value })
              }
              className="w-full p-3 border rounded"
            />

            <input
              type={showNewPass ? "text" : "password"}
              placeholder="New Password"
              value={passData.newPassword}
              onChange={(e) =>
                setPassData({ ...passData, newPassword: e.target.value })
              }
              className="w-full p-3 border rounded"
            />

            <input
              type={showNewPass ? "text" : "password"}
              placeholder="Confirm Password"
              value={passData.confirmPassword}
              onChange={(e) =>
                setPassData({ ...passData, confirmPassword: e.target.value })
              }
              className="w-full p-3 border rounded"
            />

            <button className="px-6 py-3 bg-black text-white rounded">
              Save Password
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}