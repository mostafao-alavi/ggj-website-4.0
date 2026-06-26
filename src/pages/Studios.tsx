import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Award, Search, Sparkles, PlusCircle, ArrowLeftRight, ArrowRight, ExternalLink, MessageSquare } from 'lucide-react';

interface Studio {
  id: string;
  name: string;
  farsiName: string;
  established: string;
  originJamYear: string;
  game: string;
  farsiGame: string;
  description: string;
  story: string;
  logoUrl: string;
  tags: string[];
}

const STUDIOS_DATA: Studio[] = [
  {
    id: 'classy-games',
    name: 'Classy Games',
    farsiName: 'استودیو بازی‌سازی کلاسیک',
    established: '2020',
    originJamYear: 'GGJ 2020',
    game: 'Royal Cards',
    farsiGame: 'کارت‌های سلطنتی',
    description: 'استودیویی مستقل که هسته اولیه تیم آن در هکاتون و گیم‌جم سال ۲۰۲۰ شکل گرفت و اکنون یکی از توسعه‌دهندگان بازی‌های دسته‌جمعی موفق است.',
    story: 'ما کارمون رو از یک تیم ۴ نفره بی‌تجربه در گلوبال گیم جم شروع کردیم. موضوع بازی «Duality» بود و ما بازی اولمون رو در ۴۸ ساعت ساختیم. انتشار اون در فروشگاه‌های داخلی با استقبال مواجه شد و به ما انگیزه داد تا استودیوی مستقل خودمون رو تاسیس کنیم.',
    logoUrl: 'https://images.unsplash.com/photo-1614680376593-902f74fa0d41?q=80&w=200&auto=format&fit=crop',
    tags: ['بازی‌های کارتی', 'موبایل', 'چندنفره']
  },
  {
    id: 'tana-games',
    name: 'Tana Gameworks',
    farsiName: 'تانا گیم‌ورکس',
    established: '2022',
    originJamYear: 'GGJ 2021',
    game: 'Shadow Runner',
    farsiGame: 'سایه‌رو',
    description: 'توسعه‌دهنده بازی‌های ماجراجویی دو بعدی با داستان‌های عمیق بومی که پروژه‌های آزمایشی جمی خود را تجاری‌سازی کرده است.',
    story: 'سایه‌رو در واقع یک نمونه اولیه بود که با تم «Lost and Found» در قرنطینه کرونا ساخته شد. بعد از گرفتن فیدبک‌های فوق‌العاده از داورهای بین‌المللی تصمیم گرفتیم ۲ سال روی اون کار کنیم و در نهایت روی پلتفرم‌های جهانی و داخلی منتشرش کنیم.',
    logoUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=200&auto=format&fit=crop',
    tags: ['اکشن', 'پلتفرمر', 'داستانی']
  },
  {
    id: 'black-cube',
    name: 'Black Cube Studio',
    farsiName: 'مکعب سیاه',
    established: '2019',
    originJamYear: 'GGJ 2018',
    game: 'The Last Breath',
    farsiGame: 'آخرین نفس',
    description: 'تیمی حرفه‌ای و پیشرو در توسعه بازی‌های پازل اتمسفریک و هنری با جوایز متعدد ملی.',
    story: 'تم سال ۲۰۱۸ «Transmission» بود. ما ایده ارسال سیگنال‌ها در دنیای تاریک زیر آب رو توسعه دادیم. بعد از گیم‌جم، این ایده به یک بازی هنری تمام‌عیار تبدیل شد که جوایز متعددی را در رویدادهای مختلف کسب کرد.',
    logoUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=200&auto=format&fit=crop',
    tags: ['پازل', 'اتمسفریک', 'هنری']
  }
];

export default function Studios() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    studioName: '',
    jamYear: '2026',
    gameName: '',
    email: '',
    story: ''
  });

  const filteredStudios = STUDIOS_DATA.filter(studio => 
    studio.farsiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    studio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    studio.farsiGame.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ studioName: '', jamYear: '2026', gameName: '', email: '', story: '' });
    }, 4000);
  };

  return (
    <div className="w-full min-h-screen">
      {/* Sunburst Branding Background Header */}
      <div className="ggj-sunburst-bg relative pt-20 pb-16 border-b border-brand-violet/20 overflow-hidden">
        <div className="ggj-sunburst-overlay"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/40 border border-brand-sky/20 text-brand-sky text-xs font-bold font-jost mb-4 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> INDIE SPOTLIGHT
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              ویترین استودیوهای مستقل
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              داستان‌های موفقیت شگفت‌انگیز استودیوهای ایرانی که اولین جرقه‌های خلاقیت و تشکیل تیمشان در دل رویدادهای گلوبال گیم جم (GLOBAL GAME JAM®) زده شد.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Directory Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="جستجو در بین استودیوها، بازی‌ها یا کلیدواژه‌ها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 pl-4 py-4 bg-slate-900/60 border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky transition-all text-sm"
              />
            </div>

            {/* Studio Grid */}
            <div className="grid grid-cols-1 gap-6">
              {filteredStudios.map((studio) => (
                <motion.div
                  key={studio.id}
                  layoutId={`studio-${studio.id}`}
                  onClick={() => setSelectedStudio(studio)}
                  className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-brand-sky/30 transition-all cursor-pointer relative overflow-hidden group"
                >
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <img
                      src={studio.logoUrl}
                      alt={studio.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-700 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-grow space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-brand-sky transition-colors">
                          {studio.farsiName}
                        </h3>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400" dir="ltr">
                          {studio.name}
                        </span>
                        <span className="text-xs font-bold text-accent-yellow bg-accent-yellow/10 border border-accent-yellow/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Award className="w-3 h-3" /> متولد {studio.originJamYear}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {studio.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {studio.tags.map(tag => (
                          <span key={tag} className="text-xs bg-slate-900 px-2.5 py-1 rounded-full text-slate-400 border border-slate-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Read More hint */}
                  <div className="absolute bottom-4 left-4 text-xs font-bold text-brand-sky flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    مشاهده داستان موفقیت <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </div>
                </motion.div>
              ))}

              {filteredStudios.length === 0 && (
                <div className="text-center py-12 bg-slate-900/20 rounded-2xl border border-slate-800 border-dashed">
                  <p className="text-slate-400">هیچ موردی مطابق با جستجوی شما یافت نشد.</p>
                </div>
              )}
            </div>

            {/* Interactive Showcase Article / Blog */}
            <div className="bg-gradient-to-l from-brand-violet/10 via-brand-purple/10 to-transparent p-8 rounded-3xl border border-brand-violet/20 space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-accent-lime" />
                راز تبدیل یک پروژه ۴۸ ساعته به یک محصول تجاری
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                بسیاری از بازی‌سازان جوان تصور می‌کنند بازی‌های ساخته شده در یک رویداد ۴۸ ساعته محکوم به فراموشی هستند. اما تجربیات استودیوهای برتر داخلی و خارجی خلاف این را ثابت می‌کند. در اینجا ۳ گام کلیدی برای توسعه بازی جم خود آورده‌ایم:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-lg font-bold text-brand-sky block">۱. ثبت بازخوردها</span>
                  <p className="text-slate-400 text-xs leading-relaxed">در طول رویداد و درست پس از آن، تمام نظرات همکاران، داوران و بازیکنانی که نسخه اولیه شما را تست کرده‌اند یادداشت کنید.</p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-lg font-bold text-accent-yellow block">۲. ساده‌سازی هسته</span>
                  <p className="text-slate-400 text-xs leading-relaxed">اصطلاحاً Core Loop بازی را شناسایی کنید. ویژگی‌های اضافه را حذف و روی عمیق کردن مکانیک اصلی تمرکز کنید.</p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-lg font-bold text-accent-lime block">۳. جذب بازخورد مجدد</span>
                  <p className="text-slate-400 text-xs leading-relaxed">نسخه‌ای جدید را با گرافیک تمیزتر در پلتفرم‌های تست بومی عرضه کنید تا آمادگی ورود به بازار تجاری را بسنجید.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar - Submit your own Jam story */}
          <div className="space-y-8">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-brand-violet/20 rounded-full blur-3xl"></div>
              
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-brand-sky" />
                ثبت داستان استودیوی شما
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                آیا تیم شما هم در یکی از سایت‌های برگزاری ایران تشکیل شده؟ آیا ایده بازی جم خود را به یک محصول تجاری تبدیل کرده‌اید؟ داستان خود را با ما به اشتراک بگذارید تا به دیگران انگیزه دهید و در ویترین معرفی شوید.
              </p>

              {submitted ? (
                <div className="bg-accent-lime/10 border border-accent-lime/20 text-accent-lime p-4 rounded-xl text-center text-xs font-bold">
                  اطلاعات شما با موفقیت ثبت شد! پس از بازبینی با شما تماس می‌گیریم.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-bold">نام استودیو یا تیم</label>
                    <input
                      type="text"
                      required
                      value={formData.studioName}
                      onChange={(e) => setFormData({ ...formData, studioName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-sky"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-bold">سال شکل‌گیری</label>
                      <select
                        value={formData.jamYear}
                        onChange={(e) => setFormData({ ...formData, jamYear: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                      >
                        <option value="2026">GGJ 2026</option>
                        <option value="2025">GGJ 2025</option>
                        <option value="2024">GGJ 2024</option>
                        <option value="2023">GGJ 2023</option>
                        <option value="قبل از ۲۰۲۳">قبل از ۲۰۲۳</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-bold">نام بازی اولیه</label>
                      <input
                        type="text"
                        required
                        value={formData.gameName}
                        onChange={(e) => setFormData({ ...formData, gameName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-sky"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-bold">ایمیل ارتباطی</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-sky text-left"
                      dir="ltr"
                      placeholder="dev@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-bold">داستان یا مسیر تجاری‌سازی شما (خلاصه)</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.story}
                      onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-sky resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-violet hover:bg-brand-violet/80 text-white font-bold rounded-xl text-xs transition-colors shadow-lg shadow-brand-violet/20"
                  >
                    ارسال مستندات
                  </button>
                </form>
              )}
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h4 className="font-bold text-white text-sm">بازی‌های شاخص تولید ایران در گیم‌جم‌ها</h4>
              <ul className="space-y-3 text-xs text-slate-400">
                <li className="flex justify-between items-center">
                  <span>بازی رومیزی دژکوب (۱۳۹۸)</span>
                  <strong className="text-slate-300">طرح برگزیده تم «Home»</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span>فرار از سایه‌ها (۱۴۰۰)</span>
                  <strong className="text-slate-300">سایت تهران</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span>صداهای پنهان (۱۴۰۲)</span>
                  <strong className="text-slate-300">بهترین بازی صوتی</strong>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox / Modal for Studio Story */}
      {selectedStudio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 space-y-6 relative overflow-y-auto max-h-[90vh]"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3 sm:gap-4 items-center">
                <img
                  src={selectedStudio.logoUrl}
                  alt={selectedStudio.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                />
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white">{selectedStudio.farsiName}</h3>
                  <span className="text-xs text-brand-sky font-mono block sm:inline" dir="ltr">{selectedStudio.name}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudio(null)}
                className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-1.5 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-4">
              <div>
                <strong className="text-xs text-slate-400 block mb-1">بازی تجاری موفق:</strong>
                <span className="text-sm text-accent-yellow font-bold">{selectedStudio.farsiGame} ({selectedStudio.game})</span>
              </div>
              <div>
                <strong className="text-xs text-slate-400 block mb-2">داستان متولد شدن در گلوبال گیم جم:</strong>
                <p className="text-slate-300 text-sm leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {selectedStudio.story}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedStudio(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
              >
                بستن
              </button>
              <a
                href="#"
                className="px-5 py-2.5 bg-brand-sky hover:bg-brand-sky/80 text-slate-900 rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
              >
                سایت بازی <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
