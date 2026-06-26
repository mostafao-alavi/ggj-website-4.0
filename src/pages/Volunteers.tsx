import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Heart, Users, MapPin, Briefcase, ChevronRight, UserPlus, FileCheck, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { appendRowToSheet, getAccessToken } from '../lib/googleSheets';

interface Role {
  title: string;
  enTitle: string;
  description: string;
  responsibilities: string[];
  colorClass: string;
}

const VOLUNTEER_ROLES: Role[] = [
  {
    title: 'برگزارکننده سایت محلی',
    enTitle: 'Local Site Organizer',
    description: 'مدیریت و هماهنگی فیزیکی یا مجازی یک سایت برگزاری در دانشگاه، شتاب‌دهنده یا شرکت بازی‌سازی در شهر خودتان.',
    responsibilities: [
      'هماهنگی سالن برگزاری و اینترنت شرکت‌کنندگان',
      'پذیرش و راهنمایی تیم‌ها در طول ۴۸ ساعت ماراتن',
      'مدیریت افتتاحیه و اختتامیه محلی سایت'
    ],
    colorClass: 'text-brand-sky border-brand-sky/20 bg-brand-sky/5'
  },
  {
    title: 'منتور و مربی تخصصی',
    enTitle: 'Technical & Design Mentor',
    description: 'راهنمایی و منتورینگ تیم‌های نوپا در زمینه‌های فنی (Unity, Unreal, Godot)، طراحی بازی (Game Design) یا هنری.',
    responsibilities: [
      'پاسخگویی به چالش‌های فنی تیم‌ها در طول رویداد',
      'ارائه مشورت تخصصی جهت خلاقانه‌تر شدن ایده‌ها',
      'تست نسخه‌های اولیه بازی‌ها و دادن بازخورد فنی'
    ],
    colorClass: 'text-accent-yellow border-accent-yellow/20 bg-accent-yellow/5'
  },
  {
    title: 'کمیته رسانه، خبررسانی و عکاسی',
    enTitle: 'Media & PR Team',
    description: 'ثبت لحظات جذاب، مصاحبه با تیم‌ها، تولید محتوای شبکه‌های اجتماعی و پوشش خبری ماراتن.',
    responsibilities: [
      'عکاسی و فیلم‌برداری از فعالیت‌های تیم‌های بازی‌ساز',
      'تولید ویدیوهای کوتاه از هیجان و خستگی ۴۸ ساعته',
      'ارسال گزارش‌ها برای رسانه‌ها و خبرگزاری‌های فناوری و گیم کشور'
    ],
    colorClass: 'text-accent-lime border-accent-lime/20 bg-accent-lime/5'
  }
];

export default function Volunteers() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    role: 'local-organizer',
    experience: '',
    github: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const spreadsheetId = localStorage.getItem('ggj_spreadsheet_id');
      const token = await getAccessToken();

      if (spreadsheetId && token) {
        // Map tech key to Persian readable name
        const roleMapping: Record<string, string> = {
          'local-organizer': 'برگزارکننده سایت محلی',
          'mentor': 'منتور و مربی تخصصی',
          'media': 'کمیته رسانه و عکاسی',
        };
        const roleLabel = roleMapping[formData.role] || formData.role;

        const rowValues = [
          formData.name,
          formData.email,
          formData.phone,
          formData.city,
          roleLabel,
          formData.experience,
          formData.github,
          new Date().toLocaleString('fa-IR')
        ];

        await appendRowToSheet(token, spreadsheetId, 'داوطلبان', rowValues);
        console.log('Successfully saved volunteer to Google Sheet!');
      }
    } catch (err) {
      console.error('Failed to append volunteer to Google Sheet:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', city: '', role: 'local-organizer', experience: '', github: '' });
      }, 5000);
    }
  };

  return (
    <div className="w-full min-h-screen">
      {/* Brand Sunburst Background Header */}
      <div className="ggj-sunburst-bg relative pt-20 pb-16 border-b border-brand-violet/20 overflow-hidden">
        <div className="ggj-sunburst-overlay"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/40 border border-brand-sky/20 text-brand-sky text-xs font-bold font-jost mb-4 uppercase tracking-widest">
              <Heart className="w-4 h-4 fill-current text-pink-500" /> join the movement
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              همکاری داوطلبانه و فرصت‌های کارآموزی
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              گلوبال گیم جم ایران تماماً توسط عاشقان فناوری و بازی‌سازی هدایت می‌شود. با ما همگام شوید تا رویدادی تکرار نشدنی خلق کنیم، دوستان جدید بیابیم و درهای استخدام و کارآموزی در استودیوهای بزرگ را بگشاییم.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Why Volunteer benefits */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">چرا به عنوان داوطلب در رویداد مشارکت کنیم؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: 'توسعه ارتباطات (Networking)',
                desc: 'آشنایی مستقیم با فعالان، کارآفرینان و توسعه‌دهندگان باتجربه بازی‌سازی در ایران و جهان.'
              },
              {
                title: 'کسب مهارت مدیریت بحران',
                desc: 'مدیریت و مربیگری یک رویداد متراکم ۴۸ ساعته، یکی از ناب‌ترین تجربیات کاری شما خواهد بود.'
              },
              {
                title: 'گواهی‌نامه رسمی بین‌المللی',
                desc: 'دریافت گواهی معتبر همکاری داوطلبانه از طرف دفتر مرکزی Global Game Jam® در آمریکا.'
              },
              {
                title: 'اولویت استخدام و کارآموزی',
                desc: 'تیم‌های داوطلب تحت حمایت ویژه حامیان و استودیوهای ایرانی برای موقعیت‌های شغلی جدید هستند.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-3xl font-black text-brand-sky font-mono block">0{index + 1}</span>
                <h4 className="font-bold text-white text-base">{item.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Roles Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Role Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-brand-sky" />
              نقش‌های داوطلبانه مورد نیاز رویداد ۲۰۲۷
            </h3>

            <div className="space-y-6">
              {VOLUNTEER_ROLES.map((role, i) => (
                <div key={i} className={`border rounded-2xl p-6 space-y-4 ${role.colorClass}`}>
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <h4 className="text-xl font-bold text-white">{role.title}</h4>
                    <span className="text-xs font-mono opacity-80" dir="ltr">{role.enTitle}</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{role.description}</p>
                  
                  <div className="space-y-2 border-t border-white/5 pt-3">
                    <span className="text-[10px] font-bold text-white block uppercase tracking-widest mb-1">مسئولیت‌ها و وظایف:</span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {role.responsibilities.map((resp, index) => (
                        <li key={index} className="flex gap-2 items-start">
                          <span className="text-brand-sky mt-1">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-l from-brand-violet/15 to-transparent p-6 rounded-2xl border border-brand-violet/20 space-y-4">
              <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
                <Briefcase className="w-5 h-5 text-accent-yellow" /> طرح ویژه کارآموزی زمستانه
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                در راستای سند توسعه کامیونیتی جهانی، چندین استودیوی بازی‌سازی برجسته در تهران، اصفهان و تبریز متعهد شده‌اند تا داوطلبان برتر رویداد را پس از گیم‌جم به عنوان کارآموز رسمی در حوزه‌های توسعه یونیتی، مدل‌سازی سه بعدی، و طراحی مرحله (Level Design) بپذیرند. این شانس فوق‌العاده را برای ورود به بازار کار از دست ندهید!
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Form (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-accent-lime" />
                ثبت‌نام در کارگروه داوطلبین ایران
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                لطفاً اطلاعات خود را با دقت پر کنید. کارگروه ارزیابی و منابع انسانی ما با بررسی رزومه و اطلاعات شما، طی ۱ هفته با شما جهت مصاحبه آنلاین تماس خواهند گرفت.
              </p>

              {submitted ? (
                <div className="bg-accent-lime/10 border border-accent-lime/20 text-accent-lime p-4 rounded-xl text-center text-xs font-bold space-y-2">
                  <ShieldCheck className="w-8 h-8 mx-auto text-accent-lime mb-1" />
                  <p>درخواست شما با موفقیت ثبت شد!</p>
                  <p className="font-normal text-[10px] text-slate-400">کد رهگیری شما: GGJ-IR-2027-{Math.floor(Math.random() * 90000 + 10000)}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-bold">نام و نام خانوادگی</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-sky"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-bold">ایمیل آدرس</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-sky text-left"
                        dir="ltr"
                        placeholder="mymail@ggj.ir"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-bold">شهر سکونت</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-sky"
                        placeholder="مثلا: مشهد"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-bold">تلفن همراه</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none text-left"
                        dir="ltr"
                        placeholder="09..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-bold">نقش مورد علاقه</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                      >
                        <option value="local-organizer">برگزارکننده سایت محلی</option>
                        <option value="technical-mentor">منتور و مربی فنی</option>
                        <option value="media-pr">تولید محتوا و رسانه</option>
                        <option value="general-help">تیم لجستیک و کمک عمومی</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-bold">لینک رزومه، لینکدین، گیت‌هاب یا نمونه‌کار</label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none text-left"
                      dir="ltr"
                      placeholder="https://github.com/username"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-bold">توضیح کوتاه سوابق مرتبط یا انگیزه شما</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none resize-none"
                      placeholder="چرا دوست دارید داوطلب شوید؟"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-brand-violet hover:bg-brand-violet/85 disabled:bg-brand-violet/50 text-white font-bold rounded-xl text-xs transition-colors shadow-lg shadow-brand-violet/20 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        در حال ارسال...
                      </>
                    ) : 'ارسال فرم تقاضا'}
                  </button>
                </form>
              )}
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl text-center space-y-3">
              <span className="text-xs text-slate-400 block font-bold">سوالی دارید؟</span>
              <p className="text-slate-300 text-xs leading-relaxed">بخش پشتیبانی و داوطلبین ایران در کنار شماست:</p>
              <a href="mailto:volunteers@globalgamejam.ir" className="text-brand-sky hover:underline text-xs block font-mono" dir="ltr">volunteers@globalgamejam.ir</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
