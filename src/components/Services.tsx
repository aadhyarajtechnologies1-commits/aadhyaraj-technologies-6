import { motion } from "motion/react";
import { Cloud, Monitor, Layout, Smartphone, Settings, Users } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Cloud Services",
      icon: <Cloud className="w-8 h-8 text-brand" />,
      description: "End-to-end cloud solutions to help businesses migrate, manage, and scale on cloud platforms like AWS, Azure, and Google Cloud."
    },
    {
      title: "Modern Workplace",
      icon: <Monitor className="w-8 h-8 text-brand" />,
      description: "Empowering employees with smart digital tools, collaboration platforms, and secure remote working environments."
    },
    {
      title: "Business Applications",
      icon: <Layout className="w-8 h-8 text-brand" />,
      description: "Build and integrate enterprise-grade applications to streamline operations and enhance overall business performance."
    },
    {
      title: "Mobility Solutions",
      icon: <Smartphone className="w-8 h-8 text-brand" />,
      description: "Develop mobile-friendly solutions to improve accessibility, user experience, and business connectivity on the go."
    },
    {
      title: "DevOps Services",
      icon: <Settings className="w-8 h-8 text-brand" />,
      description: "Accelerate development with CI/CD pipelines, automation, and cloud-based DevOps practices for faster delivery."
    },
    {
      title: "Talent Services",
      icon: <Users className="w-8 h-8 text-brand" />,
      description: "Provide skilled tech team members, staffing solutions, and resource-as-a-service to support business growth."
    }
  ];

  return (
    <section id="services" className="bg-white overflow-hidden">
      {/* Dark Header Banner */}
      <div className="bg-stone-950 py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black text-white"
          >
            Our <span className="text-brand">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-stone-400 mt-6 max-w-3xl mx-auto"
          >
            Comprehensive technology solutions to drive your business forward in the digital age.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-xl shadow-stone-200/40 hover:shadow-2xl hover:shadow-brand/20 transition-all flex flex-col h-full"
            >
              <div className="mb-6 p-4 rounded-xl bg-brand/10 w-fit">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                {service.description}
              </p>
              <button className="text-brand font-bold hover:text-brand transition-opacity flex items-center gap-2 group self-start">
                Learn More
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
