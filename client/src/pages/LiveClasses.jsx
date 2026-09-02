import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Clock, Video, Calendar, Sparkles, Flame, Radio } from 'lucide-react';

const LiveClasses = () => {
  const { user } = useSelector((state) => state.user);
  const [zoomClasses, setZoomClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/40 relative overflow-hidden">

      {/* Immersive Background Glows & Ambient Backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[140px]"></div>
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 p-6 md:p-12 space-y-12">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold tracking-widest uppercase shadow-sm">
              <Sparkles size={14} className="animate-spin" style={{ animationDuration: '4s' }} />
              <span>Interactive Learning Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Today's Live Classes
            </h1>
            <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
              Attend live lectures, clear doubts instantly, and interact with teachers in real-time. Click any active link below to join.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-3 bg-slate-900/80 border border-slate-800 px-5 py-3 rounded-2xl shadow-lg">
            <Radio size={20} className="text-rose-500 animate-pulse" />
            <div className="text-left">
              <div className="text-xs font-bold text-white">Zoom Streaming</div>
              <div className="text-[10px] text-slate-400">Secure AES Connection</div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            </div>
            <p className="text-slate-400 font-extrabold uppercase tracking-widest text-xs">Synchronizing live sessions...</p>
          </div>
        ) : filteredZoomClasses.length === 0 ? (
          <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800 shadow-2xl p-16 rounded-[2.5rem] text-center max-w-xl mx-auto animate-in fade-in duration-500">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-6 border border-slate-700 text-slate-400">
              <Video size={28} />
            </div>
            <h3 className="text-xl font-black text-white">No live sessions available right now</h3>
            <p className="text-slate-400 text-xs mt-2 font-medium max-w-xs mx-auto leading-relaxed">
              There are no active classes scheduled for your standard today. Please check back later or consult your academic portal.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
            {filteredZoomClasses.map((cls) => {
              const start = new Date(cls.startTime);
              const end = new Date(cls.endTime);
              const isLive = new Date() >= start && new Date() <= end;

              return (
                <div
                  key={cls._id}
                  className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/40 hover:-translate-y-1.5 rounded-[2.2rem] p-7 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group"
                >
                  <div className={`absolute top-0 right-0 w-36 h-36 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 opacity-30 ${isLive ? 'bg-rose-500' : 'bg-indigo-500'}`}></div>

                  <div>
                    <div className="flex justify-between items-center mb-6 relative z-10">
                      <span className={`px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${isLive
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse flex items-center gap-1.5'
                        : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                        }`}>
                        {isLive && <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>}
                        {isLive ? '🔴 LIVE NOW' : 'Upcoming Session'}
                      </span>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-800 px-3.5 py-1 rounded-full border border-slate-700">
                        {cls.std === 'All' ? 'General' : `${cls.std} Std`}
                      </span>
                    </div>

                    <h4 className="font-black text-xl text-white leading-snug group-hover:text-indigo-400 transition-colors mb-6 relative z-10">
                      {cls.subject}
                    </h4>
                  </div>

                  <div className="space-y-4 relative z-10 mt-auto">
                    <div className="flex flex-col gap-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                      <div className="flex items-center gap-2.5 text-xs text-slate-300 font-semibold">
                        <Calendar size={14} className="text-cyan-400" />
                        <span>{start.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-300 font-semibold">
                        <Clock size={14} className="text-indigo-400 shrink-0" />
                        <span>
                          {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <a
                      href={cls.zoomLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-all duration-300 active:scale-95 shadow-md text-sm cursor-pointer ${isLive
                        ? 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-rose-950/40'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-950/40'
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
        )}
      </div>
    </div>
  );
};

export default LiveClasses;