import React, { useState, useEffect } from "react";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc 
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Save, 
  Link as LinkIcon, 
  Type, 
  Eye, 
  EyeOff,
  MoveUp,
  MoveDown,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MenuItem {
  id: string;
  label: string;
  path: string;
  order: number;
  isActive: boolean;
}

export default function AdminMenuEditor() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newItem, setNewItem] = useState({ label: "", path: "" });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Mock data for preview
    const mockMenu = [
      { id: "1", label: "Home", path: "/", order: 0, isActive: true },
      { id: "2", label: "Services", path: "/services", order: 1, isActive: true },
      { id: "3", label: "Testimonials", path: "/testimonials", order: 2, isActive: true },
      { id: "4", label: "Tech Stack", path: "/tech-stack", order: 3, isActive: true },
      { id: "5", label: "Careers", path: "/careers", order: 4, isActive: false },
      { id: "6", label: "About", path: "/about", order: 5, isActive: true },
      { id: "7", label: "Contact", path: "/contact", order: 6, isActive: true },
    ];

    setMenuItems(mockMenu);
    setIsLoading(false);

    /*
    const q = query(collection(db, "menu_items"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MenuItem[];
      setMenuItems(items);
      setIsLoading(false);
    });

    return () => unsubscribe();
    */
  }, []);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.label || !newItem.path) return;

    try {
      await addDoc(collection(db, "menu_items"), {
        ...newItem,
        order: menuItems.length,
        isActive: true
      });
      setNewItem({ label: "", path: "" });
    } catch (error) {
      console.error("Add error", error);
    }
  };

  const toggleStatus = async (item: MenuItem) => {
    try {
      await updateDoc(doc(db, "menu_items", item.id), {
        isActive: !item.isActive
      });
    } catch (error) {
      console.error("Toggle error", error);
    }
  };

  const deleteItem = async (id: string) => {
    if (confirm("Delete this menu item?")) {
      try {
        await deleteDoc(doc(db, "menu_items", id));
      } catch (error) {
        console.error("Delete error", error);
      }
    }
  };

  const moveOrder = async (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= menuItems.length) return;

    const currentItem = menuItems[index];
    const swapItem = menuItems[newIndex];

    try {
      setIsUpdating(true);
      await Promise.all([
        updateDoc(doc(db, "menu_items", currentItem.id), { order: newIndex }),
        updateDoc(doc(db, "menu_items", swapItem.id), { order: index })
      ]);
    } catch (error) {
      console.error("Order update error", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const initializeDefaultMenu = async () => {
    const defaults = [
      { label: "Home", path: "/", order: 0, isActive: true },
      { label: "Services", path: "/services", order: 1, isActive: true },
      { label: "Testimonials", path: "/testimonials", order: 2, isActive: true },
      { label: "Tech Stack", path: "/tech-stack", order: 3, isActive: true },
      { label: "Careers", path: "/careers", order: 4, isActive: true },
      { label: "About", path: "/about", order: 5, isActive: true },
      { label: "Contact", path: "/contact", order: 6, isActive: true },
    ];

    if (confirm("Reset menu to default items? This will remove existing custom configurations.")) {
        try {
            // Delete current
            const batchDeletes = menuItems.map(item => deleteDoc(doc(db, "menu_items", item.id)));
            await Promise.all(batchDeletes);

            // Add defaults
            const batchAdds = defaults.map(d => addDoc(collection(db, "menu_items"), d));
            await Promise.all(batchAdds);
        } catch(e) {
            console.error("Reset error", e);
        }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
        <h3 className="text-lg font-black text-stone-900 uppercase tracking-tight mb-6">Add New Navigation Item</h3>
        <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              required
              type="text" 
              placeholder="Menu Label (e.g. Solutions)"
              value={newItem.label}
              onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
              className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all text-sm font-bold"
            />
          </div>
          <div className="flex-1 relative">
            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              required
              type="text" 
              placeholder="Navigation Path (e.g. /solutions)"
              value={newItem.path}
              onChange={(e) => setNewItem({ ...newItem, path: e.target.value })}
              className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all text-sm font-bold"
            />
          </div>
          <button 
            type="submit"
            className="px-8 py-4 bg-brand text-stone-900 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-brand/20 hover:bg-brand/90 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </form>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
           <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest">Active Navigation Structure</h3>
           <button 
             onClick={initializeDefaultMenu}
             className="flex items-center gap-2 text-[10px] font-black uppercase text-stone-400 hover:text-stone-900 transition-colors"
           >
             <RefreshCw className="w-3.5 h-3.5" />
             Reset Defaults
           </button>
        </div>
        
        <div className="p-4 space-y-3">
          <AnimatePresence initial={false}>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-4 rounded-2xl border transition-all flex items-center gap-4 group ${
                  item.isActive ? "bg-white border-stone-100 shadow-sm" : "bg-stone-50 border-stone-200 opacity-60"
                }`}
              >
                <div className="flex flex-col gap-1 p-1">
                   <button 
                     onClick={() => moveOrder(index, 'up')}
                     disabled={index === 0 || isUpdating}
                     className="text-stone-300 hover:text-brand disabled:opacity-30 p-1"
                   >
                     <MoveUp className="w-4 h-4" />
                   </button>
                   <button 
                     onClick={() => moveOrder(index, 'down')}
                     disabled={index === menuItems.length - 1 || isUpdating}
                     className="text-stone-300 hover:text-brand disabled:opacity-30 p-1"
                   >
                     <MoveDown className="w-4 h-4" />
                   </button>
                </div>

                <div className="flex-grow">
                   <div className="flex items-center gap-3 mb-1">
                     <span className="text-sm font-black text-stone-900 uppercase tracking-tight">{item.label}</span>
                     {!item.isActive && <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 bg-stone-100 px-2 py-0.5 rounded">Hidden</span>}
                   </div>
                   <div className="flex items-center gap-2 text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                      <LinkIcon className="w-3 h-3" />
                      {item.path}
                   </div>
                </div>

                <div className="flex items-center gap-2">
                   <button 
                     onClick={() => toggleStatus(item)}
                     className={`p-2.5 rounded-xl border border-stone-100 transition-all ${
                       item.isActive ? "text-stone-400 hover:text-amber-500" : "text-amber-600 bg-amber-50"
                     }`}
                     title={item.isActive ? "Hide from menu" : "Show in menu"}
                   >
                     {item.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                   </button>
                   <div className="w-px h-8 bg-stone-100 mx-1"></div>
                   <button 
                     onClick={() => deleteItem(item.id)}
                     className="p-2.5 rounded-xl border border-stone-100 text-stone-400 hover:text-red-500 hover:bg-red-50 transition-all"
                     title="Delete Item"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {menuItems.length === 0 && !isLoading && (
            <div className="py-12 text-center">
              <Plus className="w-10 h-10 text-stone-100 mx-auto mb-3" />
              <p className="text-xs font-black text-stone-400 uppercase tracking-widest">No menu items configured</p>
            </div>
          )}
        </div>

        <div className="p-6 bg-stone-50 border-t border-stone-100">
           <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                 <Save className="w-4 h-4" />
              </div>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest leading-relaxed">
                 Changes are auto-saved to cloud and applied to the frontend globally in real-time. Reordering affects navigation priority.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
