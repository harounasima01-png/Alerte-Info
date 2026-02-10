
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import CategoryBar from './components/CategoryBar';
import NewsCard from './components/NewsCard';
import NewsCardSkeleton from './components/Skeleton';
import { Article, Category } from './types';
import { fetchNews } from './services/newsService';
import { Newspaper, RefreshCw, ChevronUp, Search } from 'lucide-react';

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<Category | 'Général'>('Général');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Fetch news when category changes
  const loadNews = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchNews(category);
      setArticles(data);
      
      // Update unread count based on breaking news from fetch
      const breakingCount = data.filter(a => a.isBreaking).length;
      if (breakingCount > 0) {
        setUnreadCount(breakingCount);
      }
    } catch (err) {
      console.error("Failed to fetch news", err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  // Scroll visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const breakingNews = useMemo(() => {
    return articles.filter(a => a.isBreaking);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const lowerQuery = searchQuery.toLowerCase();
    return articles.filter(a => 
      a.title.toLowerCase().includes(lowerQuery) || 
      a.description.toLowerCase().includes(lowerQuery) ||
      a.source.toLowerCase().includes(lowerQuery)
    );
  }, [articles, searchQuery]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const markNotificationsAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <div className="min-h-screen pb-20">
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        onSearch={setSearchQuery}
        breakingNews={breakingNews}
        unreadCount={unreadCount}
        markAsRead={markNotificationsAsRead}
      />
      
      <main className="pt-16">
        <CategoryBar 
          activeCategory={category} 
          onCategoryChange={setCategory} 
        />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
                <Newspaper className="text-brand-red" size={32} />
                {category === 'Général' ? 'Toute l\'actualité' : category}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Restez informé des derniers événements majeurs.
              </p>
            </div>
            
            <button 
              onClick={loadNews}
              className={`p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-500 hover:text-brand-red transition-all active:scale-95 ${loading ? 'animate-spin' : ''}`}
              title="Actualiser"
            >
              <RefreshCw size={20} />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[...Array(6)].map((_, i) => (
                <NewsCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {filteredArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-full mb-4">
                <Newspaper size={48} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Aucun article trouvé</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md">
                Nous n'avons trouvé aucun article correspondant à votre recherche "{searchQuery}". Essayez d'autres mots-clés ou changez de catégorie.
              </p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-6 text-brand-red font-semibold hover:underline"
              >
                Effacer la recherche
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {showScrollTop && (
          <button 
            onClick={scrollToTop}
            className="p-4 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-90"
          >
            <ChevronUp size={24} />
          </button>
        )}
      </div>

      {/* Mobile Sticky Footer Simulation (Style Apple News) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 h-16 px-6 flex items-center justify-between z-40">
        <button 
          onClick={() => setCategory('Général')}
          className={`flex flex-col items-center gap-1 ${category === 'Général' ? 'text-brand-red' : 'text-slate-400'}`}
        >
          <Newspaper size={20} />
          <span className="text-[10px] font-bold">Aujourd'hui</span>
        </button>
        <button 
          className="flex flex-col items-center gap-1 text-slate-400"
          onClick={() => alert("Fonctionnalité 'Favoris' bientôt disponible !")}
        >
          <div className="w-5 h-5 border-2 border-slate-400 rounded-sm" />
          <span className="text-[10px] font-bold">Pour vous</span>
        </button>
        <button 
          className="flex flex-col items-center gap-1 text-slate-400"
          onClick={() => alert("Fonctionnalité 'Magazines' bientôt disponible !")}
        >
          <div className="w-5 h-5 bg-slate-400 rounded-sm" />
          <span className="text-[10px] font-bold">Revues</span>
        </button>
        <button 
          className="flex flex-col items-center gap-1 text-slate-400"
          onClick={() => setSearchQuery('')}
        >
          <Search size={20} />
          <span className="text-[10px] font-bold">Explorer</span>
        </button>
      </nav>
      
      <footer className="hidden md:block py-10 border-t border-slate-200 dark:border-slate-800 mt-20 text-center text-slate-400 text-sm">
        <p>&copy; 2024 ALERTE INFO. Tous droits réservés.</p>
        <p className="mt-1 italic">L'actualité en temps réel, partout, tout le temps.</p>
      </footer>
    </div>
  );
};

export default App;
