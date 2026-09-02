import React from 'react';
import { Target, Users, Shield, Award, BookOpen, Zap, CheckCircle2, Sparkles, Globe, Cpu } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Active Students', value: '50K+', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
    { label: 'Exams Conducted', value: '1.2M+', icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { label: 'Success Rate', value: '94%', icon: Target, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
    { label: 'Verified Partners', value: '200+', icon: Shield, color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
  ];

  return (
    <section id="about" className="text-slate-100 pb-32 pt-28 relative overflow-hidden font-sans bg-slate-950">
      
      {/* Background Cosmic Glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-28">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-extrabold tracking-widest uppercase text-indigo-400 shadow-sm backdrop-blur-md">
            <Sparkles size={14} className="animate-spin" style={{ animationDuration: '4s' }} />
            <span>AI-Driven Education Portal • Class 11th & 12th All Streams</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Pioneering Academic Excellence with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-sky-300">
              Modern AI Academy
            </span>
          </h2>
          
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Modern AI Academy is an all-in-one learning platform engineered for 11th and 12th grade students across Science, Commerce, Arts, and Competitive Streams. We combine artificial intelligence analytics with expert faculty to accelerate student mastery.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800 p-8 rounded-[2.2rem] group hover:bg-slate-900 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-950/50 transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-full blur-[40px] opacity-60 group-hover:opacity-100 transition-opacity"></div>
              
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 border ${stat.border} group-hover:scale-110 transition-transform duration-300 shadow-xs relative z-10`}>
                <stat.icon size={26} />
              </div>
              <h3 className="text-3xl font-black text-white mb-1.5 tracking-tight relative z-10">{stat.value}</h3>
              <p className="text-slate-400 font-extrabold uppercase tracking-widest text-[11px] relative z-10">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-[2.5rem] blur-xl opacity-25 group-hover:opacity-40 transition duration-700"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-800 aspect-[4/3] shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200" 
                alt="Modern AI Education Students" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-slate-900/90 backdrop-blur-md p-3 pr-5 rounded-2xl border border-slate-800 shadow-lg">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md text-white">
                  <Cpu size={20} />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-white">Adaptive Diagnostic AI</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 mb-2 block">Comprehensive Education</span>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Our Mission & <br />Academic Vision
              </h3>
            </div>
            
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
              We empower Class 11th & 12th students with standard-aligned exam analytics, detailed accuracy metrics, and targeted practice across Science, Commerce, Arts, and Competitive fields.
            </p>
            
            <div className="space-y-4">
              {[
                'Comprehensive curriculum for 11th & 12th all streams',
                'AI powered weakness identification & diagnostic scorecards',
                'Real exam pattern practice tests & instant scoring',
                'Live interactive Zoom masterclasses with top educators'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3.5 group bg-slate-900/60 p-4 rounded-2xl border border-slate-800 hover:bg-slate-900 transition-all duration-300 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 text-emerald-400 shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-slate-300 font-semibold text-xs sm:text-sm tracking-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-slate-900/70 backdrop-blur-2xl p-8 sm:p-14 rounded-[2.5rem] relative shadow-2xl border border-slate-800 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { title: 'Secure Environment', desc: 'Advanced proctoring mechanisms ensuring integrity.', icon: Shield, color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
              { title: 'Instant Results', desc: 'Get detailed performance analysis immediately.', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
              { title: 'Scholarships', desc: 'Connecting talent with merit-based opportunities.', icon: Award, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
              { title: 'Accessibility', desc: 'Optimized for all devices and connection speeds.', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
            ].map((feature, idx) => (
              <div key={idx} className="group cursor-pointer space-y-4">
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} border ${feature.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xs ${feature.color}`}>
                  <feature.icon size={26} />
                </div>
                <h4 className="text-lg font-extrabold text-white tracking-tight">{feature.title}</h4>
                <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;