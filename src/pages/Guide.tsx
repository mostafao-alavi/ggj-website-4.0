import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Activity, Compass, Code, Coffee, Moon, Droplet, ChevronDown, ChevronUp, Check, Award, Shield, Library } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const SURVIVAL_RULES = [
  {
    number: '۲',
    title: 'دو ساعت خواب عمیق',
    unit: 'حداقل در شبانه‌روز',
    desc: 'کم‌خوابی مفرط خلاقیت و تمرکز شما را نابود می‌کند. برای گرفتن بهترین خروجی، حداقل ۲ ساعت خواب عمیق و ممتد در ۲۴ ساعت الزامی است.',
    icon: <Moon className="w-6 h-6 text-indigo-400" />,
    color: 'border-indigo-500/20 bg-indigo-950/10'
  },
  {
    number: '۳',
    title: 'سه وعده غذایی کامل',
    unit: 'روزانه و منظم',
    desc: 'سوخت‌رسانی منظم به مغز کلید بقا در ۴۸ ساعت ماراتن است. به هیچ عنوان صبحانه یا ناهار را حذف نکنید و از تنقلات بسیار شیرین پرهیز کنید.',
    icon: <Coffee className="w-6 h-6 text-amber-400" />,
    color: 'border-amber-500/20 bg-amber-950/10'
  },
  {
    number: '۶',
    title: 'شش لیوان آب خنک',
    unit: 'در طول روز',
    desc: 'بدن هیدراته خستگی مغزی را کاهش می‌دهد. حتماً یک بطری آب شخصی در کنار سیستم خود قرار داده و حداقل ۶ لیوان آب در روز بنوشید.',
    icon: <Droplet className="w-6 h-6 text-sky-400" />,
    color: 'border-sky-500/20 bg-sky-950/10'
  }
];

const ENGINE_RECOMMENDATIONS = [
  {
    name: 'Unity',
    difficulty: 'متوسط',
    speed: 'عالی',
    bestFor: 'بازی‌های سه بعدی مستقل و دو بعدی پیشرفته',
    advantage: 'جامعه کاربری فوق‌العاده بزرگ و دارایی‌های آماده زیاد در Asset Store که سرعت بازی‌سازی را چند برابر می‌کند.'
  },
  {
    name: 'Godot',
    difficulty: 'ساده',
    speed: 'بسیار سریع',
    bestFor: 'پروژه‌های پیکسل‌آرت دو بعدی، پازل‌ها و شبیه‌سازهای فیزیکی',
    advantage: 'حجم بسیار سبک (حدود ۱۰۰ مگابایت)، سرعت بالا در اجرا و ساختار کاملاً رایگان و متن‌باز مناسب برای زمان کوتاه گیم‌جم.'
  },
  {
    name: 'Unreal Engine',
    difficulty: 'سخت',
    speed: 'متوسط',
    bestFor: 'بازی‌های اتمسفریک سه‌بعدی اول‌شخص و واقع‌گرایانه',
    advantage: 'سیستم برنامه‌نویسی بصری Blueprint که به طراحان غیربرنامه‌نویس هم امکان اجرای سریع مکانیک‌ها با گرافیک عالی را می‌دهد.'
  },
  {
    name: 'Construct 3',
    difficulty: 'بسیار ساده',
    speed: 'برق‌آسا',
    bestFor: 'پلتفرمرهای دو بعدی کژوال، بازی‌های آرکید و موبایلی ساده',
    advantage: 'بدون نیاز به نوشتن حتی یک خط کد؛ بازی‌سازی صرفاً با منطق رویدادها (Event-based) و خروجی وب آنی.'
  }
];

const FAQ_DATA: FaqItem[] = [
  {
    question: 'چطور در مدت کوتاه ۴۸ ساعت ماراتن تیمی برای بازی‌سازی پیدا کنم؟',
    answer: 'یکی از اهداف اصلی رویداد Global Game Jam تیم‌سازی آزاد است. در ساعات ابتدایی روز اول، هماهنگ‌کننده‌های شعب جلسات طوفان فکری و معارفه برگزار می‌کنند تا برنامه‌نویسان، طراحان بازی و آرتیست‌های بدون تیم به هم بپیوندند. همچنین می‌توانید در کانال اختصاصی Discord رویداد قبل از شروع جم هم‌تیمی بیابید.'
  },
  {
    question: 'مالکیت معنوی بازی‌های ساخته شده در طول رویداد متعلق به کیست؟',
    answer: 'تمام حقوق مادی و معنوی بازی متعلق به تک‌تک اعضای تیم سازنده است. رویداد جهانی گلوبال گیم جم بازی‌ها را تحت لایسنس بین‌المللی آزاد Creative Commons جهت بازی عموم آپلود می‌کند اما شما می‌توانید بعداً بازی خود را توسعه داده و تجاری کنید.'
  },
  {
    question: 'چه نرم‌افزارها و ابزارهایی باید قبل از شروع ماراتن روی لپ‌تاپ خود نصب کنیم؟',
    answer: 'پیشنهاد می‌شود موتور بازی‌سازی مورد نظر (مانند یونیتی، گودو یا آنریل) را به همراه نرم‌افزارهای کمکی تولید گرافیک (مانند فتوشاپ، بلندر یا پیکسل‌آرت برای دو بعدی) و برنامه‌های گپ‌وگفت هم‌تیمی‌ها نصب کنید. حتماً نسخه‌ها را تست کنید تا در روز اول بابت دانلود یا ارورها زمان از دست ندهید.'
  },
  {
    question: 'من هیچ تجربه‌ای در بازی‌سازی ندارم، آیا می‌توانم در رویداد شرکت کنم؟',
    answer: 'بله، حتماً! گیم‌جم‌ها بهترین و شتاب‌دهنده‌ترین پاتوق آموزشی برای ورود به صنعت هستند. اگر برنامه‌نویسی بلد نیستید، می‌توانید به عنوان طراح مرحله، طراح صدا، نویسنده سناریو یا هماهنگ‌کننده تیم به گروه‌ها اضافه شوید و کار با نرم‌افزارهای آسان مثل Construct 3 را آغاز کنید.'
  }
];

export default function Guide() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-[#070412] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-jost" dir="rtl">
      
      {/* Decorative glows */}
      <div className="absolute top-24 left-10 w-80 h-80 bg-brand-sky/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-24 right-10 w-96 h-96 bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        
        {/* Page title header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-violet/15 border border-brand-violet/25 rounded-full text-brand-sky text-xs font-black tracking-widest uppercase">
            <Library className="w-3.5 h-3.5 text-accent-yellow animate-bounce" />
            <span>KNOWLEDGE BASE & GUIDELINES</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">راهنما و قوانین بقای ۴۸ ساعته</h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            این پلتفرم آموزشی با هدف ارتقای آمادگی و سلامت شرکت‌کنندگان طراحی شده است. از قوانین سلامت بقای جم آگاه شوید، مقایسه تخصصی موتورها را مطالعه نمایید و پاسخ سوالات رایج خود را بیابید.
          </p>
        </div>

        {/* section 1: Survival health rules (2-3-6 rule) */}
        <section className="space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold text-brand-sky tracking-widest uppercase font-mono">JAM HEALTH STANDARD</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">قانون طلایی بقای جم: قانون ۲-۳-۶</h2>
            <p className="text-slate-400 text-xs mt-2 max-w-lg mx-auto">
              سلامتی شما در ماراتن‌های فشرده فیزیکی خط قرمز ماست. این قانون سه مرحله‌ای تضمین‌کننده خلاقیت پایدار ذهن جمرها در ماراتن است.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SURVIVAL_RULES.map((rule, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className={`border rounded-2xl p-6 space-y-4 relative overflow-hidden flex flex-col justify-between ${rule.color}`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="bg-[#0b081e] p-3 rounded-xl border border-white/5">
                      {rule.icon}
                    </div>
                    {/* Big Bold Numeral */}
                    <span className="text-5xl font-black text-white/10 select-none font-jost">{rule.number}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-white">{rule.title}</h3>
                    <span className="text-[10px] text-slate-400 block font-bold">{rule.unit}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rule.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-1.5 text-[10px] text-slate-400">
                  <Check className="w-3.5 h-3.5 text-accent-lime shrink-0" />
                  <span>استاندارد سلامت تایید شده</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* section 2: Comparative Grid of Engines */}
        <section className="space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold text-accent-yellow tracking-widest uppercase font-mono">ENGINE SPECS MATRIX</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">بهترین موتورهای بازی‌سازی برای ماراتن سرعتی</h2>
            <p className="text-slate-400 text-xs mt-2 max-w-lg mx-auto">
              تحلیل و مقایسه مزایای رقابتی هر موتور بازی‌سازی مناسب برای تولیدات فشرده ۴۸ ساعته.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ENGINE_RECOMMENDATIONS.map((eng, idx) => (
              <div key={idx} className="bg-[#110c2688]/90 border border-brand-violet/10 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-xl font-black text-white font-jost">{eng.name}</h3>
                  <div className="flex gap-2">
                    <span className="bg-brand-purple/20 border border-brand-violet/15 px-2.5 py-1 rounded-md text-[10px] font-bold text-brand-sky">
                      یادگیری: {eng.difficulty}
                    </span>
                    <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-400">
                      سرعت توسعه: {eng.speed}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 font-bold block">بهترین کاندیدا برای:</span>
                    <strong className="text-slate-200 mt-0.5 block">{eng.bestFor}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block">برگ برنده در گیم جم (Advantage):</span>
                    <p className="text-slate-300 mt-1 leading-relaxed">{eng.advantage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* section 3: FAQ accordion */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-bold text-brand-sky tracking-widest uppercase font-mono">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">پرسش‌های متداول جمرهای تازه کار</h2>
            <p className="text-slate-400 text-xs mt-2">
              پاسخ به رایج‌ترین دغدغه‌ها و سوالات فنی و رویدادی شما.
            </p>
          </div>

          <div className="space-y-4 text-right">
            {FAQ_DATA.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#110c26aa] border border-brand-violet/10 rounded-xl overflow-hidden transition-all"
              >
                {/* Trigger Row */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 flex justify-between items-center hover:bg-brand-purple/5 transition-all focus:outline-none"
                >
                  <span className="font-bold text-white text-xs sm:text-sm text-right pr-2">
                    {faq.question}
                  </span>
                  <div className="text-slate-400">
                    {openFaqIdx === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Answer block with animation */}
                <AnimatePresence initial={false}>
                  {openFaqIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-5 border-t border-slate-900 text-xs text-slate-300 leading-relaxed bg-[#0b081e44]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
