'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Copy,
  Lightbulb,
} from 'lucide-react';

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
    regenerate: true,
    colors: false,
    caption: false,
    tips: false,
  });

  const [copied, setCopied] = useState(false);

  const currentSlide = slides[selectedSlideIndex];

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tips = [
    'Be specific in your idea for better results',
    'Carousel works best with 5 slides',
    'Keep headlines under 8 words',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* SECTION 1 - Edit Slide */}
      {currentSlide && (
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
          <button
            onClick={() => toggleSection('editSlide')}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 16px',
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            <span>Edit Slide</span>
            {openSections.editSlide ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {openSections.editSlide && (
            <div style={{ padding: '0 16px 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', display: 'block' }}>
                  Headline
                </label>
                <input
                  type="text"
                  value={currentSlide.headline}
                  onChange={(e) => onUpdateSlide(selectedSlideIndex, 'headline', e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: 'white',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', display: 'block' }}>
                  Subtext
                </label>
                <textarea
                  value={currentSlide.subtext}
                  onChange={(e) => onUpdateSlide(selectedSlideIndex, 'subtext', e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: 'white',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    minHeight: '80px',
                    resize: 'none',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2 - Regenerate */}
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
        <button
          onClick={() => toggleSection('regenerate')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          <span>Regenerate</span>
          {openSections.regenerate ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openSections.regenerate && (
          <div style={{ padding: '0 16px 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => onRegenerateSlide(selectedSlideIndex)}
              disabled={isRegenerating}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #FF6B35, #6B4EFF)',
                color: 'white',
                fontSize: '13px',
                fontWeight: 600,
                cursor: isRegenerating ? 'not-allowed' : 'pointer',
                opacity: isRegenerating ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <RefreshCw size={16} className={isRegenerating ? 'animate-spin' : ''} />
              {isRegenerating ? 'Regenerating...' : 'Regenerate This Slide'}
            </button>
          </div>
        )}
      </div>

      {/* SECTION 3 - Brand Colors */}
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
        <button
          onClick={() => toggleSection('colors')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          <span>Brand Colors</span>
          {openSections.colors ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openSections.colors && (
          <div style={{ padding: '0 16px 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Primary
                </label>
                <input
                  type="color"
                  value={brandColors.primary}
                  onChange={(e) => onBrandColorChange('primary', e.target.value)}
                  style={{
                    width: '100%',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.07)',
                    cursor: 'pointer',
                    padding: '2px',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Secondary
                </label>
                <input
                  type="color"
                  value={brandColors.secondary}
                  onChange={(e) => onBrandColorChange('secondary', e.target.value)}
                  style={{
                    width: '100%',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.07)',
                    cursor: 'pointer',
                    padding: '2px',
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4 - Caption & Hashtags */}
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
        <button
          onClick={() => toggleSection('caption')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          <span>Caption & Hashtags</span>
          {openSections.caption ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openSections.caption && (
          <div style={{ padding: '0 16px 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Caption */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Suggested Caption
                </label>
                <button
                  onClick={() => handleCopy(suggestedCaption)}
                  style={{
                    fontSize: '11px',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <textarea
                value={suggestedCaption}
                readOnly
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  color: 'white',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  minHeight: '80px',
                  resize: 'none',
                }}
              />
            </div>

            {/* Hashtags */}
            {hashtags.length > 0 && (
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', display: 'block' }}>
                  Hashtags
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {hashtags.map((tag, index) => (
                    <div
                      key={index}
                      style={{
                        fontSize: '11px',
                        background: 'rgba(255,107,53,0.15)',
                        border: '1px solid rgba(255,107,53,0.3)',
                        color: '#FF6B35',
                        padding: '4px 10px',
                        borderRadius: '50px',
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SECTION 5 - Tips */}
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
        <button
          onClick={() => toggleSection('tips')}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          <span>Tips</span>
          {openSections.tips ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openSections.tips && (
          <div style={{ padding: '0 16px 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              'Be specific in your idea for better results',
              'Carousel works best with 5 slides',
              'Keep headlines under 8 words',
            ].map((tip, index) => (
              <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <Lightbulb size={14} color="#FF6B35" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                  {tip}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
