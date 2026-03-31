import { motion, useScroll, useTransform } from "motion/react";
import { Anchor, Ship, Globe, Shield, Phone, Mail, MapPin, ArrowRight, Menu, X, Compass, Waves } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
      }
    };
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className={`custom-cursor hidden lg:block ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${isScrolled ? "bg-black/40 backdrop-blur-2xl py-4 border-b border-white/5" : "bg-transparent py-12"}`}>
      <div className="max-w-[1920px] mx-auto px-12 flex justify-between items-center">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative">
            <Anchor className="text-luxury-accent w-7 h-7 group-hover:rotate-12 transition-transform duration-500" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-2 bg-luxury-accent/20 blur-xl rounded-full"
            />
          </div>
          <span className="font-serif text-3xl tracking-[0.4em] uppercase font-light gold-gradient-text">JAVARA</span>
        </div>
        
        <div className="hidden xl:flex gap-20 text-[9px] uppercase tracking-[0.6em] font-bold">
          {['Home', 'Legacy', 'Solutions', 'Fleet', 'Presence', 'Inquiry'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="luxury-link">{item}</a>
          ))}
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-50 p-3 hover:bg-white/5 rounded-full transition-all group"
        >
          <div className="space-y-1.5">
            <motion.div animate={isMenuOpen ? { rotate: 45, y: 6 } : {}} className="w-6 h-[1px] bg-luxury-accent" />
            <motion.div animate={isMenuOpen ? { opacity: 0 } : {}} className="w-6 h-[1px] bg-luxury-accent" />
            <motion.div animate={isMenuOpen ? { rotate: -45, y: -6 } : {}} className="w-6 h-[1px] bg-luxury-accent" />
          </div>
        </button>
      </div>

      {/* Full Screen Menu Overlay */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="fixed inset-0 bg-luxury-bg z-40 flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 atmosphere opacity-50" />
          <div className="flex flex-col items-center gap-12 text-center relative z-10">
            {['Home', 'Legacy', 'Solutions', 'Fleet', 'Presence', 'Inquiry'].map((item, i) => (
              <motion.a
                key={item}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="font-serif text-6xl md:text-8xl hover:italic hover:gold-gradient-text transition-all duration-700 tracking-tighter"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Vessel" 
          className="w-full h-full object-cover brightness-[0.3] scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-luxury-bg"></div>
      </motion.div>

      <div className="absolute inset-0 atmosphere pointer-events-none" />
      
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] uppercase tracking-[1em] font-bold text-luxury-accent mb-12 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-luxury-accent/30"></span>
            Jakarta • Global Maritime Excellence
            <span className="w-12 h-px bg-luxury-accent/30"></span>
          </p>
          <h1 className="text-8xl md:text-[12rem] leading-[0.8] mb-16 font-light">
            The Art of <br /> <span className="italic gold-gradient-text font-medium">Voyage.</span>
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <a href="#solutions" className="luxury-button group">
              <span className="relative z-10">Explore Solutions</span>
              <motion.div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            </a>
            <div className="flex items-center gap-4 text-luxury-muted text-[10px] uppercase tracking-[0.4em]">
              <Compass className="animate-spin-slow" size={20} />
              <span>Est. 1998</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <span className="vertical-text text-[8px] uppercase tracking-[0.8em]">Scroll</span>
        <motion.div 
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-luxury-accent to-transparent"
        />
      </div>
    </section>
  );
};

const Legacy = () => {
  return (
    <section id="legacy" className="py-40 px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] uppercase tracking-[0.6em] font-bold text-luxury-accent mb-10">Our Heritage</p>
            <h2 className="text-7xl md:text-8xl leading-[0.9] mb-12">Legacy in <br /><span className="italic gold-gradient-text">Motion.</span></h2>
            <div className="space-y-10 text-luxury-muted leading-relaxed font-light text-xl max-w-xl">
              <p>PT Javara represents the pinnacle of Indonesian maritime logistics. For over two decades, we have orchestrated the world's most complex voyages with surgical precision and uncompromising luxury.</p>
              <p>From our headquarters in Jakarta, we command a network that spans every major ocean, delivering not just cargo, but the promise of excellence.</p>
            </div>
            
            <div className="mt-20 grid grid-cols-2 gap-16">
              <div className="glass-panel p-10 rounded-sm">
                <p className="font-serif text-6xl gold-gradient-text mb-4">25+</p>
                <p className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-60">Years of Mastery</p>
              </div>
              <div className="glass-panel p-10 rounded-sm">
                <p className="font-serif text-6xl gold-gradient-text mb-4">120</p>
                <p className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-60">Strategic Ports</p>
              </div>
            </div>
          </motion.div>
          
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
              className="oval-mask aspect-[4/5] relative z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=2069&auto=format&fit=crop" 
                alt="Jakarta Port" 
                className="w-full h-full object-cover brightness-75 grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -inset-10 border border-luxury-accent/20 oval-mask -z-10 animate-pulse" />
            <div className="absolute top-1/2 -right-20 vertical-text text-[8px] uppercase tracking-[1.5em] font-bold text-luxury-accent/20">
              JAVARA MARITIME GROUP • JAKARTA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Fleet = () => {
  const vessels = [
    { name: "Javara Sovereign", type: "Ultra Large Crude Carrier", specs: "330m • 300,000 DWT", img: "https://images.unsplash.com/photo-1524522173746-f628baad3644?q=80&w=2031&auto=format&fit=crop" },
    { name: "Javara Horizon", type: "LNG Carrier", specs: "290m • 170,000 m³", img: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop" },
    { name: "Javara Zenith", type: "Container Vessel", specs: "400m • 24,000 TEU", img: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=2070&auto=format&fit=crop" }
  ];

  return (
    <section id="fleet" className="py-40 px-12 relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        <div className="text-center mb-32">
          <p className="text-[10px] uppercase tracking-[0.6em] font-bold text-luxury-accent mb-10">The Armada</p>
          <h2 className="text-7xl md:text-9xl leading-none italic gold-gradient-text">Prestige Fleet.</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-white/5">
          {vessels.map((vessel, i) => (
            <motion.div 
              key={vessel.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] group overflow-hidden bg-black"
            >
              <img 
                src={vessel.img} 
                alt={vessel.name} 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 p-16 flex flex-col justify-end">
                <p className="text-[10px] uppercase tracking-[0.4em] text-luxury-accent mb-4">{vessel.type}</p>
                <h3 className="text-5xl mb-6 font-light">{vessel.name}</h3>
                <p className="text-luxury-muted text-xs tracking-[0.2em] font-light">{vessel.specs}</p>
                <div className="w-0 group-hover:w-full h-px bg-luxury-accent mt-8 transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Presence = () => {
  const locations = [
    { city: "Jakarta", role: "Global HQ", coord: "6.2088° S, 106.8456° E" },
    { city: "Singapore", role: "Regional Hub", coord: "1.3521° N, 103.8198° E" },
    { city: "London", role: "Financial Center", coord: "51.5074° N, 0.1278° W" },
    { city: "Dubai", role: "Strategic Gateway", coord: "25.2048° N, 55.2708° E" },
    { city: "Rotterdam", role: "European Terminal", coord: "51.9225° N, 4.4792° E" }
  ];

  return (
    <section id="presence" className="py-40 px-12 bg-black relative overflow-hidden">
      <div className="absolute inset-0 atmosphere opacity-20" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.6em] font-bold text-luxury-accent mb-10">Global Network</p>
            <h2 className="text-7xl md:text-8xl leading-[0.9] mb-12">Strategic <br /><span className="italic gold-gradient-text">Presence.</span></h2>
            <p className="text-luxury-muted font-light text-xl leading-relaxed max-w-lg">
              Our reach is boundless. Operating from strategic hubs across the globe, we ensure that the Javara standard is maintained in every port we serve.
            </p>
          </div>
          
          <div className="space-y-12">
            {locations.map((loc, i) => (
              <motion.div 
                key={loc.city}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex justify-between items-end border-b border-white/5 pb-8 group cursor-pointer"
              >
                <div>
                  <h4 className="text-4xl font-light group-hover:gold-gradient-text transition-all duration-500">{loc.city}</h4>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-luxury-muted mt-2">{loc.role}</p>
                </div>
                <p className="text-[8px] font-mono text-luxury-accent/40 tracking-widest">{loc.coord}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Solutions = () => {
  const solutions = [
    {
      id: "I",
      title: "Vessel Chartering",
      desc: "Bespoke maritime assets for global trade routes.",
      img: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "II",
      title: "Logistics Strategy",
      desc: "Elite supply chain orchestration and optimization.",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "III",
      title: "Marine Agency",
      desc: "Prestigious port support in the heart of Jakarta.",
      img: "https://images.unsplash.com/photo-1524522173746-f628baad3644?q=80&w=2031&auto=format&fit=crop"
    }
  ];

  return (
    <section id="solutions" className="py-40 px-12 bg-black relative overflow-hidden">
      <div className="absolute inset-0 atmosphere opacity-30" />
      <div className="max-w-[1800px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.6em] font-bold text-luxury-accent mb-10">Our Expertise</p>
            <h2 className="text-7xl md:text-9xl leading-none">Elite <span className="italic gold-gradient-text">Solutions.</span></h2>
          </div>
          <p className="text-luxury-muted max-w-sm text-sm uppercase tracking-[0.3em] leading-loose font-light">
            Crafting seamless maritime experiences through precision engineering and global insight.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {solutions.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="glass-panel p-12 group hover:border-luxury-accent/40 transition-all duration-700"
            >
              <p className="font-serif text-5xl gold-gradient-text mb-16 italic opacity-40">{item.id}</p>
              <div className="aspect-[16/10] overflow-hidden mb-12 relative">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover brightness-50 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-luxury-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <h3 className="text-4xl mb-6 font-light">{item.title}</h3>
              <p className="text-luxury-muted font-light mb-12 leading-relaxed">{item.desc}</p>
              <a href="#" className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-accent group/link">
                View Details <ArrowRight className="group-hover/link:translate-x-2 transition-transform" size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Inquiry = () => {
  return (
    <section id="inquiry" className="py-40 px-12 relative overflow-hidden">
      <div className="absolute inset-0 atmosphere opacity-40" />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <p className="text-[11px] uppercase tracking-[1em] font-bold text-luxury-accent mb-12">Private Consultation</p>
        <h2 className="text-7xl md:text-[10rem] mb-24 leading-none">The <span className="italic gold-gradient-text">Inquiry.</span></h2>
        
        <form className="grid md:grid-cols-2 gap-x-24 gap-y-16 text-left" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4 group">
            <label className="text-[9px] uppercase tracking-[0.5em] text-luxury-accent font-bold opacity-40 group-focus-within:opacity-100 transition-opacity">Full Identity</label>
            <input type="text" className="w-full bg-transparent border-b border-white/10 py-6 focus:border-luxury-accent outline-none transition-all font-light text-2xl placeholder:text-white/5" placeholder="Your Name" />
          </div>
          <div className="space-y-4 group">
            <label className="text-[9px] uppercase tracking-[0.5em] text-luxury-accent font-bold opacity-40 group-focus-within:opacity-100 transition-opacity">Digital Address</label>
            <input type="email" className="w-full bg-transparent border-b border-white/10 py-6 focus:border-luxury-accent outline-none transition-all font-light text-2xl placeholder:text-white/5" placeholder="email@domain.com" />
          </div>
          <div className="md:col-span-2 space-y-4 group">
            <label className="text-[9px] uppercase tracking-[0.5em] text-luxury-accent font-bold opacity-40 group-focus-within:opacity-100 transition-opacity">Message</label>
            <textarea rows={1} className="w-full bg-transparent border-b border-white/10 py-6 focus:border-luxury-accent outline-none transition-all font-light text-2xl resize-none placeholder:text-white/5" placeholder="How may we serve your interests?"></textarea>
          </div>
          <div className="md:col-span-2 flex justify-center pt-16">
            <button className="luxury-button group">
              <span className="relative z-10">Submit Inquiry</span>
              <motion.div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 px-12 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-16 relative z-10">
        <div className="flex items-center gap-4">
          <Anchor className="text-luxury-accent w-6 h-6" />
          <span className="font-serif text-2xl tracking-[0.5em] uppercase font-light gold-gradient-text">JAVARA</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-16 text-[9px] uppercase tracking-[0.6em] font-bold text-luxury-muted">
          <a href="#" className="hover:text-luxury-accent transition-colors">Privacy</a>
          <a href="#" className="hover:text-luxury-accent transition-colors">Terms</a>
          <a href="#" className="hover:text-luxury-accent transition-colors">Jakarta</a>
          <a href="#" className="hover:text-luxury-accent transition-colors">London</a>
          <a href="#" className="hover:text-luxury-accent transition-colors">Singapore</a>
        </div>

        <div className="flex flex-col items-end gap-2">
          <p className="text-[9px] uppercase tracking-[0.6em] font-bold text-luxury-accent">
            PT JAVARA MARITIME GROUP
          </p>
          <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-white/10">
            &copy; 2026 ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-luxury-bg overflow-x-hidden">
      <div className="grain" />
      <CustomCursor />
      <div className="fixed inset-0 atmosphere pointer-events-none opacity-40" />
      <Navbar />
      <Hero />
      <div className="section-divider"></div>
      <Legacy />
      <div className="section-divider"></div>
      <Solutions />
      <div className="section-divider"></div>
      <Fleet />
      <div className="section-divider"></div>
      <Presence />
      <div className="section-divider"></div>
      <Inquiry />
      <Footer />
    </div>
  );
}


