
import React from 'react';
import { Article } from '../types';
import { ExternalLink, Clock } from 'lucide-react';

interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <a 
      href={article.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 active:scale-[0.98]"
    >
      <div className="relative h-52 sm:h-60 overflow-hidden">
        <img 
          src={article.urlToImage} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-brand-red text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          {article.category}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-brand-red uppercase tracking-tight">
            {article.source}
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
            <Clock size={12} />
            {article.publishedAt}
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-brand-red transition-colors duration-200">
          {article.title}
        </h3>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
          {article.description}
        </p>
        <div className="mt-4 flex items-center text-xs font-medium text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-200">
          Lire la suite <ExternalLink size={14} className="ml-1" />
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
