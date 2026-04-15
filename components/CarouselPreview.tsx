'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import SlideCard from './SlideCard';

interface Slide {
  slideNumber: number;
  headline: string;
  subtext: string;
  callToAction?: string | null;
  layoutStyle: string;
  gradientStyle: string;
  icon: string;
}

interface CarouselPreviewProps {
  slides: Slide[];
  format: string;
  selectedSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onUpdateSlide: (index: number, field: string, value: string) => void;
  isEditing: boolean;
}

export default function CarouselPreview({
  slides,
  format,
  selectedSlideIndex,
  onSelectSlide,
  onUpdateSlide,
  isEditing,
}: CarouselPreviewProps) {
  const filmstripRef = useRef<HTMLDivElement>(null);

  if (slides.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Sparkles className="w-12 h-12 text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-300 mb-2">
          Your creative will appear here
        </h3>
        <p className="text-gray-500 text-sm">
          Type an idea and click Generate Creative
        </p>
      </div>
    );
  }

  const currentSlide = slides[selectedSlideIndex];
  const isFirstSlide = selectedSlideIndex === 0;
  const isLastSlide = selectedSlideIndex === slides.length - 1;

  const handlePrevious = () => {
    if (!isFirstSlide) {
      onSelectSlide(selectedSlideIndex - 1);
    }
  };

  const handleNext = () => {
    if (!isLastSlide) {
      onSelectSlide(selectedSlideIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

  return (
    <div className="w-full" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Main Preview Area */}
      <div className="relative mb-8">
        {/* Left Arrow */}
        <button
          onClick={handlePrevious}
          disabled={isFirstSlide}
          className={cn(
            'absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 z-10',
            'w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors',
            'flex items-center justify-center',
            isFirstSlide && 'opacity-30 cursor-not-allowed'
          )}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Main Slide Display */}
        <div className="flex justify-center">
          <div className="max-w-sm w-full">
            <SlideCard
              slide={currentSlide}
              format={format}
              isSelected={true}
              isEditing={isEditing}
              onUpdate={(field, value) =>
                onUpdateSlide(selectedSlideIndex, field, value)
              }
              slideIndex={selectedSlideIndex}
            />
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={isLastSlide}
          className={cn(
            'absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 z-10',
            'w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors',
            'flex items-center justify-center',
            isLastSlide && 'opacity-30 cursor-not-allowed'
          )}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="text-center mb-6">
        <p className="text-gray-400 text-sm">
          Slide {selectedSlideIndex + 1} of {slides.length}
        </p>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => onSelectSlide(index)}
            className={cn(
              'transition-all duration-200 rounded-full',
              selectedSlideIndex === index
                ? 'h-2 px-4 bg-[#FF6B35]'
                : 'h-2 w-2 bg-gray-600 hover:bg-gray-500'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Filmstrip */}
      <div
        ref={filmstripRef}
        className="overflow-x-auto pb-4"
      >
        <div className="flex gap-4 min-w-min px-4">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => onSelectSlide(index)}
              className={cn(
                'flex-shrink-0 cursor-pointer transition-all duration-200',
                selectedSlideIndex === index
                  ? 'ring-2 ring-[#FF6B35] rounded-lg'
                  : 'hover:opacity-80'
              )}
            >
              <div className="scale-[0.15] origin-top-left pointer-events-none">
                <SlideCard
                  slide={slide}
                  format={format}
                  isSelected={selectedSlideIndex === index}
                  isEditing={false}
                  onUpdate={() => {}}
                  slideIndex={index}
                />
              </div>
              <p className="text-gray-400 text-xs mt-1 text-center">
                Slide {index + 1}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
