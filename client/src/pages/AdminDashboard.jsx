import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin, resetAdmin } from '../redux/adminSlice';
import {
  Users, BookOpen, MessageSquare, LayoutDashboard, LogOut,
  Plus, Trash2, CheckCircle2, Clock, ChevronRight,
  TrendingUp, ShieldCheck, Search, Filter, Loader2, ArrowLeft, Target, Pencil,
  Menu, X, Database, Sparkles, FileText, Video, BarChart2, Calendar, Percent
} from 'lucide-react';
import toast from 'react-hot-toast';
import SyllabusManager from '../components/SyllabusManager';
import ThemeToggle from '../components/ThemeToggle';


const AdminDashboard = () => {
  const { admin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data States
  const [users, setUsers] = useState([]);
  const [exams, setExams] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [selectedStudentForProgress, setSelectedStudentForProgress] = useState(null);

  // Exam Form State
  const [showExamForm, setShowExamForm] = useState(false);
  const [newExam, setNewExam] = useState({ title: '', description: '', duration: 60, totalMarks: 100, questions: [], std: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editExamId, setEditExamId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStdFilter, setSelectedStdFilter] = useState('All');

  // Zoom Classes States
  const [zoomClasses, setZoomClasses] = useState([]);
  const [showZoomForm, setShowZoomForm] = useState(false);
  const [newZoomClass, setNewZoomClass] = useState({
    subject: '',
    zoomLink: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '14:00',
    endTime: '15:00',
    std: 'All'
  });
  const [isSubmittingZoom, setIsSubmittingZoom] = useState(false);

  const resetForm = () => {
    setNewExam({ title: '', description: '', duration: 60, totalMarks: 100, questions: [], std: '' });
    setIsEditing(false);
    setEditExamId(null);
    setShowExamForm(false);
  };

  const resetZoomForm = () => {
    setNewZoomClass({
      subject: '',
      zoomLink: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '14:00',
      endTime: '15:00',
      std: 'All'
    });
    setShowZoomForm(false);
  };

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStd = selectedStdFilter === 'All' || (exam.std && exam.std.toLowerCase() === selectedStdFilter.toLowerCase());
    return matchesSearch && matchesStd;
  });

  // Styles (Light & Dark Theme adapted)
  const glassPanel = "bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xl dark:shadow-2xl transition-all duration-300";
  const btnPrimary = "bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-extrabold transition-all duration-300 px-6 py-3 rounded-2xl flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-indigo-600/30 cursor-pointer";
  const inputStyle = "w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-bold focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition-all outline-none shadow-sm";
  const labelStyle = "text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 ml-1 block mb-2";

  useEffect(() => { 
    if (!admin) {
      navigate('/admin-login');
      return;
    }
    fetchInitialData(); 
  }, [admin, navigate]);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      // Fetch exams
      const examsRes = await fetch('/api/exams');
      if (examsRes.ok) {
        const examsData = await examsRes.json();
        setExams(examsData.data || examsData);
      }

      // Fetch users
      const usersRes = await fetch('/api/users');
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.data || usersData);
      }

      // Fetch inquiries
      const inquiriesRes = await fetch('/api/contact');
      if (inquiriesRes.ok) {
        const inquiriesData = await inquiriesRes.json();
        setInquiries(inquiriesData.data || inquiriesData);
      }

      // Fetch zoom classes
      const zoomRes = await fetch('/api/zoom-classes');
      if (zoomRes.ok) {
        const zoomData = await zoomRes.json();
        setZoomClasses(zoomData.data || zoomData);
      }
    } catch (error) { 
      toast.error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => { dispatch(logoutAdmin()); dispatch(resetAdmin()); navigate('/admin-login'); };

  // --- Exam Form Logic ---
  const handleAddQuestion = () => {
    setNewExam({
      ...newExam,
      questions: [...newExam.questions, { questionText: '', questionImage: '', options: ['', '', '', ''], correctAnswer: '', explanation: '', explanationImage: '' }]
    });
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...newExam.questions];
    updatedQuestions.splice(index, 1);
    setNewExam({ ...newExam, questions: updatedQuestions });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...newExam.questions];
    updatedQuestions[index][field] = value;
    setNewExam({ ...newExam, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...newExam.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setNewExam({ ...newExam, questions: updatedQuestions });
  };

  // --- Test Form Logic ---
  const handleAddTestQuestion = () => {
    setNewTest({
      ...newTest,
      questions: [...newTest.questions, { questionText: '', questionImage: '', options: ['', '', '', ''], correctAnswer: '', explanation: '', explanationImage: '' }]
    });
  };

  const handleRemoveTestQuestion = (index) => {
    const updatedQuestions = [...newTest.questions];
    updatedQuestions.splice(index, 1);
    setNewTest({ ...newTest, questions: updatedQuestions });
  };

  const handleTestQuestionChange = (index, field, value) => {
    const updatedQuestions = [...newTest.questions];
    updatedQuestions[index][field] = value;
    setNewTest({ ...newTest, questions: updatedQuestions });
  };

  const handleTestOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...newTest.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setNewTest({ ...newTest, questions: updatedQuestions });
  };

  const handleImageUpload = async (qIndex, field, file, isTest = false) => {
    if (!file) return;
    
    const toastId = toast.loading("Uploading image...");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (isTest) {
          handleTestQuestionChange(qIndex, field, data.url);
        } else {
          handleQuestionChange(qIndex, field, data.url);
        }
        toast.success("Image uploaded successfully!", { id: toastId });
      } else {
        toast.error("Failed to upload image.", { id: toastId });
      }
    } catch (error) {
      toast.error("Error uploading image.", { id: toastId });
    }
  };

  const handleSubmitExam = async (e) => {
    e.preventDefault();
    if (newExam.questions.length === 0) {
      return toast.error("Please add at least one question.");
    }
    
    // Basic validation
    for (let i = 0; i < newExam.questions.length; i++) {
      const q = newExam.questions[i];
      if (!q.questionText || q.options.some(opt => !opt) || !q.correctAnswer) {
        return toast.error(`Please completely fill out Question ${i + 1}`);
      }
      if (!q.options.includes(q.correctAnswer)) {
        return toast.error(`Correct answer for Question ${i + 1} must match one of the options exactly.`);
      }
    }

    setIsSubmitting(true);
    try {
      const url = isEditing ? `/api/exams/${editExamId}` : '/api/exams';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newExam, createdBy: admin._id })
      });
      if (res.ok) {
        toast.success(`Exam ${isEditing ? 'updated' : 'created'} successfully!`);
        resetForm();
        fetchInitialData();
      } else {
        toast.error(`Failed to ${isEditing ? 'update' : 'create'} exam`);
      }
    } catch (error) {
      toast.error(`Error ${isEditing ? 'updating' : 'creating'} exam`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditExam = (exam) => {
    setNewExam({
      title: exam.title || '',
      description: exam.description || '',
      duration: exam.duration || 60,
      totalMarks: exam.totalMarks || 100,
      questions: exam.questions || [],
      std: exam.std || ''
    });
    setIsEditing(true);
    setEditExamId(exam._id);
    setShowExamForm(true);
  };

  const executeDeleteExam = async (id) => {
    const toastId = toast.loading("Deleting exam...");
    try {
      const res = await fetch(`/api/exams/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success("Exam deleted successfully", { id: toastId });
        fetchInitialData();
      } else {
        toast.error("Failed to delete exam", { id: toastId });
      }
    } catch (error) {
      toast.error("Error deleting exam", { id: toastId });
    }
  };

  const handleDeleteExam = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <p className="text-slate-800 text-sm font-bold">
          Are you sure you want to delete this exam?
        </p>
        <div className="flex gap-2 justify-end">
          <button 
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              toast.dismiss(t.id);
              executeDeleteExam(id);
            }}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
      position: 'top-center',
    });
  };

  // --- Zoom Class Handlers ---
  const handleSubmitZoom = async (e) => {
    e.preventDefault();
    if (!newZoomClass.subject || !newZoomClass.zoomLink || !newZoomClass.date || !newZoomClass.startTime || !newZoomClass.endTime) {
      return toast.error("Please fill out all fields.");
    }
    
    const start = new Date(`${newZoomClass.date}T${newZoomClass.startTime}:00`);
    const end = new Date(`${newZoomClass.date}T${newZoomClass.endTime}:00`);
    
    if (end <= start) {
      return toast.error("End time must be after start time.");
    }

    if (end <= new Date()) {
      return toast.error("Class end time must be in the future.");
    }

    setIsSubmittingZoom(true);
    try {
      const res = await fetch('/api/zoom-classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: newZoomClass.subject,
          zoomLink: newZoomClass.zoomLink,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          std: newZoomClass.std,
          createdBy: admin._id
        })
      });
      if (res.ok) {
        toast.success("Live class scheduled successfully!");
        resetZoomForm();
        fetchInitialData();
      } else {
        const errData = await res.json();
        toast.error(errData.message || "Failed to schedule live class");
      }
    } catch (error) {
      toast.error("Error scheduling live class");
    } finally {
      setIsSubmittingZoom(false);
    }
  };

  const executeDeleteZoom = async (id) => {
    const toastId = toast.loading("Deleting live class link...");
    try {
      const res = await fetch(`/api/zoom-classes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success("Zoom class deleted successfully", { id: toastId });
        fetchInitialData();
      } else {
        toast.error("Failed to delete class link", { id: toastId });
      }
    } catch (error) {
      toast.error("Error deleting class link", { id: toastId });
    }
  };

  const handleDeleteZoom = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <p className="text-slate-800 text-sm font-bold">
          Are you sure you want to delete this class link?
        </p>
        <div className="flex gap-2 justify-end">
          <button 
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              toast.dismiss(t.id);
              executeDeleteZoom(id);
            }}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
      position: 'top-center',
    });
  };


  const handleToggleApproval = async (id, currentStatus) => {
    const toastId = toast.loading(currentStatus ? "Revoking approval access..." : "Approving scholar registration...");
    try {
      const res = await fetch(`/api/users/${id}/approve`, { method: 'PUT' });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message || `Scholar ${data.isApproved ? 'approved' : 'unapproved'} successfully!`, { id: toastId });
        fetchInitialData();
      } else {
        toast.error("Failed to update approval status", { id: toastId });
      }
    } catch (error) {
      toast.error("Error updating user approval", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col lg:flex-row font-sans selection:bg-indigo-500/30 transition-colors duration-500">
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-sm w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center">
            <img src="/logo.png" alt="Modern Global Eduvere Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white text-base">AdminSuite</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden animate-in fade-in"></div>
      )}

      {/* Sidebar */}
      <aside className={`w-72 bg-slate-950 border-r border-slate-850 flex flex-col fixed lg:sticky top-0 bottom-0 left-0 h-screen p-6 shadow-2xl z-50 transition-transform duration-300 lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-8 mt-2">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-slate-800 p-0.5 border border-indigo-400/20 shadow-lg overflow-hidden flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="Modern Global Eduvere Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-white leading-none">Modern Global Eduvere</span>
              <span className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase mt-1">Admin Suite</span>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:bg-slate-800 rounded-xl transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5 flex-grow mt-4">
          {[
            { id: 'overview', name: 'Dashboard', icon: LayoutDashboard, desc: 'System statistics & actions' },
            { id: 'exams', name: 'Exam Bank', icon: BookOpen, desc: 'Manage timed syllabus exams' },
            { id: 'users', name: 'Scholars', icon: Users, desc: 'Registered student database' },
            { id: 'zoomClasses', name: 'Live Classes', icon: Video, desc: 'Manage Zoom session links' },
            { id: 'syllabus', name: 'Study Material', icon: FileText, desc: 'Manage class study material PDFs' },
            { id: 'inquiries', name: 'Messages', icon: MessageSquare, desc: 'Support inquiries' },
          ].map((item) => {

            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); resetForm(); resetZoomForm(); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-left transition-all duration-305 relative group ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-650/20' 
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
                }`}
              >
                <item.icon size={18} className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <div className="flex flex-col">
                  <span className="text-sm font-extrabold tracking-wide leading-snug">{item.name}</span>
                  <span className={`text-[9px] font-medium leading-none mt-0.5 ${isActive ? 'text-indigo-200' : 'text-slate-500'}`}>{item.desc}</span>
                </div>
                {isActive && (
                  <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Profile & Logout */}
        <div className="border-t border-slate-900 pt-5 mt-auto space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-md shadow-purple-500/10 uppercase">
              {admin?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-white truncate">{admin?.name || 'Administrator'}</span>
              <span className="text-[10px] text-slate-400 font-semibold truncate">{admin?.email}</span>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-2 py-3 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-2xl text-sm font-bold transition-all duration-300 active:scale-95 shadow-sm hover:shadow-lg hover:shadow-rose-500/20"
          >
            <LogOut size={16} /> Logout System
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 lg:p-12 overflow-y-auto h-screen relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-indigo-500" size={48} /></div>
        ) : (
          <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
            
            {/* Page Header */}
            {!showExamForm && (
              <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2.5 text-xs text-indigo-650 font-bold uppercase tracking-wider mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-ping"></span>
                    Admin Panel / {activeTab}
                  </div>
                  <h1 className="text-4xl font-black tracking-tight capitalize text-slate-900 dark:text-white flex items-center gap-3">
                    {activeTab === 'overview' && 'System Overview'}
                    {activeTab === 'exams' && 'Exam Bank Manager'}
                    {activeTab === 'users' && 'Scholar Directory'}
                    {activeTab === 'zoomClasses' && 'Live Zoom Classes'}
                    {activeTab === 'syllabus' && 'Study Material Repository'}
                    {activeTab === 'inquiries' && 'Support Desk'}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 mt-1.5 text-sm font-medium">
                    {activeTab === 'overview' && 'Real-time metrics, system settings, and administrative summaries.'}
                    {activeTab === 'exams' && 'Configure syllabus exams, upload worksheets, and review question pools.'}
                    {activeTab === 'users' && 'View educational profiles, contacts, and registration parameters.'}
                    {activeTab === 'zoomClasses' && 'Schedule and manage daily Zoom meeting links for students.'}
                    {activeTab === 'syllabus' && 'Upload and distribute class subject study materials and educational PDFs.'}
                    {activeTab === 'inquiries' && 'Review and respond to messages submitted by visitors.'}

                  </p>
                </div>
                
                {/* Header Actions */}
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-full text-emerald-700 dark:text-emerald-400 text-xs font-extrabold shadow-sm">
                    <Database size={12} className="animate-pulse" />
                    <span>Live Database</span>
                  </div>
                  
                  {activeTab === 'exams' && (
                    <button onClick={() => setShowExamForm(true)} className={`${btnPrimary} shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/35 hover:-translate-y-0.5`}>
                      <Plus size={18} /> Create New Exam
                    </button>
                  )}

                  {activeTab === 'zoomClasses' && !showZoomForm && (
                    <button onClick={() => setShowZoomForm(true)} className={`${btnPrimary} shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/35 hover:-translate-y-0.5`}>
                      <Plus size={18} /> Schedule Live Class
                    </button>
                  )}
                </div>
              </header>
            )}

            {/* Content: Overview */}
            {activeTab === 'overview' && !showExamForm && (
              <div className="space-y-8">
                {/* Welcome Card Banner */}
                <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 md:p-10 shadow-2xl text-white">
                  <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
                  <div className="absolute left-1/3 bottom-0 translate-y-16 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3 max-w-xl">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-indigo-300 text-xs font-black tracking-widest uppercase">
                        <Sparkles size={12} className="animate-spin-slow" />
                        Admin Workspace
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-350">{admin?.name || 'Administrator'}</span>!
                      </h2>
                      <p className="text-slate-300 text-sm leading-relaxed font-medium">
                        You have total control over the scholar database, exam creation portals, and helpdesk operations. Review system performance and pending alerts below.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 shrink-0 bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-sm">
                      <div className="text-center">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Server State</p>
                        <p className="text-emerald-400 font-black text-lg mt-1 flex items-center justify-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                          Online
                        </p>
                      </div>
                      <div className="text-center border-l border-white/10 pl-4">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sync Rate</p>
                        <p className="text-white font-black text-lg mt-1">100% OK</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Registered Scholars', value: users.length || '0', color: 'text-indigo-600 dark:text-indigo-400', icon: Users, bg: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-100 dark:border-indigo-800', trend: 'Fully active in portal' },
                    { label: 'Published Exams', value: exams.length, color: 'text-emerald-600 dark:text-emerald-400', icon: BookOpen, bg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-100 dark:border-emerald-800', trend: 'Active test sessions' },
                    { label: 'Support Inquiries', value: inquiries.length || '0', color: 'text-amber-600 dark:text-amber-400', icon: MessageSquare, bg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-100 dark:border-amber-800', trend: 'Pending actions' },
                  ].map((stat, i) => (
                    <div key={i} className={`${glassPanel} p-6 relative overflow-hidden transition-all duration-305 hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-350 group cursor-default`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">{stat.label}</p>
                          <h3 className={`text-4xl font-black mt-2 tracking-tight ${stat.color}`}>{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-2xl ${stat.bg} text-slate-800 transition-transform duration-300 group-hover:scale-110`}>
                          <stat.icon size={18} className={stat.color} />
                        </div>
                      </div>
                      <div className="mt-4 border-t border-slate-100 pt-3 flex items-center gap-1.5 text-xs text-slate-505 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                        {stat.trend}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Secondary Overview Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Academic Activity Highlights */}
                  <div className={`${glassPanel} p-8 space-y-6`}>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <Sparkles className="text-indigo-600 dark:text-indigo-400" size={18} />
                        Academy Activity Highlights
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">Key educational resource metrics & active links</p>
                    </div>
                    
                    <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                      <div className="py-3 flex justify-between items-center font-medium">
                        <span className="text-slate-600 dark:text-slate-400 font-bold flex items-center gap-2">
                          <Video size={14} className="text-indigo-500" />
                          Live Zoom Sessions
                        </span>
                        <span className="text-slate-900 dark:text-slate-100 font-extrabold text-xs bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
                          {zoomClasses.length} Scheduled
                        </span>
                      </div>
                      <div className="py-3 flex justify-between items-center font-medium">
                        <span className="text-slate-600 dark:text-slate-400 font-bold flex items-center gap-2">
                          <FileText size={14} className="text-emerald-500" />
                          Study Material PDFs
                        </span>
                        <span className="text-slate-900 dark:text-slate-100 font-extrabold text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                          Active Repository
                        </span>
                      </div>
                      <div className="py-3 flex justify-between items-center font-medium">
                        <span className="text-slate-600 dark:text-slate-400 font-bold flex items-center gap-2">
                          <BookOpen size={14} className="text-purple-500" />
                          Exam Bank Modules
                        </span>
                        <span className="text-slate-900 dark:text-slate-100 font-extrabold text-xs bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800">
                          {exams.length} Published
                        </span>
                      </div>
                      <div className="py-3 flex justify-between items-center font-medium">
                        <span className="text-slate-600 dark:text-slate-400 font-bold flex items-center gap-2">
                          <TrendingUp size={14} className="text-amber-500" />
                          Portal Status
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 text-xs">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          Operational & Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* System Quick Links */}
                  <div className={`${glassPanel} p-8 space-y-6`}>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <ShieldCheck className="text-indigo-600 dark:text-indigo-400" size={18} />
                        Administrative Shortcuts
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">Common workflows and management actions</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => { setActiveTab('zoomClasses'); setShowZoomForm(true); }}
                        className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl hover:border-indigo-500 dark:hover:border-indigo-400 text-left transition-all group cursor-pointer"
                      >
                        <Video size={18} className="text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover:scale-110" />
                        <span className="block font-extrabold text-slate-800 dark:text-slate-100 text-xs mt-3 leading-snug">Schedule Zoom Class</span>
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Set date & meeting link</span>
                      </button>

                      <button 
                        onClick={() => { setActiveTab('users'); }}
                        className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl hover:border-indigo-500 dark:hover:border-indigo-400 text-left transition-all group cursor-pointer"
                      >
                        <Users size={18} className="text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover:scale-110" />
                        <span className="block font-extrabold text-slate-800 dark:text-slate-100 text-xs mt-3 leading-snug">Audit Scholars</span>
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Browse student contact logs</span>
                      </button>

                      <button 
                        onClick={() => { setActiveTab('inquiries'); }}
                        className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl hover:border-indigo-500 dark:hover:border-indigo-400 text-left transition-all group cursor-pointer"
                      >
                        <MessageSquare size={18} className="text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover:scale-110" />
                        <span className="block font-extrabold text-slate-800 dark:text-slate-100 text-xs mt-3 leading-snug">Review Inquiries</span>
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Read incoming support mails</span>
                      </button>

                      <button 
                        onClick={() => { setActiveTab('exams'); }}
                        className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl hover:border-indigo-500 dark:hover:border-indigo-400 text-left transition-all group cursor-pointer"
                      >
                        <Target size={18} className="text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover:scale-110" />
                        <span className="block font-extrabold text-slate-800 dark:text-slate-100 text-xs mt-3 leading-snug">Exam List</span>
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Edit or remove draft tests</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Content: Exams List */}
            {activeTab === 'exams' && !showExamForm && (
              <div className="space-y-6">
                {/* Search & Filter Header */}
                <div className={`${glassPanel} p-6 flex flex-col md:flex-row gap-4 items-center justify-between`}>
                  <div className="text-left w-full md:w-auto">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">Exam Modules</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-0.5">Currently active exam banks on the student portal</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        placeholder="Search exam title..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full shadow-sm font-medium" 
                      />
                    </div>
                    <div className="relative w-full sm:w-auto">
                      <select 
                        value={selectedStdFilter}
                        onChange={e => setSelectedStdFilter(e.target.value)}
                        className="pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 dark:text-slate-200 font-bold shadow-sm w-full appearance-none cursor-pointer"
                      >
                        <option value="All">All Standards & Streams</option>
                        <optgroup label="School Foundation (5th - 8th)">
                          <option value="5th">5th Standard</option>
                          <option value="6th">6th Standard</option>
                          <option value="7th">7th Standard</option>
                          <option value="8th">8th Standard</option>
                        </optgroup>
                        <optgroup label="Board Classes (9th & 10th Subjects)">
                          <option value="9th Standard">9th Standard (General)</option>
                          <option value="9th Science">9th Science</option>
                          <option value="9th Mathematics">9th Mathematics</option>
                          <option value="10th Standard">10th Standard (General)</option>
                          <option value="10th Science">10th Science</option>
                          <option value="10th Mathematics">10th Mathematics</option>
                          <option value="10th English">10th English</option>
                        </optgroup>
                        <optgroup label="High School (11th & 12th Streams)">
                          <option value="11th Science">11th Science Stream</option>
                          <option value="11th Physics">11th Physics</option>
                          <option value="11th Chemistry">11th Chemistry</option>
                          <option value="11th Biology">11th Biology</option>
                          <option value="11th Commerce">11th Commerce</option>
                          <option value="11th Arts">11th Arts</option>
                          <option value="12th Science">12th Science Stream</option>
                          <option value="12th Physics">12th Physics</option>
                          <option value="12th Chemistry">12th Chemistry</option>
                          <option value="12th Biology">12th Biology</option>
                          <option value="12th Commerce">12th Commerce</option>
                          <option value="12th Arts">12th Arts</option>
                        </optgroup>
                        <optgroup label="Competitive & Degree">
                          <option value="NEET / JEE Prep">Competitive (NEET / JEE)</option>
                          <option value="Degree / College">Degree College / Undergraduate</option>
                        </optgroup>
                      </select>
                      <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                    </div>
                  </div>
                </div>
                
                {filteredExams.length === 0 ? (
                  <div className={`${glassPanel} p-16 text-center`}>
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 border border-slate-200">
                      <BookOpen size={28} className="text-slate-400" />
                    </div>
                    <p className="text-slate-800 font-black text-lg">No Exam Modules Found</p>
                    <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto font-medium">We couldn't find any exams matching your filter settings. Create a new exam module to populate the list.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredExams.map(exam => (
                      <div key={exam._id} className={`${glassPanel} p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group`}>
                        <div>
                          {/* Card Header */}
                          <div className="flex justify-between items-start gap-4 mb-4">
                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shrink-0">
                              {exam.std || 'General'} Standard
                            </span>
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleEditExam(exam)} className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" title="Edit Exam">
                                <Pencil size={16} />
                              </button>
                              <button onClick={() => handleDeleteExam(exam._id)} className="text-slate-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all" title="Delete Exam">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Card Info */}
                          <h4 
                            onClick={() => navigate(`/exams/${exam._id}`)}
                            className="font-extrabold text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight mb-2 cursor-pointer hover:underline"
                          >
                            {exam.title}
                          </h4>
                          {exam.description && (
                            <p className="text-slate-600 dark:text-slate-400 text-xs font-semibold line-clamp-2 leading-relaxed mb-4">
                              {exam.description}
                            </p>
                          )}
                        </div>

                        {/* Card Stats Footer */}
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center">
                          <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-700/60">
                            <span className="block text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">Duration</span>
                            <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1 mt-0.5">
                              <Clock size={12} className="text-indigo-500" />
                              {exam.duration} mins
                            </span>
                          </div>
                          
                          <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-700/60">
                            <span className="block text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">Marks</span>
                            <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1 mt-0.5">
                              <Target size={12} className="text-emerald-500" />
                              {exam.totalMarks} Marks
                            </span>
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-700/60">
                            <span className="block text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">MCQs</span>
                            <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1 mt-0.5">
                              <CheckCircle2 size={12} className="text-purple-500" />
                              {exam.questions?.length || 0} Questions
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}



            {/* Content: Scholars List */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                {/* Search Header */}
                <div className={`${glassPanel} p-6 flex flex-col md:flex-row gap-4 items-center justify-between`}>
                  <div className="text-left w-full md:w-auto">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">Scholar Directory</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-0.5">Audit system credentials, school listings, and progress</p>
                  </div>
                  
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search name or email..." 
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full shadow-sm font-medium" 
                    />
                  </div>
                </div>

                {users.length === 0 ? (
                  <div className={`${glassPanel} p-16 text-center`}>
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-slate-700">
                      <Users size={28} className="text-slate-400" />
                    </div>
                    <p className="text-slate-800 dark:text-white font-black text-lg">No registered scholars found.</p>
                  </div>
                ) : (
                  <div className={`${glassPanel} overflow-hidden shadow-sm`}>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-950 dark:bg-slate-900 text-[10px] font-black uppercase tracking-wider text-slate-200 border-b border-slate-800">
                            <th className="px-6 py-4">Scholar Details</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Contact</th>
                            <th className="px-6 py-4">Academic Info</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Teacher Details</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
                          {users
                            .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((u, index) => {
                              const initialsGradients = [
                                'from-indigo-500 to-purple-500',
                                'from-emerald-500 to-teal-500',
                                'from-cyan-500 to-blue-500',
                                'from-amber-500 to-orange-500',
                                'from-rose-500 to-red-500'
                              ];
                              const gradient = initialsGradients[index % initialsGradients.length];
                              const resultCount = u.examResults ? u.examResults.length : 0;

                              return (
                                <tr key={u._id} className="hover:bg-indigo-50/40 dark:hover:bg-indigo-950/40 transition-colors">
                                  <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                      {u.profilePic ? (
                                        <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner shrink-0">
                                          <img src={u.profilePic} alt="Profile" className="w-full h-full object-cover" />
                                        </div>
                                      ) : (
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${gradient} flex items-center justify-center text-white font-extrabold text-sm shadow-md shrink-0`}>
                                          {u.name.charAt(0).toUpperCase()}
                                        </div>
                                      )}
                                      <div className="min-w-0">
                                        <span className="font-extrabold text-slate-800 dark:text-slate-100 block text-sm leading-tight tracking-wide truncate">{u.name}</span>
                                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5 block truncate">{u.email}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-5 shrink-0">
                                    {u.isApproved === false ? (
                                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 animate-pulse flex items-center gap-1.5 w-max">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                                        Pending
                                      </span>
                                    ) : (
                                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 w-max">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        Approved
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-6 py-5 shrink-0">
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block tracking-wider">{u.mobile}</span>
                                    {u.age && <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block mt-0.5">Age: {u.age} Years</span>}
                                  </td>
                                  <td className="px-6 py-5">
                                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 inline-block">
                                      Class {u.std || 'N/A'}
                                    </span>
                                    <span className="text-xs text-slate-600 dark:text-slate-400 font-bold block mt-1.5 truncate max-w-[180px]" title={u.schoolName}>{u.schoolName || 'N/A'}</span>
                                  </td>
                                  <td className="px-6 py-5 text-xs font-semibold text-slate-600 dark:text-slate-400 leading-relaxed max-w-[200px] truncate">
                                    {u.village && <span>{u.village}, </span>}
                                    {u.taluka && <span>{u.taluka}, </span>}
                                    {u.district && <span className="text-slate-800 dark:text-slate-200 font-bold">{u.district}</span>}
                                    {!u.village && !u.taluka && !u.district && <span className="text-slate-400 dark:text-slate-500">N/A</span>}
                                  </td>
                                  <td className="px-6 py-5 text-xs">
                                    <span className="font-extrabold text-slate-800 dark:text-slate-200 block leading-tight">{u.teacherName || 'N/A'}</span>
                                    {u.teacherContact && <span className="text-slate-500 dark:text-slate-400 font-semibold mt-0.5 block tracking-wider">{u.teacherContact}</span>}
                                  </td>
                                  <td className="px-6 py-5 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      {u.isApproved === false ? (
                                        <button
                                          onClick={() => handleToggleApproval(u._id, u.isApproved)}
                                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
                                        >
                                          <CheckCircle2 size={14} /> Approve Scholar
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => handleToggleApproval(u._id, u.isApproved)}
                                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                                          title="Revoke Approval Access"
                                        >
                                          Revoke
                                        </button>
                                      )}
                                      <button
                                        onClick={() => setSelectedStudentForProgress(u)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-extrabold transition-all shadow-sm active:scale-95 cursor-pointer"
                                      >
                                        <BarChart2 size={14} /> Progress ({resultCount})
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Content: Zoom Live Classes */}
            {activeTab === 'zoomClasses' && !showZoomForm && (
              <div className="space-y-6">
                <div className={`${glassPanel} p-6 flex flex-col md:flex-row gap-4 items-center justify-between`}>
                  <div className="text-left w-full md:w-auto">
                    <h3 className="font-extrabold text-slate-900 text-lg">Scheduled Live Classes</h3>
                    <p className="text-slate-400 text-xs font-semibold mt-0.5">Currently active or upcoming Zoom meetings for students</p>
                  </div>
                  <button onClick={() => setShowZoomForm(true)} className={btnPrimary}>
                    <Plus size={18} /> Schedule Live Class
                  </button>
                </div>

                {zoomClasses.length === 0 ? (
                  <div className={`${glassPanel} p-16 text-center`}>
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 border border-slate-200">
                      <Video size={28} className="text-slate-400" />
                    </div>
                    <p className="text-slate-800 font-black text-lg">No Live Classes Scheduled</p>
                    <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto font-medium">Add a zoom class link to display active classes on the student panels.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {zoomClasses.map((cls) => {
                      const start = new Date(cls.startTime);
                      const end = new Date(cls.endTime);
                      const isLive = new Date() >= start && new Date() <= end;
                      
                      return (
                        <div key={cls._id} className={`${glassPanel} p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:border-slate-350 transition-all duration-300 group`}>
                          <div>
                            <div className="flex justify-between items-start gap-4 mb-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                isLive 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-150 animate-pulse' 
                                  : 'bg-indigo-50 text-indigo-700 border-indigo-150'
                              }`}>
                                {cls.std === 'All' ? 'All Classes' : `${cls.std} Standard`}
                              </span>
                              
                              <button onClick={() => handleDeleteZoom(cls._id)} className="text-slate-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 transition-all" title="Remove Link">
                                <Trash2 size={16} />
                              </button>
                            </div>

                            <h4 className="font-extrabold text-xl text-slate-900 leading-tight mb-2">
                              {cls.subject}
                            </h4>
                            
                            <p className="text-slate-550 text-xs font-semibold break-all bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-3 font-mono">
                              {cls.zoomLink}
                            </p>
                          </div>

                          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between gap-3 text-xs font-semibold text-slate-500">
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} className="text-indigo-500 shrink-0" />
                              <span>
                                {start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}: {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            
                            <a href={cls.zoomLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-850 hover:underline flex items-center gap-1">
                              Join Meeting <ChevronRight size={14} />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Content: Schedule Live Class Form */}
            {activeTab === 'zoomClasses' && showZoomForm && (
              <div className="animate-in slide-in-from-right-8 duration-500 pb-20">
                <button 
                  onClick={resetZoomForm} 
                  className="mb-6 inline-flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-extrabold transition-all bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 px-5 py-2.5 rounded-2xl text-sm shadow-sm active:scale-95"
                >
                  <ArrowLeft size={16} /> Return to Scheduled List
                </button>

                <div className={`${glassPanel} p-8 md:p-10`}>
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">Schedule Live Class</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1">Configure Zoom link, subject details, timing, and targeted standard.</p>
                  </div>

                  <form onSubmit={handleSubmitZoom} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className={labelStyle}>Subject Name</label>
                        <input 
                          type="text" 
                          required 
                          value={newZoomClass.subject} 
                          onChange={e => setNewZoomClass({ ...newZoomClass, subject: e.target.value })} 
                          placeholder="e.g. Mathematics, Science" 
                          className={inputStyle}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className={labelStyle}>Target Standard/Class</label>
                        <select 
                          value={newZoomClass.std} 
                          onChange={e => setNewZoomClass({ ...newZoomClass, std: e.target.value })} 
                          className={`${inputStyle} cursor-pointer`}
                        >
                          <option value="All" className="dark:bg-slate-900">All Standards</option>
                          <option value="5th" className="dark:bg-slate-900">5th Standard</option>
                          <option value="6th" className="dark:bg-slate-900">6th Standard</option>
                          <option value="7th" className="dark:bg-slate-900">7th Standard</option>
                          <option value="8th" className="dark:bg-slate-900">8th Standard</option>
                          <option value="9th" className="dark:bg-slate-900">9th Standard</option>
                          <option value="10th" className="dark:bg-slate-900">10th Standard</option>
                          <option value="11th" className="dark:bg-slate-900">11th Standard</option>
                          <option value="12th" className="dark:bg-slate-900">12th Standard</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className={labelStyle}>Class Date</label>
                        <input 
                          type="date" 
                          required 
                          value={newZoomClass.date} 
                          onChange={e => setNewZoomClass({ ...newZoomClass, date: e.target.value })} 
                          className={inputStyle}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className={labelStyle}>Start Time</label>
                        <input 
                          type="time" 
                          required 
                          value={newZoomClass.startTime} 
                          onChange={e => setNewZoomClass({ ...newZoomClass, startTime: e.target.value })} 
                          className={inputStyle}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className={labelStyle}>End Time</label>
                        <input 
                          type="time" 
                          required 
                          value={newZoomClass.endTime} 
                          onChange={e => setNewZoomClass({ ...newZoomClass, endTime: e.target.value })} 
                          className={inputStyle}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className={labelStyle}>Zoom Meeting Link</label>
                      <input 
                        type="url" 
                        required 
                        value={newZoomClass.zoomLink} 
                        onChange={e => setNewZoomClass({ ...newZoomClass, zoomLink: e.target.value })} 
                        placeholder="https://zoom.us/j/..." 
                        className={inputStyle}
                      />
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button 
                        type="submit" 
                        disabled={isSubmittingZoom} 
                        className={btnPrimary}
                      >
                        {isSubmittingZoom ? <><Loader2 className="animate-spin" size={18} /> Scheduling...</> : <><CheckCircle2 size={18} /> Schedule Class</>}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}





            {/* Content: Syllabus Management */}
            {activeTab === 'syllabus' && (
              <SyllabusManager 
                admin={admin} 
                glassPanel={glassPanel} 
                btnPrimary={btnPrimary} 
              />
            )}

            {/* Content: Messages List */}
            {activeTab === 'inquiries' && (

              <div className="space-y-6">
                <div className={`${glassPanel} p-6`}>
                  <h3 className="font-extrabold text-slate-900 text-lg">Support Desk Inbox</h3>
                  <p className="text-slate-400 text-xs font-semibold mt-0.5">Read, mark as read, or organize incoming inquiry records</p>
                </div>

                {inquiries.length === 0 ? (
                  <div className={`${glassPanel} p-16 text-center`}>
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 border border-slate-200">
                      <MessageSquare size={28} className="text-slate-400" />
                    </div>
                    <p className="text-slate-850 font-black text-lg">Inbox is Empty</p>
                    <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto font-medium">No customer or scholar support tickets are registered on this site.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {inquiries.map((inq) => (
                      <div key={inq._id} className={`${glassPanel} p-6 relative overflow-hidden transition-all duration-300 flex flex-col justify-between gap-6 border-l-4 ${inq.isRead ? 'border-l-slate-350 bg-slate-50/30' : 'border-l-indigo-600'}`}>
                        <div className="space-y-3.5">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-105 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-705">
                                {inq.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <span className="font-extrabold text-slate-905 block text-sm leading-none">{inq.name}</span>
                                <span className="text-[10px] text-slate-400 font-semibold block mt-1">{inq.email}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <span className="text-slate-455 text-[11px] font-bold">
                                {new Date(inq.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                              
                              {inq.isRead ? (
                                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-100 text-slate-455 border border-slate-200">
                                  Closed / Read
                                </span>
                              ) : (
                                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100 animate-pulse">
                                  Active Inquiry
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="border-t border-slate-100 pt-3">
                            <h4 className="font-black text-slate-800 text-sm mb-1.5 flex items-center gap-1">
                              <span className="text-slate-455 font-normal">Subject:</span>
                              {inq.subject}
                            </h4>
                            <p className="text-slate-600 text-sm leading-relaxed font-semibold bg-slate-50 p-4 rounded-2xl border border-slate-100 whitespace-pre-line">
                              {inq.message}
                            </p>
                          </div>
                        </div>

                        {!inq.isRead && (
                          <div className="flex justify-end pt-2 border-t border-slate-100">
                            <button
                              onClick={async () => {
                                try {
                                  const res = await fetch(`/api/contact/${inq._id}/read`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' }
                                  });
                                  if (res.ok) {
                                    toast.success("Message marked as read!");
                                    fetchInitialData();
                                  } else {
                                    toast.error("Failed to update message");
                                  }
                                } catch (err) {
                                  toast.error("Error marking message as read");
                                }
                              }}
                              className="px-4 py-2 bg-indigo-50 border border-indigo-150 hover:bg-indigo-600 hover:text-white rounded-xl text-indigo-600 text-xs font-black transition-all active:scale-95 flex items-center gap-1.5"
                            >
                              <CheckCircle2 size={14} /> Mark as Resolved
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Content: Exam Creation Form */}
            {activeTab === 'exams' && showExamForm && (
              <div className="animate-in slide-in-from-right-8 duration-500 pb-20">
                <button 
                  onClick={resetForm} 
                  className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-extrabold mb-8 transition-all bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 px-5 py-2.5 rounded-2xl text-sm shadow-sm hover:shadow-md active:scale-95"
                >
                  <ArrowLeft size={16} /> Back to Exam Bank
                </button>

                <form onSubmit={handleSubmitExam} className="space-y-8">
                  {/* Basic Details */}
                  <div className={`${glassPanel} p-8`}>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center shrink-0 shadow-sm">
                        <BookOpen size={20} />
                      </div>
                      Exam Configuration
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <label className={labelStyle}>Exam Title</label>
                        <input type="text" required value={newExam.title} onChange={e => setNewExam({...newExam, title: e.target.value})} placeholder="e.g. Midterm Mathematics" className={inputStyle} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className={labelStyle}>Description / Instructions</label>
                        <textarea rows="3" value={newExam.description} onChange={e => setNewExam({...newExam, description: e.target.value})} placeholder="Write instructions for the students..." className={`${inputStyle} resize-none`}></textarea>
                      </div>
                      <div className="space-y-2">
                        <label className={labelStyle}>Duration (Minutes)</label>
                        <input type="number" required min="1" value={newExam.duration} onChange={e => setNewExam({...newExam, duration: Number(e.target.value)})} className={inputStyle} />
                      </div>
                      <div className="space-y-2">
                        <label className={labelStyle}>Total Marks</label>
                        <input type="number" required min="1" value={newExam.totalMarks} onChange={e => setNewExam({...newExam, totalMarks: Number(e.target.value)})} className={inputStyle} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className={labelStyle}>Target Standard / Class</label>
                        <select required value={newExam.std || ''} onChange={e => setNewExam({...newExam, std: e.target.value})} className={`${inputStyle} cursor-pointer`}>
                          <option value="" disabled className="dark:bg-slate-900">Select Target Standard & Subject...</option>
                          <optgroup label="School Foundation (5th - 8th)">
                            <option value="5th Standard" className="dark:bg-slate-900">5th Standard</option>
                            <option value="6th Standard" className="dark:bg-slate-900">6th Standard</option>
                            <option value="7th Standard" className="dark:bg-slate-900">7th Standard</option>
                            <option value="8th Standard" className="dark:bg-slate-900">8th Standard</option>
                          </optgroup>
                          <optgroup label="Board Classes (9th & 10th Subjects)">
                            <option value="9th Standard" className="dark:bg-slate-900">9th Standard (General)</option>
                            <option value="9th Science" className="dark:bg-slate-900">9th Science</option>
                            <option value="9th Mathematics" className="dark:bg-slate-900">9th Mathematics</option>
                            <option value="10th Standard" className="dark:bg-slate-900">10th Standard (General)</option>
                            <option value="10th Science" className="dark:bg-slate-900">10th Science</option>
                            <option value="10th Mathematics" className="dark:bg-slate-900">10th Mathematics</option>
                            <option value="10th English" className="dark:bg-slate-900">10th English</option>
                          </optgroup>
                          <optgroup label="High School (11th & 12th Streams & Subjects)">
                            <option value="11th Science" className="dark:bg-slate-900">11th Science Stream</option>
                            <option value="11th Physics" className="dark:bg-slate-900">11th Science (Physics)</option>
                            <option value="11th Chemistry" className="dark:bg-slate-900">11th Science (Chemistry)</option>
                            <option value="11th Biology" className="dark:bg-slate-900">11th Science (Biology)</option>
                            <option value="11th Commerce" className="dark:bg-slate-900">11th Commerce</option>
                            <option value="11th Arts" className="dark:bg-slate-900">11th Arts</option>
                            <option value="12th Science" className="dark:bg-slate-900">12th Science Stream</option>
                            <option value="12th Physics" className="dark:bg-slate-900">12th Science (Physics)</option>
                            <option value="12th Chemistry" className="dark:bg-slate-900">12th Science (Chemistry)</option>
                            <option value="12th Biology" className="dark:bg-slate-900">12th Science (Biology)</option>
                            <option value="12th Commerce" className="dark:bg-slate-900">12th Commerce</option>
                            <option value="12th Arts" className="dark:bg-slate-900">12th Arts</option>
                          </optgroup>
                          <optgroup label="Competitive Streams">
                            <option value="NEET / JEE Prep" className="dark:bg-slate-900">Competitive (NEET / JEE / CET)</option>
                            <option value="Degree / College" className="dark:bg-slate-900">Degree College / Undergraduate</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Questions Builder */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <CheckCircle2 className="text-emerald-500" /> Questions ({newExam.questions.length})
                      </h3>
                      <button type="button" onClick={handleAddQuestion} className={btnPrimary}>
                        <Plus size={16} /> Add MCQ Question
                      </button>
                    </div>

                    {newExam.questions.length === 0 ? (
                      <div className="text-center p-16 bg-slate-50/50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 border-dashed rounded-[2rem]">
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">Click "Add MCQ Question" to build your exam worksheet questions.</p>
                      </div>
                    ) : (
                      newExam.questions.map((q, qIndex) => (
                        <div key={qIndex} className={`${glassPanel} p-8 relative group border-l-4 border-l-indigo-600 dark:border-l-indigo-500 hover:shadow-2xl transition-all duration-300`}>
                          <button type="button" onClick={() => handleRemoveQuestion(qIndex)} className="absolute top-6 right-6 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-all shadow-sm" title="Delete Question">
                            <Trash2 size={16} />
                          </button>
                          
                          <div className="mb-6 space-y-4 max-w-[90%]">
                            <div className="flex items-center gap-2">
                              <span className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/40 flex items-center justify-center font-black text-indigo-600 dark:text-indigo-400 text-xs">
                                {qIndex + 1}
                              </span>
                              <label className={labelStyle}>Question Title</label>
                            </div>
                            <textarea required rows="2" value={q.questionText} onChange={e => handleQuestionChange(qIndex, 'questionText', e.target.value)} placeholder="Type the question query..." className={`${inputStyle} resize-none`} ></textarea>
                            
                            <div className="space-y-1.5">
                              <label className={labelStyle}>Question Illustration (Optional)</label>
                              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                                <input type="file" accept="image/*" onChange={e => handleImageUpload(qIndex, 'questionImage', e.target.files[0])} className="w-full text-slate-500 dark:text-slate-400 text-xs font-semibold file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-indigo-50 dark:file:bg-indigo-500/20 file:text-indigo-600 dark:file:text-indigo-400 hover:file:bg-indigo-100 transition-all cursor-pointer" />
                                {q.questionImage && (
                                  <div className="h-12 w-12 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <img src={q.questionImage} alt="Uploaded" className="h-full w-full object-cover" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {q.options.map((opt, oIndex) => (
                              <div key={oIndex} className="space-y-1.5">
                                <label className={labelStyle}>Option {String.fromCharCode(65 + oIndex)}</label>
                                <input type="text" required value={opt} onChange={e => handleOptionChange(qIndex, oIndex, e.target.value)} placeholder={`Option ${String.fromCharCode(65 + oIndex)}`} className={inputStyle} />
                              </div>
                            ))}
                          </div>

                          <div className="space-y-4 mb-6">
                            <label className={labelStyle}>Solution Explanation (Optional)</label>
                            <textarea rows="2" value={q.explanation || ''} onChange={e => handleQuestionChange(qIndex, 'explanation', e.target.value)} placeholder="Provide context or explanation for why the chosen option is correct..." className={`${inputStyle} resize-none`}></textarea>
                            
                            <div className="space-y-1.5">
                              <label className={labelStyle}>Explanation Illustration (Optional)</label>
                              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                                <input type="file" accept="image/*" onChange={e => handleImageUpload(qIndex, 'explanationImage', e.target.files[0])} className="w-full text-slate-500 dark:text-slate-400 text-xs font-semibold file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-indigo-50 dark:file:bg-indigo-500/20 file:text-indigo-600 dark:file:text-indigo-400 hover:file:bg-indigo-100 transition-all cursor-pointer" />
                                {q.explanationImage && (
                                  <div className="h-12 w-12 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <img src={q.explanationImage} alt="Uploaded" className="h-full w-full object-cover" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2.5 p-5 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl">
                            <label className="text-xs font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-300 ml-1 block">Correct Choice</label>
                            <select required value={q.correctAnswer} onChange={e => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 rounded-2xl text-emerald-900 dark:text-emerald-300 font-extrabold text-sm outline-none cursor-pointer">
                              <option value="" disabled className="dark:bg-slate-900">Select correct answer Option...</option>
                              {q.options.map((opt, oIndex) => opt && (
                                <option key={oIndex} value={opt} className="dark:bg-slate-900">Option {String.fromCharCode(65 + oIndex)}: {opt}</option>
                              ))}
                            </select>
                            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold px-1">Must match one of the option inputs above.</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                    <button type="submit" disabled={isSubmitting} className={`${btnPrimary} px-10 py-4 text-base shadow-xl`}>
                      {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> {isEditing ? 'Updating' : 'Publishing'} Exam...</> : <><CheckCircle2 size={18} /> {isEditing ? 'Update Module' : 'Publish Module'}</>}
                    </button>
                  </div>
                </form>
              </div>
            )}


        {/* Student Daily Progress Modal for Admin */}
        {selectedStudentForProgress && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-in fade-in">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative">
              {/* Modal Header */}
              <div className="bg-slate-950 p-6 sm:p-8 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-4">
                  {selectedStudentForProgress.profilePic ? (
                    <img src={selectedStudentForProgress.profilePic} alt="Profile" className="w-12 h-12 rounded-2xl object-cover border border-slate-700" />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-lg text-white">
                      {selectedStudentForProgress.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight">{selectedStudentForProgress.name}</h3>
                    <p className="text-xs text-indigo-300 font-semibold mt-0.5">
                      Class {selectedStudentForProgress.std || 'N/A'} • {selectedStudentForProgress.schoolName || 'N/A'} • {selectedStudentForProgress.email}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedStudentForProgress(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-grow bg-slate-50 dark:bg-slate-950">
                {/* Performance Summary Cards */}
                {(() => {
                  const results = selectedStudentForProgress.examResults || [];
                  const total = results.length;
                  const avg = total > 0 ? Math.round(results.reduce((acc, r) => acc + (r.percentage || 0), 0) / total) : 0;
                  const passedCount = results.filter(r => r.passed).length;
                  const passRate = total > 0 ? Math.round((passedCount / total) * 100) : 0;

                  // Group by Date
                  const grouped = results.reduce((acc, result) => {
                    const dateObj = new Date(result.date || Date.now());
                    const dateKey = dateObj.toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    });
                    if (!acc[dateKey]) acc[dateKey] = [];
                    acc[dateKey].push(result);
                    return acc;
                  }, {});

                  return (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center shrink-0">
                            <BookOpen size={22} />
                          </div>
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Total Exams</span>
                            <span className="text-2xl font-black text-slate-900 dark:text-white">{total}</span>
                          </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-800 flex items-center justify-center shrink-0">
                            <Percent size={22} />
                          </div>
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Avg Score %</span>
                            <span className="text-2xl font-black text-slate-900 dark:text-white">{avg}%</span>
                          </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center shrink-0">
                            <TrendingUp size={22} />
                          </div>
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Pass Rate %</span>
                            <span className="text-2xl font-black text-slate-900 dark:text-white">{passRate}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Day-by-Day Timeline */}
                      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
                          <BarChart2 size={18} className="text-indigo-500" /> Daily Progress History
                        </h4>

                        {Object.keys(grouped).length === 0 ? (
                          <div className="text-center py-10 text-slate-500 dark:text-slate-400 text-sm font-medium">
                            No exam activity recorded for this scholar yet.
                          </div>
                        ) : (
                          <div className="space-y-6">
                            {Object.entries(grouped).map(([dateLabel, dayResults], gIdx) => (
                              <div key={gIdx} className="space-y-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold">
                                  <Calendar size={13} className="text-indigo-500" />
                                  <span>{dateLabel}</span>
                                </div>
                                <div className="grid grid-cols-1 gap-3 pl-3 border-l-2 border-indigo-200 dark:border-indigo-800">
                                  {dayResults.map((r, rIdx) => (
                                    <div key={rIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-4">
                                      <div>
                                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{r.examTitle || 'Exam'}</h5>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                                          Score: <strong className="text-slate-700 dark:text-slate-300">{r.score} / {r.totalMarks}</strong>
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <span className="font-black text-indigo-600 dark:text-indigo-400 text-lg">{r.percentage}%</span>
                                        {r.passed ? (
                                          <span className="px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-full text-xs font-extrabold">Passed</span>
                                        ) : (
                                          <span className="px-2.5 py-0.5 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-full text-xs font-extrabold">Failed</span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;