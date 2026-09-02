import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Award, Calendar, ChevronLeft, FileSpreadsheet, Percent, TrendingUp, CheckCircle2, XCircle, Clock, BookOpen, Loader2 } from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [examResults, setExamResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const glassPanel = "bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl rounded-3xl p-6 sm:p-8";

  useEffect(() => {
    const fetchProfileResults = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setExamResults(data.examResults || []);
        }
      } catch (err) {
        console.error("Error fetching exam results:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileResults();
  }, [user]);

  // Compute Stats
  const totalExams = examResults.length;
  const avgScore = totalExams > 0
    ? Math.round(examResults.reduce((acc, r) => acc + (r.percentage || 0), 0) / totalExams)
    : 0;
  const passedExams = examResults.filter(r => r.passed).length;
  const passRate = totalExams > 0 ? Math.round((passedExams / totalExams) * 100) : 0;

  // Group exam results by Date
  const groupedResults = examResults.reduce((acc, result) => {
    const dateObj = new Date(result.date || Date.now());
    const dateKey = dateObj.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(result);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-16 relative overflow-hidden transition-colors duration-500">
      {/* Decorative Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 dark:bg-cyan-600/15 blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '3s' }}></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10">
        
        {/* Back Button & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')} 
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Daily Student Progress</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Track your day-by-day exam performance history</p>
            </div>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Exams Completed', value: totalExams.toString(), icon: Award, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-500/10', border: 'border-indigo-100 dark:border-indigo-500/20' },
            { label: 'Average Score', value: `${avgScore}%`, icon: Percent, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-500/10', border: 'border-rose-100 dark:border-rose-500/20' },
            { label: 'Pass Rate', value: `${passRate}%`, icon: TrendingUp, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-100 dark:border-emerald-500/20' }
          ].map((stat, i) => (
            <div key={i} className={`${glassPanel} flex items-center gap-6 hover:shadow-2xl transition-all duration-300`}>
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} border ${stat.border} flex items-center justify-center shadow-sm shrink-0`}>
                <stat.icon size={26} />
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest block mb-1">{stat.label}</span>
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Progress Timeline */}
        <div className={glassPanel}>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <FileSpreadsheet size={22} className="text-indigo-500" /> Daily Activity History
          </h3>

          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-slate-400">
              <Loader2 className="animate-spin text-indigo-500 w-8 h-8 mr-3" /> Loading student progress...
            </div>
          ) : Object.keys(groupedResults).length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
              <BookOpen size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
              <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">No exam attempts recorded yet</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Complete practice exams to start generating your daily progress timeline.</p>
              <button 
                onClick={() => navigate('/exams')}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all"
              >
                Browse Available Exams
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {Object.entries(groupedResults).map(([dateLabel, results], gIdx) => (
                <div key={gIdx} className="space-y-4">
                  {/* Date Header Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                    <Calendar size={14} />
                    <span>{dateLabel}</span>
                    <span className="ml-2 px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[10px]">{results.length} exam{results.length > 1 ? 's' : ''}</span>
                  </div>

                  {/* Results Cards for this Date */}
                  <div className="grid grid-cols-1 gap-4 pl-2 sm:pl-4 border-l-2 border-indigo-100 dark:border-indigo-950">
                    {results.map((res, rIdx) => {
                      const resDate = new Date(res.date || Date.now());
                      const timeStr = resDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                      return (
                        <div key={rIdx} className="bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-slate-900 dark:text-white text-base">{res.examTitle || 'Practice Exam'}</span>
                              </div>
                              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                <span className="flex items-center gap-1"><Clock size={13} /> {timeStr}</span>
                                <span>Score: <strong className="text-slate-800 dark:text-slate-200">{res.score} / {res.totalMarks}</strong></span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{res.percentage}%</span>
                              </div>
                              <div>
                                {res.passed ? (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold">
                                    <CheckCircle2 size={14} /> Passed
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 rounded-full text-xs font-bold">
                                    <XCircle size={14} /> Failed
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Results;
