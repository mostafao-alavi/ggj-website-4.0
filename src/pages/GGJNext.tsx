import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Sparkles, GraduationCap, School, Compass, ArrowRight, CheckCircle2, Download, BookOpen, Users } from 'lucide-react';

export default function GGJNext() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    city: '',
    contactPerson: '',
    email: '',
    phone: '',
    studentsCount: '30'
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ schoolName: '', city: '', contactPerson: '', email: '', phone: '', studentsCount: '30' });
    }, 4000);
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-lime/20 border border-accent-lime/30 text-accent-lime text-xs font-bold font-jost mb-4 uppercase tracking-widest">
              <GraduationCap className="w-4 h-4" /> GGJ NEXT IRAN
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              نسل فردا: بازی‌سازی برای دانش‌آموزان
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              رویداد ویژه نوجوانان (۱۲ تا ۱۸ سال)، مدارس و پژوهش‌سراها. همگام با استانداردهای جهانی <strong className="text-brand-sky font-bold">GGJ Next®</strong> برای کشف و پرورش استعدادهای پایه بازی‌سازی کشور.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Core Description cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="glass-panel p-8 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="bg-brand-sky/10 w-12 h-12 rounded-xl flex items-center justify-center text-brand-sky mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">کشف مسیر خلاقیت</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                در این رویداد، دانش‌آموزان با فرآیند ایده پردازی، نوشتن قصه، نقاشی شخصیت‌ها و منطق فنی یک بازی به زبان ساده و کاربردی آشنا می‌شوند.
              </p>
            </div>
            <span className="text-xs font-bold text-brand-sky mt-6 flex items-center gap-1">
              ویژه سنین ۱۲ تا ۱۸ سال <Sparkles className="w-3.5 h-3.5 text-accent-yellow" />
            </span>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="bg-brand-violet/10 w-12 h-12 rounded-xl flex items-center justify-center text-brand-violet mb-6">
                <School className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">فرصت ویژه مدارس</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                مدارس و هنرستان‌ها با ثبت‌نام به عنوان «سایت رسمی دانش‌آموزی»، تجهیزات و آزمایشگاه کامپیوتر خود را به کانون کشف استعدادهای فناوری تبدیل می‌کنند.
              </p>
            </div>
            <span className="text-xs font-bold text-brand-violet mt-6 flex items-center gap-1">
              پشتیبانی کامل و مربیگری بومی
            </span>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="bg-accent-lime/10 w-12 h-12 rounded-xl flex items-center justify-center text-accent-lime mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">یادگیری بدون کدنویسی</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                تمرکز اصلی روی ابزارهای بصری و ساده بازی‌سازی است تا هر نوجوان علاقه‌مندی بتواند ایده خود را بدون نیاز به دانش برنامه‌نویسی عمیق اجرا کند.
              </p>
            </div>
            <span className="text-xs font-bold text-accent-lime mt-6 flex items-center gap-1">
              Scratch، Construct، GDevelop
            </span>
          </div>
        </div>

        {/* Content sections split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Detailed Curriculum & Tools (8 cols) */}
          <div className="lg:col-span-7 space-y-12">
            
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-brand-sky" />
                ابزارها و منابع توصیه‌شده جهانی برای نوجوانان
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                سازمان جهانی گلوبال گیم جم راهنماهای ویژه‌ای برای شروع آسان بازی‌سازی تدوین کرده است. دانش‌آموزان ایرانی می‌توانند با این ابزارها وارد کارزار ۴۸ ساعته شوند:
              </p>

              <div className="space-y-4">
                {[
                  {
                    name: 'Scratch (اسکرچ)',
                    type: 'محیط بصری و بلوکی',
                    desc: 'طراحی شده توسط دانشگاه MIT، بهترین گزینه برای سنین ۱۲ تا ۱۴ سال جهت یادگیری الگوریتم بازی بدون کد نویسی.'
                  },
                  {
                    name: 'Construct 3 (کانستراکت)',
                    type: 'موتور قدرتمند دو بعدی',
                    desc: 'مناسب برای طراحی بازی‌های دوبعدی روی موبایل و وب، با کشیدن و رها کردن آبجکت‌ها و یادگیری منطق رویدادها.'
                  },
                  {
                    name: 'GDevelop (جی‌دولاپ)',
                    type: 'متن‌باز و رایگان',
                    desc: 'یک موتور بازی‌سازی مستقل فوق‌العاده برای بازی‌های ماجراجویی که بدون نیاز به اینترنت پرسرعت کار می‌کند.'
                  }
                ].map((tool, index) => (
                  <div key={index} className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 flex gap-4">
                    <span className="text-xl font-black text-brand-violet font-mono bg-brand-violet/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                      ۰{index + 1}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-100 text-sm">{tool.name}</h4>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{tool.type}</span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">{tool.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6 bg-slate-950 p-8 rounded-3xl border border-slate-850">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-accent-lime" />
                پشتیبانی مربیان (Mentoring Ecosystem)
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                ما در نسخه فارسی رویداد، مربیان مجرب و مهندسان صنعت بازی‌سازی ایران را به عنوان مربی و منتور همکار در سایت‌های مدارس قرار می‌دهیم تا دانش‌آموزان در طول ۴۸ ساعت رویداد هیچگاه ناامید نشوند و با امنیت کامل و مشورت حرفه‌ای بازی خود را تمام کنند.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-2 items-start text-xs text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-accent-lime shrink-0" />
                  <span>برگزاری کارگاه‌های آنلاین کوتاه قبل از ماراتن</span>
                </div>
                <div className="flex gap-2 items-start text-xs text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-accent-lime shrink-0" />
                  <span>معرفی الگوها و کدهای آماده جهت تسریع ساخت</span>
                </div>
                <div className="flex gap-2 items-start text-xs text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-accent-lime shrink-0" />
                  <span>ارائه لوح رسمی و جوایز غیررقابتی برای کلیه نوجوانان</span>
                </div>
                <div className="flex gap-2 items-start text-xs text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-accent-lime shrink-0" />
                  <span>آموزش‌های ویژه معلمان پرورشی و کامپیوتر مدارس</span>
                </div>
              </div>
            </section>

          </div>

          {/* Form and Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-accent-lime/10 rounded-full blur-3xl"></div>
              
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <School className="w-5 h-5 text-accent-lime" />
                ثبت مدرسه به عنوان سایت GGJ Next
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                مدیران مدارس، هنرستان‌ها و کانون‌های فرهنگی سراسر کشور می‌توانند فرم زیر را پر کنند تا پس از ارزیابی فضا، مجوز رسمی برگزاری سایت دانش‌آموزی در منطقه خود را دریافت کنند.
              </p>

              {submitted ? (
                <div className="bg-brand-sky/10 border border-brand-sky/20 text-brand-sky p-4 rounded-xl text-center text-xs font-bold">
                  اطلاعات مدرسه شما با موفقیت ثبت شد. تیم توسعه به‌زودی برای هماهنگی با شما تماس خواهند گرفت!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-bold">نام مدرسه / هنرستان / موسسه</label>
                    <input
                      type="text"
                      required
                      value={formData.schoolName}
                      onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-sky"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-bold">شهر</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-sky"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-bold">تعداد دانش‌آموزان علاقه‌مند</label>
                      <select
                        value={formData.studentsCount}
                        onChange={(e) => setFormData({ ...formData, studentsCount: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                      >
                        <option value="15">۱۰ تا ۲۰ نفر</option>
                        <option value="30">۲۰ تا ۵۰ نفر</option>
                        <option value="100">۵۰ تا ۱۰۰ نفر</option>
                        <option value="200">بیش از ۱۰۰ نفر</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-bold">نام رابط مدرسه (مدیر/معاون/مربی)</label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-bold">تلفن تماس مستقیم</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none text-left"
                        dir="ltr"
                        placeholder="09123456789"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-bold">ایمیل رسمی</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none text-left"
                        dir="ltr"
                        placeholder="school@edu.ir"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-sky hover:bg-brand-sky/80 text-slate-900 font-bold rounded-xl text-xs transition-colors shadow-lg shadow-brand-sky/20"
                  >
                    ارسال تقاضای میزبانی
                  </button>
                </form>
              )}
            </div>

            <div className="bg-slate-950 border border-slate-850 p-6 rounded-2xl space-y-4">
              <h4 className="font-bold text-white text-sm">دانلود بسته‌های راهنما</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                با دریافت بسته‌های راهنمای آماده شده توسط تیم‌های روابط عمومی، خودتان در مدرسه به تدریس مفاهیم اساسی بپردازید:
              </p>
              <div className="space-y-2">
                <a href="#" className="flex items-center justify-between p-3 bg-slate-900 hover:bg-slate-850 rounded-xl border border-slate-800 transition-colors">
                  <span className="text-xs text-slate-300">راهنمای معلمین (آموزش ساخت بازی با Scratch)</span>
                  <Download className="w-4 h-4 text-brand-sky" />
                </a>
                <a href="#" className="flex items-center justify-between p-3 bg-slate-900 hover:bg-slate-850 rounded-xl border border-slate-800 transition-colors">
                  <span className="text-xs text-slate-300">کتابچه ساخت اولین سناریوی بازی نوجوان</span>
                  <Download className="w-4 h-4 text-brand-sky" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
