import { Link } from "react-router-dom";
import { Linkedin, Twitter, Github, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-24 bg-stone-950 text-white border-t border-stone-800">
      <div className="container mx-auto px-4 text-center sm:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="flex flex-col items-center sm:items-start">
            <Link to="/" className="flex items-center gap-4 mb-8 group">
              <div className="w-20 h-20 xl:w-28 xl:h-28 flex items-center justify-center transition-transform group-hover:scale-110">
                <img src="/logo 3.png" alt="AadhyaRaj Logo" className="w-full h-full object-contain filter brightness-115 drop-shadow-[0_0_12px_rgba(0,213,190,0.4)]" />
              </div>
              <div className="flex flex-col gap-1.5 ml-1">
                <span className="font-serif font-bold tracking-tight text-[22px] xl:text-[30px] text-brand transition-colors duration-300 group-hover:text-white leading-none">
                   AadhyaRaj
                 </span>
                <span className="font-heading font-black uppercase tracking-[0.3em] text-[10px] xl:text-[12px] text-white transition-colors duration-300 group-hover:text-brand whitespace-nowrap pt-1">
                   Technologies
                 </span>
              </div>
            </Link>
            <p className="text-stone-400 leading-relaxed mb-8 text-sm max-w-xs">
              Pioneering digital excellence through advanced engineering and AI-driven solutions. Transform your enterprise today.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/company/aadhyaraj-technologies/" },
                { icon: <Twitter className="w-5 h-5" />, href: "#" },
                { icon: <Github className="w-5 h-5" />, href: "#" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:border-brand/50 hover:text-brand transition-all active:scale-95"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h5 className="font-black text-xs uppercase tracking-[0.25em] text-white mb-8">Quick Links</h5>
            <ul className="space-y-4">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Testimonials", path: "/testimonials" },
                { label: "Careers", path: "/careers" },
                { label: "Contact", path: "/contact" },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-stone-400 hover:text-brand transition-colors text-sm font-bold">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h5 className="font-black text-xs uppercase tracking-[0.25em] text-white mb-8">Our Services</h5>
            <ul className="space-y-4">
              {[
                { label: "Cloud Services", path: "/services" },
                { label: "Modern Workplace", path: "/services" },
                { label: "Business Applications", path: "/services" },
                { label: "Mobility Solutions", path: "/services" },
                { label: "DevOps & Automation", path: "/services" },
                { label: "Talent Services", path: "/services" },
              ].map((service, i) => (
                <li key={i}>
                  <Link to={service.path} className="text-stone-400 hover:text-brand transition-colors text-sm font-bold">{service.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h5 className="font-black text-xs uppercase tracking-[0.25em] text-white mb-8">Newsletter</h5>
            <p className="text-stone-500 text-xs mb-6 leading-relaxed">Subscribe for the latest insights in AI and software engineering.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Work email" 
                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand/50 transition-all"
              />
              <button className="mt-4 w-full bg-brand text-black font-black uppercase tracking-widest text-[10px] py-4 rounded-xl hover:bg-brand/90 transition-all active:scale-[0.98]">
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} AadhyaRaj Technologies. Excellence in Digital Engineering.
          </p>
          <div className="flex gap-8">
             <Link to="#" className="text-stone-600 hover:text-brand transition-colors text-[10px] font-bold uppercase tracking-widest">Privacy Policy</Link>
             <Link to="#" className="text-stone-600 hover:text-brand transition-colors text-[10px] font-bold uppercase tracking-widest">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
