'use client';

import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface IdeaInputProps {
  onGenerate: (idea: string, format: string, slideCount: number) => void;
  isLoading: boolean;
}

export default function IdeaInput({ onGenerate, isLoading }: IdeaInputProps) {
  const [idea, setIdea] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('carousel');
  const [selectedSlideCount, setSelectedSlideCount] = useState(5);
  const [textareaFocused, setTextareaFocused] = useState(false);

  const formats = [
    { id: 'carousel', label: 'Carousel', ratio: '4:5' },
    { id: 'post', label: 'Instagram Post', ratio: '1:1' },
    { id: 'story', label: 'Instagram Story', ratio: '9:16' },
  ];

  const slideCountOptions = [3, 5, 7];

  const handleGenerate = () => {
    if (idea.trim().length === 0) {
      return;
    }
    onGenerate(idea, selectedFormat, selectedSlideCount);
  };

  const labelStyle = {
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: 'rgba(255,255,255,0.4)',
    marginBottom: '8px',
    display: 'block',
  };

  const textareaStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: textareaFocused ? '1px solid #FF6B35' : '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '14px 16px',
    color: 'white',
    fontSize: '14px',
    lineHeight: 1.6,
    minHeight: '130px',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
    opacity: isLoading ? 0.6 : 1,
    cursor: isLoading ? 'not-allowed' : 'text',
    transition: 'border-color 0.2s',
  };

  const formatButtonsContainerStyle = {
    display: 'flex',
    gap: '8px',
    marginTop: '16px',
  };

  const formatButtonStyleBase = {
    flex: 1,
    padding: '12px 8px',
    borderRadius: '12px',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '4px',
    transition: 'all 0.2s',
    fontSize: '13px',
    fontWeight: 500,
    opacity: isLoading ? 0.6 : 1,
  };

  const slideCountContainerStyle = {
    marginTop: '16px',
  };

  const slideCountRowStyle = {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
  };

  const countButtonStyleBase = {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    fontWeight: 600,
    fontSize: '15px',
    transition: 'all 0.2s',
    opacity: isLoading ? 0.6 : 1,
  };

  const generateButtonStyle = {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #FF6B35, #6B4EFF)',
    color: 'white',
    fontSize: '15px',
    fontWeight: 600,
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? 0.6 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '24px',
    transition: 'opacity 0.2s',
  };

  const poweredByStyle = {
    textAlign: 'center' as const,
    fontSize: '11px',
    color: 'rgba(255,255,255,0.25)',
    marginTop: '12px',
  };

  const ratioStyle = {
    fontSize: '10px',
    opacity: 0.7,
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Your Idea Section */}
      <div>
        <label style={labelStyle}>Your Idea</label>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          onFocus={() => setTextareaFocused(true)}
          onBlur={() => setTextareaFocused(false)}
          placeholder="Describe your content idea... e.g., carousel about why kids forget what they learn"
          disabled={isLoading}
          style={textareaStyle}
        />
      </div>

      {/* Format Selector */}
      <div>
        <label style={labelStyle}>Format</label>
        <div style={formatButtonsContainerStyle}>
          {formats.map((format) => (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format.id)}
              disabled={isLoading}
              style={{
                ...formatButtonStyleBase,
                ...(selectedFormat === format.id
                  ? {
                      border: '1px solid #FF6B35',
                      background: '#FF6B35',
                      color: 'white',
                    }
                  : {
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'rgba(255,255,255,0.6)',
                    }),
              }}
            >
              <span>{format.label}</span>
              <span style={ratioStyle}>{format.ratio}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Slide Count Selector (only for carousel) */}
      {selectedFormat === 'carousel' && (
        <div style={slideCountContainerStyle}>
          <label style={labelStyle}>Slides</label>
          <div style={slideCountRowStyle}>
            {slideCountOptions.map((count) => (
              <button
                key={count}
                onClick={() => setSelectedSlideCount(count)}
                disabled={isLoading}
                style={{
                  ...countButtonStyleBase,
                  ...(selectedSlideCount === count
                    ? {
                        border: '1px solid #FF6B35',
                        background: '#FF6B35',
                        color: 'white',
                      }
                    : {
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.6)',
                      }),
                }}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Generate Button */}
      <button onClick={handleGenerate} disabled={isLoading} style={generateButtonStyle}>
        {isLoading ? (
          <>
            <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
            Generating...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            Generate Creative
          </>
        )}
      </button>

      {/* Powered by text */}
      <p style={poweredByStyle}>Powered by Google Gemini AI</p>

      {/* Spin animation */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
