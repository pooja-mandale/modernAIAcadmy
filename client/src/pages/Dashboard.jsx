import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Trophy, Calendar, Target, BookOpen, ArrowRight,
  TrendingUp, Clock, MessageSquareHeart,
  ChevronRight, Sparkles, Zap, Shield, Video, Flame, CheckCircle2, Activity, GraduationCap
} from 'lucide-react';

const ModernAIDashboard = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [zoomClasses, setZoomClasses] = useState([]);

  useEffect(() => {
    const fetchZoomClasses = async () => {
      try {
        const res = await fetch('/api/zoom-classes');
        if (res.ok) {
          const data = await res.json();
          setZoomClasses(data.data || data);
        }
      } catch (err) {
        console.error("Error fetching Zoom classes:", err);
      }
    };
    fetchZoomClasses();
  }, []);

  const filteredZoomClasses = zoomClasses.filter(cls => {
    if (!cls.std || cls.std === 'All') return true;
    if (!user?.std) return true;

    const cleanStd = (str) => str.replace(/std|standard/g, '').replace(/th|st|nd|rd/g, '').trim().toLowerCase();
    return cleanStd(cls.std) === cleanStd(user.std.toString());
  });

  const stats = [
    { label: 'Exams Completed', value: '12', icon: Trophy, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', glow: 'from-amber-500/20' },
    { label: 'Upcoming Exams', value: '03', icon: Calendar, color: 'text-cyan-500 dark:text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', glow: 'from-cyan-500/20' },
    { label: 'Avg. Accuracy', value: '94%', icon: Target, color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', glow: 'from-emerald-500/20' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/40 relative overflow-hidden transition-colors duration-500">

      {/* Immersive Background Glows & Ambient Backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-15 mix-blend-luminosity scale-110"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2000')" }}
        ></div>
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[150px] animate-pulse-glow"></div>
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-600/15 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute inset-0 bg-slate-50/80 dark:bg-slate-950/85 backdrop-blur-[3px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16 p-4 sm:p-6 lg:p-10">

        {/* Personalized Welcome Banner */}
        {user && (
          <div className="bg-gradient-to-r from-indigo-50/80 via-white/80 to-cyan-50/80 dark:from-indigo-900/40 dark:via-slate-900/60 dark:to-cyan-950/40 border border-indigo-200/80 dark:border-indigo-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl dark:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/30 animate-float">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span> Active Scholar
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Welcome back, {user.name}! 👋</h2>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs">
                <Activity size={16} className="text-cyan-500 dark:text-cyan-400" />
                <span>Standard: <strong className="text-indigo-600 dark:text-white">{user.std || 'All Academic Streams'}</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="grid lg:grid-cols-12 gap-8 items-center">

          <div className="lg:col-span-8 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl dark:shadow-2xl shadow-indigo-500/5 dark:shadow-indigo-950/50 group hover-lift">

            <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-indigo-500/15 to-cyan-500/15 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-6 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase shadow-xs">
                <Sparkles size={14} className="text-indigo-600 dark:text-indigo-400 animate-spin-slow" />
                <span>Student Portal • All Academic &amp; Competitive Streams</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                Master Any Field with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-sky-400 dark:from-indigo-400 dark:via-cyan-400 dark:to-sky-300">
                  Modern Global Eduvere
                </span>
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mb-8 font-medium leading-relaxed max-w-xl">
                Empowering students across School Foundation, High School, College, and Competitive Streams with adaptive mock tests, AI analytics, and live expert sessions.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/exams')}
                  className="bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white px-7 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-indigo-600/30 cursor-pointer"
                >
                  Take Practice Mock Test <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => navigate('/study-material')}
                  className="bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-7 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all duration-300 shadow-xs cursor-pointer"
                >
                  <BookOpen size={18} className="text-cyan-500 dark:text-cyan-400" /> Study Notes & Modules
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 dark:text-emerald-400" /> All Subject Syllabus Tests
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 dark:text-emerald-400" /> Instant AI Performance Report
                </div>
              </div>
            </div>
          </div>

          {/* Stats Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">

            {/* Visual Mini Banner */}
            <div className="relative rounded-[2rem] overflow-hidden border border-slate-200/80 dark:border-slate-800 h-28 flex items-center p-6 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md group hover-lift">
              <div className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-30 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-100/90 to-transparent dark:from-slate-950 dark:via-slate-950/80"></div>
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-xs">
                  <GraduationCap size={24} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm">All Education Streams</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Science, Commerce, Arts & Competitions</p>
                </div>
              </div>
            </div>

            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex-1 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-lg dark:shadow-xl p-5 rounded-[2.2rem] flex items-center gap-5 hover:-translate-y-1 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 relative overflow-hidden group hover-lift"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.glow} rounded-full blur-[40px] opacity-60 group-hover:opacity-100 transition-opacity`}></div>

                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} border ${stat.border} shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={24} />
                </div>
                <div className="relative z-10">
                  <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                  <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* Live Zoom Classes Section */}
        {user && filteredZoomClasses.length > 0 && (
          <section id="live-classes" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-500 dark:text-rose-400">
                  <Flame size={20} className="animate-bounce" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Today's Live Classes</h3>
              </div>
              <span className="text-indigo-600 dark:text-indigo-400 text-xs font-extrabold uppercase tracking-widest bg-indigo-50 dark:bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/30">
                Zoom Integration Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredZoomClasses.map((cls) => {
                const start = new Date(cls.startTime);
                const end = new Date(cls.endTime);
                const isLive = new Date() >= start && new Date() <= end;

                return (
                  <div
                    key={cls._id}
                    className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-700 hover-lift rounded-[2.2rem] p-7 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group"
                  >
                    <div className={`absolute top-0 right-0 w-36 h-36 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 opacity-30 ${isLive ? 'bg-rose-500' : 'bg-indigo-500'}`}></div>

                    <div className="flex justify-between items-center mb-5 relative z-10">
                      <span className={`px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${isLive
                          ? 'bg-rose-500/10 text-rose-500 dark:text-rose-400 border-rose-500/30 animate-pulse'
                          : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30'
                        }`}>
                        {isLive ? '🔴 LIVE NOW' : 'Upcoming Session'}
                      </span>
                      <span className="text-[10px] font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        {cls.std === 'All' ? 'General' : `${cls.std} Std`}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-6 relative z-10">
                      {cls.subject}
                    </h4>

                    <div className="space-y-4 relative z-10 mt-auto">
                      <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300 font-semibold bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800/80">
                        <Clock size={16} className="text-cyan-500 dark:text-cyan-400 shrink-0" />
                        <span>
                          {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <a
                        href={cls.zoomLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-all duration-300 active:scale-95 shadow-md text-sm cursor-pointer ${isLive
                            ? 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-rose-900/30'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/30'
                          }`}
                      >
                        <Video size={18} />
                        Join Zoom Meeting
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Quick Access Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <Zap size={22} className="text-cyan-500 dark:text-cyan-400" />
              Quick Access Hub
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Performance', desc: 'Analytics & scores', icon: TrendingUp, color: 'text-sky-500 dark:text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20', path: '/results' },
              { title: 'Study Material', desc: 'Notes & modules', icon: BookOpen, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', path: '/study-material' },
              { title: 'Help Desk', desc: 'Support & FAQs', icon: MessageSquareHeart, color: 'text-cyan-500 dark:text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', path: '/contact' },
              { title: 'Security', desc: 'Account settings', icon: Shield, color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', path: '/profile' }
            ].map((item, i) => (
              <div
                key={i}
                onClick={() => navigate(item.path)}
                className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl p-7 rounded-[2.2rem] border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 hover:bg-white dark:hover:bg-slate-900 shadow-lg dark:shadow-xl hover-lift transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col justify-between"
              >
                <div className={`absolute -right-6 -top-6 w-28 h-28 ${item.bg} rounded-full blur-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div>
                  <div className={`mb-6 p-4 rounded-2xl inline-flex ${item.bg} ${item.color} border ${item.border} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-xs`}>
                    <item.icon size={24} />
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{item.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">Access Now</span>
                  <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors ml-auto">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner to Dedicated Pages */}
        <section className="bg-gradient-to-r from-indigo-50 via-purple-50 to-cyan-50 dark:from-indigo-900/40 dark:via-purple-900/30 dark:to-cyan-950/40 border border-indigo-200/80 dark:border-indigo-500/20 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-xl dark:shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-left">
              <span className="text-xs font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/30 inline-block mb-4">
                Explore Modern Global Eduvere
              </span>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
                Empowering Students Across All Academic &amp; Competitive Streams
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">
                Discover our specialized faculty, AI diagnostic tools, or get in touch with our team for enrollment inquiries.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <button
                onClick={() => navigate('/about')}
                className="bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white px-6 py-3.5 rounded-2xl font-extrabold text-sm transition-all duration-300 shadow-lg shadow-indigo-600/30 cursor-pointer flex items-center gap-2 hover-lift"
              >
                About Academy <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 px-6 py-3.5 rounded-2xl font-extrabold text-sm transition-all duration-300 cursor-pointer flex items-center gap-2 hover-lift"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ModernAIDashboard;