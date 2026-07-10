import React from 'react'

const Skeleton = () => {
  return (
    <div className="shadow-lg rounded-xl overflow-hidden animate-pulse max-sm:flex w-60">
      
      {/* Image Skeleton */}
      <div className="bg-gradient-to-r from-indigo-200 to-purple-200 sm:h-48 h-32 w-full max-sm:w-32" />

      {/* Content Skeleton */}
      <div className="sm:p-4 p-2 sm:space-y-3 space-y-2 w-full">
        
        {/* Name */}
        <div className="h-5 bg-slate-300 rounded-md w-3/4" />

        {/* Speciality + Experience */}
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded-md w-2/3" />
          <div className="h-3 bg-slate-200 rounded-md w-1/3" />
        </div>

        {/* Address */}
        <div className="space-y-2 pt-1">
          <div className="h-3 bg-slate-200 rounded-md w-4/5" />
          <div className="h-3 bg-slate-200 rounded-md w-2/5" />
        </div>

      </div>
    </div>
  );
};

const DocCardSkeleton = () => {
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-5'>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}


export default DocCardSkeleton