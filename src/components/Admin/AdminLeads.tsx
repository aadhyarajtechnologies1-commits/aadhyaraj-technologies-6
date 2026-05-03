import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import {
  Search,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Download,
  MessageSquare,
  FormInput
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import * as XLSX from "xlsx";

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // =========================
  // FIREBASE
  // =========================
  useEffect(() => {
    const q = query(collection(db, "contacts"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => {
        const raw = d.data();

        return {
          id: d.id,
          name: raw.name || "Unknown",
          email: raw.email || "",
          phone: raw.phone || "",
          subject: raw.subject || "",
          message: raw.message || "",
          createdAt: raw.createdAt?.toDate
            ? raw.createdAt.toDate()
            : new Date()
        };
      });

      data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      setLeads(data);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      await deleteDoc(doc(db, "contacts", id));
    }
  };

  // =========================
  // EXPORT
  // =========================
  const exportLeads = () => {
    const exportData = leads.map((lead) => {
      const isAI = (lead.subject || "").toLowerCase().includes("ai chat lead");

      return {
        Name: lead.name,
        Email: lead.email,
        Phone: lead.phone,
        Subject: lead.subject,
        Message: lead.message,
        Type: isAI ? "AI Chat" : "Contact",
        Date: lead.createdAt?.toLocaleDateString?.() || ""
      };
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "Aadhyaraj_Leads.xlsx");
  };

  // =========================
  // FILTER
  // =========================
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const isAI = (lead.subject || "").toLowerCase().includes("ai chat lead");
    const isContact = !isAI;

    const matchesFilter =
      filterType === "all" ||
      (filterType === "contact" && isContact) ||
      (filterType === "chat" && isAI);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">

      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search leads by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 bg-white border border-stone-200 rounded-2xl outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all text-sm font-medium"
          />
        </div>

        <div className="flex gap-4 w-full sm:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3.5 bg-white border border-stone-200 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none"
          >
            <option value="all">All Sources</option>
            <option value="contact">Contact Form</option>
            <option value="chat">AI Assistant</option>
          </select>

          <button
            onClick={exportLeads}
            className="flex items-center gap-3 px-6 py-3.5 bg-stone-900 text-brand rounded-2xl text-[10px] font-black uppercase tracking-widest"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">

            <thead>
              <tr className="bg-stone-50 border-b border-stone-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-stone-400">
                  Lead Details
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-stone-400">
                  Inquiry
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-stone-400">
                  Source
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-stone-400">
                  Date
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-stone-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-50">
              <AnimatePresence>

                {filteredLeads.map((lead) => {
                  const isAI = (lead.subject || "").toLowerCase().includes("ai chat lead");

                  return (
                    <motion.tr key={lead.id} className="hover:bg-stone-50/50 transition-colors group">

                      {/* LEAD DETAILS */}
                      <td className="px-8 py-6">
                        <p className="font-black text-stone-900 text-sm mb-1">{lead.name}</p>
                        <div className="text-xs text-stone-400 font-bold flex flex-col gap-1">
                          <span className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5" />
                            {lead.email}
                          </span>
                          {lead.phone && (
                            <span className="flex items-center gap-2">
                              <Phone className="w-3.5 h-3.5" />
                              {lead.phone}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* INQUIRY */}
                      <td className="px-8 py-6">
                        <p className="text-xs font-black text-stone-900 uppercase mb-1 truncate">
                          {lead.subject || "No Subject"}
                        </p>
                        <p className="text-xs text-stone-500 line-clamp-2">
                          {lead.message || "AI Chat Message"}
                        </p>
                      </td>

                      {/* SOURCE */}
                      <td className="px-8 py-6 text-xs font-black uppercase">
                        {isAI ? "AI Chat" : "Contact"}
                      </td>

                      {/* DATE */}
                      <td className="px-8 py-6 text-xs text-stone-500">
                        {lead.createdAt?.toLocaleDateString("en-IN") || "N/A"}
                      </td>

                      {/* ACTION */}
                      <td className="px-8 py-6">
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </motion.tr>
                  );
                })}

              </AnimatePresence>
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}