import React, { useState, useEffect } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  Cell,
  PieChart, 
  Pie
} from "recharts";
import { 
  Users, 
  Eye, 
  MousePointer2, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Filter,
  Download
} from "lucide-react";
import { motion } from "motion/react";
import * as XLSX from 'xlsx';

// 🔥 FIREBASE IMPORTS
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";

/* ---------------------------
   DEVICE DATA (UNCHANGED UI)
----------------------------*/
const DEVICE_DATA = [
  { name: "Desktop", value: 65, color: "#00D5BE" },
  { name: "Mobile", value: 30, color: "#1C1C1C" },
  { name: "Tablet", value: 5, color: "#E5E7EB" },
];

/* ---------------------------
   MAIN COMPONENT
----------------------------*/
export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("weekly");

  // 🔥 FIREBASE STATES
  const [leads, setLeads] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);

  /* ---------------------------
     FIREBASE REALTIME SYNC
  ----------------------------*/
  useEffect(() => {
    const unsubLeads = onSnapshot(collection(db, "leads"), (snapshot) => {
          console.log("LEADS:", snapshot.size);
      setLeads(snapshot.docs.map(doc => doc.data()));
    // 🔥 DEBUG HERE
    console.log("🔥 LEADS COUNT:", data.length);
    console.log("🔥 LEADS DATA:", data);

    });

    const unsubContacts = onSnapshot(collection(db, "contacts"), (snapshot) => {
      console.log("CONTACTS:", snapshot.size);
      setContacts(snapshot.docs.map(doc => doc.data()));
     // 🔥 DEBUG HERE
    console.log("🔥 CONTACTS COUNT:", data.length);
    console.log("🔥 CONTACTS DATA:", data);
    });

    return () => {
      unsubLeads();
      unsubContacts();
    };
  }, []);

  /* ---------------------------
     CHART DATA (REPLACES MOCK DATA)
  ----------------------------*/
  const chartData = [
    {
      name: "Leads",
      visitors: leads.length,
      views: leads.length * 2,
    },
    {
      name: "Contacts",
      visitors: contacts.length,
      views: contacts.length * 3,
    }
  ];

  /* ---------------------------
     EXPORT TO EXCEL
  ----------------------------*/
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet([...leads, ...contacts]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Analytics");
    XLSX.writeFile(wb, `Aadhyaraj_Analytics_${timeRange}.xlsx`);
  };

  /* ---------------------------
     STATS CARD (UNCHANGED UI)
  ----------------------------*/
  const StatCard = ({ title, value, subValue, icon, trend, trendColor }: any) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-[2rem] border border-stone-200 shadow-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-stone-100 rounded-2xl text-stone-600">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${trendColor}`}>
          {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(trend)}%
        </div>
      </div>
      <div>
        <h3 className="text-stone-500 font-bold text-xs uppercase tracking-widest mb-1">{title}</h3>
        <p className="text-3xl font-black text-stone-900">{value}</p>
        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-2">{subValue}</p>
      </div>
    </motion.div>
  );

  /* ---------------------------
     UI (UNCHANGED COMPLETELY)
  ----------------------------*/
  return (
    <div className="space-y-8 pb-12">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-stone-200 shadow-sm">
          {["Daily", "Weekly", "Monthly", "Custom"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range.toLowerCase())}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                timeRange === range.toLowerCase() 
                ? "bg-stone-900 text-brand shadow-lg" 
                : "text-stone-400 hover:text-stone-600"
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full sm:w-auto">
          <button 
            onClick={exportToExcel}
            className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 py-3.5 bg-white border border-stone-200 rounded-2xl text-stone-900 font-black text-[10px] uppercase tracking-widest hover:bg-stone-50 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </button>

          <button className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 py-3.5 bg-brand text-stone-900 font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-lg shadow-brand/20 hover:bg-brand/90 transition-all">
            <Filter className="w-4 h-4" />
            Filter Data
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Views" value={leads.length + contacts.length} subValue="Live from Firebase" icon={<Eye className="w-6 h-6" />} trend={12.5} trendColor="text-green-600" />
        <StatCard title="Leads" value={leads.length} subValue="Contact form" icon={<Users className="w-6 h-6" />} trend={8.2} trendColor="text-green-600" />
        <StatCard title="AI Contacts" value={contacts.length} subValue="AI + Contact form" icon={<Clock className="w-6 h-6" />} trend={5.1} trendColor="text-green-600" />
        <StatCard title="Conversion" value="3.42%" subValue="Static KPI" icon={<MousePointer2 className="w-6 h-6" />} trend={14.1} trendColor="text-green-600" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* MAIN CHART */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
          
          <h3 className="font-black text-stone-900 text-lg uppercase tracking-tight mb-6">
            Traffic Overview (Live)
          </h3>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F1F1" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="views" stroke="#00D5BE" fill="#00D5BE" />
                <Area type="monotone" dataKey="visitors" stroke="#1C1C1C" fill="#1C1C1C" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DEVICE CHART (UNCHANGED) */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
          <h3 className="font-black text-stone-900 text-lg uppercase mb-8">Device Usage</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={DEVICE_DATA} dataKey="value" innerRadius={70} outerRadius={100}>
                {DEVICE_DATA.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}