import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Sparkles, Send, Gamepad2, Layers, Compass, HelpCircle, AlertCircle, RefreshCw, Layers3, Flame, Clock, Heart, ArrowUpRight, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { appendRowToSheet, getAccessToken } from '../lib/googleSheets';

interface GddResult {
  title: string;
  concept: string;
  mechanics: string[];
  creativeTwist: string;
  artStyle: string;
  tips: string[];
}

const LOADING_STEPS = [
  'در حال اتصال به مربی هوشمند ماراتن...',
  'تحلیل تم انتخابی و محدودیت‌های چالش‌برانگیز...',
  'طراحی مفهوم اصلی بازی (Core Concept)...',
  'تنظیم مکانیک‌های بهینه‌سازی شده برای توسعه ۴۸ ساعته...',
  'ایجاد پیچش خلاقانه منحصربه‌فرد (Creative Twist)...',
  'تدوین نکات طلایی مدیریت حجم و سرعت توسعه...'
];

export default function AiMentor() {
  const [theme, setTheme] = useState('');
  const [genre, setGenre] = useState('پلتفرمر دو بعدی (2D Platformer)');
  const [platform, setPlatform] = useState('مرورگر وب (WebGL / Itch.io)');
  const [constraints, setConstraints] = useState('کنترل بازی فقط با دو دکمه کیبورد');
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<GddResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isSavingToSheet, setIsSavingToSheet] = useState(false);
  const [sheetSaveSuccess, setSheetSaveSuccess] = useState<boolean | null>(null);

  const handleSaveToSheet = async () => {
    if (!result) return;
    setIsSavingToSheet(true);
    setSheetSaveSuccess(null);
    try {
      const spreadsheetId = localStorage.getItem('ggj_spreadsheet_id');
      const token = await getAccessToken();

      if (!spreadsheetId || !token) {
        alert('لطفاً ابتدا از صفحه «اتصال گوگل شیت»، حساب گوگل خود را متصل کرده و جدول بسازید.');
        setIsSavingToSheet(false);
        return;
      }

      const rowValues = [
        result.title,
        theme,
        genre,
        platform,
        constraints,
        result.concept,
        result.creativeTwist,
        result.artStyle,
        new Date().toLocaleString('fa-IR')
      ];

      await appendRowToSheet(token, spreadsheetId, 'ایده‌های هوش مصنوعی', rowValues);
      setSheetSaveSuccess(true);
    } catch (err) {
      console.error(err);
      setSheetSaveSuccess(false);
    } finally {
      setIsSavingToSheet(false);
    }
  };

  // Cycling reassuring messages on loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 1800);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim()) {
      setError('لطفاً ابتدا تم یا موضوع اصلی ایده خود را وارد کنید.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/gemini/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, genre, platform, constraints })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'خطایی در تولید ایده پیش آمد.');
      }

      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'برقراری ارتباط با سرور هوشمند ناموفق بود.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadPresetTheme = (preset: string) => {
    setTheme(preset);
  };

  return (
    <div className="min-h-screen bg-[#070412] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-jost" dir="rtl">
      
      {/* Dynamic Glow Accents */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-sky/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-brand-purple/5 blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-brand-violet/15 border border-brand-violet/25 rounded-full text-accent-yellow text-xs font-black tracking-widest uppercase"
          >
            <Brain className="w-3.5 h-3.5 text-accent-yellow animate-pulse" />
            <span>AI JAM MENTOR - GEMINI 3.5 FLASH</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
          >
            مربی ایده ساز خلاق گیم جم
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm md:text-base leading-relaxed"
          >
            بزرگ‌ترین چالش در شروع ماراتن ۴۸ ساعته، محدود کردن دامنه (Scope) و یافتن یک ایده نوآورانه است. مربی هوشمند ما بر اساس تم رویداد، پلتفرم و محدودیت‌های چالش‌برانگیز انتخابی شما، یک سند طراحی بازی منسجم و سریع‌توسعه تولید می‌کند.
          </motion.p>
        </div>

        {/* Core Generator Layout split in two cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Right side form */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#110c2688]/90 border border-brand-violet/15 p-6 rounded-2xl shadow-xl space-y-5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 border-b border-brand-violet/10 pb-3">
                <Compass className="w-5 h-5 text-brand-sky" />
                <h2 className="text-lg font-black text-white">مشخصات اولیه بازی</h2>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4">
                
                {/* Theme input */}
                <div className="space-y-2">
                  <label className="text-xs text-slate-300 font-black block">تم / موضوع محوری اصلی رویداد (ضروری)</label>
                  <input
                    type="text"
                    required
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="مثال: موج‌های خروشان، ریشه‌ها، دوگانگی..."
                    className="w-full bg-[#110c26] border border-slate-800 focus:border-brand-sky rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-sky text-right"
                  />
                  {/* Presets shortcut buttons */}
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    <span className="text-[10px] text-slate-500 font-bold self-center">تم‌های نمونه:</span>
                    {['موج‌ها و حباب‌ها', 'ریشه‌ها', 'مرمت و تعویض', 'دوگانگی'].map(p => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => loadPresetTheme(p)}
                        className="text-[9px] bg-brand-purple/10 border border-brand-violet/15 px-2 py-1 rounded-md text-brand-sky hover:bg-brand-purple/20 transition-all font-bold"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Genre Select */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-black block">سبک یا ژانر بازی پیشنهادی</label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-[#110c26] border border-slate-800 focus:border-brand-sky rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-sky appearance-none text-right"
                  >
                    <option value="پلتفرمر دو بعدی (2D Platformer)">پلتفرمر دو بعدی (2D Platformer)</option>
                    <option value="ماجراجویی پازلی (Puzzle Adventure)">ماجراجویی پازلی (Puzzle Adventure)</option>
                    <option value="شبیه‌ساز فیزیک مضحک (Physics Sandbox)">شبیه‌ساز فیزیک مضحک (Physics Sandbox)</option>
                    <option value="بقا و مدیریت منابع (Survival)">بقا و مدیریت منابع (Survival)</option>
                    <option value="اکشن مینیمال / تفنگی (Mini Action)">اکشن مینیمال / تفنگی (Mini Action)</option>
                  </select>
                </div>

                {/* Platform Target */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-black block">پلتفرم هدف برای خروجی</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full bg-[#110c26] border border-slate-800 focus:border-brand-sky rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-sky appearance-none text-right"
                  >
                    <option value="مرورگر وب (WebGL / Itch.io)">مرورگر وب (WebGL / Itch.io) - پیشنهادی</option>
                    <option value="ویندوز / دسکتاپ (PC)">ویندوز / دسکتاپ (PC)</option>
                    <option value="گوشی‌های هوشمند (Android / iOS)">گوشی‌های هوشمند (Android / iOS)</option>
                  </select>
                </div>

                {/* Constraints / Challenges */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-black block">محدودیت چالش‌برانگیز انتخابی (یا Diversifier)</label>
                  <input
                    type="text"
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                    placeholder="مثال: بدون متن، فقط دو دکمه، سیاه و سفید..."
                    className="w-full bg-[#110c26] border border-slate-800 focus:border-brand-sky rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-sky text-right"
                  />
                  <div className="text-[10px] text-slate-500 leading-normal">
                    ● محدودیت‌ها سبب شکوفایی خلاقیت‌های جالب می‌شوند و داوران بین‌المللی امتیاز ویژه‌ای به آن‌ها می‌دهند.
                  </div>
                </div>

                {/* Action Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-accent-yellow hover:bg-accent-yellow/90 text-slate-950 font-black py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent-yellow/10 ${
                    isLoading ? 'opacity-50 cursor-wait' : 'hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>تولید سند طراحی خلاقانه بازی (GDD)</span>
                </button>
              </form>
            </motion.div>
          </div>

          {/* Left side: Results Display Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {isLoading && (
                /* Interactive Neon loading panel */
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#110c2644] border border-brand-violet/10 rounded-2xl p-12 flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-6 backdrop-blur-sm"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-2 border-brand-sky/20 border-t-brand-sky animate-spin"></div>
                    <Brain className="w-8 h-8 text-accent-yellow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-white">منتور هوش مصنوعی در حال ایده پردازی است</h3>
                    <motion.p 
                      key={loadingStep}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-brand-sky text-xs font-bold"
                    >
                      {LOADING_STEPS[loadingStep]}
                    </motion.p>
                  </div>
                  <span className="text-[10px] text-slate-500 max-w-xs leading-normal">
                    تحلیل کامل مشخصات ورودی و تولید قالب استاندارد سند گیم‌دیزاین چند ثانیه زمان می‌برد...
                  </span>
                </motion.div>
              )}

              {error && (
                /* Error presentation */
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-rose-950/20 border border-rose-900/35 rounded-2xl p-8 text-center space-y-4 h-full min-h-[400px] flex flex-col items-center justify-center"
                >
                  <AlertCircle className="w-12 h-12 text-rose-400 animate-bounce" />
                  <h3 className="text-lg font-black text-rose-300">خطا در برقراری ارتباط با مربی!</h3>
                  <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                    {error}
                  </p>
                  <p className="text-[10px] text-slate-500 max-w-xs">
                    مطمئن شوید کلید <code className="text-brand-sky bg-slate-900 px-1.5 py-0.5 rounded font-mono">GEMINI_API_KEY</code> در بخش تنظیمات (Secrets) وارد شده و معتبر است.
                  </p>
                </motion.div>
              )}

              {result && (
                /* Bento Grid Generated Output document */
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Generated Document Header block */}
                  <div className="bg-gradient-to-r from-brand-violet/20 via-brand-purple/10 to-transparent border border-brand-violet/20 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-accent-yellow font-black tracking-wider uppercase font-mono">DOCUMENT GENERATED SUCCESSFULLY</span>
                      <h2 className="text-2xl font-black text-white">{result.title}</h2>
                      <span className="text-[11px] text-brand-sky block font-mono" dir="ltr">PROPOSED TITLE FOR GGJ 2027</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={handleSaveToSheet}
                        disabled={isSavingToSheet}
                        className={`text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 font-bold ${
                          sheetSaveSuccess === true
                            ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-400'
                            : sheetSaveSuccess === false
                            ? 'bg-rose-950/40 border border-rose-500/30 text-rose-400'
                            : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50'
                        }`}
                      >
                        {isSavingToSheet ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            در حال ذخیره‌سازی...
                          </>
                        ) : sheetSaveSuccess === true ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            در گوگل شیت ذخیره شد!
                          </>
                        ) : sheetSaveSuccess === false ? (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                            خطا در ذخیره
                          </>
                        ) : (
                          <>
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                            ذخیره در گوگل شیت
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => { setResult(null); setTheme(''); setSheetSaveSuccess(null); }}
                        className="text-xs bg-slate-950 border border-slate-800 text-slate-300 hover:text-white px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> شروع مجدد
                      </button>
                    </div>
                  </div>

                  {/* Bento grids details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Concept card - Span full */}
                    <div className="bg-[#110c26aa] border border-brand-violet/10 rounded-2xl p-5 md:p-6 space-y-2 col-span-full">
                      <div className="flex items-center gap-2 text-brand-sky">
                        <Flame className="w-4 h-4" />
                        <span className="text-xs font-black">مفهوم اصلی و داستان بازی (Core Concept)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {result.concept}
                      </p>
                    </div>

                    {/* Mechanics card */}
                    <div className="bg-[#110c26aa] border border-brand-violet/10 rounded-2xl p-5 md:p-6 space-y-3">
                      <div className="flex items-center gap-2 text-accent-yellow">
                        <Gamepad2 className="w-4 h-4" />
                        <span className="text-xs font-black">مکانیک‌های گیم‌پلی (Gameplay Mechanics)</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-300 pr-4 list-disc">
                        {result.mechanics.map((mech, index) => (
                          <li key={index} className="leading-relaxed">
                            {mech}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Twist Card */}
                    <div className="bg-[#110c26aa] border border-brand-violet/10 rounded-2xl p-5 md:p-6 space-y-2">
                      <div className="flex items-center gap-2 text-accent-lime">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-black">پیچش خلاقانه بازی (Creative Twist)</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {result.creativeTwist}
                      </p>
                    </div>

                    {/* Art style recommended */}
                    <div className="bg-[#110c26aa] border border-brand-violet/10 rounded-2xl p-5 md:p-6 space-y-2">
                      <div className="flex items-center gap-2 text-brand-sky">
                        <Layers3 className="w-4 h-4" />
                        <span className="text-xs font-black">سبک هنری پیشنهادی (Art Style)</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {result.artStyle}
                      </p>
                    </div>

                    {/* Tips 48 hours development */}
                    <div className="bg-[#110c26aa] border border-brand-violet/10 rounded-2xl p-5 md:p-6 space-y-3">
                      <div className="flex items-center gap-2 text-rose-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-black">نکات مدیریت زمان ۴۸ ساعته (Scope Management)</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-300 pr-4 list-decimal">
                        {result.tips.map((tip, index) => (
                          <li key={index} className="leading-relaxed">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </motion.div>
              )}

              {!isLoading && !error && !result && (
                /* Initial Idle visual card */
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[#110c2644] border border-brand-violet/10 rounded-2xl p-12 text-center space-y-5 h-full min-h-[400px] flex flex-col items-center justify-center backdrop-blur-sm"
                >
                  <Brain className="w-16 h-16 text-slate-600 animate-pulse" />
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-white">سند طراحی بازی شما در اینجا قرار خواهد گرفت</h3>
                    <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                      مشخصات بازی خود را در فرم سمت راست وارد کنید و دکمه تولید سند را کلیک کنید تا مربی هوشمند ایدهپردازی بازی را آغاز کند.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
