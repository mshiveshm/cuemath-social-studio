'use client';

import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SlideCard from './SlideCard';

interface CarouselPreviewProps {
  slides: any[];
  format: string;
  selectedSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onUpdateSlide: (index: number, field: string, value: string) => void;
  isEditing: boolean;
  brandColors?: { primary: string; secondary: string };
}

export default function CarouselPreview({
  slides,
  format,
  selectedSlideIndex,
  onSelectSlide,
  onUpdateSlide,
  isEditing,
  brandColors,
}: CarouselPreviewProps) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && selectedSlideIndex > 0) {
        onSelectSlide(selectedSlideIndex - 1);
      } else if (e.key === 'ArrowRight' && selectedSlideIndex < slides.length - 1) {
        onSelectSlide(selectedSlideIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSlideIndex, slides.length, onSelectSlide]);

  if (slides.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '64px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '18px', fontWeight: 600, color: 'white' }}>
          Your creative will appear here
        </div>
        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
          Type an idea and click Generate Creative
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', paddingTop: '32px', overflow: 'visible' }}>
      {/* Main Slide Display Area */}
      <div style={{ width: '100%', maxWidth: '360px', position: 'relative' }}>
        <SlideCard
          slide={slides[selectedSlideIndex]}
          format={format}
          isSelected={false}
          isEditing={isEditing}
          onUpdate={(field, value) => onUpdateSlide(selectedSlideIndex, field, value)}
          slideIndex={selectedSlideIndex}
          brandColors={brandColors}
        />

        {/* Left Arrow Button */}
        <button
          onClick={() => {
            if (selectedSlideIndex > 0) {
              onSelectSlide(selectedSlideIndex - 1);
            }
          }}
          style={{
            position: 'absolute',
            left: '-52px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            cursor: selectedSlideIndex === 0 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: selectedSlideIndex === 0 ? 0.3 : 1,
            transition: 'all 0.2s',
            padding: 0,
          }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => {
            if (selectedSlideIndex < slides.length - 1) {
              onSelectSlide(selectedSlideIndex + 1);
            }
          }}
          style={{
            position: 'absolute',
            right: '-52px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            cursor: selectedSlideIndex === slides.length - 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: selectedSlideIndex === slides.length - 1 ? 0.3 : 1,
            transition: 'all 0.2s',
            padding: 0,
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide Counter */}
      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
        Slide {selectedSlideIndex + 1} of {slides.length}
      </div>

      {/* Navigation Dots */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => onSelectSlide(index)}
            style={
              index === selectedSlideIndex
                ? {
                    width: '24px',
                    height: '8px',
                    borderRadius: '4px',
                    background: '#FF6B35',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    border: 'none',
                    padding: 0,
                  }
                : {
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    border: 'none',
                    padding: 0,
                  }
            }
          />
        ))}
      </div>

      {/* Filmstrip */}
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '8px 4px', width: '100%', maxWidth: '600px' }}>
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => onSelectSlide(index)}
            style={{ flexShrink: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
          >
            <div
              style={{
                width: '80px',
                height: '100px',
                border: index === selectedSlideIndex ? '2px solid #FF6B35' : '2px solid transparent',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ width: '80px', height: '100px', overflow: 'hidden', borderRadius: '6px', position: 'relative' }}>
                <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%', pointerEvents: 'none' }}>
                  <SlideCard
                    slide={slides[index]}
                    format={format}
                    isSelected={index === selectedSlideIndex}
                    isEditing={false}
                    onUpdate={() => {}}
                    slideIndex={-1}
                    brandColors={brandColors}
                  />
                </div>
              </div>
            </div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
