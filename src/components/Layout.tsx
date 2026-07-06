import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Newspaper, Users, Calendar, Heart, Shield, Menu, X, Info, MapPin, Gamepad2, Brain, BookOpen, FileSpreadsheet } from 'lucide-react';
import GgjLogo from './GgjLogo';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'خانه', path: '/' },
    { label: 'مربی هوشمند (AI)', path: '/ai-mentor', icon: <Brain className="w-4 h-4 text-accent-yellow" /> },
    { label: 'شعبه‌های برگزاری', path: '/jam-sites', icon: <MapPin className="w-4 h-4 text-brand-sky" /> },
    { label: 'آرشیو بازی‌ها', path: '/games', icon: <Gamepad2 className="w-4 h-4 text-accent-lime" /> },
    { label: 'راهنما و قوانین', path: '/guide', icon: <BookOpen className="w-4 h-4 text-purple-400" /> },
    { label: 'بسته رسانه‌ای', path: '/press-kit', icon: <Newspaper className="w-4 h-4" /> },
    { label: 'استودیوها', path: '/studios', icon: <Users className="w-4 h-4" /> },
    { label: 'GGJ Next', path: '/next', icon: <Calendar className="w-4 h-4" /> },
    { label: 'داوطلبان', path: '/volunteers', icon: <Heart className="w-4 h-4" /> },
    { label: 'اسپانسرها', path: '/sponsors', icon: <Shield className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Dev Warning Banner */}
      <div className="bg-amber-950/40 border-b border-amber-500/10 py-2.5 px-4 text-center text-amber-200 text-xs select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 text-[10px] font-black tracking-wider shrink-0 border border-amber-500/20">
            نسخه آزمایشی و پیش‌نمایش
          </span>
          <span className="text-amber-200/90 font-medium">
            توجه: این وبسایت صرفاً یک نسخه آزمایشی در حال توسعه است. تمامی محتواها، بازی‌ها و اطلاعات درج شده جنبه تستی داشته و هیچ‌گونه فعالیت تجاری یا ارتباط رسمی با برندها وجود ندارد.
          </span>
        </div>
      </div>

      {/* Header with glass effect and brand typography */}
      <header className="sticky top-0 z-50 bg-[#0b071ecc]/80 backdrop-blur-md border-b border-brand-violet/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Brand Logo & Title with TM/R details */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity">
              <GgjLogo className="w-8 h-8 sm:w-11 sm:h-11 shrink-0" />
              <div className="flex flex-col">
                <span className="font-jost font-black text-sm sm:text-lg tracking-tight text-white leading-none mb-0.5 uppercase">
                  GLOBAL GAME JAM<sup className="text-[8px] sm:text-[10px] font-bold text-accent-yellow">®</sup>
                </span>
                <span className="text-brand-sky text-[9px] sm:text-xs font-bold font-jost tracking-widest uppercase">
                  Iran Community
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[11px] font-bold transition-all px-2.5 py-1.5 rounded-lg flex items-center gap-1 ${
                    isActive(item.path)
                      ? 'text-accent-yellow bg-brand-purple/20 border border-brand-violet/30'
                      : 'text-slate-300 hover:text-brand-sky hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Accent Call to Action: Support / Donate button */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/sponsors"
                className="bg-accent-yellow hover:bg-accent-yellow/90 text-slate-950 text-xs font-black px-5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 shadow-lg shadow-accent-yellow/15"
              >
                حمایت از رویداد
              </Link>
            </div>

            {/* Mobile Menu Open Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0d0922] border-b border-brand-violet/20 px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'text-accent-yellow bg-brand-purple/30 border border-brand-violet/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-brand-violet/10">
              <Link
                to="/sponsors"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-accent-yellow hover:bg-accent-yellow/90 text-slate-950 text-sm font-black py-3 rounded-xl block transition-all shadow-lg"
              >
                حمایت از رویداد (اسپانسرشیپ)
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Body */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer with brand details and guidelines */}
      <footer className="bg-[#060410] border-t border-brand-violet/15 py-16 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <GgjLogo className="w-10 h-10" />
                <div className="flex flex-col">
                  <span className="font-jost font-black text-base tracking-tight text-white uppercase leading-none">
                    GLOBAL GAME JAM<sup className="text-[10px]">®</sup> Iran
                  </span>
                  <span className="text-brand-sky text-[10px] font-bold tracking-widest uppercase">
                    Official Community Portal
                  </span>
                </div>
              </div>
              
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                توانمندسازی جامعه بازی‌سازان مستقل ایران در بزرگترین رویداد خلق بازی جهان. با هدف ایجاد خلاقیت، آزمایش ابزارهای نوین، و ترویج کار تیمی و رفاقت‌های همیشگی در بستر جامعه بازی‌سازی.
              </p>
              
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 text-[11px] text-slate-500 leading-relaxed max-w-md">
                GLOBAL GAME JAM® و لوگوی مربوطه، علامت‌های تجاری ثبت شده Global Game Jam, Inc.® هستند. وبسایت حاضر پورتال رسمی جامعه فارسی‌زبان (Iran Community) با لیسانس معتبر است.
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky"></span>
                خدمات اصلی رویداد
              </h4>
              <ul className="space-y-3.5 text-xs text-slate-400">
                <li><Link to="/" className="hover:text-brand-sky transition-colors">خانه و مانیفست</Link></li>
                <li><Link to="/ai-mentor" className="hover:text-brand-sky transition-colors">مربی ایده ساز هوش مصنوعی</Link></li>
                <li><Link to="/jam-sites" className="hover:text-brand-sky transition-colors">شعبه‌های برگزاری رویداد</Link></li>
                <li><Link to="/games" className="hover:text-brand-sky transition-colors">آرشیو بازی‌های ساخته شده</Link></li>
                <li><Link to="/guide" className="hover:text-brand-sky transition-colors">راهنما و قوانین بقای ۴۸ ساعته</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime"></span>
                همکاری و مستندات
              </h4>
              <ul className="space-y-3.5 text-xs text-slate-400">
                <li><Link to="/press-kit" className="hover:text-accent-lime transition-colors">بسته رسانه‌ای (Press Kit)</Link></li>
                <li><Link to="/studios" className="hover:text-accent-lime transition-colors">ویترین استودیوهای مستقل</Link></li>
                <li><Link to="/next" className="hover:text-accent-lime transition-colors">رویداد کودکان (GGJ Next)</Link></li>
                <li><Link to="/volunteers" className="hover:text-accent-lime transition-colors">جذب داوطلب و کارآموزی</Link></li>
                <li><Link to="/sponsors" className="hover:text-accent-lime transition-colors">طرح‌های اسپانسرشیپ بومی</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-brand-violet/10 mt-16 pt-8 text-center text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Global Game Jam, Inc.® کلیه حقوق مادی و معنوی برای انجمن گلوبال گیم جم محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
