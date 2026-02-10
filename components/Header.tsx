
import React, { useState, useRef, useEffect } from 'react';
/* Added Smartphone to imports */
import { Search, Moon, Sun, Bell, User, Clock, AlertCircle, Info, Smartphone } from 'lucide-react';
import { Article } from '../types';
import DeployGuide from './DeployGuide';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onSearch: (query: string) => void;
  breakingNews: Article[];
  unreadCount: number;
  markAsRead: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  darkMode, 
  toggleDarkMode, 
  onSearch, 
  breakingNews,
  unreadCount,
  markAsRead
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDeployGuide, setShowDeployGuide] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && unreadCount > 0) {
      markAsRead();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-brand-red p-1 rounded">
            <Bell className="text-white" size={20} fill="white" />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-1 leading-none">
            ALERTE<span className="text-brand-red">INFO</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className={`relative transition-all duration-300 ${showSearch ? 'w-48 sm:w-64' : 'w-0 overflow-hidden'}`}>
             <input 
              type="text"
              placeholder="Rechercher..."
              autoFocus={showSearch}
              className="w-full bg-slate-100 dark:bg-slate-800 py-2 pl-3 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
              onChange={(e) => onSearch(e.target.value)}
            />
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white"
              onClick={() => setShowSearch(false)}
            >
              ×
            </button>
          </div>

          {!showSearch && (
            <button 
              onClick={() => setShowSearch(true)}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search size={22} />
            </button>
          )}

          {/* Deploy Guide Button */}
          <button 
            onClick={() => setShowDeployGuide(true)}
            className="hidden md:flex p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors items-center gap-2"
            title="Installer sur mobile"
          >
            <Smartphone size={22} />
          </button>

          {/* Functional Notification Center */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={handleToggleNotifications}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
              aria-label="Notifications"
            >
              <Bell size={22} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-red border-2 border-white dark:border-slate-900"></span>
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white">Dernières Alertes</h3>
                  <span className="text-[10px] bg-brand-red/10 text-brand-red font-bold px-2 py-0.5 rounded-full uppercase">
                    Breaking
                  </span>
                </div>
                <div className="max-h-[400px] overflow-y-auto overflow-x-hidden">
                  {breakingNews.length > 0 ? (
                    breakingNews.map((news) => (
                      <a 
                        key={news.id}
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-50 dark:border-slate-800/50 last:border-0 group"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800">
                          <img src={news.urlToImage} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-brand-red uppercase">{news.source}</span>
                            <span className="text-slate-300 dark:text-slate-700 text-[10px]">•</span>
                            <span className="text-slate-400 text-[10px] flex items-center gap-0.5">
                              <Clock size={10} /> {news.publishedAt}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-brand-red transition-colors line-clamp-2">
                            {news.title}
                          </p>
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="p-10 text-center">
                      <AlertCircle className="mx-auto text-slate-300 mb-2" size={32} />
                      <p className="text-slate-500 text-sm">Pas d'alertes pour le moment.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={toggleDarkMode}
            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          
          <button 
            onClick={() => setShowDeployGuide(true)}
            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors md:hidden"
          >
            <Info size={22} />
          </button>
        </div>
      </div>

      <DeployGuide isOpen={showDeployGuide} onClose={() => setShowDeployGuide(false)} />
    </header>
  );
};

export default Header;