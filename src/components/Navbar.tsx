import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Linkedin, Menu, X, ChevronRight, MessageSquare } from "lucide-react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Tech Stack", href: "/tech-stack" },
    { name: "Careers", href: "/careers" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]);

  useEffect(() => {
    const q = query(collection(db, "menu_items"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs
          .map(doc => ({
            name: doc.data().label,
            href: doc.data().path,
            isActive: doc.data().isActive
          }))
          .filter(item => item.isActive);
        
        if (items.length > 0) {
          setNavItems(items);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 inset-x-0 z-[5000] w-full bg-white border-b border-stone-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 xl:h-20 gap-4 xl:gap-8">
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-16 h-16 xl:w-20 xl:h-20 flex items-center justify-center transition-transform group-hover:scale-110">
                <img src="/logo 3.png" alt="AadhyaRaj Logo" className="w-full h-full object-contain filter brightness-110 contrast-110 drop-shadow-sm" />
              </div>
              <div className="flex flex-col gap-1.5 ml-1">
                <span className="font-serif font-bold tracking-tight text-[22px] xl:text-[30px] text-brand transition-colors duration-300 group-hover:text-black leading-none">
                  AadhyaRaj
                </span>
                <span className="font-heading font-black uppercase tracking-[0.3em] text-[10px] xl:text-[12px] text-black transition-colors duration-300 group-hover:text-brand whitespace-nowrap">
                  Technologies
                </span>
              </div>
            </Link>
          </div>
          <div className="hidden lg:flex flex-1 justify-end items-center gap-2 xl:gap-4 ml-8">
            <div className="flex items-center gap-2 xl:gap-4 whitespace-nowrap">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? "text-brand"
                      : "text-gray-600"
                  } hover:text-brand px-1 xl:px-2 py-2 rounded-md text-[13px] xl:text-sm font-medium transition-colors text-nowrap`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link
              to="/contact"
              className="bg-brand text-black px-3 xl:px-6 py-2 rounded-full text-[10px] xl:text-xs font-black uppercase tracking-widest hover:bg-brand/90 transition-all shadow-md shadow-brand/20 active:scale-95 whitespace-nowrap ml-4"
            >
              Get Started
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
             <button 
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               className="text-stone-900 p-2 hover:bg-stone-50 rounded-xl transition-colors border border-transparent active:border-brand/30"
               aria-label="Toggle menu"
             >
               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] lg:hidden"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-[0_0_50px_rgba(0,0,0,0.3)] z-[10000] lg:hidden flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-stone-50">
                <div className="flex items-center gap-3">
                  <img src="/logo 3.png" alt="Logo" className="w-12 h-12 object-contain filter brightness-110" />
                  <span className="font-serif font-bold text-xl text-brand">AadhyaRaj</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-stone-50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                      location.pathname === item.href 
                        ? "bg-brand/5 text-brand" 
                        : "text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <span className="font-bold text-sm uppercase tracking-wider">{item.name}</span>
                    <ChevronRight className={`w-4 h-4 ${location.pathname === item.href ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                  </Link>
                ))}
              </div>

              <div className="p-6 border-t border-stone-50 bg-stone-50/50">
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center p-4 bg-brand text-black rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-brand/20"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
