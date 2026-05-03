import { motion } from "motion/react";
import { Star, Building2, Cloud, Activity, Truck, ShoppingBag } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Professional team with strong domain knowledge in enterprise software development. Delivery was on time and as promised.",
      company: "Enterprise IT Solutions Company",
      location: "India",
      rating: 5,
      icon: Building2,
      industry: "Information Technology"
    },
    {
      quote: "AadhyaRaj Technologies transformed our legacy systems into a modern, scalable cloud architecture. Their expertise and dedication are unmatched.",
      company: "ISO-Certified Enterprise",
      location: "USA",
      rating: 5,
      icon: Cloud,
      industry: "Enterprise Tech"
    },
    {
      quote: "The AI-driven analytics platform they built for us exceeded all expectations. It has completely revolutionized how we understand our data.",
      company: "Healthcare Solution Provider",
      location: "North America",
      rating: 5,
      icon: Activity,
      industry: "Healthcare"
    },
    {
      quote: "Their mobility solutions have significantly improved our field operations and customer engagement. A truly innovative partner.",
      company: "Leading Logistics Provider",
      location: "Australia",
      rating: 4,
      icon: Truck,
      industry: "Logistics"
    },
    {
      quote: "Exceptional cloud migration strategy. They helped us transition our entire infrastructure to Azure with zero downtime.",
      company: "Retail Excellence Partner",
      location: "UK",
      rating: 5,
      icon: ShoppingBag,
      industry: "Retail"
    }
  ];

  return (
    <section id="testimonials" className="bg-white overflow-hidden">
      {/* Dark Header Banner */}
      <div className="bg-stone-950 py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black text-white"
          >
            Client <span className="text-brand">Success Stories</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-stone-400 mt-6 max-w-2xl mx-auto"
          >
            Discover how leading organizations achieve digital excellence through our strategic technology partnerships and innovative solutions.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testi, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -10, 
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderColor: "rgba(0, 213, 190, 0.2)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-stone-50 p-8 rounded-[2rem] border border-gray-100 flex flex-col h-full shadow-sm transition-all duration-300 group cursor-default"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < testi.rating ? "fill-brand text-brand" : "text-gray-200"}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic mb-8 flex-grow leading-relaxed text-sm">
                "{testi.quote}"
              </p>
              <div className="pt-6 border-t border-gray-100 mt-auto">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-brand/10 text-brand group-hover:bg-brand group-hover:text-black transition-colors duration-300">
                    <testi.icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm tracking-tight">{testi.company}</h4>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">{testi.industry}</p>
                  <p className="text-brand text-[10px] font-extrabold uppercase tracking-widest bg-brand/10 px-2 py-1 rounded-full">{testi.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
