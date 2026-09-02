import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { login, reset } from "../redux/userSlice";
import toast from "react-hot-toast";
import {
  Mail, Lock, ArrowRight, GraduationCap, Sparkles, Users, Trophy, Star, Eye, EyeOff,
  Dna, Atom, Beaker, ShieldCheck, CheckCircle2
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user);

  // Extracted redirect parameter
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("redirect") || (user?.role === "admin" ? "/admin-dashboard" : "/");
  const redirectQuery = searchParams.get("redirect");
  const registerLink = redirectQuery ? `/register?redirect=${encodeURIComponent(redirectQuery)}` : "/register";

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) {
      toast.success("Welcome back to Modern AI Academy!");
      navigate(redirectPath);
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch, redirectPath]);

  const onChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill in all fields"); return; }
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-12 font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30 overflow-hidden relative transition-colors duration-500">

      {/* Floating Theme Toggle (Top Right) */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* ════════════════════════════════════════
          LEFT — Brand & AI Visual Panel (7 cols)
         ════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:col-span-7 relative flex-col justify-between p-16 xl:p-20 overflow-hidden min-h-screen border-r border-slate-200/80 dark:border-slate-800/80 transition-colors duration-500">
        {/* Ambient background glows */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/90 via-slate-100/80 to-cyan-50/90 dark:from-[#060413]/90 dark:via-[#0d0728]/85 dark:to-[#020b18]/95 z-0 transition-colors duration-500" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-600/25 blur-[120px] z-0 animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 blur-[130px] z-0 animate-pulse" style={{ animationDuration: '8s' }} />

        {/* Top Header Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3.5 group">
            <div className="w-12 h-12 p-0.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
              <img src="/logo.png" alt="Modern AI Academy Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                MODERN <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-sky-400 dark:from-indigo-400 dark:via-cyan-400 dark:to-sky-300">AI ACADEMY</span>
              </div>
              <div className="text-[10px] text-indigo-600 dark:text-cyan-400 font-extrabold uppercase tracking-[0.2em] mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-cyan-400 animate-pulse"></span>
                All Academic &amp; Competitive Streams
              </div>
            </div>
          </Link>
        </div>

        {/* Main Hero Visual Copy */}
        <div className="relative z-10 space-y-8 max-w-xl my-auto py-12">

          {/* Stream Badges Pills */}
          <div className="flex flex-wrap gap-2.5">
            {[
              { title: "School Foundation (5th-10th)", icon: Atom },
              { title: "High School (11th & 12th)", icon: Beaker },
              { title: "Competitive & Degree", icon: Dna }
            ].map((subj, idx) => (
              <div key={idx} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/80 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 backdrop-blur-md text-xs font-bold shadow-2xs">
                <subj.icon size={14} className="text-indigo-600 dark:text-indigo-400" />
                <span>{subj.title}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl xl:text-6xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight">
              Empowering Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-sky-400 dark:from-indigo-400 dark:via-cyan-300 dark:to-sky-300">
                Educational Success.
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed max-w-md font-medium">
              Access standard-aligned practice mock exams, adaptive AI diagnostic analytics, and live interactive Zoom masterclasses for school, college, and competitive exams.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            {[
              { icon: Users, val: "K-12 & Degree", label: "All Streams Focus" },
              { icon: Trophy, val: "96%", label: "Accuracy Target" },
              { icon: Star, val: "4.9 ★", label: "AI Rank Diagnostic" },
            ].map((s, i) => (
              <div key={i} className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 text-center hover:border-indigo-300 dark:hover:border-slate-700 transition-all duration-300 group shadow-xs">
                <s.icon size={18} className="text-indigo-600 dark:text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xl font-black text-slate-900 dark:text-white leading-none mb-1">{s.val}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-extrabold leading-tight">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Features list */}
          <div className="space-y-3 pt-2">
            {[
              "K-12 Board & Competitive Exam Syllabus Coverage",
              "Science, Commerce, Arts & Entrance Exam Practice Tests",
              "Instant AI Scorecard & Weakness Diagnostic Identification",
            ].map((feat, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Quote Banner */}
        <div className="relative z-10">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
            <span className="text-4xl text-indigo-600 dark:text-indigo-400 font-black leading-none mt-[-4px] shrink-0">"</span>
            <div>
              <p className="text-slate-700 dark:text-slate-300 text-xs font-semibold leading-relaxed">
                Consistency in learning today builds your leadership and career success tomorrow.
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-[10px] font-extrabold mt-1.5 uppercase tracking-widest">— Modern AI Academy Faculty</p>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          RIGHT — Login Form (5 cols)
         ════════════════════════════════════════ */}
      <div className="lg:col-span-5 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        {/* Soft background ambient light */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/5 dark:bg-indigo-600/10 blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 dark:bg-cyan-600/10 blur-3xl -z-10 -translate-x-1/3 translate-y-1/3" />

        <div className="w-full max-w-[440px]">

          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg rounded-2xl px-5 py-3.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg font-black text-slate-900 dark:text-white">MODERN <span className="text-indigo-600 dark:text-indigo-400">AI ACADEMY</span></span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold uppercase tracking-widest mb-3">
              <Sparkles size={12} />
              <span>Student Portal Login</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Welcome Back
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs font-semibold mt-2">
              Don't have an account yet?{" "}
              <Link to={registerLink} className="text-indigo-600 dark:text-cyan-400 font-extrabold hover:underline underline-offset-4">
                Create one free →
              </Link>
            </p>
          </div>

          {/* Form Container Card */}
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 p-8 rounded-[2rem] shadow-xl dark:shadow-2xl transition-all duration-300">
            {isError && message && message.toLowerCase().includes('approval') && (
              <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-semibold space-y-1.5 animate-in fade-in">
                <div className="flex items-center gap-2 font-extrabold text-amber-700 dark:text-amber-400 text-sm">
                  <ShieldCheck size={18} className="shrink-0" />
                  Account Pending Admin Approval
                </div>
                <p className="leading-relaxed">
                  Your account registration has been received and is currently being reviewed by the Academy Administrator.
                </p>
                <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                  Once approved, you will be able to log in with your credentials.
                </p>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">

              {/* Email */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-2.5">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="student@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800/80 placeholder-slate-400 dark:placeholder-slate-500 text-sm font-semibold focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-600/10 shadow-xs transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="block text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Password
                  </label>
                  <a href="#" className="text-xs font-bold text-indigo-600 dark:text-cyan-400 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800/80 placeholder-slate-400 dark:placeholder-slate-500 text-sm font-semibold focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-600/10 shadow-xs transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full py-4 rounded-xl font-extrabold text-white text-base overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/30 cursor-pointer bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600"
                >
                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <span>Signing In…</span>
                    ) : (
                      <>
                        <span>Sign In to Dashboard</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </div>

            </form>
          </div>

          {/* Admin link */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
            <Link to="/admin-login" className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1.5">
              <ShieldCheck size={15} />
              <span>Admin & Faculty Portal Access →</span>
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;
