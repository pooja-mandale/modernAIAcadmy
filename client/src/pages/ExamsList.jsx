import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BookOpen, Clock, Target, ArrowRight, Loader, CheckCircle2, Sparkles, Award } from 'lucide-react';
import toast from 'react-hot-toast';

const ExamsList = () => {
  const { user } = useSelector((state) => state.user);
  const [examsData, setExamsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [studentStd, setStudentStd] = useState(user?.std || '');
  const [examResults, setExamResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.std) {
      setStudentStd(user.std);
    }
  }, [user?.std]);

  useEffect(() => {
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    const fetchExamsAndProfile = async () => {
      try {
        const res = await fetch('/api/exams');
        if (res.ok) {
          const data = await res.json();
          setExamsData(data.data || data);
        } else {
          toast.error('Failed to fetch exams');
        }

        if (user.role !== 'admin') {
          const profileRes = await fetch('/api/users/profile', {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            if (profileData.std) {
              setStudentStd(profileData.std);
            }
            if (profileData.examResults) {
              setExamResults(profileData.examResults);
            }
          }
        }
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExamsAndProfile();
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader className="animate-spin text-indigo-500 w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 relative overflow-hidden font-sans">

      {/* Immersive Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[140px]"></div>
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-extrabold mb-6 tracking-widest uppercase text-indigo-400 shadow-sm backdrop-blur-md">
            <Sparkles size={14} className="animate-spin" style={{ animationDuration: '4s' }} />
            <span>Available Assessments</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-sky-300">Challenge</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">
            Select an AI-powered mock assessment below to test your academic readiness and view detailed performance analytics.
          </p>
        </div>

        {(() => {
          const activeStd = studentStd || user?.std;
          const filteredExams = examsData.filter(exam => {
            if (user?.role === 'admin') return true;
            if (!activeStd) return false;
            if (!exam.std) return false;

            const eStd = exam.std.toString().trim().toLowerCase();
            const uStd = activeStd.toString().trim().toLowerCase();

            const eNum = eStd.match(/\d+/);
            const uNum = uStd.match(/\d+/);
            if (eNum && uNum) {
              return eNum[0] === uNum[0];
            }

            return eStd === uStd || eStd.includes(uStd) || uStd.includes(eStd);
          });

          if (filteredExams.length === 0) {
            return (
              <div className="text-center p-12 bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-[2.5rem] shadow-2xl max-w-lg mx-auto">
                <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-4">
                  <BookOpen size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No exams available</h3>
                <p className="text-slate-400 text-sm">There are no exams published for your standard (<strong className="text-white">{activeStd || 'N/A'}</strong>) at the moment.</p>
              </div>
            );
          }

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExams.map((exam) => {
                const result = examResults.find(r => (r.examId?._id || r.examId)?.toString() === exam._id.toString());
                const isCleared = result?.passed;

                return (
                  <div
                    key={exam._id}
                    onClick={() => navigate(`/exams/${exam._id}`)}
                    className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800 p-8 rounded-[2.5rem] hover:bg-slate-900 hover:border-indigo-500/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-950/50 transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col justify-between"
                  >
                    {/* Glowing Accent Ring */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-full blur-[50px] pointer-events-none group-hover:scale-125 transition-transform opacity-60"></div>

                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-black text-white tracking-tight leading-snug flex-1 pr-3 group-hover:text-indigo-400 transition-colors">
                          {exam.title}
                        </h3>
                        <div className="flex flex-col gap-1.5 items-end shrink-0">
                          {exam.std && (
                            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                              {exam.std} Class
                            </span>
                          )}
                          {isCleared && (
                            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                              ✓ Cleared
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3.5 mb-8">
                        <div className="flex items-center gap-3 text-slate-300 text-xs font-semibold bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                          <Clock size={16} className="text-indigo-400 shrink-0" />
                          <span>Duration: <strong className="text-white">{exam.duration} mins</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300 text-xs font-semibold bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                          <Target size={16} className="text-cyan-400 shrink-0" />
                          <span>Total Marks: <strong className="text-white">{exam.totalMarks || (exam.questions ? exam.questions.length : 0)}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {isCleared ? (
                        <button className="w-full py-4 bg-emerald-500/10 text-emerald-400 font-bold rounded-2xl flex items-center justify-center gap-2 border border-emerald-500/30 shadow-sm transition-colors cursor-default">
                          Exam Cleared <CheckCircle2 size={18} className="text-emerald-400" />
                        </button>
                      ) : (
                        <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-indigo-600/30 cursor-pointer active:scale-95 text-sm">
                          Start Assessment <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default ExamsList;