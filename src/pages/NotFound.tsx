import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Gamepad2, Home, ArrowLeft, RefreshCw, Compass, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden font-jost" dir="rtl">
      {/* Decorative Neon background glow circles */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-brand-sky/10 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full bg-brand-purple/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-2xl w-full text-center relative z-10 space-y-8">
        
        {/* Animated Gamepad & Glitch Effect */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="relative inline-flex items-center justify-center p-6 bg-slate-950/40 rounded-3xl border border-brand-violet/15 backdrop-blur-sm group hover:border-brand-sky/30 transition-all shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-sky/5 to-brand-purple/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative">
            {/* Pulsing Accent Glow behind Gamepad */}
            <div className="absolute inset-0 bg-accent-yellow/10 rounded-full blur-xl animate-pulse"></div>
            <Gamepad2 className="w-20 h-20 text-accent-yellow relative z-10 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          
          {/* Retro Level Not Found Badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-brand-purple border border-brand-violet text-[10px] font-black tracking-widest text-white px-3 py-1 rounded-full shadow-lg uppercase font-mono select-none whitespace-nowrap">
            LEVEL 404 NOT FOUND
          </div>
        </motion.div>

        {/* Dynamic Big Typography */}
        <div className="space-y-3">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-l from-brand-sky via-brand-purple to-accent-yellow leading-none tracking-tight select-none font-jost"
          >
            ۴۰۴
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl md:text-3xl font-black text-white tracking-tight"
          >
            خطا! مرحله بازی پیدا نشد
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-slate-400 text-sm md:text-base max-w-md mx-auto leading-relaxed"
          >
            مسیر یا صفحه‌ای که به دنبال آن هستید در نقشه این رویداد وجود ندارد یا جابجا شده است. شاید از مختصات خارج شده‌اید!
          </motion.p>
        </div>

        {/* Suggested Quick Navigation Hub */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-[#110c2688]/80 border border-brand-violet/10 rounded-2xl p-5 md:p-6 max-w-md mx-auto text-right space-y-4 shadow-xl"
        >
          <div className="flex items-center gap-2 text-brand-sky font-bold text-xs border-b border-brand-violet/10 pb-3">
            <Compass className="w-4 h-4 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
            <span>نقاط پیشنهادی برای بازگشت به ماراتن:</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <Link to="/studios" className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-900/40 hover:bg-brand-purple/10 border border-brand-violet/10 p-2.5 rounded-xl transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-sky"></span>
              <span>استودیوهای مستقل</span>
            </Link>
            <Link to="/next" className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-900/40 hover:bg-brand-purple/10 border border-brand-violet/10 p-2.5 rounded-xl transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow"></span>
              <span>رویدادهای Next</span>
            </Link>
            <Link to="/volunteers" className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-900/40 hover:bg-brand-purple/10 border border-brand-violet/10 p-2.5 rounded-xl transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime"></span>
              <span>جذب داوطلب</span>
            </Link>
            <Link to="/sponsors" className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-900/40 hover:bg-brand-purple/10 border border-brand-violet/10 p-2.5 rounded-xl transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple"></span>
              <span>حامیان رویداد</span>
            </Link>
          </div>
        </motion.div>

        {/* Primary Call to Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-sm mx-auto"
        >
          <Link
            to="/"
            className="w-full sm:w-auto bg-accent-yellow hover:bg-accent-yellow/90 text-slate-950 font-black px-6 py-3 rounded-xl transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-accent-yellow/10 text-sm"
          >
            <Home className="w-4 h-4" />
            <span>بازگشت به صفحه اصلی</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto bg-[#1a1438] hover:bg-[#231b4b] text-slate-200 border border-brand-violet/20 font-bold px-6 py-3 rounded-xl transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>برگشت به صفحه قبلی</span>
          </button>
        </motion.div>

        {/* Dynamic status line (Anti-AI Slop/Honest) */}
        <div className="pt-6 flex justify-center items-center gap-2 text-[10px] text-slate-500 font-mono" dir="ltr">
          <AlertCircle className="w-3.5 h-3.5 text-slate-600" />
          <span>STATUS: OUT_OF_BOUNDS_ERROR [COORD_ERR]</span>
        </div>
      </div>
    </div>
  );
}
