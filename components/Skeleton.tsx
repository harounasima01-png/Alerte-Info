
import React from 'react';

const NewsCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 animate-pulse">
      <div className="h-48 bg-slate-200 dark:bg-slate-800 w-full" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-full" />
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
        <div className="flex justify-between pt-2">
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default NewsCardSkeleton;
