import { motion, useMotionValue, useTransform, animate, useInView } from "motion/react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, value]);

  useEffect(() => {
    return rounded.on("change", (latest) => setDisplayValue(latest));
  }, [rounded]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export default function Hero() {
  return (
    <>
    <section id="home" className="relative w-full py-16 md:py-24 overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
          >
            Empowering Your <span className="text-brand">Digital Future</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed font-light"
          >
            AadhyaRaj Technologies delivers high-impact digital transformation through advanced software engineering, cloud architecture, and AI-driven business intelligence.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/services" className="px-8 py-4 bg-brand text-white font-bold rounded-full hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 active:scale-95 inline-flex items-center justify-center">
              Our Expertise
            </Link>
            <Link to="/contact" className="px-8 py-4 bg-transparent border-2 border-brand text-brand font-bold rounded-full hover:bg-brand/10 transition-all active:scale-95 inline-flex items-center justify-center">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Core Services Preview */}
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Our <span className="text-brand">Core Services</span></h2>
          <p className="text-lg text-gray-600">Expertise that drives innovation and measurable business results.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { title: "Cloud Services", desc: "Scalable cloud solutions for migration, management, and global infrastructure.", link: "/services" },
            { title: "Modern Workplace", desc: "Smart digital tools and collaboration platforms for secure remote work.", link: "/services" },
            { title: "Business Applications", desc: "Enterprise-grade software to streamline operations and boost performance.", link: "/services" },
            { title: "Mobility Solutions", desc: "Cutting-edge mobile applications for seamless business connectivity on the go.", link: "/services" },
            { title: "DevOps & Automation", desc: "Accelerated delivery through CI/CD pipelines and automated workflows.", link: "/services" },
            { title: "Talent Services", desc: "Dedicated tech experts and staffing to scale your development capabilities.", link: "/services" },
          ].map((service, i) => (
            <Link key={i} to={service.link} className="group p-8 rounded-3xl bg-stone-50 border border-gray-100 hover:bg-white hover:border-brand/30 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-brand transition-colors">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.desc}</p>
              <span className="text-brand font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2">
                Explore More <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
                Crafting <span className="text-brand">Intelligent</span> Solutions for a Global Market
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At AadhyaRaj Technologies, we believe that technology should be an enabler, not a bottleneck. Our approach combines architectural precision with iterative development to ensure that every line of code adds tangible value to your enterprise.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Scalable Infrastructure", desc: "Built to handle enterprise-level traffic and data growth." },
                  { title: "AI-First Design", desc: "Leveraging machine learning to drive automated decision making." },
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-stone-50 border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-12 bg-stone-900 rounded-[3rem] text-white overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-8">
                <div className="w-24 h-24 bg-brand/20 blur-3xl rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold mb-6 italic text-brand">Our Project Philosophy</h3>
              <p className="text-stone-300 mb-8 leading-relaxed">
                "We don't just complete projects; we build legacies. Our team is dedicated to pushing the boundaries of what's possible in the digital realm."
              </p>
              <div className="flex items-center gap-4 border-t border-stone-800 pt-8">
                <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center font-bold text-black italic">ART</div>
                <div>
                  <p className="font-bold text-white uppercase tracking-widest text-xs">AAdhyaraj Technolgies Team</p>
                  <p className="text-stone-500 text-xs">Innovation Department</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="py-24 bg-stone-50 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {[
            { label: "Years of Excellence", value: 5, suffix: "+" },
            { label: "Global Projects", value: 50, suffix: "+" },
            { label: "Happy Employees", value: 200, suffix: "+" },
            { label: "Happy Clients", value: 30, suffix: "+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-6xl font-black text-brand mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
