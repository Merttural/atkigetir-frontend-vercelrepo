import { motion } from 'framer-motion';

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-[24px] shadow-md border border-slate-200 overflow-hidden">
      {/* Image Skeleton */}
      <div className="aspect-[4/5] bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse" />
      
      {/* Content Skeleton */}
      <div className="p-5 space-y-3">
        {/* Category Badge Skeleton */}
        <div className="h-6 w-20 bg-slate-200 rounded-full animate-pulse" />
        
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-slate-200 rounded animate-pulse w-3/4" />
          <div className="h-5 bg-slate-200 rounded animate-pulse w-1/2" />
        </div>
        
        {/* Price Skeleton */}
        <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
        
        {/* Buttons Skeleton */}
        <div className="flex gap-2 pt-2">
          <div className="flex-1 h-10 bg-slate-200 rounded-lg animate-pulse" />
          <div className="flex-1 h-10 bg-slate-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <ProductCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}
