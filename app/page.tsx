'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Edit2, CheckCircle } from 'lucide-react';
import IdeaInput from '@/components/IdeaInput';
import CarouselPreview from '@/components/CarouselPreview';
import EditPanel from '@/components/EditPanel';
import ExportButton from '@/components/ExportButton';
import LoadingState from '@/components/LoadingState';
import WelcomeState from '@/components/WelcomeState';
import { BRAND } from '@/lib/constants';
import { generateFallbackContent } from '@/lib/fallbackContent';

interface Slide {
  slideNumber: number;
  headline: string;
  subtext: string;
  callToAction?: string | null;
  layoutStyle: string;
  gradientStyle: string;
  icon: string;
}

interface GenerateResponse {
  title: string;
  slides: Slide[];
  hashtags: string[];
  suggestedCaption: string;
}

interface SavedSession {
  slides: Slide[];
  currentTitle: string;
  suggestedCaption: string;
  hashtags: string[];
}

export default function Home() {
  // State variables
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [format, setFormat] = useState('carousel');
  const [currentTitle, setCurrentTitle] = useState('');
  const [suggestedCaption, setSuggestedCaption] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [brandColors, setBrandColors] = useState({
    primary: "#FF6B35",
    secondary: "#6B4EFF",
  });
  const [showSidebar, setShowSidebar] = useState(true);
  const [showToast, setShowToast] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cuemath-last-session');
      if (saved) {
        const data: SavedSession = JSON.parse(saved);
        setSlides(data.slides);
        setCurrentTitle(data.currentTitle);
        setSuggestedCaption(data.suggestedCaption);
        setHashtags(data.hashtags);
      }
    } catch (err) {
      console.error('Failed to load saved session:', err);
    }
  }, []);

  // Handle generate
  const handleGenerate = async (
    idea: string,
    selectedFormat: string,
    slideCount: number
  ) => {
    setIsGenerating(true);
    setFormat(selectedFormat);
    
    // Force slideCount to 1 for post and story formats
    const actualSlideCount = (selectedFormat === "post" || selectedFormat === "story") ? 1 : slideCount;

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea,
          format: selectedFormat,
          slideCount: actualSlideCount,
        }),
      });

      let data: GenerateResponse;

      if (response.ok) {
        data = await response.json();
      } else {
        // API returned non-200, use fallback
        data = generateFallbackContent(idea, selectedFormat, actualSlideCount);
      }

      setSlides(data.slides);
      setCurrentTitle(data.title);
      setSuggestedCaption(data.suggestedCaption);
      setHashtags(data.hashtags);
      setSelectedSlideIndex(0);

      localStorage.setItem(
        'cuemath-last-session',
        JSON.stringify({
          slides: data.slides,
          currentTitle: data.title,
          suggestedCaption: data.suggestedCaption,
          hashtags: data.hashtags,
        })
      );

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      // Network error or exception, use fallback gracefully
      console.error('Generation error:', err);
      const data = generateFallbackContent(idea, selectedFormat, actualSlideCount);

      setSlides(data.slides);
      setCurrentTitle(data.title);
      setSuggestedCaption(data.suggestedCaption);
      setHashtags(data.hashtags);
      setSelectedSlideIndex(0);

      localStorage.setItem(
        'cuemath-last-session',
        JSON.stringify({
          slides: data.slides,
          currentTitle: data.title,
          suggestedCaption: data.suggestedCaption,
          hashtags: data.hashtags,
        })
      );

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle update slide
  const handleUpdateSlide = (index: number, field: string, value: string) => {
    const updatedSlides = [...slides];
    updatedSlides[index] = {
      ...updatedSlides[index],
      [field]: value,
    };
    setSlides(updatedSlides);
  };

  // Handle regenerate slide
  const handleRegenerateSlide = async (index: number) => {
    setIsRegenerating(true);
    try {
      const currentSlide = slides[index];
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: currentSlide.headline,
          format,
          slideCount: 1,
        }),
      });

      if (response.ok) {
        const data: GenerateResponse = await response.json();
        const updatedSlides = [...slides];
        updatedSlides[index] = {
          ...data.slides[0],
          slideNumber: index + 1,
        };
        setSlides(updatedSlides);
      }
    } catch (err) {
      console.error('Regenerate error:', err);
    } finally {
      setIsRegenerating(false);
    }
  };

  // Handle brand color change
  const handleBrandColorChange = (key: string, value: string) => {
    setBrandColors((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const hasSlides = slides.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0F0F1A', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ height: '64px', minHeight: '64px', background: '#0F0F1A', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', zIndex: 50, flexShrink: 0 }}>
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', background: '#FF6B35', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', fontSize: '18px' }}>
            C
          </div>
          <span style={{ color: '#FF6B35', fontWeight: 700, fontSize: '18px' }}>Cuemath</span>
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.15)' }} />
          <span style={{ color: 'white', fontWeight: 500, fontSize: '16px' }}>Social Media Studio</span>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {hasSlides && (
            <ExportButton
              slideCount={slides.length}
              format={format}
              title={currentTitle}
              slides={slides}
              onSlideChange={setSelectedSlideIndex}
              currentSlideIndex={selectedSlideIndex}
            />
          )}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Toggle sidebar"
          >
            {showSidebar ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div
          style={{
            width: showSidebar ? '380px' : '0px',
            minWidth: showSidebar ? '380px' : '0px',
            background: '#13131F',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            overflowY: 'auto',
            overflowX: 'hidden',
            transition: 'all 0.3s ease',
            padding: showSidebar ? '24px' : '0px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <IdeaInput onGenerate={handleGenerate} isLoading={isGenerating} />

          {hasSlides && (
            <EditPanel
              slides={slides}
              selectedSlideIndex={selectedSlideIndex}
              onUpdateSlide={handleUpdateSlide}
              onRegenerateSlide={handleRegenerateSlide}
              isRegenerating={isRegenerating}
              brandColors={brandColors}
              onBrandColorChange={handleBrandColorChange}
              suggestedCaption={suggestedCaption}
              hashtags={hashtags}
            />
          )}
        </div>

        {/* Main */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', position: 'relative' }}>
          {isGenerating && <LoadingState />}

          {hasSlides && !isGenerating && (
            <div style={{ width: '100%', maxWidth: '1024px' }}>
              <CarouselPreview
                slides={slides}
                format={format}
                selectedSlideIndex={selectedSlideIndex}
                onSelectSlide={setSelectedSlideIndex}
                onUpdateSlide={handleUpdateSlide}
                isEditing={isEditing}
                brandColors={brandColors}
              />
            </div>
          )}

          {!hasSlides && !isGenerating && <WelcomeState />}

          {hasSlides && !isGenerating && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                background: isEditing ? '#4B5563' : '#FF6B35',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '12px 20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 600,
                fontSize: '14px',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isEditing ? '#5a6370' : '#FF8850';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isEditing ? '#4B5563' : '#FF6B35';
              }}
            >
              <Edit2 size={20} />
              {isEditing ? 'Done Editing' : 'Edit Mode'}
            </button>
          )}
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 100, background: '#10B981', color: 'white', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
          <CheckCircle size={20} />
          <span>Creative generated!</span>
        </div>
      )}
    </div>
  );
}
