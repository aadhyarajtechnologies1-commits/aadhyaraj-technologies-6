import { motion } from "motion/react";
import { Laptop, Server, Database, Cloud, Brain, Smartphone } from "lucide-react";

export default function TechStack() {
  const categories = [
    {
      title: "Frontend",
      icon: <Laptop className="w-6 h-6 text-brand" />,
      skills: ["React.js", "Next.js", "Vue.js", "Angular", "Tailwind CSS", "TypeScript"]
    },
    {
      title: "Backend",
      icon: <Server className="w-6 h-6 text-brand" />,
      skills: ["Node.js", "Java", "Spring Boot", "Python", "Express.js", "GraphQL"]
    },
    {
      title: "Database",
      icon: <Database className="w-6 h-6 text-brand" />,
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "ElasticSearch"]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6 text-brand" />,
      skills: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD"]
    },
    {
      title: "AI & Machine Learning",
      icon: <Brain className="w-6 h-6 text-brand" />,
      skills: ["TensorFlow", "PyTorch", "OpenAI", "LangChain", "Computer Vision", "NLP"]
    },
    {
      title: "Mobile",
      icon: <Smartphone className="w-6 h-6 text-brand" />,
      skills: ["React Native", "Flutter", "iOS (Swift)", "Android (Kotlin)"]
    }
  ];

  return (
    <section id="tech-stack" className="bg-white overflow-hidden">
      {/* Dark Header Banner */}
      <div className="bg-stone-950 py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black text-white"
          >
            Our Technology <span className="text-brand">Stack</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-stone-400 mt-6 max-w-3xl mx-auto"
          >
            We leverage the latest and most robust technologies to build scalable, secure, and future-proof solutions.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-stone-50 border border-gray-100 flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-brand/10">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIndex) => (
                  <span 
                    key={sIndex}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
