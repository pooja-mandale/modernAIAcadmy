import React, { useState } from 'react';
import { Send, MessageCircle, Share2, Camera, Video, Sparkles, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-transparent text-slate-600 dark:text-slate-400 pt-28 pb-12 border-t border-slate-200/60 dark:border-slate-800 relative overflow-hidden font-sans transition-colors duration-500">

      {/* Background Animated Ambient Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Newsletter Section */}
        <div className="relative group mb-24 hover-lift">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-[2.5rem] blur-xl opacity-25 group-hover:opacity-40 transition duration-700"></div>

          <div className="relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] border border-white/80 dark:border-slate-800 shadow-2xl shadow-indigo-500/10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles size={14} className="animate-spin-slow" />
                Stay Ahead of the Competition
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Accelerate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">Academic Journey</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-medium text-sm sm:text-base mt-2">
                Join our exclusive newsletter for high-yield exam updates, AI mock test strategies, and expert tips.
              </p>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full sm:w-72">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-4 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm font-semibold focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 shadow-xs transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-sm shadow-md hover:shadow-indigo-600/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  Subscribe
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16">

          {/* Brand Info */}
          <div className="col-span-1 md:col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden flex items-center justify-center p-0.5">
                <img src="/logo.png" alt="Modern Global Eduvere Logo" className="w-full h-full object-contain rounded-xl" />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none block">MODERN GLOBAL EDUVERE</span>
                <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-widest mt-1 block">All Academic &amp; Competitive Streams</span>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed mb-6 font-medium text-sm">
              Empowering students across School Foundation, High School, Degree College, and Competitive Exam Streams with AI-driven adaptive learning, tests, and live masterclasses.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: MessageCircle, href: '#' },
                { icon: Share2, href: '#' },
                { icon: Camera, href: '#' },
                { icon: Video, href: '#' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white dark:hover:text-white hover:border-indigo-600 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-6 lg:col-span-3">
            <h4 className="text-slate-900 dark:text-white font-extrabold mb-6 uppercase tracking-wider text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></span> Quick Links
            </h4>
            <ul className="space-y-3.5">
              {[
                { name: 'Student Dashboard', path: '/' },
                { name: 'School & High School Exams', path: '/exams' },
                { name: 'Competitive Entrance Tests', path: '/exams' },
                { name: 'About Modern Global Eduvere', path: '/about' },
                { name: 'Contact Support', path: '/contact' },
                { name: 'Admin Portal', path: '/admin-login' }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium text-sm transition-all flex items-center gap-2.5 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 group-hover:scale-125 transition-all"></span>
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Streams & Resources */}
          <div className="col-span-1 md:col-span-6 lg:col-span-4">
            <h4 className="text-slate-900 dark:text-white font-extrabold mb-6 uppercase tracking-wider text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400"></span> Streams & Educational Resources
            </h4>
            <ul className="space-y-3.5">
              {[
                { name: 'Science & Math Test Series', path: '/study-material' },
                { name: 'Commerce & Economics Modules', path: '/study-material' },
                { name: 'Arts & Humanities Resources', path: '/study-material' },
                { name: 'Competitive & AI Analytics', path: '/results' },
                { name: 'Privacy Policy', path: '#' },
                { name: 'Terms of Service', path: '#' }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium text-sm transition-all flex items-center gap-2.5 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-cyan-500 dark:group-hover:bg-cyan-400 group-hover:scale-125 transition-all"></span>
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright & Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} Modern Global Eduvere. All rights reserved.</p>
            <p className="text-slate-400 dark:text-slate-500 mt-0.5">AI-Powered Education Excellence for All Academic &amp; Competitive Scholars</p>
          </div>
          <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 px-4 py-2 rounded-full border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
            <span>Crafted with</span>
            <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse" />
            <span>for Modern Scholars</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;