'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IdeaInputProps {
  onGenerate: (idea: string, format: string, slideCount: number) => void;
  isLoading: boolean;
}

export default function IdeaInput({ onGenerate, isLoading }: IdeaInputProps) {
  const [idea, setIdea] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('carousel');
  const [selectedSlideCount, setSelectedSlideCount] = useState(5);

  const formats = [
    { id: 'carousel', label: 'Carousel', ratio: '4:5' },
    { id: 'post', label: 'Instagram Post', ratio: '1:1' },
    { id: 'story', label: 'Instagram Story', ratio: '9:16' },
  ];

  const slideCountOptions = [3, 5, 7];

  const handleGenerate = () => {
    if (idea.trim().length === 0) {
      alert('Please describe your content idea');
      return;
    }
    onGenerate(idea, selectedFormat, selectedSlideCount);
  };

  return (
    <div className="bg-[#1A1A2E] rounded-xl p-8 max-w-2xl mx-auto">
      {/* Textarea */}
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Describe your content idea... e.g. Carousel for parents about why kids forget what they learn — explain the forgetting curve — end with how spaced repetition fixes it"
        rows={4}
        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
        disabled={isLoading}
      />

      {/* Format Selector */}
      <div className="mt-6">
        <label className="text-gray-300 text-sm font-medium block mb-3">
          Format
        </label>
        <div className="grid grid-cols-3 gap-3">
          {formats.map((format) => (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format.id)}
              disabled={isLoading}
              className={cn(
                'p-4 rounded-lg border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
                selectedFormat === format.id
                  ? 'bg-[#FF6B35] border-[#FF6B35] text-white'
                  : 'bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-600'
              )}
            >
              <div className="font-medium text-sm">{format.label}</div>
              <div className="text-xs mt-1 opacity-75">{format.ratio}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Slide Count Selector (only for carousel) */}
      {selectedFormat === 'carousel' && (
        <div className="mt-6">
          <label className="text-gray-300 text-sm font-medium block mb-3">
            Number of Slides
          </label>
          <div className="flex gap-3">
            {slideCountOptions.map((count) => (
              <button
                key={count}
                onClick={() => setSelectedSlideCount(count)}
                disabled={isLoading}
                className={cn(
                  'px-6 py-3 rounded-lg border-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
                  selectedSlideCount === count
                    ? 'bg-[#FF6B35] border-[#FF6B35] text-white'
                    : 'bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-600'
                )}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className={cn(
          'w-full mt-8 py-4 rounded-lg font-semibold text-lg text-white transition-all duration-200 flex items-center justify-center gap-2',
          'bg-gradient-to-r from-[#FF6B35] to-[#6B4EFF]',
          isLoading && 'opacity-50 cursor-not-allowed'
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Creative'
        )}
      </button>

      {/* Hint Text */}
      <p className="text-center text-gray-500 text-xs mt-4">
        Powered by Google Gemini AI
      </p>
    </div>
  );
}
