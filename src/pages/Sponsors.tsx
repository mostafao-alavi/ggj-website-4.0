import { useState, ReactNode, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Shield, Coins, Database, Star, Check, HelpCircle, FileDown, Send, Sparkles } from 'lucide-react';

interface Tier {
  name: string;
  enName: string;
  badge: string;
  icon: ReactNode;
  benefits: string[];
  price: string;
  colorClass: string;
}

export default function Sponsors() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    contactPerson: '',
    email: '',
    phone: '',
    tier: 'gold',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ companyName: '', industry: '', contactPerson: '', email: '', phone: '', tier: 'gold', message: '' });
    }, 4000);
  };

  const sponsorTiers: Tier[] = [
    {
      name: 'اسپانسر الماس',
      enName: 'Diamond Sponsor',
      badge: 'جایگاه ویژه برتر',
      icon: <Sparkles className="w-8 h-8 text-cyan-400" />,
      benefits: [
        'درج لوگوی فوق‌بزرگ در هدر سایت فارسی و ایمیل‌های ارسالی',
        'اختصاص غرفه فیزیکی ویژه در ۳ سایت برگزاری بزرگ تهران و کلان‌شهرها',
        'سخنرانی ۱۰ دقیقه‌ای اختصاصی در افتتاحیه و اختتامیه زنده سراسری',
        'امکان درج چالش جانبی (Side Quest) ویژه برند شما با اهدای جایزه اختصاصی',
        'دسترسی مستقیم به بانک رزومه و ایمیل تمام شرکت‌کنندگان علاقه‌مند جهت استخدام'
      ],
      price: 'مذاکره ویژه',
      colorClass: 'border-cyan-500/30 bg-cyan-950/10'
    },
    {
      name: 'اسپانسر طلا',
      enName: 'Gold Sponsor',
      badge: 'بیشترین ارزش سرمایه‌گذاری',
      icon: <Star className="w-8 h-8 text-accent-yellow" />,
      benefits: [
        'درج لوگوی بزرگ در بخش اسپانسرهای صفحه اول و صفحه حامیان',
        'اختصاص غرفه فیزیکی در سایت اصلی تهران (دانشگاه شریف/امیرکبیر)',
        'امکان قرار دادن اقلام تبلیغاتی برند در پک هدیه شرکت‌کنندگان',
        'پست اختصاصی معرفی برند و کسب‌وکار شما در رسانه‌های اجتماعی رویداد',
        'دسترسی به رزومه‌های فیلتر شده برنامه‌نویسان و طراحان برتر رویداد'
      ],
      price: 'استعلام قیمت',
      colorClass: 'border-accent-yellow/30 bg-amber-950/10'
    },
    {
      name: 'شریک زیرساخت ابری',
      enName: 'Cloud & Tech Partner',
      badge: 'ویژه شرکت‌های هاستینگ و کلاود',
      icon: <Database className="w-8 h-8 text-brand-sky" />,
      benefits: [
        'درج به عنوان «تامین‌کننده انحصاری زیرساخت ابری رویداد»',
        'ارائه کدهای تخفیف و سرورهای رایگان به شرکت‌کنندگان ماراتن جهت تست بازی‌ها',
        'درج لوگوی متوسط در سایت رسمی و شبکه‌های اجتماعی',
        'تقدیر ویژه در مراسم اختتامیه به پاس حمایت از وبسایت و سرورهای بازی',
        'امکان برگزاری ورکشاپ فنی رایگان در حاشیه رویداد'
      ],
      price: 'حمایت زیرساختی',
      colorClass: 'border-brand-sky/30 bg-sky-950/10'
    }
  ];

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
              <Shield className="w-4 h-4 text-accent-yellow" /> SPONSORSHIP PORTAL
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              حامیان و شرکای تجاری
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              با پیوستن به ماراتن جهانی بازی‌سازی، برند خود را در کانون توجه هزاران توسعه‌دهنده، طراح و مهندس خلاق نرم‌افزار در ایران قرار دهید و به توسعه صنعت بازی‌سازی مستقل کمک کنید.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Global Sponsors Section */}
        <div className="mb-20 text-center">
          <h2 className="text-xl font-bold text-slate-300 mb-8 uppercase tracking-widest font-jost">
            حامیان و شرکای بین‌المللی GLOBAL GAME JAM®
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center opacity-70">
            {[
              { name: 'Autodesk', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop' },
              { name: 'JetBrains', logo: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=150&auto=format&fit=crop' },
              { name: 'Kickstarter', logo: 'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?q=80&w=150&auto=format&fit=crop' },
              { name: 'Epic Games', logo: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=150&auto=format&fit=crop' },
              { name: 'Unity Technologies', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=150&auto=format&fit=crop' },
              { name: 'GitHub', logo: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=150&auto=format&fit=crop' }
            ].map((sp, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 flex flex-col items-center justify-center h-20 hover:bg-slate-900 hover:border-slate-700 transition-all group">
                <span className="text-slate-400 font-bold font-jost group-hover:text-white transition-colors">{sp.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Local Sponsors Packages */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">بسته‌های اسپانسرشیپ ایران (۲۰۲۷)</h2>
          <p className="text-slate-400 text-center text-sm max-w-2xl mx-auto mb-12">
            جایگاه‌های استاندارد و بومی‌سازی شده ما با ارزیابی نیازهای تبلیغاتی و استخدامی برندهای فناوری داخل کشور به صورت کاملاً شفاف و مدون طراحی شده است.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sponsorTiers.map((tier, index) => (
              <div key={index} className={`border rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden ${tier.colorClass}`}>
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-brand-sky bg-brand-sky/10 border border-brand-sky/20 px-2 py-0.5 rounded" dir="ltr">{tier.enName}</span>
                      <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                    </div>
                    {tier.icon}
                  </div>
                  
                  <span className="inline-block text-xs font-bold text-accent-lime bg-accent-lime/10 px-3 py-1 rounded-full">
                    {tier.badge}
                  </span>

                  <ul className="space-y-3.5 text-xs text-slate-300 border-t border-white/5 pt-6">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <Check className="w-4 h-4 text-accent-lime shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-white/5 pt-6 mt-8 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">هزینه و سرمایه‌گذاری:</span>
                    <strong className="text-white text-lg">{tier.price}</strong>
                  </div>
                  <span className="text-xs font-bold text-brand-sky flex items-center gap-1">
                    درخواست اطلاعات بیشتر <Check className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Capture and PDF Download */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Coins className="w-5 h-5 text-accent-yellow" />
              درخواست پکیج کامل پروپوزال و تعرفه‌ها
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              شرکت‌ها و استودیوهای علاقه‌مند می‌توانند فرم زیر را پر کنند تا کاتالوگ دقیق قیمت‌گذاری‌ها به همراه کدهای تخفیف زودهنگام (Early Bird) را به صورت اختصاصی دریافت نمایند.
            </p>

            {submitted ? (
              <div className="bg-accent-lime/10 border border-accent-lime/20 text-accent-lime p-4 rounded-xl text-center text-xs font-bold">
                درخواست شما با موفقیت ثبت شد! کاتالوگ و پروپوزال رسمی رویداد تا چند دقیقه دیگر به آدرس ایمیل شما ارسال می‌شود.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-bold">نام شرکت / استودیو</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-sky"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-bold">حوزه فعالیت</label>
                    <input
                      type="text"
                      required
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-sky"
                      placeholder="مثلا: خدمات هاستینگ، هوش مصنوعی"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-bold font-sans">نام و نام خانوادگی رابط شرکت</label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-bold">پلن مورد علاقه</label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                    >
                      <option value="diamond">پلن اسپانسر الماس</option>
                      <option value="gold">پلن اسپانسر طلا</option>
                      <option value="cloud">شریک زیرساخت ابری</option>
                      <option value="custom">سایر شیوه‌های همکاری دلخواه</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-bold">تلفن تماس رابط</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none text-left"
                      dir="ltr"
                      placeholder="021888..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-bold font-sans">ایمیل رسمی شرکت</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none text-left"
                      dir="ltr"
                      placeholder="marketing@company.ir"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-bold">پیام یا اولویت‌های خاص برند شما</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none resize-none"
                    placeholder="تمایلات استخدامی، چالش‌های خاص بومی و..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-violet hover:bg-brand-violet/85 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-violet/20"
                >
                  <Send className="w-4 h-4" />
                  ارسال تقاضای پروپوزال رسمی
                </button>
              </form>
            )}
          </div>

          {/* Quick PDF info Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
              <h4 className="font-bold text-white text-sm mb-3">چرا اسپانسر شوید؟</h4>
              <ul className="space-y-3 text-xs text-slate-400">
                <li className="flex gap-2 items-start">
                  <Check className="w-4 h-4 text-brand-sky shrink-0 mt-0.5" />
                  <span>دسترسی به بااستعدادترین دانش‌آموختگان برنامه‌نویسی و هنری کشور در ماراتن</span>
                </li>
                <li className="flex gap-2 items-start">
                  <Check className="w-4 h-4 text-brand-sky shrink-0 mt-0.5" />
                  <span>برندسازی کارفرمایی (Employer Branding) استثنایی در جامعه فناوری</span>
                </li>
                <li className="flex gap-2 items-start">
                  <Check className="w-4 h-4 text-brand-sky shrink-0 mt-0.5" />
                  <span>حمایت مسئولیت اجتماعی (CSR) با تایید و لوگوی رسمی جهانی</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-l from-brand-violet/10 to-transparent border border-brand-violet/20 p-6 rounded-2xl space-y-4">
              <h4 className="font-bold text-white text-xs uppercase tracking-widest font-jost">DOWNLOAD BROCHURE</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                بروشور راهنمای تفصیلی رویداد به همراه آمارهای رسمی دوره‌های قبل ایران و جهان را به صورت آفلاین دانلود کنید:
              </p>
              <a href="#" className="flex items-center justify-between p-3.5 bg-slate-900 hover:bg-slate-850 rounded-xl border border-slate-800 transition-colors">
                <div className="flex items-center gap-2">
                  <FileDown className="w-5 h-5 text-accent-yellow" />
                  <div className="text-right">
                    <span className="text-xs text-slate-200 block font-bold">بروشور معرفی حامیان ۲۰۲۷</span>
                    <span className="text-[10px] text-slate-500 block font-mono" dir="ltr">PDF - 4.8 MB</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
