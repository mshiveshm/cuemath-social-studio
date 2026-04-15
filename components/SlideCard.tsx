'use client';

import {
  Brain,
  Star,
  Zap,
  Heart,
  BookOpen,
  Trophy,
  Target,
  Lightbulb,
  Users,
  TrendingUp,
  Clock,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Slide {
  slideNumber: number;
  headline: string;
  subtext: string;
  callToAction?: string | null;
  layoutStyle: string;
  gradientStyle: string;
  icon: string;
}

interface SlideCardProps {
  slide: Slide;
  format: string;
  isSelected: boolean;
  isEditing: boolean;
  onUpdate: (field: string, value: string) => void;
  slideIndex: number;
}

const iconMap: Record<string, typeof Star> = {
  Brain,
  Star,
  Zap,
  Heart,
  BookOpen,
  Trophy,
  Target,
  Lightbulb,
  Users,
  TrendingUp,
  Clock,
  Shield,
};

const gradientMap: Record<string, string> = {
  gradient1: 'bg-gradient-to-br from-orange-500 to-purple-600',
  gradient2: 'bg-gradient-to-br from-purple-600 to-blue-600',
  gradient3: 'bg-gradient-to-br from-orange-400 to-pink-600',
  gradient4: 'bg-gradient-to-br from-slate-800 to-slate-900',
  gradient5: 'bg-gradient-to-br from-blue-600 to-purple-700',
  gradient6: 'bg-gradient-to-br from-orange-300 to-orange-600',
};

const aspectRatioMap: Record<string, string> = {
  carousel: 'aspect-[4/5]',
  post: 'aspect-square',
  story: 'aspect-[9/16]',
};

const layoutMap: Record<string, string> = {
  center: 'flex flex-col items-center justify-center text-center p-8',
  split: 'flex flex-row items-center gap-4 p-6 text-left',
  iconTop: 'flex flex-col items-center gap-3 p-8',
  bigText: 'flex flex-col justify-end p-8',
};

export default function SlideCard({
  slide,
  format,
  isSelected,
  isEditing,
  onUpdate,
  slideIndex,
}: SlideCardProps) {
  const IconComponent = iconMap[slide.icon] || Star;
  const gradientClass = gradientMap[slide.gradientStyle] || gradientMap.gradient1;
  const aspectRatioClass = aspectRatioMap[format] || aspectRatioMap.carousel;
  const layoutClass = layoutMap[slide.layoutStyle] || layoutMap.center;

  return (
    <div
      id={`slide-${slideIndex}`}
      className={cn(
        'relative rounded-lg overflow-hidden shadow-xl',
        aspectRatioClass,
        gradientClass,
        isSelected && 'ring-4 ring-[#FF6B35]'
      )}
    >
      {/* Overlay pattern for depth */}
      <div className="absolute inset-0 bg-white opacity-5 pointer-events-none"></div>

      {/* Slide number indicator - top left */}
      <div className="absolute top-4 left-4 text-white text-xs font-bold opacity-70">
        {String(slide.slideNumber).padStart(2, '0')}
      </div>

      {/* Cuemath logo - top right */}
      <div className="absolute top-4 right-4 text-white text-xs font-bold opacity-70">
        Cuemath
      </div>

      {/* Main content area */}
      <div className={cn('w-full h-full flex', layoutClass)}>
        {/* Icon section */}
        {slide.layoutStyle !== 'split' && (
          <div className="flex-shrink-0">
            <IconComponent className="w-12 h-12 text-white" />
          </div>
        )}

        {/* Split layout icon on left */}
        {slide.layoutStyle === 'split' && (
          <div className="flex-shrink-0">
            <IconComponent className="w-12 h-12 text-white" />
          </div>
        )}

        {/* Text content */}
        <div className={cn('w-full', slide.layoutStyle === 'split' && 'flex-1')}>
          {/* Headline */}
          {isEditing ? (
            <div
              contentEditable
              onInput={(e) =>
                onUpdate('headline', e.currentTarget.textContent || '')
              }
              className={cn(
                'font-bold text-white outline-none focus:bg-white/10 rounded px-1 py-0.5 mb-2 break-words',
                slide.layoutStyle === 'bigText'
                  ? 'text-4xl leading-tight'
                  : 'text-2xl'
              )}
              suppressContentEditableWarning
            >
              {slide.headline}
            </div>
          ) : (
            <h2
              className={cn(
                'font-bold text-white mb-2 break-words',
                slide.layoutStyle === 'bigText'
                  ? 'text-4xl leading-tight'
                  : 'text-2xl'
              )}
            >
              {slide.headline}
            </h2>
          )}

          {/* Subtext */}
          {isEditing ? (
            <div
              contentEditable
              onInput={(e) =>
                onUpdate('subtext', e.currentTarget.textContent || '')
              }
              className="text-white/90 text-sm outline-none focus:bg-white/10 rounded px-1 py-0.5 break-words mb-3"
              suppressContentEditableWarning
            >
              {slide.subtext}
            </div>
          ) : (
            <p className="text-white/90 text-sm mb-3 break-words">
              {slide.subtext}
            </p>
          )}

          {/* Call to action */}
          {slide.callToAction && (
            <div className="inline-block bg-white text-gray-900 rounded-full px-4 py-2 text-xs font-medium mt-2">
              {slide.callToAction}
            </div>
          )}
        </div>
      </div>

      {/* Decorative dots at bottom */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              i === 0 ? 'bg-white' : 'bg-white/50'
            )}
          ></div>
        ))}
      </div>
    </div>
  );
}
