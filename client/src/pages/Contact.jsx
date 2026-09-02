import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [mapLoaded, setMapLoaded] = useState(false);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-24 relative overflow-hidden transition-colors duration-500">
      
      {/* Background Decor Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[130px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-600/15 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[40%] left-[10%] w-[500px] h-[500px] bg-sky-500/10 dark:bg-sky-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10 space-y-16">
        
        {/* Hero Header */}
        <section className="text-center pt-8 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest shadow-xs">
            <MessageSquare size={14} className="animate-pulse" />
            <span>24/7 Scholar Support &amp; Helpdesk</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-sky-400 dark:from-indigo-400 dark:via-cyan-400 dark:to-sky-300">Connect &amp; Learn</span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
            Have questions about our academic exams, Zoom masterclasses, or need support? Our dedicated team is here to assist you.
          </p>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Info Side Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Reach Us Card */}
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 rounded-[2.5rem] shadow-xl dark:shadow-2xl hover-lift transition-all duration-300">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/80 dark:border-slate-800">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <Sparkles size={14} /> Direct Contact Channels
                </h3>
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Active
                </span>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email Support', value: 'vijayjadhavadv@gmail.com', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
                  { icon: Phone, label: 'Adv. Vijay Jadhav', value: '+91 98503 04481', color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
                  { icon: Phone, label: 'Office Contact', value: '+91 84849 94465', color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
                  { icon: MapPin, label: 'Visit Our Head Office', value: '401, Rangoli Building, 1st Floor, Arch Angan, Mitmita Road, Padegaon, Chhatrapati Sambhajinagar - 431002', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 hover:border-indigo-500/40 transition-colors group">
                    <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center border ${item.border} shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-xs`}>
                      <item.icon size={22} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-0.5">{item.label}</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white tracking-tight break-words group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Hours Card */}
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 p-8 rounded-[2.2rem] shadow-xl dark:shadow-2xl hover-lift transition-all duration-300">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 mb-6 flex items-center gap-2">
                <Clock size={16} /> Operational Working Hours
              </h3>
              
              <div className="space-y-3.5">
                <div className="flex justify-between items-center text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-700 dark:text-slate-300 font-bold">Monday – Friday</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-black px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-lg">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-700 dark:text-slate-300 font-bold">Saturday</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-black px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-lg">10:00 AM – 2:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-700 dark:text-slate-300 font-bold">Sunday</span>
                  <span className="text-rose-600 dark:text-rose-400 font-black px-3 py-1 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-lg uppercase tracking-widest text-[10px]">Closed</span>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 rounded-[2.5rem] shadow-xl dark:shadow-2xl relative overflow-hidden flex flex-col justify-between hover-lift">
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-[70px] pointer-events-none"></div>
            
            <div>
              <div className="mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold uppercase tracking-widest mb-2">
                  <Send size={12} /> Send Inquiry
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Drop Us a Message</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-semibold mt-1">Fill in the details below and our faculty will respond promptly.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Full Name *</label>
                    <input 
                      type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Aarav Patil"
                      className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950/80 border-2 border-slate-200 dark:border-slate-800/80 rounded-2xl focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-600/10 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm font-semibold shadow-xs"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Email Address *</label>
                    <input 
                      type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="student@example.com"
                      className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950/80 border-2 border-slate-200 dark:border-slate-800/80 rounded-2xl focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-600/10 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm font-semibold shadow-xs"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Subject *</label>
                  <input 
                    type="text" name="subject" required value={formData.subject} onChange={handleChange} placeholder="e.g. Inquiry about NEET / CET Test Series"
                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950/80 border-2 border-slate-200 dark:border-slate-800/80 rounded-2xl focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-600/10 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm font-semibold shadow-xs"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Message *</label>
                  <textarea 
                    name="message" required rows="4" value={formData.message} onChange={handleChange} placeholder="Describe your question or requirement in detail..."
                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950/80 border-2 border-slate-200 dark:border-slate-800/80 rounded-2xl focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-600/10 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm font-semibold shadow-xs resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
                  >
                    SEND MESSAGE
                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Map Section */}
        <section 
          ref={mapContainerRef}
          className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 p-4 rounded-[2.5rem] overflow-hidden h-[450px] relative group shadow-xl dark:shadow-2xl"
        >
          {shouldLoadMap ? (
            <>
              {!mapLoaded && (
                <div className="absolute inset-4 rounded-[2.2rem] bg-slate-100/80 dark:bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 animate-pulse z-20">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-indigo-600 dark:border-t-indigo-400 animate-spin"></div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Loading Google Maps...</span>
                </div>
              )}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8038583411054!2d72.8633633!3d19.0289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf20e290f9d9%3A0xc317511c5218d6e!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1715420000000!5m2!1sen!2sin" 
                className={`w-full h-full rounded-[2.2rem] transition-opacity duration-1000 border-0 ${
                  mapLoaded ? 'opacity-85 dark:opacity-75 group-hover:opacity-100' : 'opacity-0'
                }`}
                allowFullScreen="" 
                onLoad={() => setMapLoaded(true)}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </>
          ) : (
            <div className="w-full h-full rounded-[2.2rem] bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center gap-3">
              <MapPin size={32} className="text-indigo-600 dark:text-indigo-400 animate-bounce" />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Scroll down to view map location...</span>
            </div>
          )}
          
          <div className="absolute top-8 left-8 p-5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-lg pointer-events-none z-30">
            <h4 className="text-base font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-500" /> Head Office
            </h4>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">Chhatrapati Sambhajinagar, MH</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Contact;
