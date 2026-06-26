import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileSpreadsheet, 
  User, 
  Plus, 
  Link, 
  ExternalLink, 
  CheckCircle, 
  RefreshCw, 
  LogOut, 
  Sparkles, 
  Users, 
  Brain, 
  Copy, 
  Settings, 
  AlertTriangle 
} from 'lucide-react';
import { 
  googleSignIn, 
  initAuth, 
  logout, 
  createGGJSpreadsheet, 
  readSheetData 
} from '../lib/googleSheets';
import { User as FirebaseUser } from 'firebase/auth';

export default function GoogleSheets() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [spreadsheetId, setSpreadsheetId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Sheet contents
  const [volunteerRows, setVolunteerRows] = useState<any[][]>([]);
  const [aiIdeasRows, setAiIdeasRows] = useState<any[][]>([]);
  const [activeTab, setActiveTab] = useState<'volunteers' | 'aiIdeas'>('volunteers');
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

  useEffect(() => {
    // Load existing Spreadsheet ID if saved
    const savedId = localStorage.getItem('ggj_spreadsheet_id');
    if (savedId) {
      setSpreadsheetId(savedId);
    }

    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
        setIsInitializing(false);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
        setIsInitializing(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Fetch sheet data to showcase the real integration working
  useEffect(() => {
    if (accessToken && spreadsheetId) {
      fetchSheetContent();
    } else {
      setVolunteerRows([]);
      setAiIdeasRows([]);
    }
  }, [accessToken, spreadsheetId]);

  const fetchSheetContent = async () => {
    if (!accessToken || !spreadsheetId) return;
    setIsFetchingData(true);
    try {
      const vData = await readSheetData(accessToken, spreadsheetId, 'داوطلبان!A2:H50');
      setVolunteerRows(vData);

      const aiData = await readSheetData(accessToken, spreadsheetId, 'ایده‌های هوش مصنوعی!A2:I50');
      setAiIdeasRows(aiData);
    } catch (err: any) {
      console.warn('Failed to load sheet data:', err);
    } finally {
      setIsFetchingData(false);
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setAccessToken(result.accessToken);
        setMessage({ text: 'با موفقیت به حساب گوگل خود متصل شدید.', type: 'success' });
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'خطا در برقراری ارتباط با گوگل.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentUser(null);
      setAccessToken(null);
      setMessage({ text: 'از حساب گوگل خود خارج شدید.', type: 'success' });
    } catch (err: any) {
      setMessage({ text: 'خطا در خروج از حساب کاربری.', type: 'error' });
    }
  };

  const handleCreateSheet = async () => {
    if (!accessToken) return;
    setIsLoading(true);
    setMessage(null);
    try {
      const newSheetId = await createGGJSpreadsheet(accessToken);
      setSpreadsheetId(newSheetId);
      localStorage.setItem('ggj_spreadsheet_id', newSheetId);
      setMessage({ 
        text: 'گوگل شیت اختصاصی رویداد با موفقیت در گوگل درایو شما ساخته و پیکربندی شد.', 
        type: 'success' 
      });
    } catch (err: any) {
      setMessage({ text: err.message || 'خطا در ساخت شیت اختصاصی.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSpreadsheetId = (e: React.FormEvent) => {
    e.preventDefault();
    if (spreadsheetId.trim()) {
      localStorage.setItem('ggj_spreadsheet_id', spreadsheetId.trim());
      setMessage({ text: 'شناسه گوگل شیت با موفقیت در تنظیمات مرورگر ذخیره شد.', type: 'success' });
      fetchSheetContent();
    } else {
      localStorage.removeItem('ggj_spreadsheet_id');
      setMessage({ text: 'شناسه گوگل شیت حذف شد.', type: 'success' });
    }
  };

  const copyToClipboard = () => {
    if (!spreadsheetId) return;
    navigator.clipboard.writeText(spreadsheetId);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#070412] flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 text-brand-sky animate-spin mx-auto" />
          <p className="text-slate-400 text-sm">در حال بررسی ارتباط با گوگل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070412] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-jost" dir="rtl">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-brand-purple/5 blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black tracking-widest uppercase"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>CLOUD STORAGE INTEGRATION</span>
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            یکپارچه‌سازی با گوگل شیتس (Google Sheets)
          </h1>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            با فعال‌سازی این بخش، تمامی ثبت‌نام‌های داوطلبان رویداد و ایده‌های خلاقانه بازی‌سازی تولید شده توسط مربی هوش مصنوعی مستقیماً به صورت ریل‌تایم و خودکار در سند گوگل شیت شخصی شما ذخیره و آرشیو خواهند شد.
          </p>
        </div>

        {/* Message Banner */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                message.type === 'success' 
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' 
                  : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
              }`}
            >
              <div className="mt-0.5">
                <CheckCircle className="w-5 h-5 shrink-0" />
              </div>
              <span className="text-xs md:text-sm font-medium">{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Double-Grid Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Right Column: Setup, Auth, Config (Grid span 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Box 1: Account Status */}
            <div className="bg-[#0e0a26]/70 border border-brand-violet/15 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
              <h2 className="text-sm font-bold text-slate-200 mb-5 flex items-center gap-2 border-b border-brand-violet/10 pb-3">
                <User className="w-4 h-4 text-brand-sky" />
                وضعیت حساب کاربری گوگل
              </h2>

              {!currentUser ? (
                <div className="space-y-4 py-2">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    برای شروع یکپارچه‌سازی و اختصاصی‌سازی فضای ذخیره‌سازی، لطفاً ابتدا از طریق دکمه رسمی زیر به حساب گوگل خود متصل شوید:
                  </p>
                  
                  <button 
                    onClick={handleSignIn}
                    disabled={isLoading}
                    className="gsi-material-button w-full cursor-pointer hover:shadow-lg hover:shadow-brand-purple/10 transition-all flex items-center justify-center"
                  >
                    <div className="gsi-material-button-state"></div>
                    <div className="gsi-material-button-content-wrapper">
                      <div className="gsi-material-button-icon">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        </svg>
                      </div>
                      <span className="gsi-material-button-contents font-sans font-medium text-xs">Sign in with Google</span>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-brand-purple/10 border border-brand-violet/20 p-3 rounded-xl">
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt={currentUser.displayName || ''} 
                        className="w-10 h-10 rounded-full border border-brand-sky/30"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-brand-sky/20 flex items-center justify-center text-brand-sky font-bold">
                        {currentUser.displayName?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{currentUser.displayName}</div>
                      <div className="text-[10px] text-slate-400 truncate font-mono">{currentUser.email}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleLogout}
                      className="flex-1 py-2 px-3 border border-rose-500/20 hover:bg-rose-500/10 text-rose-400 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      قطع اتصال حساب
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Box 2: Google Sheet Configuration */}
            <div className="bg-[#0e0a26]/70 border border-brand-violet/15 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
              <h2 className="text-sm font-bold text-slate-200 mb-5 flex items-center gap-2 border-b border-brand-violet/10 pb-3">
                <Settings className="w-4 h-4 text-emerald-400" />
                تنظیمات سند گوگل شیت
              </h2>

              <div className="space-y-5">
                {currentUser && !spreadsheetId && (
                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-3">
                    <p className="text-[11px] text-emerald-300/90 leading-relaxed">
                      شما می‌توانید با یک کلیک، یک گوگل شیت جدید و کاملاً مهندسی‌شده در اکانت خود بسازید که بلافاصله آماده ذخیره اطلاعات باشد.
                    </p>
                    <button
                      onClick={handleCreateSheet}
                      disabled={isLoading}
                      className="w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 text-slate-950 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10"
                    >
                      <Plus className="w-4 h-4" />
                      ساخت گوگل شیت اختصاصی رویداد
                    </button>
                  </div>
                )}

                <form onSubmit={handleSaveSpreadsheetId} className="space-y-4">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-2 font-bold">
                      شناسه سند گوگل شیت (Spreadsheet ID):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={spreadsheetId}
                        onChange={(e) => setSpreadsheetId(e.target.value)}
                        placeholder="شناسه سند یا آدرس کامل گوگل شیت را وارد کنید"
                        className="flex-1 bg-[#0b071e] border border-brand-violet/20 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-brand-sky/40 text-left"
                        dir="ltr"
                      />
                      {spreadsheetId && (
                        <button
                          type="button"
                          onClick={copyToClipboard}
                          className="px-2.5 bg-brand-purple/20 border border-brand-violet/20 rounded-xl text-slate-300 hover:text-white transition-all"
                          title="کپی شناسه"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-brand-sky/30 hover:bg-brand-sky/10 text-brand-sky rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Link className="w-3.5 h-3.5" />
                    ذخیره و پیوند سند به سیستم
                  </button>
                </form>

                {spreadsheetId && (
                  <div className="pt-3 border-t border-brand-violet/10 flex flex-col gap-2">
                    <a
                      href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-brand-sky hover:underline flex items-center gap-1 self-start"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      مشاهده سند در گوگل درایو شما
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Guide Info */}
            <div className="bg-[#1b1510]/30 border border-amber-500/10 rounded-2xl p-4 text-xs text-amber-300/80 leading-relaxed flex gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
              <div>
                <span className="font-bold block mb-1 text-amber-200 text-xs">راهنمای بهینه‌سازی گیت‌هاب و کلودفلر</span>
                در هنگام استقرار برنامه روی <strong className="text-white">Cloudflare Pages</strong>، حتماً متغیر محیطی <code className="text-white bg-slate-900/50 px-1 rounded font-mono">GEMINI_API_KEY</code> را در تنظیمات بخش Environment Variables پنل کلودفلر تعریف نمایید تا مربی هوش مصنوعی بر روی بستر کلودفلر بدون اختلال کار کند.
              </div>
            </div>

          </div>

          {/* Left Column: Data table showcase (Grid span 7) */}
          <div className="lg:col-span-7 bg-[#0e0a26]/70 border border-brand-violet/15 rounded-2xl p-6 backdrop-blur-md flex flex-col min-h-[400px]">
            
            {/* Table Header and Tabs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-violet/10 pb-4 mb-5">
              <div>
                <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  داده‌های واقعی ذخیره شده در گوگل شیت
                </h2>
                <p className="text-[11px] text-slate-400 mt-1">
                  آخرین سطرهای ثبت شده روی سند شما به صورت آنلاین و ریل‌تایم:
                </p>
              </div>

              {spreadsheetId && accessToken && (
                <button
                  onClick={fetchSheetContent}
                  disabled={isFetchingData}
                  className="p-1.5 bg-brand-purple/20 border border-brand-violet/20 rounded-lg hover:text-white transition-all text-xs text-slate-300 flex items-center gap-1 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isFetchingData ? 'animate-spin' : ''}`} />
                  به‌روزرسانی
                </button>
              )}
            </div>

            {/* Tab switch buttons */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab('volunteers')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'volunteers'
                    ? 'bg-brand-sky/20 text-brand-sky border border-brand-sky/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                داوطلبان ({volunteerRows.length})
              </button>
              <button
                onClick={() => setActiveTab('aiIdeas')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'aiIdeas'
                    ? 'bg-accent-yellow/20 text-accent-yellow border border-accent-yellow/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Brain className="w-3.5 h-3.5" />
                ایده‌های هوش مصنوعی ({aiIdeasRows.length})
              </button>
            </div>

            {/* Table or Empty States */}
            <div className="flex-1 overflow-x-auto">
              {!spreadsheetId ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                  <FileSpreadsheet className="w-10 h-10 text-slate-600 animate-pulse" />
                  <p className="text-xs text-slate-400 max-w-sm">
                    هنوز گوگل شیتی متصل نشده است. لطفاً ابتدا از طریق بخش راست، گوگل شیت اختصاصی رویداد را بسازید یا پیوند دهید.
                  </p>
                </div>
              ) : !accessToken ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                  <User className="w-10 h-10 text-slate-600" />
                  <p className="text-xs text-slate-400 max-w-sm">
                    جهت بارگذاری و مشاهده داده‌های جدول، نیاز است ابتدا به حساب گوگل خود متصل شوید.
                  </p>
                </div>
              ) : isFetchingData ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                  <RefreshCw className="w-8 h-8 text-brand-sky animate-spin" />
                  <p className="text-xs text-slate-400">در حال همگام‌سازی و خواندن ریل‌تایم سطرها...</p>
                </div>
              ) : (
                <>
                  {activeTab === 'volunteers' ? (
                    volunteerRows.length === 0 ? (
                      <div className="py-12 text-center text-xs text-slate-500">
                        سطری در این تب ثبت نشده است. اولین داوطلب جدید که در فرم ثبت نام کند، اطلاعاتش در اینجا ظاهر می‌شود!
                      </div>
                    ) : (
                      <table className="w-full text-right text-xs">
                        <thead>
                          <tr className="border-b border-brand-violet/10 text-slate-300 font-bold bg-brand-purple/5">
                            <th className="py-2 px-3">نام داوطلب</th>
                            <th className="py-2 px-3">شهر</th>
                            <th className="py-2 px-3">نقش پیشنهادی</th>
                            <th className="py-2 px-3">شماره تماس</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-violet/10 text-slate-400">
                          {volunteerRows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                              <td className="py-2.5 px-3 font-bold text-white">{row[0]}</td>
                              <td className="py-2.5 px-3">{row[3]}</td>
                              <td className="py-2.5 px-3">
                                <span className="inline-block px-2 py-0.5 rounded bg-brand-sky/10 text-brand-sky text-[10px] font-bold">
                                  {row[4]}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 font-mono text-[10px]">{row[2]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )
                  ) : (
                    aiIdeasRows.length === 0 ? (
                      <div className="py-12 text-center text-xs text-slate-500">
                        هیچ ایده ذخیره شده‌ای یافت نشد. به بخش «مربی هوشمند» بروید و اولین ایده تولیدی خود را در گوگل شیت ثبت کنید!
                      </div>
                    ) : (
                      <table className="w-full text-right text-xs">
                        <thead>
                          <tr className="border-b border-brand-violet/10 text-slate-300 font-bold bg-brand-purple/5">
                            <th className="py-2 px-3">عنوان بازی</th>
                            <th className="py-2 px-3">موضوع/تم</th>
                            <th className="py-2 px-3">سبک بازی</th>
                            <th className="py-2 px-3">پیچش خلاقانه</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-violet/10 text-slate-400">
                          {aiIdeasRows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                              <td className="py-2.5 px-3 font-bold text-white">{row[0]}</td>
                              <td className="py-2.5 px-3">{row[1]}</td>
                              <td className="py-2.5 px-3">{row[2]}</td>
                              <td className="py-2.5 px-3 text-slate-400 max-w-[200px] truncate" title={row[6]}>{row[6]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )
                  )}
                </>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
