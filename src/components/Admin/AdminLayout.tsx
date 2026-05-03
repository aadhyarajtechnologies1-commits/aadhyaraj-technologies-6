import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Settings,
  Menu as MenuIcon, 
  LogOut, 
  ChevronRight, 
  BarChart3,
  UserCircle,
  Bell
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { auth } from "../../lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean | null>(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [photoURL, setPhotoURL] = useState("");

  // ✅ FIX: LOAD + LIVE UPDATE PROFILE IMAGE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPhotoURL(user.photoURL || "");
      }
    });

    // ✅ LISTEN FOR PROFILE UPDATE EVENT
    const syncProfile = () => {
      const user = auth.currentUser;
      if (user) {
        setPhotoURL(user.photoURL || "");
      }
    };

    window.addEventListener("profileUpdated", syncProfile);

    return () => {
      unsubscribe();
      window.removeEventListener("profileUpdated", syncProfile);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("admin");
      navigate("/admin/login");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  const navItems = [
    { name: "Analytics", icon: <BarChart3 className="w-5 h-5" />, href: "/admin/dashboard" },
    { name: "Leads Database", icon: <Users className="w-5 h-5" />, href: "/admin/leads" },
    { name: "Job Applications", icon: <Briefcase className="w-5 h-5" />, href: "/admin/applications" },
    { name: "Menu Editor", icon: <MenuIcon className="w-5 h-5" />, href: "/admin/menu" },
    { name: "Profile Settings", icon: <UserCircle className="w-5 h-5" />, href: "/admin/profile" },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex">

      {/* SIDEBAR */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-[#eaf7e2] text-stone-900 fixed h-full left-0 top-0 z-50 flex flex-col shadow-2xl transition-all border-r border-green-100"
      >

        {/* TOP BRAND */}
        <div className="p-6 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {isSidebarOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-4 overflow-hidden"
              >
                <img
                  src="/logo3.png"
                  alt="logo"
                  className="w-16 h-16 object-contain"
                />

                <div className="leading-tight">
                  <div className="text-green-500 text-lg font-bold capitalize">
                    AadhyaRaj Technologies
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="w-11 h-11 flex items-center justify-center mx-auto">
                <img src="/logo3.png" className="w-16 h-16 object-contain" />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* ADMIN CONSOLE */}
        <div className="px-6 mb-4">
          {isSidebarOpen && (
            <div className="bg-white text-black px-4 py-2 rounded-md font-black text-sm uppercase tracking-widest shadow-sm text-center">
              Admin Console
            </div>
          )}
        </div>

        {/* NAV ITEMS */}
        <nav className="flex-grow px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all relative group ${
                location.pathname === item.href 
                  ? "bg-brand text-black font-semibold" 
                  : "text-black hover:bg-green-100"
              }`}
            >
              <div className="shrink-0">{item.icon}</div>

              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-base font-medium tracking-wide"
                >
                  {item.name}
                </motion.span>
              )}
            </Link>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="p-3 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-black hover:bg-red-100 transition-all"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && (
              <span className="text-sm font-bold uppercase tracking-widest">
                Logout
              </span>
            )}
          </button>
        </div>

      </motion.aside>

      {/* MAIN CONTENT */}
      <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? "ml-[280px]" : "ml-[80px]"}`}>

        {/* HEADER */}
        <header className="bg-white border-b border-stone-200 h-20 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <MenuIcon className="w-5 h-5 text-stone-600" />
            </button>

            <h1 className="text-xl font-black text-stone-900 tracking-tight">
              {navItems.find(n => n.href === location.pathname)?.name || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2.5 rounded-full bg-stone-100 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
            </button>

            {/* ✅ ONLY CHANGE HERE */}
            <div
              className="w-10 h-10 rounded-full bg-stone-200 bg-cover"
              style={{
                backgroundImage: `url(${
                  photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                })`
              }}
            />
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>

      </main>
    </div>
  );
}