import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { register, reset } from "../redux/userSlice";
import toast from "react-hot-toast";
import {
  GraduationCap, User, Mail, Lock, Phone,
  MapPin, Building, ArrowRight, BookOpen, CheckCircle2,
  Sparkles, Eye, EyeOff, ShieldCheck, Atom, Beaker, Compass, Stars
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

/* ─── Reusable Input Component ─── */
const Field = ({ label, name, type = "text", value, onChange, placeholder, required, icon: Icon }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <label className="block text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400 mb-2">
        {label}{required && <span className="text-indigo-600 dark:text-indigo-400 ml-0.5">*</span>}
      </label>
      <div className="relative group">
        {Icon && <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 pointer-events-none transition-colors duration-300" />}
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full ${Icon ? "pl-11" : "px-4"} ${type === "password" ? "pr-11" : "pr-4"} py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/90 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 placeholder-slate-400 dark:placeholder-slate-500 text-sm font-semibold focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-600/10 shadow-xs transition-all duration-300`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};

export const STANDARD_OPTIONS = [
  "Class 5th - 8th (School Foundation)",
  "Class 9th & 10th (Board Foundation)",
  "Class 11th (Science)",
  "Class 11th (Commerce)",
  "Class 11th (Arts / Humanities)",
  "Class 12th (Science)",
  "Class 12th (Commerce)",
  "Class 12th (Arts / Humanities)",
  "Competitive Exams (NEET / JEE / CET / UPSC)",
  "Undergraduate / Degree College",
  "Skill Development & Other Courses"
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", mobile: "",
    std: "", schoolName: "", district: ""
  });
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user);

  // Parse redirect query param
  const searchParams = new URLSearchParams(location.search);
  const redirectQuery = searchParams.get("redirect");
  const loginLink = redirectQuery ? `/login?redirect=${encodeURIComponent(redirectQuery)}` : "/login";

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) {
      setIsSubmittedSuccess(true);
      toast.success("Registration submitted! Account is pending admin approval.");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  const onChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.mobile) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!formData.std) {
      toast.error("Please select your academic standard / course.");
      return;
    }
    dispatch(register(formData));
  };

  if (isSubmittedSuccess) {
    return (
      <div className="min-h-screen py-16 px-4 font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-6 right-6 z-50">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl text-center relative z-10 space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10 animate-bounce">
            <ShieldCheck size={40} />
          </div>

          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              Registration Received
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight pt-2">
              Awaiting Admin Approval
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold leading-relaxed pt-1">
              Thank you, <strong className="text-indigo-600 dark:text-indigo-400">{formData.name}</strong>! Your student account registration has been submitted to the <strong className="text-slate-800 dark:text-slate-200">Modern AI Academy Administrator</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/80 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-extrabold text-sm">
              <Sparkles size={16} /> What happens next?
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>Admin will verify your academic registration details.</li>
              <li>Once approved, you will be able to log in with your email.</li>
              <li>You can contact faculty if immediate access is required.</li>
            </ul>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link to={loginLink} className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 transition-all text-center">
              Go to Login Screen
            </Link>
            <Link to="/" className="py-3.5 px-6 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-extrabold text-sm transition-all text-center">
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center relative overflow-hidden selection:bg-indigo-500/30 transition-colors duration-500">

      {/* Floating Theme Toggle (Top Right) */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Cinematic Backdrops & Animated Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[650px] h-[650px] bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-[160px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[650px] h-[650px] bg-cyan-500/10 dark:bg-cyan-600/20 rounded-full blur-[160px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

      {/* Main Container Card (Split Screen Layout) */}
      <div className="w-full max-w-6xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border border-slate-200/80 dark:border-slate-800/90 rounded-[3rem] shadow-xl dark:shadow-2xl overflow-hidden grid lg:grid-cols-12 relative z-10 transition-colors duration-500">

        {/* ── LEFT PANEL — Immersive Visual Storytelling (5 cols) ── */}
        <div className="lg:col-span-5 p-8 sm:p-12 bg-indigo-50/50 dark:bg-slate-950/60 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between relative overflow-hidden transition-colors duration-500">

          {/* Background Photo Overlay with Gradient Mask */}
          <div className="absolute inset-0 bg-cover bg-center opacity-15 dark:opacity-25 mix-blend-luminosity scale-105 transition-transform duration-1000" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-50/90 via-indigo-50/40 to-transparent dark:from-slate-950 dark:via-slate-950/80 dark:to-transparent" />

          <div className="relative z-10 space-y-8">

            {/* Logo Header */}
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700/40 overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 dark:text-white tracking-tight">MODERN <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">AI ACADEMY</span></div>
                <p className="text-[10px] text-indigo-600 dark:text-cyan-400 font-extrabold uppercase tracking-widest mt-0.5">All Academic &amp; Competitive Streams</p>
              </div>
            </Link>

            {/* Hero Copy */}
            <div className="space-y-4 pt-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/30 backdrop-blur-md">
                <Stars size={13} className="text-indigo-600 dark:text-indigo-400 animate-spin-slow" />
                <span className="text-xs text-indigo-700 dark:text-indigo-300 font-extrabold uppercase tracking-wider">Next-Gen Learning Portal</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                Shape Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-sky-400 dark:from-indigo-400 dark:via-cyan-300 dark:to-sky-300">
                  Academic Future.
                </span>
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                Join thousands of ambitious students mastering school, college, and competitive exam preparation through advanced AI analytics and expert mentorship.
              </p>
            </div>

            {/* Stream Badges */}
            <div className="space-y-3 pt-2">
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">Supported Academic Streams</p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { title: "School Foundation (5th-10th)", icon: Atom },
                  { title: "High School (11th & 12th)", icon: Beaker },
                  { title: "Competitive & Degree", icon: Compass }
                ].map((s, idx) => (
                  <div key={idx} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border border-indigo-200 dark:border-indigo-500/30 bg-white/80 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 backdrop-blur-md text-xs font-bold shadow-2xs">
                    <s.icon size={14} className="text-indigo-600 dark:text-indigo-400" />
                    <span>{s.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Checklists */}
            <div className="space-y-3 pt-2">
              {[
                "Board & Competitive Exam Pattern Mock Tests",
                "Real-Time Accuracy & Weakness Diagnostics",
                "Live Zoom Masterclasses & Doubts Session",
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 text-xs font-semibold">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="relative z-10 pt-8">
            <div className="flex items-center gap-3.5 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl px-4 py-3.5 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-slate-900 dark:text-white text-xs font-bold">Secure Student ID</p>
                <p className="text-slate-500 dark:text-slate-400 text-[10px]">Instant onboarding &amp; personalized access</p>
              </div>
            </div>
          </div>

        </div>

        {/* ── RIGHT PANEL — High-Aesthetic Interactive Form (7 cols) ── */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-white dark:bg-slate-900/60 transition-colors duration-500">

          <div>
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-1">New Registration</p>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Create Student Profile</h2>
              </div>
              <Link
                to={loginLink}
                className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-cyan-400 text-xs font-extrabold hover:underline shrink-0"
              >
                Already registered? Sign in →
              </Link>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">

              {/* Personal Info Group */}
              <div className="space-y-4">
                <p className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <User size={14} /> Personal Credentials
                </p>

                <Field label="Full Name" name="name" value={formData.name} onChange={onChange} placeholder="e.g. Aarav Patil" required icon={User} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Mobile Number" name="mobile" value={formData.mobile} onChange={onChange} placeholder="+91 98765 43210" required icon={Phone} />
                  <Field label="Email Address" name="email" type="email" value={formData.email} onChange={onChange} placeholder="student@example.com" required icon={Mail} />
                </div>

                <Field label="Secure Password" name="password" type="password" value={formData.password} onChange={onChange} placeholder="Create a secure password" required icon={Lock} />
              </div>

              {/* Academic Info Group */}
              <div className="space-y-4 pt-2">
                <p className="text-xs font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
                  <GraduationCap size={14} /> Academic Details
                </p>

                <Field
                  label="Class Standard / Academic Stream / Course"
                  name="std"
                  value={formData.std}
                  onChange={onChange}
                  placeholder="e.g. BSC (IT), Class 12th Science, NEET Aspirant, B.Com"
                  required
                  icon={Building}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="School / College / Institute (Optional)" name="schoolName" value={formData.schoolName} onChange={onChange} placeholder="e.g. Modern High School" icon={BookOpen} />
                  <Field label="City / District (Optional)" name="district" value={formData.district} onChange={onChange} placeholder="e.g. Pune" icon={MapPin} />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full py-4 rounded-2xl font-extrabold text-white text-base overflow-hidden group transition-all duration-300 hover:scale-[1.01] active:scale-95 disabled:opacity-70 shadow-lg shadow-indigo-600/30 cursor-pointer bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600"
                >
                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? "Creating Profile..." : <><span>Complete Student Registration</span><ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" /></>}
                  </span>
                </button>
              </div>

            </form>
          </div>

          {/* Footer Callout */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div>
                <p className="font-extrabold text-slate-900 dark:text-white text-xs">Already have an account?</p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] font-medium mt-0.5">Log in to launch your interactive dashboard</p>
              </div>
              <Link
                to={loginLink}
                className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-500/40 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300"
              >
                Sign In Now
                <ArrowRight size={14} />
              </Link>
            </div>

            <p className="text-center text-[11px] text-slate-500 font-medium">
              By registering, you agree to Modern AI Academy's <a href="#" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Terms of Service</a> &amp; <a href="#" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Privacy Policy</a>.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;