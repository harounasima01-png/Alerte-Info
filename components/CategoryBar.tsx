
import React from 'react';
import { Category } from '../types';

interface CategoryBarProps {
  activeCategory: Category | 'Général';
  onCategoryChange: (category: Category | 'Général') => void;
}

const CATEGORIES: (Category | 'Général')[] = [
  'Général', 'Tech', 'Politique', 'Sport', 'Monde', 'Économie', 'Culture'
];

const CategoryBar: React.FC<CategoryBarProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="sticky top-16 z-30 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
