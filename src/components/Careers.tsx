import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  TrendingUp, 
  Zap, 
  Heart, 
  Globe, 
  Lightbulb, 
  Briefcase, 
  MapPin, 
  Calendar, 
  ArrowLeft,
  X,
  Upload,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

interface Job {
  id: string;
  title: string;
  experience: string;
  location: string;
  type: string;
  posted: string;
  description: string;
  responsibilities: string[];
  skills: {
    category: string;
    items: string[];
  }[];
}

const JOBS: Job[] = [
  {
    id: "java-fs",
    title: "Senior Java Full Stack Developer (React)",
    experience: "8–10 years",
    location: "Pune (Hybrid)",
    type: "Hybrid",
    posted: "recently",
    description: "Build and maintain enterprise-level applications using modern Java and React stacks.",
    responsibilities: [
      "Build and maintain enterprise-level applications",
      "Create backend using Java + Spring Boot",
      "Develop frontend using React.js",
      "Work in an Agile team environment",
      "Fix bugs and support live systems",
      "Modernize legacy systems"
    ],
    skills: [
      {
        category: "Backend",
        items: ["Java (8/11/17)", "Spring Boot", "Spring MVC", "Spring Security", "REST APIs", "Microservices", "Hibernate / JPA", "OAuth2", "JWT"]
      },
      {
        category: "Frontend",
        items: ["React.js", "JavaScript / TypeScript", "Redux / Context API", "HTML5", "CSS3"]
      },
      {
        category: "Database",
        items: ["Oracle", "SQL Server", "SQL Queries"]
      },
      {
        category: "Tools",
        items: ["Git", "Jenkins", "Docker", "AWS / Azure", "JUnit", "Mockito", "Jest"]
      }
    ]
  },
  {
    id: "gen-ai",
    title: "Generative AI Engineer",
    experience: "7+ years",
    location: "Gurgaon (Hybrid)",
    type: "Hybrid",
    posted: "recently",
    description: "Build cutting-edge AI applications using LLMs, RAG, and Agentic AI systems.",
    responsibilities: [
      "Build AI applications using LLMs",
      "Work on RAG, NLP, and ML models",
      "Create Agentic AI systems",
      "Use Python for AI development",
      "Deploy projects using CI/CD",
      "Work with OCR and image processing"
    ],
    skills: [
      {
        category: "Core AI",
        items: ["Generative AI", "LLMs", "Python (Expert)", "Machine Learning", "Agentic AI", "MCP"]
      },
      {
        category: "Specialties",
        items: ["OCR", "Image Processing"]
      },
      {
        category: "DevOps",
        items: ["Docker", "Kubernetes", "Jenkins"]
      }
    ]
  },
  {
    id: "ibm-sterling",
    title: "IBM Sterling B2B Integrator Developer",
    experience: "5+ years",
    location: "Hyderabad (Hybrid)",
    type: "Hybrid",
    posted: "recently",
    description: "Manage complex B2B integrations and business processes for global clients.",
    responsibilities: [
      "Build and manage B2B integrations",
      "Create business processes",
      "Handle file transfers between companies",
      "Monitor systems and fix issues",
      "Support production systems"
    ],
    skills: [
      {
        category: "Core Sterling",
        items: ["IBM Sterling B2Bi", "Business Process Development", "Map Development", "Sterling File Gateway"]
      },
      {
        category: "Operations",
        items: ["File Monitoring", "Troubleshooting", "Production Support"]
      }
    ]
  },
  {
    id: "opentext",
    title: "OpenText Archive Migration Specialist (SAP)",
    experience: "5+ years",
    location: "Hyderabad (Hybrid)",
    type: "Hybrid",
    posted: "recently",
    description: "Lead data migration projects from legacy systems to cloud-based SAP environments.",
    responsibilities: [
      "Move data from old system -> cloud",
      "Work with SAP + OpenText",
      "Test and validate migrated data",
      "Ensure data is safe and working after migration",
      "Coordinate with multiple teams"
    ],
    skills: [
      {
        category: "Core",
        items: ["OpenText Archive (Cloud & On-Prem)", "SAP Integration", "Data Migration"]
      },
      {
        category: "Process",
        items: ["Testing & Validation", "Team Coordination", "Project Management"]
      }
    ]
  },
  {
    id: "react-lead",
    title: "Senior React.js Developer / Frontend Lead",
    experience: "5+ years",
    location: "Pune (Hybrid)",
    type: "Hybrid",
    posted: "recently",
    description: "Lead frontend architecture and guide teams in building scalable, high-performance UIs.",
    responsibilities: [
      "Lead frontend development",
      "Design scalable UI architecture",
      "Guide team members",
      "Work with product & design teams",
      "Ensure performance and quality"
    ],
    skills: [
      {
        category: "Core Frontend",
        items: ["React.js (Expert)", "JavaScript / TypeScript", "HTML5", "CSS3"]
      },
      {
        category: "Backend Integration",
        items: ["API Integration"]
      },
      {
        category: "Optimization",
        items: ["UI Performance Optimization", "Code Quality Practices"]
      },
      {
        category: "Architecture",
        items: ["Architecture Design"]
      }
    ]
  }
];

const BENEFITS = [
  { icon: <Home className="w-8 h-8" />, title: "Hybrid Work", text: "Flexible work-from-home and office balance." },
  { icon: <TrendingUp className="w-8 h-8" />, title: "Growth Path", text: "Clear career progression and mentorship." },
  { icon: <Zap className="w-8 h-8" />, title: "Latest Tech", text: "Work with Generative AI, Cloud, and modern stacks." },
  { icon: <Heart className="w-8 h-8" />, title: "Health First", text: "Comprehensive health and wellness benefits." },
  { icon: <Globe className="w-8 h-8" />, title: "Global Impact", text: "Build solutions for international enterprise clients." },
  { icon: <Lightbulb className="w-8 h-8" />, title: "Innovation", text: "Dedicated time for R&D and learning." },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    message: ""
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleApply = () => {
    setShowApplyForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real production app, you would use FormData for the file
      // const data = new FormData();
      // data.append('resume', selectedFile!);
      // ...
      
      const payload = {
        ...formData,
        jobTitle: selectedJob?.title,
        fileName: selectedFile?.name,
        status: "pending",
        createdAt: serverTimestamp()
      };

      // Save to Firestore
      await addDoc(collection(db, "applications"), payload);

      // Also call simulation API
      await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, createdAt: new Date().toISOString() })
      });

      setShowSuccess(true);
      setFormData({ name: "", email: "", phone: "", experience: "", message: "" });
      setSelectedFile(null);
    } catch (error) {
      console.error("Application error:", error);
      alert("Submission failed. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModals = () => {
    setSelectedJob(null);
    setShowApplyForm(false);
  };

  return (
    <section id="careers" className="bg-white overflow-hidden relative">
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccess(false)}
              className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-lg w-full text-center border border-stone-100"
            >
              <button 
                onClick={() => setShowSuccess(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="w-20 h-20 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <h3 className="text-3xl font-black text-gray-900 mb-4">Application Sent!</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Your application for <span className="font-bold text-brand">{selectedJob?.title}</span> has been submitted. Our HR team will get back to you soon.
              </p>
              
              <button
                onClick={() => { setShowSuccess(false); closeModals(); }}
                className="w-full bg-brand text-black font-black py-4 rounded-xl shadow-xl shadow-brand/20 hover:bg-brand/90 transition-all active:scale-95"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Dark Header Banner */}
      <div className="bg-stone-950 py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black text-white"
          >
            Join Our <span className="text-brand">Expert Team</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-stone-400 mt-6 max-w-3xl mx-auto"
          >
            We are looking for passionate individuals to join our team and build the future of AadhyaRaj Technologies together.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 bg-stone-50">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-24">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl text-center flex flex-col items-center border border-gray-100 shadow-sm"
            >
              <div className="text-brand mb-4">{benefit.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2 truncate w-full">{benefit.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed truncate-2-lines">{benefit.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-brand pl-4">Current Openings</h3>
          <div className="space-y-4">
            {JOBS.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-brand mb-2">
                    <span className="bg-brand/10 px-3 py-1 rounded-full text-brand">{job.experience}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-brand transition-colors">{job.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Posted {job.posted}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedJob(job)}
                  className="px-6 py-3 bg-brand text-black font-bold rounded-lg hover:bg-brand/90 transition-all text-sm shadow-lg shadow-brand/10 active:scale-95"
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* JD Modal */}
      <AnimatePresence>
        {selectedJob && !showApplyForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-10 shadow-2xl relative"
            >
              <button 
                onClick={closeModals}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>

              <div className="mb-8">
                <div className="flex items-center gap-3 text-sm font-semibold text-brand mb-4">
                  <span className="bg-brand/10 px-3 py-1 rounded-full">{selectedJob.experience}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedJob.location}</span>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">{selectedJob.title}</h3>
                <p className="text-lg text-gray-600">{selectedJob.description}</p>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-brand inline-block">Key Responsibilities</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedJob.responsibilities.map((res, i) => (
                      <li key={i} className="flex gap-2 text-gray-600">
                        <span className="text-brand font-bold">•</span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-brand inline-block">Technical Skills</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {selectedJob.skills.map((skillGroup, i) => (
                      <div key={i}>
                        <h5 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">{skillGroup.category}</h5>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((skill, si) => (
                            <span key={si} className="px-3 py-1 bg-stone-100 rounded-lg text-sm text-gray-700 font-medium">{skill}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="flex items-center gap-2 text-gray-400 font-bold hover:text-gray-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" /> Back to jobs
                </button>
                <button 
                  onClick={handleApply}
                  className="w-full md:w-auto px-10 py-4 bg-brand text-black font-black rounded-xl hover:bg-brand/90 transition-all shadow-xl shadow-brand/20 active:scale-95"
                >
                  Apply for this Position
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Apply form modal */}
        {showApplyForm && (
           <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
         >
           <motion.div 
             initial={{ scale: 0.9, y: 20 }}
             animate={{ scale: 1, y: 0 }}
             exit={{ scale: 0.9, y: 20 }}
             className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-10 shadow-2xl relative"
           >
              <button 
                onClick={() => setShowApplyForm(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>

              <div className="mb-8">
                <h3 className="text-2xl font-black text-gray-900 mb-2">Apply for Position</h3>
                <p className="text-brand font-bold">{selectedJob?.title}</p>
              </div>

              <form className="space-y-5" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none transition-all" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Contact Number</label>
                    <input 
                      required 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Experience (Years)</label>
                    <input 
                      required 
                      type="number" 
                      min="0" 
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none transition-all" 
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Resume Upload</label>
                   <div 
                     onClick={triggerFileInput}
                     className={`border-2 border-dashed ${selectedFile ? "border-brand bg-brand/5" : "border-gray-200 hover:border-brand/40"} rounded-xl p-8 text-center transition-colors cursor-pointer group`}
                    >
                      <div className="flex flex-col items-center">
                        <Upload className={`w-8 h-8 ${selectedFile ? "text-brand" : "text-gray-300"} mb-2 group-hover:text-brand transition-colors`} />
                        <p className={`text-sm ${selectedFile ? "text-brand font-bold" : "text-gray-500 font-medium"}`}>
                          {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">PDF, DOC (Max 5MB)</p>
                      </div>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden" 
                      />
                   </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Message (Optional)</label>
                  <textarea 
                    rows={3} 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand text-black font-black rounded-xl hover:bg-brand/90 transition-all shadow-xl shadow-brand/20 active:scale-95 mt-4 flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isSubmitting ? "Submitting Application..." : "Submit Application"}
                </button>
              </form>
           </motion.div>
         </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
