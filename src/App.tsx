import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  increment
} from "firebase/firestore";

import { db } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import TechStack from "./components/TechStack";
import Testimonials from "./components/Testimonials";
import Careers from "./components/Careers";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StickyActions from "./components/StickyActions";

// Admin Imports
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminLeads from "./components/Admin/AdminLeads";
import AdminCareers from "./components/Admin/AdminCareers";
import AdminMenuEditor from "./components/Admin/AdminMenuEditor";
import AdminProfile from "./components/Admin/AdminProfile";
import AdminLogin from "./components/Admin/AdminLogin";

/* ---------------------------
   SCROLL TO TOP
----------------------------*/
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* ---------------------------
   🔥 FIXED ADMIN GUARD (IMPORTANT FIX)
----------------------------*/
function RequireAdmin({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);

      try {
        const q = query(collection(db, "users"), where("email", "==", firebaseUser.email));
        const snap = await getDocs(q);

        if (!snap.empty) {
          const userData = snap.docs[0].data();
          setIsAdmin(userData.role === "admin");
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Admin check error", err);
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-stone-500">
        Loading authentication...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

/* ---------------------------
   SITE CONTENT
----------------------------*/
function SiteContent() {
  const { pathname } = useLocation();
  const isAdminPage = pathname.startsWith("/admin");

  useEffect(() => {
    const logPageView = async () => {
      const today = new Date().toISOString().split("T")[0];
      const q = query(collection(db, "site_analytics"), where("date", "==", today));

      try {
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          await addDoc(collection(db, "site_analytics"), {
            date: today,
            views: 1,
            uniqueVisitors: 1,
            createdAt: serverTimestamp()
          });
        } else {
          const docRef = snapshot.docs[0];
          await updateDoc(doc(db, "site_analytics", docRef.id), {
            views: increment(1)
          });
        }
      } catch (err) {
        console.error("Analytics error", err);
      }
    };

    if (!isAdminPage) {
      logPageView();
    }
  }, [pathname, isAdminPage]);

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <ScrollToTop />

      {!isAdminPage && <Navbar />}

      <main className={`flex-grow ${!isAdminPage ? "pt-16 xl:pt-20" : ""}`}>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Hero />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/tech-stack" element={<TechStack />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* ADMIN LOGIN */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ADMIN PROTECTED ROUTES */}
          <Route
            path="/admin/*"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="applications" element={<AdminCareers />} />
            <Route path="menu" element={<AdminMenuEditor />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

        </Routes>
      </main>

      {!isAdminPage && <Footer />}
      {!isAdminPage && <StickyActions />}
    </div>
  );
}

/* ---------------------------
   MAIN APP
----------------------------*/
export default function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, () => {
      setAuthLoading(false);
    });

    return () => unsub();
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-stone-500">
        Loading authentication...
      </div>
    );
  }

  return (
    <Router>
      <SiteContent />
    </Router>
  );
}