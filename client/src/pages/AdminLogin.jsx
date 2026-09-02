import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginAdmin, resetAdmin } from "../redux/adminSlice";
import toast from "react-hot-toast";
import { ShieldCheck, Mail, Lock, ArrowRight, AlertTriangle, Eye, EyeOff, Sparkles } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin, isLoading, isError, isSuccess, message } = useSelector((state) => state.admin);

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || admin) { toast.success("Welcome to Admin Portal!"); navigate("/admin-dashboard"); }
    dispatch(resetAdmin());
  }, [admin, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill in all fields"); return; }
    dispatch(loginAdmin({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative overflow-hidden selection:bg-indigo-500/30 transition-colors duration-500">

      {/* Floating Theme Toggle (Top Right) */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Ambient glowing background orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Main Card */}
        <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl dark:shadow-2xl hover-lift transition-all duration-300">
          {/* Top accent gradient bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-600 via-cyan-500 to-indigo-600 animate-gradient-x" />

          <div className="p-8 sm:p-10">
            {/* Logo Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center mx-auto mb-4 shadow-lg group hover:scale-105 transition-transform duration-300">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover rounded-xl" />
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold uppercase tracking-widest mb-2">
                <ShieldCheck size={13} />
                <span>Faculty &amp; Admin Access</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Admin Portal</h2>
              <div className="flex items-center justify-center gap-1.5 mt-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                <AlertTriangle size={13} className="text-amber-500" />
                <span>Authorized Staff Authentication</span>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-2">Admin Email</label>
                <div className="relative group">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors pointer-events-none" />
                  <input
                    type="email" name="email" value={email} onChange={onChange}
                    placeholder="admin@modernaiacademy.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm font-semibold focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-600/10 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-2">Password</label>
                <div className="relative group">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"} name="password" value={password} onChange={onChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm font-semibold focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-600/10 transition-all duration-200"
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

              <div className="pt-2">
                <button
                  type="submit" disabled={isLoading}
                  className="relative w-full py-4 rounded-2xl font-extrabold text-white text-sm overflow-hidden group transition-all duration-300 hover:scale-[1.01] active:scale-95 disabled:opacity-70 shadow-lg shadow-indigo-600/30 cursor-pointer bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500"
                >
                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? "Authenticating…" : <><ShieldCheck size={18} /><span>Access Admin Dashboard</span><ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                  </span>
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 text-center">
              <Link to="/login" className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1.5">
                ← Back to Student Portal Login
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-400 dark:text-slate-500 text-[11px] font-semibold mt-6 uppercase tracking-widest">
          Modern AI Academy • Administration Portal
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
