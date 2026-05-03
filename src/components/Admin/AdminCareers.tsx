import React, { useState, useEffect } from "react";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  updateDoc 
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { 
  Search, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase, 
  Download,
  FileText,
  BadgeAlert,
  BadgeCheck,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import * as XLSX from 'xlsx';

export default function AdminCareers() {
  const [apps, setApps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Mock data for preview
    const mockApps = [
      { id: "1", name: "Vikram Malhotra", email: "vikram.m@tech.com", phone: "+91 99887 66554", jobTitle: "Senior AI Engineer", experience: "8 Years", message: "Expert in PyTorch and LLM optimization. Excited about Aadhyaraj's vision.", status: "shortlisted", createdAt: new Date() },
      { id: "2", name: "Priya Sharma", email: "priya.s@design.co", phone: "+91 88776 55443", jobTitle: "Product Designer", experience: "5 Years", message: "passionate about crafting intuitive AI interfaces.", status: "pending", createdAt: new Date(Date.now() - 43200000) },
      { id: "3", name: "Mark Wilson", email: "mark.w@global.com", phone: "+1 202 555 0199", jobTitle: "Cloud Architect", experience: "12 Years", message: "Extensive background in AWS/GCP multi-cloud strategy.", status: "pending", createdAt: new Date(Date.now() - 129600000) },
    ];

    setApps(mockApps);
    setIsLoading(false);

    /*
    const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const appsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      setApps(appsData);
      setIsLoading(false);
    });

    return () => unsubscribe();
    */
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "applications", id), { status });
    } catch (error) {
       console.error("Status update error", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently remove this application?")) {
      try {
        await deleteDoc(doc(db, "applications", id));
      } catch (error) {
        console.error("Delete error", error);
      }
    }
  };

  const exportApps = () => {
    const dataToExport = apps.map(({ id, createdAt, ...rest }) => ({
      ...rest,
      date: createdAt.toLocaleDateString()
    }));
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Applications");
    XLSX.writeFile(wb, "Aadhyaraj_Job_Applications.xlsx");
  };

  const filteredApps = apps.filter(app => 
    app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search candidates or job titles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 bg-white border border-stone-200 rounded-2xl outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all text-sm font-medium"
          />
        </div>

        <button 
          onClick={exportApps}
          className="flex items-center gap-3 px-6 py-3.5 bg-stone-900 text-brand rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-stone-800 transition-all shadow-lg shadow-brand/10"
        >
          <Download className="w-4 h-4" />
          Export All Data
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence>
          {filteredApps.map((app) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-[2.5rem] p-8 border border-stone-200 shadow-sm hover:shadow-xl hover:border-brand/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-8 group"
            >
              <div className="flex items-start gap-6 max-w-xl">
                 <div className="w-16 h-16 rounded-[1.5rem] bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-900 shrink-0 italic font-black text-xl">
                    {app.name?.charAt(0)}
                 </div>
                 <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-black text-stone-900 tracking-tight">{app.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${
                        app.status === "shortlisted" ? "bg-emerald-50 text-emerald-600" :
                        app.status === "rejected" ? "bg-red-50 text-red-600" :
                        "bg-amber-50 text-amber-600"
                      }`}>
                         {app.status || "pending"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-stone-400 font-bold text-xs uppercase tracking-widest mb-4">
                       <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {app.jobTitle}</span>
                       <span className="flex items-center gap-1.5 text-stone-900"><Mail className="w-3.5 h-3.5" /> {app.email}</span>
                       <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {app.phone}</span>
                    </div>
                    <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed italic">
                       "{app.message || "No motivation letter provided."}"
                    </p>
                 </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 lg:shrink-0 bg-stone-50/50 p-4 rounded-3xl lg:bg-transparent lg:p-0">
                 <div className="flex items-center gap-2 text-stone-400 font-bold text-[10px] uppercase tracking-widest mr-4">
                    <Calendar className="w-3.5 h-3.5" />
                    {app.createdAt.toLocaleDateString()}
                 </div>
                 
                 <div className="flex gap-2">
                    <button 
                      onClick={() => updateStatus(app.id, "shortlisted")}
                      className={`p-3 rounded-2xl transition-all ${app.status === "shortlisted" ? "bg-emerald-500 text-white" : "bg-white border border-stone-200 text-stone-400 hover:text-emerald-500"}`}
                      title="Shortlist"
                    >
                      <BadgeCheck className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => updateStatus(app.id, "rejected")}
                      className={`p-3 rounded-2xl transition-all ${app.status === "rejected" ? "bg-red-500 text-white" : "bg-white border border-stone-200 text-stone-400 hover:text-red-500"}`}
                      title="Reject"
                    >
                      <BadgeAlert className="w-5 h-5" />
                    </button>
                    <div className="w-px h-10 bg-stone-200 mx-2"></div>
                    <button 
                      className="flex items-center gap-3 px-6 py-3 bg-stone-900 text-brand rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-stone-800 transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      Resume
                    </button>
                    <button 
                      onClick={() => handleDelete(app.id)}
                      className="p-3 bg-stone-100 rounded-2xl text-stone-400 hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredApps.length === 0 && !isLoading && (
          <div className="py-20 text-center bg-white rounded-[2.5rem] border border-stone-200 border-dashed">
            <Search className="w-12 h-12 text-stone-200 mx-auto mb-4" />
            <p className="font-black text-stone-400 uppercase tracking-widest">No applications found</p>
          </div>
        )}
      </div>
    </div>
  );
}
