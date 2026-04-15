'use client';

import { useState } from 'react';
import {
  ChevronDown,
  RefreshCw,
  Copy,
  Lightbulb,
  Loader2,
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

interface EditPanelProps {
  slides: Slide[];
  selectedSlideIndex: number;
  onUpdateSlide: (index: number, field: string, value: string) => void;
  onRegenerateSlide: (index: number) => void;
  isRegenerating: boolean;
  brandColors: {
    primary: string;
    secondary: string;
  };
  onBrandColorChange: (key: string, value: string) => void;
  suggestedCaption: string;
  hashtags: string[];
}

export default function EditPanel({
  slides,
  selectedSlideIndex,
  onUpdateSlide,
  onRegenerateSlide,
  isRegenerating,
  brandColors,
  onBrandColorChange,
  suggestedCaption,
  hashtags,
}: EditPanelProps) {
  const [openSections, setOpenSections] = useState({
    editSlide: true,
    regenerate: false,
    brandColors: false,
    captionHashtags: false,
    tips: false,
  });

  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const currentSlide = slides[selectedSlideIndex];

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const tips = [
    'Be specific in your idea for better results',
    'Carousel works best with 5 slides',
    'Keep headlines under 8 words',
  ];

  return (
    <div className="bg-[#1A1A2E] rounded-lg p-6 space-y-4 max-h-[calc(100vh-150px)] overflow-y-auto">
      {/* Edit Slide Section */}
      {currentSlide && (
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('editSlide')}
            className="w-full flex items-center justify-between p-4 bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            <h3 className="font-semibold text-white">Edit Slide</h3>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-gray-400 transition-transform duration-200',
                openSections.editSlide && 'transform rotate-180'
              )}
            />
          </button>

          {openSections.editSlide && (
            <div className="p-4 bg-gray-950 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Headline
                </label>
                <input
                  type="text"
                  value={currentSlide.headline}
                  onChange={(e) =>
                    onUpdateSlide(selectedSlideIndex, 'headline', e.target.value)
                  }
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                  placeholder="Enter headline"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subtext
                </label>
                <textarea
                  value={currentSlide.subtext}
                  onChange={(e) =>
                    onUpdateSlide(selectedSlideIndex, 'subtext', e.target.value)
                  }
                  rows={3}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 resize-none"
                  placeholder="Enter subtext"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Regenerate Section */}
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('regenerate')}
          className="w-full flex items-center justify-between p-4 bg-gray-900 hover:bg-gray-800 transition-colors"
        >
          <h3 className="font-semibold text-white">Regenerate</h3>
          <ChevronDown
            className={cn(
              'w-5 h-5 text-gray-400 transition-transform duration-200',
              openSections.regenerate && 'transform rotate-180'
            )}
          />
        </button>

        {openSections.regenerate && (
          <div className="p-4 bg-gray-950">
            <button
              onClick={() => onRegenerateSlide(selectedSlideIndex)}
              disabled={isRegenerating}
              className={cn(
                'w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2',
                'bg-gradient-to-r from-[#FF6B35] to-[#FF8C42]',
                isRegenerating && 'opacity-50 cursor-not-allowed'
              )}
            >
              {isRegenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Regenerate This Slide
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Brand Colors Section */}
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('brandColors')}
          className="w-full flex items-center justify-between p-4 bg-gray-900 hover:bg-gray-800 transition-colors"
        >
          <h3 className="font-semibold text-white">Brand Colors</h3>
          <ChevronDown
            className={cn(
              'w-5 h-5 text-gray-400 transition-transform duration-200',
              openSections.brandColors && 'transform rotate-180'
            )}
          />
        </button>

        {openSections.brandColors && (
          <div className="p-4 bg-gray-950 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Primary
                </label>
                <input
                  type="color"
                  value={brandColors.primary}
                  onChange={(e) =>
                    onBrandColorChange('primary', e.target.value)
                  }
                  className="w-full h-10 rounded cursor-pointer border border-gray-700"
                />
              </div>
              <div
                className="w-10 h-10 rounded border-2 border-gray-700"
                style={{ backgroundColor: brandColors.primary }}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Secondary
                </label>
                <input
                  type="color"
                  value={brandColors.secondary}
                  onChange={(e) =>
                    onBrandColorChange('secondary', e.target.value)
                  }
                  className="w-full h-10 rounded cursor-pointer border border-gray-700"
                />
              </div>
              <div
                className="w-10 h-10 rounded border-2 border-gray-700"
                style={{ backgroundColor: brandColors.secondary }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Caption & Hashtags Section */}
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('captionHashtags')}
          className="w-full flex items-center justify-between p-4 bg-gray-900 hover:bg-gray-800 transition-colors"
        >
          <h3 className="font-semibold text-white">Caption & Hashtags</h3>
          <ChevronDown
            className={cn(
              'w-5 h-5 text-gray-400 transition-transform duration-200',
              openSections.captionHashtags && 'transform rotate-180'
            )}
          />
        </button>

        {openSections.captionHashtags && (
          <div className="p-4 bg-gray-950 space-y-4">
            {/* Caption */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Suggested Caption
                </label>
                <button
                  onClick={() => handleCopy(suggestedCaption, 'caption')}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  {copiedSection === 'caption' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <textarea
                value={suggestedCaption}
                readOnly
                rows={3}
                className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-gray-300 resize-none focus:outline-none"
              />
            </div>

            {/* Hashtags */}
            {hashtags.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Hashtags
                  </label>
                  <button
                    onClick={() => handleCopy(hashtags.join(' '), 'hashtags')}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    {copiedSection === 'hashtags' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-500/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('tips')}
          className="w-full flex items-center justify-between p-4 bg-gray-900 hover:bg-gray-800 transition-colors"
        >
          <h3 className="font-semibold text-white">Tips</h3>
          <ChevronDown
            className={cn(
              'w-5 h-5 text-gray-400 transition-transform duration-200',
              openSections.tips && 'transform rotate-180'
            )}
          />
        </button>

        {openSections.tips && (
          <div className="p-4 bg-gray-950 space-y-3">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <Lightbulb className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-400">{tip}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
