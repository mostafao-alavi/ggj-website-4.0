import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, MapPin, Users, Phone, Mail, Clock, Send, CheckCircle2, ShieldAlert, Sparkles, X, Layers } from 'lucide-react';

interface JamSite {
  id: string;
  city: string;
  cityEn: string;
  name: string;
  type: 'In-Person' | 'Online' | 'Hybrid';
  typeFa: string;
  venue: string;
  address: string;
  coordinator: string;
  coordinatorContact: string;
  coordinatorEmail: string;
  capacity: number;
  registeredCount: number;
  status: 'باز (ثبت‌نام فعال)' | 'تکمیل ظرفیت';
  desc: string;
}

const JAM_SITES_DATA: JamSite[] = [
  {
    id: 'site-tehran',
    city: 'تهران',
    cityEn: 'Tehran',
    name: 'شعبه مرکزی تهران - دانشگاه علم و صنعت',
    type: 'In-Person',
    typeFa: 'حضوری',
    venue: 'دانشکده مهندسی کامپیوتر، دانشگاه علم و صنعت ایران',
    address: 'تهران، میدان رسالت، خیابان هنگام، دانشگاه علم و صنعت ایران، دانشکده مهندسی کامپیوتر',
    coordinator: 'مهندس نوید علوی',
    coordinatorContact: '+۹۸ ۹۱۲ ۳۴۵ ۶۷۸۹',
    coordinatorEmail: 'tehran.coordinator@ggj-persia.ir',
    capacity: 120,
    registeredCount: 84,
    status: 'باز (ثبت‌نام فعال)',
    desc: 'بزرگ‌ترین و مجهزترین شعبه حضوری کشور همراه با اینترنت پرسرعت، پذیرایی و اتاق استراحت مجزا برای جمرها.'
  },
  {
    id: 'site-isfahan',
    city: 'اصفهان',
    cityEn: 'Isfahan',
    name: 'شعبه اصفهان - شتاب‌دهنده بازی‌سازی پویا',
    type: 'In-Person',
    typeFa: 'حضوری',
    venue: 'فضای اشتراکی و شتاب‌دهی اصفهان‌تک',
    address: 'اصفهان، خیابان فرایبورگ، کوچه شماره ۴، پلاک ۱۲',
    coordinator: 'دکتر مریم احمدی',
    coordinatorContact: '+۹۸ ۹۱۳ ۴۵۶ ۷۸۹۰',
    coordinatorEmail: 'isfahan.coordinator@ggj-persia.ir',
    capacity: 60,
    registeredCount: 58,
    status: 'باز (ثبت‌نام فعال)',
    desc: 'محیطی کاملاً پویا و صمیمی برای بازی‌سازان مرکز و جنوب کشور با دسترسی عالی به منتورهای فنی بازی‌سازی.'
  },
  {
    id: 'site-shiraz',
    city: 'شیراز',
    cityEn: 'Shiraz',
    name: 'شعبه شیراز - هاب فناوری‌های خلاق پارس',
    type: 'Hybrid',
    typeFa: 'هیبریدی',
    venue: 'پارک علم و فناوری استان فارس',
    address: 'شیراز، بلوار دکتر حسابی، شهرک فناوری صنایع شیمیایی، مجتمع فناوری پارس',
    coordinator: 'مهندس آرش جهانشاهی',
    coordinatorContact: '+۹۸ ۹۱۷ ۲۳۴ ۵۶۷۸',
    coordinatorEmail: 'shiraz.coordinator@ggj-persia.ir',
    capacity: 50,
    registeredCount: 50,
    status: 'تکمیل ظرفیت',
    desc: 'شعبه ویژه هیبریدی با پاتوق‌های حضوری نیمه‌وقت و منتورینگ ۲۴ ساعته بر بستر دیسکورد.'
  },
  {
    id: 'site-mashhad',
    city: 'مشهد',
    cityEn: 'Mashhad',
    name: 'شعبه مشهد - مجتمع هنر دیجیتال آفتاب',
    type: 'In-Person',
    typeFa: 'حضوری',
    venue: 'سالن چندمنظوره مجتمع پارک فناوری خراسان',
    address: 'مشهد، کیلومتر ۱۲ بزرگراه آسیایی، پارک علم و فناوری خراسان',
    coordinator: 'مهندس رضا رضوی',
    coordinatorContact: '+۹۸ ۹۱۵ ۷۸۹ ۰۱۲۳',
    coordinatorEmail: 'mashhad.coordinator@ggj-persia.ir',
    capacity: 45,
    registeredCount: 30,
    status: 'باز (ثبت‌نام فعال)',
    desc: 'تمرکز بالا بر سبک‌های هنری و طراحی بازی‌های مستقل دو بعدی همراه با ورک‌شاپ‌های رایگان ایدهپردازی در روز اول.'
  },
  {
    id: 'site-online',
    city: 'کشوری',
    cityEn: 'Online / Remote',
    name: 'شعبه مجازی سراسری - Discord Live',
    type: 'Online',
    typeFa: 'مجازی',
    venue: 'سرور دیسکورد رسمی جامعه بازی‌سازان ایران (GGJ Iran)',
    address: 'لینک فعال در پروفایل ثبت‌نام‌کنندگان و پنل دیسکورد رویداد ارسال خواهد شد.',
    coordinator: 'تیم پشتیبانی جامعه بازی‌سازی ایران',
    coordinatorContact: '+۹۸ ۲۱ ۸۸۹۰ ۱۲۳۴',
    coordinatorEmail: 'online.support@ggj-persia.ir',
    capacity: 2000,
    registeredCount: 412,
    status: 'باز (ثبت‌نام فعال)',
    desc: 'میزبانی همه‌جانبه آنلاین برای بازی‌سازانی که امکان حضور فیزیکی ندارند یا مایلند به صورت ریموت از خانه با جمرهای جهانی ارتباط بگیرند.'
  },
  {
    id: 'site-tabriz',
    city: 'تبریز',
    cityEn: 'Tabriz',
    name: 'شعبه تبریز - دانشگاه تبریز (مرکز رشد)',
    type: 'In-Person',
    typeFa: 'حضوری',
    venue: 'مرکز نوآوری و رشد فناوری‌های پیشرفته دانشگاه تبریز',
    address: 'تبریز، بلوار ۲۹ بهمن، دانشگاه تبریز، مجتمع مراکز رشد نوآوری',
    coordinator: 'دکتر آیدین بهرامی',
    coordinatorContact: '+۹۸ ۹۱۴ ۵۶۷ ۸۹۰۱',
    coordinatorEmail: 'tabriz.coordinator@ggj-persia.ir',
    capacity: 40,
    registeredCount: 22,
    status: 'باز (ثبت‌نام فعال)',
    desc: 'هاب اختصاصی بازی‌سازان شمال غرب کشور با حمایت انجمن‌های علمی برجسته فناوری اطلاعات.'
  }
];

export default function JamSites() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'In-Person' | 'Online' | 'Hybrid'>('ALL');
  
  // Registration Form Modal States
  const [selectedSiteForReg, setSelectedSiteForReg] = useState<JamSite | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'برنامه‌نویس',
    experience: 'متوسط',
    bio: ''
  });
  const [isRegisteredSuccess, setIsRegisteredSuccess] = useState(false);

  // Filtered sites
  const filteredSites = JAM_SITES_DATA.filter(site => {
    const matchesSearch = 
      site.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.coordinator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.cityEn.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === 'ALL' || site.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const handleOpenReg = (site: JamSite) => {
    if (site.status === 'تکمیل ظرفیت') {
      alert('ظرفیت این شعبه تکمیل شده است. پیشنهاد می‌کنیم در شعبه مجازی یا سایر شعبه‌ها ثبت‌نام کنید.');
      return;
    }
    setSelectedSiteForReg(site);
    setIsRegisteredSuccess(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('لطفاً فیلدهای ضروری را پر کنید.');
      return;
    }
    // Simulate real database submission
    setIsRegisteredSuccess(true);
    // Auto increment visual state counter safely for demo
    if (selectedSiteForReg) {
      selectedSiteForReg.registeredCount += 1;
    }
  };

  return (
    <div className="min-h-screen bg-[#070412] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-jost" dir="rtl">
      
      {/* Decorative backdrop glow circles */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-brand-sky/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Title with Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-brand-violet/10 border border-brand-violet/20 rounded-full text-brand-sky text-xs font-black tracking-widest uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-yellow animate-spin" style={{ animationDuration: '6s' }} />
            <span>FIND YOUR TRIBE & HUB</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
          >
            شعبه‌های رسمی برگزاری ماراتن
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm md:text-base leading-relaxed"
          >
            رویداد گلوبال گیم جم به طور همزمان در پاتوق‌های حضوری سراسر کشور و سرور دیسکورد کشوری برگزار می‌شود. هاب مورد نظر خود را بیابید و همین حالا جایگاه خود را رزرو کنید.
          </motion.p>
        </div>

        {/* Search and Filters panel */}
        <div className="bg-slate-950/60 border border-brand-violet/15 backdrop-blur-md p-5 rounded-2xl max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input Box */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 right-3.5 flex items-center text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو بر اساس شهر، نام شعبه، هماهنگ‌کننده..."
              className="w-full bg-[#110c2688] border border-slate-800 focus:border-brand-sky rounded-xl py-3 pr-10 pl-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-all text-right"
            />
          </div>

          {/* Advanced Filter Buttons */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end">
            <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5 ml-2">
              <Filter className="w-3 h-3 text-brand-sky" /> دسته‌بندی:
            </span>
            {[
              { id: 'ALL', label: 'همه شعبه‌ها' },
              { id: 'In-Person', label: 'حضوری (In-Person)' },
              { id: 'Online', label: 'مجازی (Online)' },
              { id: 'Hybrid', label: 'هیبریدی (Hybrid)' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === f.id
                    ? 'bg-brand-sky text-slate-950'
                    : 'bg-slate-900/60 hover:bg-slate-900 text-slate-300 border border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sites Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredSites.length > 0 ? (
            filteredSites.map((site) => (
              <motion.div
                key={site.id}
                layoutId={`site-card-${site.id}`}
                whileHover={{ y: -5 }}
                className="bg-[#110c2688]/90 border border-brand-violet/15 rounded-2xl p-6 flex flex-col justify-between h-full relative overflow-hidden shadow-xl"
              >
                {/* Visual Type Badge */}
                <div className="absolute top-0 left-0">
                  <span className={`text-[10px] font-black tracking-widest px-4 py-1.5 rounded-br-2xl inline-block ${
                    site.type === 'In-Person' 
                      ? 'bg-brand-purple text-white border-r border-b border-brand-violet/20' 
                      : site.type === 'Online'
                      ? 'bg-brand-sky text-slate-950'
                      : 'bg-accent-yellow text-slate-950'
                  }`}>
                    {site.typeFa} ({site.type})
                  </span>
                </div>

                <div className="space-y-4 pt-4">
                  {/* City Name Header */}
                  <div className="flex items-center gap-2">
                    <div className="bg-brand-sky/10 p-2 rounded-xl text-brand-sky shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono tracking-wider block" dir="ltr">{site.cityEn.toUpperCase()}</span>
                      <h3 className="text-xl font-black text-white">{site.city}</h3>
                    </div>
                  </div>

                  {/* Site Name and description */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-slate-200">{site.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed min-h-[48px]">{site.desc}</p>
                  </div>

                  {/* Specs Lists */}
                  <div className="bg-[#0b081e88] border border-brand-violet/5 p-3 rounded-xl space-y-2.5 text-xs">
                    <div className="flex justify-between items-center text-slate-400">
                      <span>مکان برگزاری:</span>
                      <strong className="text-slate-200 truncate max-w-[150px]">{site.venue}</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>ظرفیت پذیرش:</span>
                      <strong className="text-slate-200">{site.capacity} نفر</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>ثبت‌نام‌ شده:</span>
                      <strong className="text-brand-sky">{site.registeredCount} نفر</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>هماهنگ‌کننده:</span>
                      <strong className="text-slate-200">{site.coordinator}</strong>
                    </div>
                  </div>
                </div>

                {/* Status Bar & Action Button */}
                <div className="border-t border-brand-violet/10 pt-4 mt-6 flex items-center justify-between">
                  <span className={`text-[11px] font-bold ${
                    site.status === 'تکمیل ظرفیت' ? 'text-rose-400' : 'text-accent-lime'
                  }`}>
                    ● {site.status}
                  </span>
                  
                  <button
                    onClick={() => handleOpenReg(site)}
                    disabled={site.status === 'تکمیل ظرفیت'}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                      site.status === 'تکمیل ظرفیت'
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                        : 'bg-accent-yellow hover:bg-accent-yellow/90 text-slate-950 shadow-lg shadow-accent-yellow/10 hover:scale-[1.03] active:scale-95'
                    }`}
                  >
                    {site.status === 'تکمیل ظرفیت' ? 'تکمیل ظرفیت' : 'ثبت‌نام مستقیم'}
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center space-y-3">
              <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-white">هیچ شعبه‌ای با مشخصات فوق یافت نشد!</h3>
              <p className="text-slate-400 text-xs">لطفاً املای کلمات را بررسی کنید یا دسته‌بندی فیلترها را تغییر دهید.</p>
            </div>
          )}
        </div>

        {/* Modal registration drawer using AnimatePresence */}
        <AnimatePresence>
          {selectedSiteForReg && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSiteForReg(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              />

              {/* Form Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-xl bg-slate-900 border border-brand-violet/25 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-y-auto max-h-[90vh] z-10 text-right shadow-2xl"
              >
                {/* Header Close */}
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-accent-yellow" />
                    <h3 className="text-xl font-black text-white">ثبت‌نام مستقیم ماراتن بازی‌سازی</h3>
                  </div>
                  <button
                    onClick={() => setSelectedSiteForReg(null)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {isRegisteredSuccess ? (
                  /* Success Feedback Panel */
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="bg-accent-lime/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-accent-lime/30 text-accent-lime">
                      <CheckCircle2 className="w-10 h-10 animate-bounce" />
                    </div>
                    <h4 className="text-xl font-black text-white">ثبت‌نام شما با موفقیت تأیید شد!</h4>
                    <p className="text-slate-300 text-xs md:text-sm max-w-sm mx-auto leading-relaxed">
                      بلیت ورود دیجیتال شما صادر شد. یک ایمیل تأییدیه همراه با جزئیات هماهنگی شعبه به آدرس <strong className="text-brand-sky">{formData.email}</strong> ارسال گردید.
                    </p>
                    <div className="bg-slate-950 p-4 rounded-xl border border-brand-violet/10 text-right space-y-1.5 max-w-sm mx-auto">
                      <div className="text-[10px] text-slate-500 font-mono" dir="ltr">JAM SITE ID: {selectedSiteForReg.id.toUpperCase()}</div>
                      <div className="text-xs text-slate-300"><strong>شعبه انتخابی:</strong> {selectedSiteForReg.name}</div>
                      <div className="text-xs text-slate-300"><strong>نقش شما:</strong> {formData.role}</div>
                      <div className="text-xs text-slate-300"><strong>هماهنگ‌کننده:</strong> {selectedSiteForReg.coordinator} ({selectedSiteForReg.coordinatorContact})</div>
                    </div>
                    <button
                      onClick={() => setSelectedSiteForReg(null)}
                      className="bg-brand-sky hover:bg-brand-sky/80 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs transition-all mt-4"
                    >
                      بستن پنجره ثبت‌نام
                    </button>
                  </motion.div>
                ) : (
                  /* Form Fields */
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="bg-brand-sky/5 border border-brand-sky/10 p-3.5 rounded-xl text-xs space-y-1 text-right">
                      <span className="text-brand-sky font-bold">شعبه انتخاب شده:</span>
                      <p className="text-white font-bold text-sm">{selectedSiteForReg.name}</p>
                      <p className="text-slate-400 text-[11px] flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" /> {selectedSiteForReg.address}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5 text-right">
                        <label className="text-xs text-slate-400 font-bold block">نام و نام خانوادگی (ضروری)</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="مثال: علی رضایی"
                          className="w-full bg-[#110c2688] border border-slate-800 focus:border-brand-sky rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-sky text-right"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5 text-right">
                        <label className="text-xs text-slate-400 font-bold block">آدرس ایمیل (ضروری)</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="مثال: dev@domain.com"
                          className="w-full bg-[#110c2688] border border-slate-800 focus:border-brand-sky rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-sky text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="space-y-1.5 text-right">
                        <label className="text-xs text-slate-400 font-bold block">شماره موبایل (ضروری)</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                          className="w-full bg-[#110c2688] border border-slate-800 focus:border-brand-sky rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-sky text-left"
                          dir="ltr"
                        />
                      </div>

                      {/* Specialized Role Select */}
                      <div className="space-y-1.5 text-right">
                        <label className="text-xs text-slate-400 font-bold block">نقش تخصصی در ماراتن</label>
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full bg-[#110c2688] border border-slate-800 focus:border-brand-sky rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-sky appearance-none text-right"
                        >
                          <option value="برنامه‌نویس">برنامه‌نویس موتور بازی (Coder)</option>
                          <option value="طراح بازی">طراح بازی (Game Designer)</option>
                          <option value="گرافیست دو بعدی">گرافیست دو بعدی (2D Artist)</option>
                          <option value="گرافیست سه بعدی">گرافیست سه بعدی (3D Artist)</option>
                          <option value="آهنگساز و طراح صدا">آهنگساز و طراح صدا (Sound/Music)</option>
                          <option value="نویسنده داستان">نویسنده و طراح روایت (Writer)</option>
                        </select>
                      </div>
                    </div>

                    {/* Level Select */}
                    <div className="space-y-1.5 text-right">
                      <label className="text-xs text-slate-400 font-bold block">سطح تجربه بازی‌سازی</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['مبتدی', 'متوسط', 'حرفه‌ای'].map(lvl => (
                          <button
                            type="button"
                            key={lvl}
                            onClick={() => setFormData({ ...formData, experience: lvl })}
                            className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                              formData.experience === lvl
                                ? 'bg-brand-purple border-brand-violet text-white font-black'
                                : 'bg-[#110c2688] border-slate-800 text-slate-400 hover:text-slate-300'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bio Description */}
                    <div className="space-y-1.5 text-right">
                      <label className="text-xs text-slate-400 font-bold block">معرفی کوتاه یا تخصص‌ها (اختیاری)</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="در حد یک خط بنویسید با چه نرم‌افزارها و ابزارهایی مهارت دارید (مثال: تسلط به یونیتی و زبان سی‌شارپ)"
                        rows={3}
                        className="w-full bg-[#110c2688] border border-slate-800 focus:border-brand-sky rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-sky text-right"
                      />
                    </div>

                    {/* Warning disclaimer */}
                    <div className="bg-[#0b081e88] border border-slate-800 p-3 rounded-xl text-[10px] text-slate-400 leading-normal">
                      ● با ثبت‌نام در این شعبه، قوانین حضور و آیین‌نامه سلامت و ایمنی Global Game Jam را می‌پذیرید. تأیید نهایی منوط به تأییدیه هماهنگ‌کننده شعبه است.
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 justify-end pt-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setSelectedSiteForReg(null)}
                        className="px-5 py-3 rounded-xl text-xs font-bold bg-[#1a1438] hover:bg-[#231b4b] text-slate-300 transition-all"
                      >
                        انصراف
                      </button>
                      <button
                        type="submit"
                        className="flex-grow sm:flex-grow-0 bg-accent-yellow hover:bg-accent-yellow/90 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-accent-yellow/10"
                      >
                        ارسال فرم ثبت‌نام <Send className="w-3.5 h-3.5 rotate-180" />
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
