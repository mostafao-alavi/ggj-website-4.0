import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Play, Calendar, MapPin, Globe, Sparkles, Send, Mail, Gamepad2, ArrowUpRight, Monitor, Video, GraduationCap, Flame, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target date: Jan 25, 2027
    const targetDate = new Date('2027-01-25T00:00:00Z').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-1.5 xs:gap-3 md:gap-5 max-w-2xl mx-auto mt-8 font-jost" dir="ltr">
      {[
        { label: 'DAYS', value: timeLeft.days, color: 'text-brand-sky' },
        { label: 'HOURS', value: timeLeft.hours, color: 'text-brand-sky' },
        { label: 'MINUTES', value: timeLeft.minutes, color: 'text-brand-sky' },
        { label: 'SECONDS', value: timeLeft.seconds, color: 'text-accent-yellow' },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center bg-[#150f2bcc]/90 rounded-xl sm:rounded-2xl p-2 xs:p-4 md:p-6 border border-brand-violet/15 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-sky/20 to-transparent"></div>
          <span className={`text-xl xs:text-3xl md:text-5xl font-black mb-1.5 tracking-tight ${item.color}`}>
            {item.value.toString().padStart(2, '0')}
          </span>
          <span className="text-[8px] xs:text-[10px] font-black text-slate-400 tracking-wider font-jost">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const jamSites = [
    {
      city: 'تهران',
      venue: 'دانشگاه صنعتی شریف / دانشگاه امیرکبیر',
      type: 'فیزیکی و آنلاین',
      status: 'آماده پذیرش کادر اجرایی',
      color: 'border-brand-sky/20 hover:border-brand-sky/60'
    },
    {
      city: 'اصفهان',
      venue: 'دانشگاه اصفهان (مجموعه رشد و هنر)',
      type: 'حضوری / فیزیکی',
      status: 'در حال هماهنگی فضا',
      color: 'border-brand-violet/20 hover:border-brand-violet/60'
    },
    {
      city: 'مشهد',
      venue: 'شتاب‌دهنده فردوسی / دانشگاه فردوسی',
      type: 'حضوری و آنلاین',
      status: 'تایید نهایی مربیان',
      color: 'border-accent-lime/20 hover:border-accent-lime/60'
    },
    {
      city: 'تبریز',
      venue: 'دانشگاه تبریز (باشگاه بازی‌سازی)',
      type: 'حضوری',
      status: 'در حال ثبت سایت فیزیکی',
      color: 'border-brand-sky/20 hover:border-brand-sky/60'
    },
    {
      city: 'شیراز',
      venue: 'موسسه آموزش عالی آپادانا',
      type: 'فیزیکی حضوری',
      status: 'ظرفیت رو به اتمام برای کادر',
      color: 'border-accent-yellow/20 hover:border-accent-yellow/60'
    }
  ];

  const currentEvents = [
    {
      title: 'رویداد مأموریت‌های خرد (Micro-Missions)',
      subtitle: 'پروژه‌های کوچک، تأثیرات بزرگ',
      desc: 'فراخوان سراسری برای مینی‌جم‌های موضوعی فصلی با اهداف بومی و اجتماعی در طول سال.',
      date: 'جاری - پاییز ۱۴۰۵',
      tag: 'GGJ Micro',
      tagColor: 'text-brand-sky bg-brand-sky/10 border-brand-sky/20'
    },
    {
      title: 'Climate Jam 2026',
      subtitle: 'کاشت ایده برای تغییر اقلیم',
      desc: 'همکاری رسمی با IndieCade برای طراحی بازی‌های تأثیرگذار زیست‌محیطی با تم کاشت دانه.',
      date: '۱ جولای تا ۱۰ آگوست ۲۰۲۶',
      tag: 'محیط زیست',
      tagColor: 'text-accent-lime bg-accent-lime/10 border-accent-lime/20'
    },
    {
      title: 'وبینار تکنولوژی موتورهای بازی جدید',
      subtitle: 'آماده‌سازی برای بازی رویداد',
      desc: 'مجموعه کارگاه‌های آنلاین بومی با حضور بازی‌سازان بین‌المللی جهت یادگیری تکنیک‌های سرورهای آنلاین در ۴۸ ساعت.',
      date: 'آذر ۱۴۰۵',
      tag: 'ورکشاپ فنی',
      tagColor: 'text-accent-yellow bg-accent-yellow/10 border-accent-yellow/20'
    }
  ];

  return (
    <div className="flex flex-col w-full">
      
      {/* Hero Section with Official Sunburst branding and space gradients */}
      <section className="ggj-sunburst-bg relative pt-24 pb-36 overflow-hidden border-b border-brand-violet/20">
        <div className="ggj-sunburst-overlay"></div>
        
        {/* Glow ambient spots */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-sky/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-purple/40 border border-brand-violet/30 text-brand-sky text-xs font-bold font-jost mb-6 uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5 text-accent-yellow animate-pulse" /> Global Game Jam® Iran 2027
            </span>
            
            <h1 className="text-4xl xs:text-5xl md:text-8xl font-black text-white tracking-tight leading-tight md:leading-none mb-6">
              بزرگ‌ترین رویداد <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-brand-sky via-brand-violet to-brand-purple">
                بازی‌سازی جهان
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
              یک تجربه پرانرژی و بی‌نظیر برای تبدیل ایده‌های شما به بازی در ۴۸ ساعت. بدون نیاز به تجربه‌ی قبلی، با تیم تشکیل دهید، یاد بگیرید و اتمسفر جهانی رویداد را در ایران تجربه کنید.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/volunteers" 
                className="bg-accent-yellow hover:bg-accent-yellow/90 text-slate-950 font-black px-8 py-4 rounded-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent-yellow/15"
              >
                ثبت‌نام کادر و داوطلبین ایران
              </Link>
              <Link 
                to="/press-kit" 
                className="bg-slate-900/80 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-2 transition-all border border-brand-violet/20 hover:border-brand-sky/40"
              >
                بسته رسانه‌ای (Press Kit)
              </Link>
            </div>
          </motion.div>

          {/* Countdown Area with Title Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-20 max-w-3xl mx-auto"
          >
            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest font-jost mb-3 flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4 text-brand-sky" />
              زمان باقیمانده تا رویداد سراسری جهانی
            </h3>
            <span className="text-xs text-accent-lime font-bold font-jost" dir="ltr">JANUARY 25 - 31, 2027</span>
            <CountdownTimer />
          </motion.div>
        </div>
      </section>

      {/* Narrative Section: What is a Game Jam & Visual Video player */}
      <section className="py-24 bg-[#070411]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-accent-lime text-xs font-bold uppercase tracking-wider font-jost">
                <Gamepad2 className="w-4 h-4" /> WHAT IS A GAME JAM?
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">گیم جم چطور کار می‌کند؟</h2>
              
              <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
                <p>
                  تصور کنید در یک آخر هفته جذاب، در کنار صدها برنامه‌نویس، طراح دوبعدی و سه‌بعدی، داستان‌نویس و آهنگ‌ساز قرار می‌گیرید. در زمان افتتاحیه، یک <strong className="text-brand-sky font-bold">موضوع (Theme) رازآلود</strong> به طور همزمان به کل دنیا اعلام می‌شود.
                </p>
                <p>
                  از آن لحظه شما <strong className="text-accent-yellow font-bold">۴۸ ساعت</strong> فرصت دارید تا تیم تشکیل دهید، ایده پردازی کنید، سناریو بنویسید، کد بزنید و بازی خود را بسازید و آپلود کنید!
                </p>
                <p className="bg-brand-purple/15 border-r-4 border-brand-violet p-4 rounded-l-xl text-xs text-slate-400 leading-relaxed">
                  گلوبال گیم جم (GGJ) یک رقابت حذفی یا استرس‌زا نیست؛ بلکه یک پلتفرم دوستی، آزمایش ابزارهای نوین، نوآوری و ایجاد صمیمیت در کامیونیتی است. فرقی ندارد یک حرفه‌ای بازی‌سازی باشید یا هنرآموزی که تازه می‌خواهد اولین دکمه حرکتی کاراکتر را بنویسد.
                </p>
              </div>

              {/* Quick Perks Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-brand-violet/10">
                  <span className="text-lg font-black text-brand-sky block font-mono">۴۸</span>
                  <span className="text-[10px] text-slate-400 block font-bold">ساعت رویداد فشرده</span>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-brand-violet/10">
                  <span className="text-lg font-black text-accent-yellow block font-mono">۱</span>
                  <span className="text-[10px] text-slate-400 block font-bold">تم مفهومی جهانی</span>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-brand-violet/10">
                  <span className="text-lg font-black text-accent-lime block font-mono">۰</span>
                  <span className="text-[10px] text-slate-400 block font-bold">پیش‌نیاز یا محدودیت سنی</span>
                </div>
              </div>
            </motion.div>

            {/* Custom Interactive Video Frame / Poster designed for Iran community */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-video rounded-3xl overflow-hidden border border-brand-violet/20 shadow-2xl relative bg-slate-950 group">
                {videoPlaying ? (
                  <iframe 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                    title="What is a Game Jam?"
                    className="w-full h-full object-cover"
                    allow="autoplay"
                  />
                ) : (
                  <>
                    <img 
                      src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop" 
                      alt="Game Jam Creators" 
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    
                    {/* Play trigger */}
                    <button 
                      onClick={() => setVideoPlaying(true)}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-brand-sky hover:bg-accent-yellow text-slate-950 flex items-center justify-center transition-all hover:scale-110 active:scale-90 shadow-2xl shadow-brand-sky/20 z-10"
                    >
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </button>

                    <div className="absolute bottom-6 inset-x-6 flex justify-between items-center z-10">
                      <div>
                        <span className="text-[10px] font-bold text-brand-sky font-jost uppercase block mb-1">OFFICIAL VIDEO IN BRIEF</span>
                        <h4 className="text-sm font-bold text-white">توضیح ویدیویی: گیم جم چیست؟</h4>
                      </div>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-jost">
                        <Video className="w-4 h-4" /> 2:40
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Decorative side cards representing global stats - Absolutely positioned on desktop only */}
              <div className="hidden sm:flex absolute -bottom-6 -right-6 bg-[#0f0b22] border border-brand-violet/15 p-4 rounded-2xl shadow-2xl items-center gap-3">
                <div className="bg-brand-sky/15 p-2 rounded-xl text-brand-sky">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">کشورهای فعال</span>
                  <strong className="text-xs text-white">۱۳۲ کشور جهان</strong>
                </div>
              </div>

              <div className="hidden sm:flex absolute -top-6 -left-6 bg-[#0f0b22] border border-brand-violet/15 p-4 rounded-2xl shadow-2xl items-center gap-3">
                <div className="bg-accent-lime/15 p-2 rounded-xl text-accent-lime">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">بازی‌های آرشیو</span>
                  <strong className="text-xs text-white">۱۱۰,۰۰۰+ بازی</strong>
                </div>
              </div>
            </motion.div>

            {/* Mobile Stats Badges - Shown inline on mobile to prevent overflow layout breakages */}
            <div className="flex sm:hidden justify-center gap-3 mt-6">
              <div className="bg-[#0f0b22] border border-brand-violet/15 p-3.5 rounded-xl shadow-xl flex items-center gap-3 flex-1">
                <div className="bg-brand-sky/15 p-2 rounded-lg text-brand-sky shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">کشورهای فعال</span>
                  <strong className="text-xs text-white block mt-0.5">۱۳۲ کشور جهان</strong>
                </div>
              </div>

              <div className="bg-[#0f0b22] border border-brand-violet/15 p-3.5 rounded-xl shadow-xl flex items-center gap-3 flex-1">
                <div className="bg-accent-lime/15 p-2 rounded-lg text-accent-lime shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">بازی‌های آرشیو</span>
                  <strong className="text-xs text-white block mt-0.5">۱۱۰,۰۰۰+ بازی</strong>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GGJ Current Events & Sub-Brands Calendar (Micro-missions, Climate jam) */}
      <section className="py-24 bg-gradient-to-b from-[#070411] to-[#0c0822] border-t border-brand-violet/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-sky uppercase tracking-widest font-jost">SUB-BRANDS & CAMPAIGNS</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2">مأموریت‌های جنبی و تقویم سالانه</h2>
            <p className="text-slate-400 text-sm mt-3">
              برخلاف تصور، رویداد فقط مختص به ۴۸ ساعت ژانویه نیست؛ ما در طول سال میزبان مینی‌جم‌های موضوعی و مأموریت‌های علمی متنوعی هستیم.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentEvents.map((ev, index) => (
              <div key={index} className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-brand-violet/30 transition-all flex flex-col justify-between h-full group">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-bold border px-2.5 py-1 rounded-full ${ev.tagColor}`}>
                      {ev.tag}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono" dir="ltr">{ev.date}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-lg group-hover:text-brand-sky transition-colors">{ev.title}</h3>
                    <h5 className="text-xs text-slate-400 font-medium">{ev.subtitle}</h5>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{ev.desc}</p>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400">فراخوان ثبت‌نام</span>
                  <span className="text-brand-sky flex items-center gap-1">
                    جزئیات بیشتر <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Iranian Jam Sites listing */}
      <section className="py-24 bg-[#0a071e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-sky uppercase tracking-widest font-jost">LATEST JAM SITES - IRAN</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2">سایت‌های فعال برگزاری در شهرهای ایران</h2>
            <p className="text-slate-400 text-sm mt-3">
              رویداد در شهرهای مختلف ایران به صورت همزمان برگزار می‌شود. شما می‌توانید فیزیکی‌ترین و نزدیک‌ترین هاب برگزاری را برای تشکیل تیم خود انتخاب کنید.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jamSites.map((site, index) => (
              <div key={index} className={`bg-slate-900/40 p-6 rounded-2xl border transition-all relative overflow-hidden group ${site.color}`}>
                <div className="absolute top-0 left-0 bg-brand-violet/20 text-brand-sky text-[10px] font-bold px-3 py-1 rounded-br-xl">
                  {site.type}
                </div>
                
                <div className="space-y-3 mt-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-sky" />
                    <h4 className="text-lg font-black text-white">{site.city}</h4>
                  </div>
                  
                  <div className="space-y-1 text-xs">
                    <span className="text-slate-500 block">مرکز هماهنگی و میزبانی:</span>
                    <strong className="text-slate-300 block">{site.venue}</strong>
                  </div>

                  <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between">
                    <span className="text-[10px] text-accent-lime font-bold">{site.status}</span>
                    <Link to="/volunteers" className="text-xs text-brand-sky flex items-center gap-1 font-bold">
                      عضویت در کادر <ArrowRight className="w-3 h-3 rotate-180" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Themes Gallery */}
      <section className="py-24 bg-gradient-to-b from-[#0a071e] to-[#04020a] border-t border-brand-violet/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-accent-yellow uppercase tracking-widest font-jost">PAST OFFICIAL THEMES GALLERY</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2">آرشیو الهام‌بخش تم‌های رسمی سال‌های گذشته</h2>
            <p className="text-slate-400 text-sm mt-3">
              یکی از جذاب‌ترین رازهای گیم‌جم، تم محرمانه‌ای است که درست در لحظه شروع اعلام می‌شود. با بررسی الگوهای خلاقانه سال‌های گذشته، ذهن خود را برای ایدهپردازی سریع آماده کنید.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                year: '2025',
                themeEn: 'WAVES / BUBBLES',
                themeFa: 'موج‌ها یا حباب‌ها',
                descFa: 'الهام‌بخش مفاهیم انتقال انرژی، نوسان، حرکت جمعی، ناپایداری و در عین حال ساخت دیوارهای محافظ شیشه‌ای.',
                color: 'from-blue-600/20 to-brand-sky/10 border-blue-500/25',
                accentColor: 'text-brand-sky'
              },
              {
                year: '2024',
                themeEn: 'MAKE ME LAUGH',
                themeFa: 'مرا بخندان!',
                descFa: 'تمرکز ویژه بر کمدی، مکانیک‌های خنده‌دار فیزیکی، رفتارهای غیرمنتظره و بازی‌های چندنفره شاد و سرگرم‌کننده.',
                color: 'from-amber-600/20 to-accent-yellow/10 border-accent-yellow/25',
                accentColor: 'text-accent-yellow'
              },
              {
                year: '2023',
                themeEn: 'ROOTS',
                themeFa: 'ریشه‌ها',
                descFa: 'مفاهیمی مانند اصالت، درختان، ارتباطات زیرزمینی پنهان، تاریخچه خانوادگی و ساختارهای شبکه‌ای عمیق.',
                color: 'from-emerald-600/20 to-accent-lime/10 border-accent-lime/25',
                accentColor: 'text-accent-lime'
              },
              {
                year: '2022',
                themeEn: 'DUALITY',
                themeFa: 'دوگانگی',
                descFa: 'تقابل نور و تاریکی، بعد موازی، تضاد مکانیک‌های چپ و راست، یا کنترل همزمان دو شخصیت کاملاً متضاد.',
                color: 'from-purple-600/20 to-brand-purple/10 border-brand-purple/25',
                accentColor: 'text-brand-purple'
              },
              {
                year: '2021',
                themeEn: 'LOST AND FOUND',
                themeFa: 'گم‌شده و پیدا شده',
                descFa: 'داستان‌های عاطفی درباره اشیاء گمشده، بازیابی حافظه، فانوس‌های هدایتگر در تاریکی یا سفر برای بازگشت به خانه.',
                color: 'from-pink-600/20 to-pink-500/10 border-pink-500/25',
                accentColor: 'text-pink-400'
              },
              {
                year: '2020',
                themeEn: 'REPAIR',
                themeFa: 'تعمیر و بازسازی',
                descFa: 'تعمیر روابط، سر هم کردن ابزارهای فلزی خرد شده، مکانیک بازگرداندن اشیاء شکسته به حالت اول و ترمیم سیستم‌های از کار افتاده.',
                color: 'from-orange-600/20 to-orange-500/10 border-orange-500/25',
                accentColor: 'text-orange-400'
              }
            ].map((theme, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`bg-gradient-to-br ${theme.color} p-6 rounded-2xl border backdrop-blur-sm shadow-xl flex flex-col justify-between h-full`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-black font-mono text-slate-400 bg-slate-900/60 border border-slate-800 px-3 py-1 rounded-full">
                      GGJ {theme.year}
                    </span>
                    <Sparkles className={`w-4 h-4 ${theme.accentColor}`} />
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    <h3 className={`text-xl font-black ${theme.accentColor} font-jost`} dir="ltr">{theme.themeEn}</h3>
                    <h4 className="text-lg font-bold text-white">{theme.themeFa}</h4>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {theme.descFa}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 text-[10px] text-slate-500 font-mono flex justify-between items-center" dir="ltr">
                  <span>TAGS: GLOBAL_JAM_THEME</span>
                  <span>VERIFIED ✓</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Newsletter subscription */}
      <section className="py-20 border-y border-brand-violet/10 bg-gradient-to-r from-brand-violet/5 via-brand-purple/5 to-transparent relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-sky/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="bg-brand-sky/10 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto text-brand-sky">
            <Mail className="w-6 h-6" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-black text-white">عضویت در خبرنامه جامعه بازی‌سازان ایران</h2>
          <p className="text-slate-300 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            با عضویت در خبرنامه اختصاصی، اولین کسی باشید که از تاریخ‌های ثبت‌نام، وبینارهای آموزشی رایگان، اعلام موضوع رازآلود سال و جوایز حامیان بومی باخبر می‌شوید.
          </p>

          {newsletterSubscribed ? (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-accent-lime/10 border border-accent-lime/20 text-accent-lime p-4 rounded-xl text-xs font-bold max-w-md mx-auto"
            >
              ایمیل شما ثبت شد! آماده اخبار هیجان‌انگیز بازی‌سازی باشید.
            </motion.div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="آدرس ایمیل شما (مثال: dev@email.com)"
                className="flex-grow bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs placeholder-slate-500 text-left focus:outline-none focus:border-brand-sky"
                dir="ltr"
              />
              <button
                type="submit"
                className="bg-brand-sky hover:bg-brand-sky/80 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-brand-sky/15"
              >
                عضویت <Send className="w-3.5 h-3.5 rotate-180" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Sponsor Banner of Global and Local game partners */}
      <section className="py-16 bg-[#04020a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-jost block">SPONSORS & COMMUNITY PARTNERS</span>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="text-sm font-black text-slate-400 font-jost">Autodesk</span>
            <span className="text-sm font-black text-slate-400 font-jost">JetBrains</span>
            <span className="text-sm font-black text-slate-400 font-jost">Kickstarter</span>
            <span className="text-sm font-black text-slate-400 font-jost">SideFX</span>
            <span className="text-sm font-black text-slate-400 font-jost">Arvan Cloud</span>
            <span className="text-sm font-black text-slate-400 font-sans">کافه‌بازار</span>
          </div>
          
          <p className="text-xs text-slate-500">
            برای اطلاعات بیشتر در خصوص چگونگی قرارگیری برند مستقل شما در حامیان رویداد به <Link to="/sponsors" className="text-brand-sky hover:underline">صفحه اسپانسرها</Link> مراجعه فرمایید.
          </p>
        </div>
      </section>

    </div>
  );
}
