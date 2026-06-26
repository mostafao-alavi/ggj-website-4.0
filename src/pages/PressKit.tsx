import { motion } from 'motion/react';
import { Download, Building2, Calendar, Mail, Image as ImageIcon, Video, FileText, ChevronLeft, Award, Sparkles } from 'lucide-react';

export default function PressKit() {
  return (
    <div className="w-full">
      {/* Brand Sunburst Background Header */}
      <div className="ggj-sunburst-bg relative pt-20 pb-16 border-b border-brand-violet/20 overflow-hidden">
        <div className="ggj-sunburst-overlay"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-violet/40 border border-brand-sky/20 text-brand-sky text-xs font-bold font-jost uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-accent-yellow" /> Official Media Resources
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">بسته رسانه‌ای (Press Kit)</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              تمامی اطلاعات بومی، تاریخچه جهانی، آمار، تصاویر و لوگوهای مجاز رسمی مورد نیاز خبرگزاری‌ها، رادیو و تلویزیون و حامیان برای پوشش رویداد <strong className="text-brand-sky font-bold">GLOBAL GAME JAM®</strong>.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Content Column (8 cols) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Factsheet */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-brand-violet/10 pb-4">
                <FileText className="text-brand-sky w-6 h-6" />
                <h2 className="text-2xl font-bold text-white">اطلاعات کلیدی (Factsheet)</h2>
              </div>
              
              <div className="bg-[#140e28] rounded-2xl p-6 border border-brand-violet/15 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">نام دقیق سازمان بین‌المللی:</span>
                    <strong className="text-white text-base">Global Game Jam, Inc.®</strong>
                    <span className="block text-[10px] text-slate-400 mt-1">سازمان غیرانتفاعی (501c3) مستقر در آمریکا</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">تاریخ تاسیس و راه‌اندازی:</span>
                    <strong className="text-white text-base">جولای ۲۰۰۸</strong>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">وسعت و گستردگی رویداد:</span>
                    <strong className="text-white text-base">۸۰۰+ سایت فیزیکی و مجازی در سراسر دنیا</strong>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">بازه زمانی برگزاری ماراتن:</span>
                    <strong className="text-white text-base font-jost">هفته آخر ژانویه هر سال (۴۸ ساعت)</strong>
                  </div>
                </div>
              </div>
              
              <div className="prose prose-invert prose-slate max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
                <p>
                  گلوبال گیم جم (GGJ) بزرگترین رویداد خلق بازی ویدیویی و رومیزی در جهان است. مأموریت اصلی این نهاد، توانمندسازی تمامی علاقه‌مندان به فناوری برای یادگیری، تجربه و خلق مشترک در قالبی رفیق‌محور و شاداب است.
                </p>
                <p>
                  رویداد سالانه در قالب یک چالش فشرده ۴۸ ساعته برگزار می‌شود که در آن ده‌ها هزار توسعه‌دهنده در قالب تیم‌های نوپا ایده‌های ذهنی خود را روی موتورهای بازی پیاده‌سازی می‌کنند. این رویداد نقطه شروع بسیاری از شرکت‌ها و استودیوهای برتر در سراسر جهان بوده است.
                </p>
              </div>
            </section>

            {/* History */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-violet rounded"></span>
                تاریخچه کوتاه
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                پروژه Global Game Jam® ابتدا در جولای ۲۰۰۸ به عنوان زیرمجموعه‌ای تجربی از انجمن بین‌المللی بازی‌سازان (IGDA) متولد شد و در سال ۲۰۱۲ به نهادی کاملاً مستقل و غیرانتفاعی مبدل گردید. اولین جم در سال ۲۰۰۹ با ۱,۶۰۰ بازی‌ساز برگزار شد. در آخرین دوره‌ها، این ماراتن پذیرای بیش از ۴۰,۰۰۰ شرکت‌کننده خلاق بوده است.
              </p>
            </section>

            {/* Notable Games */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-brand-violet/10 pb-4">
                <Award className="text-brand-sky w-6 h-6" />
                <h2 className="text-2xl font-bold text-white">بازی‌های تجاری موفق متولد GGJ</h2>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed">
                برخی از بازی‌های پرفروش و تجاری پلتفرم‌های جهانی (از جمله استیم و کنسول‌ها)، ایده اولیه و پروتوتایپ ۴۸ ساعته خود را در طول رویداد گلوبال گیم جم ثبت کرده‌اند:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                {[
                  { name: "Screencheat", genre: "Party Action Shooter" },
                  { name: "Keep Talking & Nobody Explodes", genre: "Co-op Puzzle Game" },
                  { name: "Surgeon Simulator", genre: "Hilarious Physics Sim" },
                  { name: "Mushroom 11", genre: "Atmospheric Platformer" },
                  { name: "A Normal Lost Phone", genre: "Narrative Mystery" },
                  { name: "How Do You Do It", genre: "Experimental Mini-game" }
                ].map((game) => (
                  <div key={game.name} className="flex justify-between items-center bg-[#100b21] p-4 rounded-xl border border-brand-violet/10">
                    <span className="font-bold text-white" dir="ltr">{game.name}</span>
                    <span className="text-slate-500 text-[10px]">{game.genre}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Downloads */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-brand-violet/10 pb-4">
                <Download className="text-brand-sky w-6 h-6" />
                <h2 className="text-2xl font-bold text-white">دانلود دارایی‌های رسمی برندینگ (Branding Assets)</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <a href="#" className="group block bg-[#100b21] border border-brand-violet/10 hover:border-brand-sky/40 p-6 rounded-2xl transition-all">
                  <ImageIcon className="w-8 h-8 text-brand-sky mb-4" />
                  <h3 className="font-bold text-white mb-1 group-hover:text-brand-sky transition-colors">لوگوها و هویت بصری مجاز</h3>
                  <p className="text-xs text-slate-400 mb-4">فرمت‌های وکتور رسمی SVG و نسخه‌های پرکیفیت PNG بدون Stroke روی پس‌زمینه تیره.</p>
                  <span className="text-xs font-bold text-brand-sky flex items-center gap-1">
                    دانلود فایل زیپ لوگوها (3.2 MB) <ChevronLeft className="w-3 h-3 rotate-180" />
                  </span>
                </a>

                <a href="#" className="group block bg-[#100b21] border border-brand-violet/10 hover:border-accent-lime/40 p-6 rounded-2xl transition-all">
                  <Video className="w-8 h-8 text-accent-lime mb-4" />
                  <h3 className="font-bold text-white mb-1 group-hover:text-accent-lime transition-colors">آلبوم و گالری باکیفیت</h3>
                  <p className="text-xs text-slate-400 mb-4">عکس‌های رزولوشن بالای فیزیکی از هماهنگی‌ها، مربیان و جوایز سایت‌های ایران.</p>
                  <span className="text-xs font-bold text-accent-lime flex items-center gap-1">
                    دریافت فایل عکس‌ها <ChevronLeft className="w-3 h-3" />
                  </span>
                </a>
              </div>
            </section>
          </div>

          {/* Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#140e28] rounded-2xl p-6 border border-brand-violet/20 relative overflow-hidden">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-sm">
                <Mail className="w-5 h-5 text-brand-sky" />
                هماهنگی مصاحبه و رسانه
              </h3>
              <ul className="space-y-4 text-xs">
                <li>
                  <span className="block text-slate-400 mb-1">امور رسانه و رادیو تلوزیون:</span>
                  <a href="mailto:press@globalgamejam.ir" className="text-brand-sky hover:underline font-mono" dir="ltr">press@globalgamejam.ir</a>
                </li>
                <li>
                  <span className="block text-slate-400 mb-1">اسپانسرشیپ بومی:</span>
                  <a href="mailto:sponsors@globalgamejam.ir" className="text-brand-sky hover:underline font-mono" dir="ltr">sponsors@globalgamejam.ir</a>
                </li>
                <li>
                  <span className="block text-slate-400 mb-1">لید هماهنگی ایران:</span>
                  <a href="mailto:iran@globalgamejam.ir" className="text-brand-sky hover:underline font-mono" dir="ltr">iran@globalgamejam.ir</a>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800 space-y-4 text-xs">
              <h3 className="font-bold text-white text-sm">آمارهای کلی رویداد</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-400">مجموع شرکت‌کنندگان تاریخ:</span>
                  <strong className="text-white">۵۰۷,۸۶۵+ نفر</strong>
                </li>
                <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-400">تعداد کل بازی‌های تولید شده:</span>
                  <strong className="text-white">۱۱۰,۵۳۸ بازی</strong>
                </li>
                <li className="flex justify-between items-center pb-2">
                  <span className="text-slate-400">مجموع کشورهای مشارکت‌کننده:</span>
                  <strong className="text-white">۱۳۲ کشور</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">پورتال خبری مرجع:</span>
                  <strong className="text-brand-sky">IGN, Forbes, Polygon</strong>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
