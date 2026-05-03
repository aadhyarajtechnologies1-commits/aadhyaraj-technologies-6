import { motion } from "motion/react";
import { CheckCircle2, TrendingUp, Globe, Users, Smile, Award, Lightbulb } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Years of Excellence", value: "5+", icon: <Award className="w-5 h-5" /> },
    { label: "Global Projects", value: "50+", icon: <Globe className="w-5 h-5" /> },
    { label: "Happy Employees", value: "200+", icon: <Users className="w-5 h-5" /> },
    { label: "Happy Clients", value: "30+", icon: <Smile className="w-5 h-5" /> },
  ];

  const points = [
    { title: "Quality First", text: "We maintain the highest standards of code quality and design excellence in every project we undertake." },
    { title: "Innovation", text: "Constantly exploring emerging technologies to keep our clients ahead of the curve in a rapidly evolving market." },
  ];

  const values = [
    { title: "Proven Track Record", text: "With over 500+ successful projects delivered, we have the experience to handle complex challenges and deliver results." },
    { title: "Expert Tech Team", text: "Our tech team consists of highly skilled tech team members specializing in Java, React, Node.js, and Cloud technologies." },
    { title: "Client-Centric Approach", text: "We prioritize your business goals, ensuring our solutions align perfectly with your vision and requirements." },
    { title: "Agile Methodology", text: "We use agile practices to ensure flexibility, transparency, and rapid delivery of high-quality software." },
    { title: "24/7 Support & Maintenance", text: "Our commitment doesn't end at launch. We provide ongoing support to ensure your systems run smoothly." },
    { title: "Competitive Pricing", text: "We offer premium quality services at competitive rates, providing excellent return on your investment." },
  ];

  return (
    <section id="about" className="bg-white overflow-hidden">
      {/* Dark Header Banner */}
      <div className="bg-stone-950 py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand font-bold uppercase tracking-widest text-xs mb-4"
            >
              Who We Are
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white"
            >
              About <span className="text-brand">AadhyaRaj</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-stone-400 leading-relaxed max-w-2xl mx-auto mt-6"
            >
              Leading the way in digital innovation, AadhyaRaj Technologies builds high-performance software, AI systems, and cloud architectures that drive enterprise growth.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 rounded-3xl bg-stone-50 border border-stone-100 shadow-sm transition-all group"
            >
              <div className="flex justify-center text-brand mb-4 transition-transform group-hover:scale-110">
                {stat.icon}
              </div>
              <div className="text-4xl font-black text-brand mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Combined Features Row (Mission, Vision, Quality, Innovation) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-24">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl bg-white border border-gray-100 flex flex-col items-center text-center group hover:bg-brand hover:border-brand transition-all cursor-default shadow-sm"
          >
            <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center text-brand mb-6 group-hover:bg-white group-hover:text-brand transition-colors">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors">Our Mission</h4>
            <p className="text-sm text-gray-600 leading-relaxed group-hover:text-black/80 transition-colors">To empower businesses through innovative technology solutions that drive growth and efficiency.</p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl bg-white border border-gray-100 flex flex-col items-center text-center group hover:bg-brand hover:border-brand transition-all cursor-default shadow-sm"
          >
            <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center text-brand mb-6 group-hover:bg-white group-hover:text-brand transition-colors">
              <Globe className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors">Our Vision</h4>
            <p className="text-sm text-gray-600 leading-relaxed group-hover:text-black/80 transition-colors">To be the global leader in providing cutting-edge technology solutions that transform industries.</p>
          </motion.div>

          {/* Quality First */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-3xl bg-white border border-gray-100 flex flex-col items-center text-center group hover:bg-brand hover:border-brand transition-all cursor-default shadow-sm"
          >
            <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center text-brand mb-6 group-hover:bg-white group-hover:text-brand transition-colors">
              <Award className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors">Quality First</h4>
            <p className="text-sm text-gray-600 leading-relaxed group-hover:text-black/80 transition-colors">We maintain the highest standards of code quality and design excellence in every project we undertake.</p>
          </motion.div>

          {/* Innovation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-3xl bg-white border border-gray-100 flex flex-col items-center text-center group hover:bg-brand hover:border-brand transition-all cursor-default shadow-sm"
          >
            <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center text-brand mb-6 group-hover:bg-white group-hover:text-brand transition-colors">
              <Lightbulb className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors">Innovation</h4>
            <p className="text-sm text-gray-600 leading-relaxed group-hover:text-black/80 transition-colors">Constantly exploring emerging technologies to keep our clients ahead of the curve in a rapidly evolving market.</p>
          </motion.div>
        </div>

        {/* Why Partner With Us Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h4 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Partner With <span className="text-brand">AadhyaRaj Technologies?</span>
            </h4>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We don't just build software; we build solutions that drive your business forward. Our combination of technical expertise, industry experience, and dedication to client success sets us apart.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand/20 transition-all h-full group cursor-default"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-brand/10 text-brand group-hover:bg-brand group-hover:text-black transition-all duration-300">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-gray-900 text-lg group-hover:text-brand transition-colors">
                    {value.title}
                  </h5>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
