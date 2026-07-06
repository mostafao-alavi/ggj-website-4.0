import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Gamepad2, Heart, Download, Share2, Layers, Cpu, ExternalLink, Calendar, Users, X, Play, Trophy, CheckCircle } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  englishTitle: string;
  themeYear: string;
  themeName: string;
  engine: 'Unity' | 'Godot' | 'Unreal Engine' | 'Construct 3';
  genre: string;
  creators: string[];
  likes: number;
  downloads: number;
  desc: string;
  coverColor: string;
  playUrl: string;
}

const INITIAL_GAMES_DATA: Game[] = [
  {
    id: 'game-bubble-shield',
    title: 'حباب محافظ (Bubble Shield)',
    englishTitle: 'Bubble Shield',
    themeYear: '2025',
    themeName: 'WAVES / BUBBLES',
    engine: 'Godot',
    genre: 'شبیه‌ساز بقا / فیزیک',
    creators: ['آرمین نجفی', 'سحر رضایی', 'حمید کریمی'],
    likes: 124,
    downloads: 380,
    desc: 'یک بازی فیزیکی جذاب که در آن بازیکن باید با تولید امواج صوتی هماهنگ، یک حباب ظریف شیشه‌ای را از برخورد با صخره‌های سوزنی در کف اقیانوس محافظت کند. گیم‌پلی سرشار از چالش‌های فیزیک دقیق آب و نوسان امواج است.',
    coverColor: 'from-blue-600 to-cyan-500',
    playUrl: 'https://globalgamejam.org/mock-play/bubble-shield'
  },
  {
    id: 'game-roots-of-revelation',
    title: 'ریشه‌های حقیقت (Roots of Revelation)',
    englishTitle: 'Roots of Revelation',
    themeYear: '2023',
    themeName: 'ROOTS',
    engine: 'Unity',
    genre: 'ماجراجویی پازل',
    creators: ['کیوان صدری', 'رعنا تهرانی'],
    likes: 98,
    downloads: 245,
    desc: 'در نقش یک درخت باستانی صنوبر، شما باید ریشه‌های خود را در اعماق یک زمین رادیواکتیو هدایت کنید تا به مخازن آب پاک برسید. بازی دارای یک مکانیک رشد پازل‌گونه نوبتی است که چالش عمیقی ایجاد می‌کند.',
    coverColor: 'from-emerald-600 to-teal-500',
    playUrl: 'https://globalgamejam.org/mock-play/roots-revelation'
  },
  {
    id: 'game-laughing-gladiators',
    title: 'گلادیاتورهای خنده‌رو (Laughing Gladiators)',
    englishTitle: 'Laughing Gladiators',
    themeYear: '2024',
    themeName: 'MAKE ME LAUGH',
    engine: 'Unity',
    genre: 'مولتی‌پلیر لوکال / فیزیک مضحک',
    creators: ['امیرحسین عباسی', 'نوید فرهمند', 'عسل راد'],
    likes: 215,
    downloads: 620,
    desc: 'یک بازی فیزیک Ragdoll دو نفره که در آن شوالیه‌ها با سلاح‌های پلاستیکی و منعطف به جان هم می‌افتند. هدف کشتن حریف نیست، بلکه انجام حرکات محیرالعقولی است که داوران مسابقه را بیشتر بخنداند و امتیاز خنده دریافت کند!',
    coverColor: 'from-amber-600 to-orange-500',
    playUrl: 'https://globalgamejam.org/mock-play/laughing-gladiators'
  },
  {
    id: 'game-light-and-shadow',
    title: 'تضاد سایه‌ها (Duality of Shadows)',
    englishTitle: 'Duality of Shadows',
    themeYear: '2022',
    themeName: 'DUALITY',
    engine: 'Unreal Engine',
    genre: 'پلتفرمر دو بعدی سه‌بعدی',
    creators: ['بردیا امینی', 'غزاله صالحی'],
    likes: 142,
    downloads: 410,
    desc: 'یک بازی پلتفرمر اتمسفریک بی‌نظیر که با موتور آنریل ساخته شده است. بازیکن همزمان دو کاراکتر را در دو دنیای موازی (دنیای نور بالا و دنیای تاریک پایین) کنترل می‌کند. حرکت هر کاراکتر بر موانع کاراکتر دیگر اثر می‌گذارد.',
    coverColor: 'from-purple-600 to-indigo-500',
    playUrl: 'https://globalgamejam.org/mock-play/duality-shadows'
  },
  {
    id: 'game-clockwork-repair',
    title: 'مرمت ساعت زمان (Clockwork Repair)',
    englishTitle: 'Clockwork Repair',
    themeYear: '2020',
    themeName: 'REPAIR',
    engine: 'Construct 3',
    genre: 'پازل دو بعدی سرعتی',
    creators: ['پوریا میرزایی', 'نرگس یوسفی'],
    likes: 85,
    downloads: 195,
    desc: 'یک بازی دو بعدی رترو و سرعتی که در آن شما یک ربات تک‌چشم کوچک هستید که باید چرخ‌دنده‌های شکسته درون ساعت بزرگ شهر را قبل از اتمام زمان تعمیر و تعویض کنید. بسیار مناسب برای بازی روی موبایل.',
    coverColor: 'from-orange-600 to-red-500',
    playUrl: 'https://globalgamejam.org/mock-play/clockwork-repair'
  },
  {
    id: 'game-lost-memories',
    title: 'خاطرات جا مانده (Lost Memories)',
    englishTitle: 'Lost Memories',
    themeYear: '2021',
    themeName: 'LOST AND FOUND',
    engine: 'Godot',
    genre: 'ماجراجویی داستانی عاطفی',
    creators: ['پیمان موسوی', 'مهتاب زارعی', 'الناز اسدی'],
    likes: 167,
    downloads: 512,
    desc: 'سفری عمیق به ذهن یک پیرمرد آلزایمری برای یافتن قطعات پازل خاطرات خانوادگی قدیمی. بازی با گرافیک پیکسل‌آرت خیره‌کننده و موسیقی بسیار آرامش‌بخش، احساسات هر بازیکنی را برمی‌انگیزد.',
    coverColor: 'from-pink-600 to-rose-500',
    playUrl: 'https://globalgamejam.org/mock-play/lost-memories'
  }
];

export default function Games() {
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [engineFilter, setEngineFilter] = useState<string>('ALL');
  const [yearFilter, setYearFilter] = useState<string>('ALL');
  
  // Modal active states
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [likedGames, setLikedGames] = useState<string[]>([]);
  const [downloadingGameId, setDownloadingGameId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  // Filter logic
  const filteredGames = games.filter(game => {
    const matchesSearch = 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.creators.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      game.genre.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEngine = engineFilter === 'ALL' || game.engine === engineFilter;
    const matchesYear = yearFilter === 'ALL' || game.themeYear === yearFilter;

    return matchesSearch && matchesEngine && matchesYear;
  });

  // Like Toggle
  const handleLike = (e: React.MouseEvent, gameId: string) => {
    e.stopPropagation();
    if (likedGames.includes(gameId)) {
      setLikedGames(prev => prev.filter(id => id !== gameId));
      setGames(prev => prev.map(g => g.id === gameId ? { ...g, likes: g.likes - 1 } : g));
    } else {
      setLikedGames(prev => [...prev, gameId]);
      setGames(prev => prev.map(g => g.id === gameId ? { ...g, likes: g.likes + 1 } : g));
    }
  };

  // Simulating download mechanism
  const handleDownload = (e: React.MouseEvent, game: Game) => {
    e.stopPropagation();
    if (downloadingGameId) return; // Prevent multiple downloads at once

    setDownloadingGameId(game.id);
    setDownloadProgress(0);
    setDownloadCompleted(false);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadCompleted(true);
          setTimeout(() => {
            setDownloadingGameId(null);
            setDownloadCompleted(false);
            // Increment download count on success
            setGames(prevGames => prevGames.map(g => g.id === game.id ? { ...g, downloads: g.downloads + 1 } : g));
          }, 1500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#060410] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-jost" dir="rtl">
      
      {/* Decorative backdrop glow */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-brand-violet/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-sky/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Page Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-violet/10 border border-brand-violet/20 rounded-full text-brand-sky text-xs font-black tracking-widest uppercase">
            <Trophy className="w-3.5 h-3.5 text-accent-yellow animate-bounce" />
            <span>THE CREATIVE MUSEUM OF GGJ</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">آرشیو بازی‌های ساخته شده</h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            موزه‌ای دیجیتال از بازی‌های خلاقانه‌ای که جمرهای ایرانی در رویدادهای ۴۸ ساعته سال‌های گذشته خلق کرده‌اند. خروجی بازی‌ها را کاوش کنید، آن‌ها را پسند کنید و فایل بازی را مستقیم بارگیری نمایید.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#120a2e33] border border-brand-violet/15 backdrop-blur-md p-6 rounded-2xl max-w-6xl mx-auto space-y-4 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search Input Box */}
            <div className="relative">
              <span className="absolute inset-y-0 right-3 flex items-center text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو بر اساس نام بازی، نام اعضای تیم..."
                className="w-full bg-[#110c26bb] border border-slate-800 focus:border-brand-sky rounded-xl py-2.5 pr-9 pl-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-sky text-right"
              />
            </div>

            {/* Game Engine Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-bold shrink-0">موتور بازی‌سازی:</span>
              <select
                value={engineFilter}
                onChange={(e) => setEngineFilter(e.target.value)}
                className="w-full bg-[#110c26bb] border border-slate-800 focus:border-brand-sky rounded-xl p-2.5 text-xs text-white focus:outline-none text-right"
              >
                <option value="ALL">همه موتورها</option>
                <option value="Unity">Unity (یونیتی)</option>
                <option value="Godot">Godot (گودو)</option>
                <option value="Unreal Engine">Unreal Engine (آنریل)</option>
                <option value="Construct 3">Construct 3 (کانستراکت)</option>
              </select>
            </div>

            {/* Jam Year Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-bold shrink-0">سال برگزاری / تم:</span>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="w-full bg-[#110c26bb] border border-slate-800 focus:border-brand-sky rounded-xl p-2.5 text-xs text-white focus:outline-none text-right"
              >
                <option value="ALL">همه سال‌ها</option>
                <option value="2025">2025 (موج‌ها یا حباب‌ها)</option>
                <option value="2024">2024 (مرا بخندان)</option>
                <option value="2023">2023 (ریشه‌ها)</option>
                <option value="2022">2022 (دوگانگی)</option>
                <option value="2021">2021 (گم‌شده و پیدا شده)</option>
                <option value="2020">2020 (تعمیر و بازسازی)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Games Grid Catalog */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <motion.div
                key={game.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedGame(game)}
                className="bg-[#110c26aa] border border-brand-violet/10 hover:border-brand-violet/30 rounded-2xl overflow-hidden shadow-xl cursor-pointer flex flex-col justify-between h-full group"
              >
                {/* Visual Top Bar Banner */}
                <div className={`h-3 bg-gradient-to-r ${game.coverColor}`}></div>
                
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  
                  {/* Category Tags Header */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-brand-sky font-bold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> GGJ {game.themeYear}
                      </span>
                      <span className="bg-slate-900/80 border border-slate-800 px-2.5 py-1 rounded-full text-slate-400 font-bold font-mono">
                        {game.engine}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white group-hover:text-brand-sky transition-colors">{game.title}</h3>
                      <span className="text-[10px] text-slate-500 font-mono block" dir="ltr">{game.englishTitle}</span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {game.desc}
                    </p>
                  </div>

                  {/* Team Members info */}
                  <div className="space-y-3 pt-3 border-t border-slate-900">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Users className="w-3.5 h-3.5 text-brand-sky" />
                      <span className="font-bold">تیم توسعه:</span>
                      <span className="text-slate-300 truncate max-w-[150px]">{game.creators.join('، ')}</span>
                    </div>

                    {/* Likes, Downloads stats with interactive triggers */}
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3 text-xs">
                        {/* Like Trigger */}
                        <button
                          onClick={(e) => handleLike(e, game.id)}
                          className={`flex items-center gap-1 font-bold ${
                            likedGames.includes(game.id) ? 'text-rose-400' : 'text-slate-400 hover:text-rose-400'
                          } transition-colors`}
                        >
                          <Heart className={`w-4 h-4 ${likedGames.includes(game.id) ? 'fill-rose-400' : ''}`} />
                          <span>{game.likes}</span>
                        </button>

                        {/* Download stats representation */}
                        <div className="flex items-center gap-1 text-slate-400 font-bold">
                          <Download className="w-4 h-4" />
                          <span>{game.downloads}</span>
                        </div>
                      </div>

                      {/* Download Simulated Button */}
                      <button
                        onClick={(e) => handleDownload(e, game)}
                        disabled={downloadingGameId === game.id}
                        className={`p-2 rounded-xl text-xs transition-all ${
                          downloadingGameId === game.id
                            ? 'bg-slate-800 text-slate-500 cursor-wait'
                            : 'bg-brand-purple/20 hover:bg-brand-purple text-brand-sky hover:text-slate-950 border border-brand-violet/20'
                        }`}
                      >
                        {downloadingGameId === game.id ? (
                          <Cpu className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Simulated download progress bar */}
                    {downloadingGameId === game.id && (
                      <div className="w-full bg-slate-950 rounded-full h-1 relative overflow-hidden mt-2">
                        <div 
                          className="bg-brand-sky h-full transition-all duration-150" 
                          style={{ width: `${downloadProgress}%` }}
                        ></div>
                      </div>
                    )}

                  </div>

                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center space-y-4">
              <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto animate-pulse" />
              <h3 className="text-lg font-bold text-slate-400">هیچ پروژه‌ای مطابق فیلترهای فوق پیدا نشد!</h3>
              <button
                onClick={() => { setSearchQuery(''); setEngineFilter('ALL'); setYearFilter('ALL'); }}
                className="text-xs text-brand-sky hover:underline"
              >
                پاک کردن تمام فیلترها
              </button>
            </div>
          )}
        </div>

        {/* Game Details Overlay Modal */}
        <AnimatePresence>
          {selectedGame && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedGame(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              />

              {/* Modal Card content */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-2xl bg-slate-900 border border-brand-violet/25 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-y-auto max-h-[90vh] z-10 text-right shadow-2xl"
              >
                
                {/* Header close with logo banner */}
                <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl bg-gradient-to-tr ${selectedGame.coverColor} text-white`}>
                      <Gamepad2 className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">{selectedGame.title}</h3>
                      <span className="text-xs text-brand-sky font-mono block" dir="ltr">{selectedGame.englishTitle}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body details info */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-950 p-3 rounded-xl border border-brand-violet/5 text-center">
                      <span className="text-[10px] text-slate-500 block">تم سال ساخت</span>
                      <strong className="text-xs text-white block mt-1">{selectedGame.themeYear}</strong>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-brand-violet/5 text-center">
                      <span className="text-[10px] text-slate-500 block">موتور بازی‌سازی</span>
                      <strong className="text-xs text-brand-sky block mt-1">{selectedGame.engine}</strong>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-brand-violet/5 text-center">
                      <span className="text-[10px] text-slate-500 block">سبک بازی</span>
                      <strong className="text-xs text-white block mt-1">{selectedGame.genre}</strong>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-brand-violet/5 text-center">
                      <span className="text-[10px] text-slate-500 block">تم رسمی رویداد</span>
                      <strong className="text-[9px] text-accent-yellow block mt-1 truncate" dir="ltr">{selectedGame.themeName}</strong>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <strong className="text-xs text-slate-400 block">توضیحات و ایده محوری بازی:</strong>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                      {selectedGame.desc}
                    </p>
                  </div>

                  {/* Team Members section */}
                  <div className="space-y-2">
                    <strong className="text-xs text-slate-400 block">اسامی اعضای تیم سازنده (جمرها):</strong>
                    <div className="flex flex-wrap gap-2">
                      {selectedGame.creators.map((c, i) => (
                        <span key={i} className="bg-brand-purple/10 border border-brand-violet/25 text-brand-sky text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          <span>{c}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons of Play online / Download */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800 justify-end">
                  
                  {/* Share button simulated */}
                  <button 
                    onClick={() => alert('لینک بازی در حافظه کپی شد!')}
                    className="px-5 py-3 rounded-xl text-xs font-bold bg-[#1a1438] hover:bg-[#231b4b] text-slate-300 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Share2 className="w-4 h-4" /> اشتراک‌گذاری بازی
                  </button>

                  <a
                    href={selectedGame.playUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-brand-sky hover:bg-brand-sky/90 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-brand-sky/15"
                  >
                    <Play className="w-4 h-4 fill-slate-950" /> اجرای مستقیم در مرورگر (Itch.io) <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
