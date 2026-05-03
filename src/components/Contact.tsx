import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MessageSquare, MapPin, MessageCircle, CheckCircle2, X, Loader2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Firestore
      await addDoc(collection(db, "leads"), {
        ...formData,
        type: "contact",
        createdAt: serverTimestamp()
      });

      // Also call API for simulation/email (optional if we purely use Firestore)
      await fetch('/api/contact',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      setShowSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white overflow-hidden min-h-screen relative">
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
              
              <h3 className="text-3xl font-black text-gray-900 mb-4">Message Sent!</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Your message has been sent successfully. Our team will review your inquiry and get back to you shortly.
              </p>
              
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full bg-brand text-black font-black py-4 rounded-xl shadow-xl shadow-brand/20 hover:bg-brand/90 transition-all active:scale-95"
              >
                Back to Site
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
            Connect With <span className="text-brand">Us</span>
          </motion.h2>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-gray-700 mb-12 leading-relaxed font-medium">
              We value strategic partnerships and tactical execution. Reach out to discuss how we can leverage our expertise for your success.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <p className="text-gray-600 mb-8">
                  Have a question or need a custom solution? Our expert team is ready to help you navigate your digital transformation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-brand/10 text-brand">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs uppercase tracking-widest mb-1">Email</h4>
                    <a href="mailto:Info@aadhyarajtech.com" className="text-gray-600 hover:text-brand transition-colors text-sm">Info@aadhyarajtech.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs uppercase tracking-widest mb-1">Phone</h4>
                    <a href="tel:+919127912345" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">+91 9127912345</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-brand/10 text-brand">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs uppercase tracking-widest mb-1">WhatsApp</h4>
                    <a href="https://wa.me/919127912345" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand transition-colors text-sm">+91 9127912345</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-stone-100 text-stone-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs uppercase tracking-widest mb-1">Office</h4>
                    <p className="text-gray-600 text-sm">Hyderabad, Telangana, India</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-stone-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-gray-700 uppercase mb-2 tracking-widest">Your Name</label>
                  <input
                    required
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none transition-all placeholder:text-gray-500 text-gray-900 bg-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase mb-2 tracking-widest">Email Address</label>
                  <input
                    required
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none transition-all placeholder:text-gray-500 text-gray-900 bg-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-gray-700 uppercase mb-2 tracking-widest">Phone Number</label>
                  <input
                    required
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none transition-all placeholder:text-gray-500 text-gray-900 bg-white"
                    placeholder="+91 00000 00000"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-gray-700 uppercase mb-2 tracking-widest">Subject</label>
                  <input
                    required
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none transition-all placeholder:text-gray-500 text-gray-900 bg-white"
                    placeholder="How can we help?"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-gray-700 uppercase mb-2 tracking-widest">Message</label>
                <textarea
                  required
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none transition-all placeholder:text-gray-500 text-gray-900 resize-none bg-white"
                  placeholder="Tell us more about your Project or Inquiry..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand text-black font-black py-5 rounded-xl shadow-xl shadow-brand/20 hover:bg-brand/90 transition-all active:scale-95 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
                )}
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
