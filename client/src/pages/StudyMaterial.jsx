import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BookOpen, ChevronLeft, Download, Eye, FileText, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const StudyMaterial = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // States for dynamic syllabus
  const [syllabusList, setSyllabusList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStd, setSelectedStd] = useState('All');

  // Glass panel styling matching Dashboard
  const glassPanel = "bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-100/80 dark:border-slate-800 shadow-xl rounded-[2rem]";

  const standards = ['All', '9th Science', '10th Science', '10th Maths', '11th Science', '11th Physics', '12th Science', '12th Physics', 'Competitive'];

  useEffect(() => {
    // Set default standard filter to user's class if logged in
    if (user?.std) {
      setSelectedStd('All');
    }
    fetchSyllabus();
  }, [user]);

  const fetchSyllabus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/syllabus');
      if (res.ok) {
        const data = await res.json();
        setSyllabusList(data);
      } else {
        toast.error("Failed to load study materials.");
      }
    } catch (error) {
      toast.error("Error loading resources from database.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (item) => {
    const downloadToastId = toast.loading("Preparing download...");
    try {
      const response = await fetch(item.pdfUrl);
      if (!response.ok) throw new Error("Network response error");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', item.pdfName || `${item.subject}_Syllabus.pdf`);
      
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success("Download started successfully!", { id: downloadToastId });
    } catch (err) {
      toast.error("Failed to download file.", { id: downloadToastId });
      console.error(err);
    }
  };

  const filteredMaterials = syllabusList.filter((item) => {
    if (selectedStd === 'All') return true;
    return item.std.toLowerCase() === selectedStd.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-16 relative overflow-hidden transition-colors duration-500">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-200/30 to-purple-200/20 blur-3xl -z-10 animate-pulse" style={{ animationDuration: '9s' }}></div>
      <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-rose-200/25 to-amber-200/20 blur-3xl -z-10 animate-pulse" style={{ animationDuration: '11s' }}></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10">
        
        {/* Back Button & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => navigate('/')} 
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft size={22} />
            </button>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider mb-1.5">
                <Sparkles size={12} className="text-indigo-500 animate-pulse" />
                <span>Scholar Syllabus</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Syllabus & Learning Materials</h1>
              <p className="text-slate-500 dark:text-slate-400 font-semibold mt-0.5 text-sm">Access structured guidelines, course syllabuses, and educational resources</p>
            </div>
          </div>
        </div>

        {/* Classes Horizontal Navigation Pills */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Filter by Class Standard:</span>
          </div>
          
          <div className="flex flex-wrap gap-2.5">
            {standards.map((stdName) => {
              const isActive = selectedStd.toLowerCase() === stdName.toLowerCase();
              return (
                <button
                  key={stdName}
                  onClick={() => setSelectedStd(stdName)}
                  className={`px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wide border transition-all cursor-pointer active:scale-95 shadow-sm hover:shadow-md ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 border-indigo-600 text-white shadow-indigo-600/15 scale-102 font-black'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {stdName === 'All' ? 'All Standards' : `${stdName} Standard`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Resources Main Panel */}
        <div className={`p-8 md:p-10 ${glassPanel}`}>
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3">
              <Loader2 className="animate-spin text-indigo-600" size={36} />
              <p className="text-slate-400 font-bold tracking-widest text-[10px] uppercase animate-pulse">Syncing Syllabus...</p>
            </div>
          ) : filteredMaterials.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white/40 dark:bg-slate-900/40 max-w-lg mx-auto p-6">
              <BookOpen size={48} className="text-slate-400 mx-auto mb-4 animate-pulse" />
              <p className="font-extrabold text-slate-800 dark:text-white text-base">No Syllabus Available</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1.5 leading-relaxed">
                There are no syllabus PDF files published for {selectedStd === 'All' ? 'any class' : `the ${selectedStd} Standard`}. Please check back later or contact the admin panel.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((item) => (
                <div key={item._id} className="bg-white dark:bg-slate-800/80 border border-slate-100/90 dark:border-slate-700/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-200/50 dark:hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                  {/* Subtle background ambient highlight */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-50/50 dark:from-indigo-950/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50/70 dark:bg-indigo-950/60 border border-indigo-100/60 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
                        {item.std} Standard
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <FileText size={18} />
                      </div>
                    </div>

                    <h4 className="font-extrabold text-slate-900 dark:text-white text-lg leading-tight mb-2 truncate" title={item.subject}>
                      {item.subject}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold truncate mb-6" title={item.pdfName}>
                      {item.pdfName}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100/80 dark:border-slate-700/80">
                    <button
                      onClick={() => navigate(`/view-pdf/${item._id}`)}
                      className="flex-1 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
                    >
                      <Eye size={14} />
                      View Syllabus
                    </button>
                    <button
                      onClick={() => handleDownload(item)}
                      className="px-3.5 py-2.5 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-600 hover:text-white rounded-xl text-indigo-600 dark:text-indigo-400 hover:dark:text-white transition-all duration-200 cursor-pointer active:scale-98"
                      title="Download PDF"
                    >
                      <Download size={14} />
                    </button>
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

export default StudyMaterial;
