'use client';

import React from 'react';
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

interface Slide {
  slideNumber: number;
  headline: string;
  subtext: string;
  callToAction: string | null;
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
  brandColors?: { primary: string; secondary: string };
}

const gradientMap: Record<string, string> = {
  gradient1: 'linear-gradient(135deg, #FF6B35 0%, #7C3AED 100%)',
  gradient2: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)',
  gradient3: 'linear-gradient(135deg, #FB923C 0%, #DB2777 100%)',
  gradient4: 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)',
  gradient5: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
  gradient6: 'linear-gradient(135deg, #FCD34D 0%, #F97316 100%)',
};

const iconMap: Record<string, React.ComponentType<any>> = {
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

export default function SlideCard({
  slide,
  format,
  isSelected,
  isEditing,
  onUpdate,
  slideIndex,
  brandColors,
}: SlideCardProps) {
  const aspectRatioMap: Record<string, string> = {
    carousel: '125%',
    post: '100%',
    story: '177.78%',
  };

  const aspectRatio = aspectRatioMap[format] || '125%';

  const IconComponent = iconMap[slide.icon] || Star;
  const gradientStyle = gradientMap[slide.gradientStyle] || gradientMap.gradient1;

  const renderContent = () => {
    switch (slide.layoutStyle) {
      case 'center':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center', gap: '16px' }}>
            <div style={{ filter: `drop-shadow(0 0 8px ${brandColors?.secondary || '#6B4EFF'})` }}>
              <IconComponent size={48} color="white" />
            </div>
            {isEditing ? (
              <div
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => onUpdate('headline', e.currentTarget.textContent || '')}
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: 'white',
                  lineHeight: 1.2,
                  outline: 'none',
                  cursor: 'text',
                  borderBottom: '1px dashed rgba(255,255,255,0.4)',
                  padding: '4px',
                }}
              >
                {slide.headline}
              </div>
            ) : (
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'white', lineHeight: 1.2 }}>
                {slide.headline}
              </div>
            )}
            {isEditing ? (
              <div
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => onUpdate('subtext', e.currentTarget.textContent || '')}
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.5,
                  maxWidth: '80%',
                  outline: 'none',
                  cursor: 'text',
                  borderBottom: '1px dashed rgba(255,255,255,0.4)',
                  padding: '4px',
                }}
              >
                {slide.subtext}
              </div>
            ) : (
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, maxWidth: '80%' }}>
                {slide.subtext}
              </div>
            )}
          </div>
        );

      case 'bigText':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flex: 1, gap: '12px' }}>
            {isEditing ? (
              <div
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => onUpdate('headline', e.currentTarget.textContent || '')}
                style={{
                  fontSize: '32px',
                  fontWeight: 900,
                  color: 'white',
                  lineHeight: 1.1,
                  outline: 'none',
                  cursor: 'text',
                  borderBottom: '1px dashed rgba(255,255,255,0.4)',
                  padding: '4px',
                }}
              >
                {slide.headline}
              </div>
            ) : (
              <div style={{ fontSize: '32px', fontWeight: 900, color: 'white', lineHeight: 1.1 }}>
                {slide.headline}
              </div>
            )}
            {isEditing ? (
              <div
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => onUpdate('subtext', e.currentTarget.textContent || '')}
                style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.5,
                  outline: 'none',
                  cursor: 'text',
                  borderBottom: '1px dashed rgba(255,255,255,0.4)',
                  padding: '4px',
                }}
              >
                {slide.subtext}
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                {slide.subtext}
              </div>
            )}
          </div>
        );

      case 'iconTop':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', flex: 1, gap: '12px' }}>
            <div style={{ filter: `drop-shadow(0 0 8px ${brandColors?.secondary || '#6B4EFF'})` }}>
              <IconComponent size={40} color="white" />
            </div>
            {isEditing ? (
              <div
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => onUpdate('headline', e.currentTarget.textContent || '')}
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: 'white',
                  lineHeight: 1.2,
                  outline: 'none',
                  cursor: 'text',
                  borderBottom: '1px dashed rgba(255,255,255,0.4)',
                  padding: '4px',
                }}
              >
                {slide.headline}
              </div>
            ) : (
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'white', lineHeight: 1.2 }}>
                {slide.headline}
              </div>
            )}
            {isEditing ? (
              <div
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => onUpdate('subtext', e.currentTarget.textContent || '')}
                style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.5,
                  outline: 'none',
                  cursor: 'text',
                  borderBottom: '1px dashed rgba(255,255,255,0.4)',
                  padding: '4px',
                }}
              >
                {slide.subtext}
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                {slide.subtext}
              </div>
            )}
          </div>
        );

      case 'split':
        return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1, gap: '16px' }}>
            <div style={{ flex: 1 }}>
              {isEditing ? (
                <div
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) => onUpdate('headline', e.currentTarget.textContent || '')}
                  style={{
                    fontSize: '20px',
                    fontWeight: 800,
                    color: 'white',
                    outline: 'none',
                    cursor: 'text',
                    borderBottom: '1px dashed rgba(255,255,255,0.4)',
                    padding: '4px',
                    marginBottom: '8px',
                  }}
                >
                  {slide.headline}
                </div>
              ) : (
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
                  {slide.headline}
                </div>
              )}
              {isEditing ? (
                <div
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) => onUpdate('subtext', e.currentTarget.textContent || '')}
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.8)',
                    outline: 'none',
                    cursor: 'text',
                    borderBottom: '1px dashed rgba(255,255,255,0.4)',
                    padding: '4px',
                  }}
                >
                  {slide.subtext}
                </div>
              ) : (
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                  {slide.subtext}
                </div>
              )}
            </div>
            <div style={{ filter: `drop-shadow(0 0 8px ${brandColors?.secondary || '#6B4EFF'})` }}>
              <IconComponent size={56} color="white" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: aspectRatio,
        borderRadius: '16px',
        overflow: 'hidden',
        border: isSelected ? '3px solid #FF6B35' : '3px solid transparent',
        cursor: 'pointer',
        boxShadow: isSelected ? '0 0 0 2px rgba(255,107,53,0.3)' : '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      <div
        id={`slide-${slideIndex}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: gradientStyle,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Top Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'auto' }}>
          <div style={{ fontSize: '12px', color: brandColors?.primary || 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: '0.1em' }}>
            {String(slide.slideNumber).padStart(2, '0')}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: 700, letterSpacing: '0.05em' }}>
            Cuemath
          </div>
        </div>

        {/* Middle Content */}
        {renderContent()}

        {/* Bottom Row - Call to Action */}
        {slide.callToAction && (
          <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
            <div
              style={{
                display: 'inline-block',
                background: brandColors?.primary ? brandColors.primary + '33' : 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '50px',
                fontSize: '11px',
                fontWeight: 600,
                border: '1px solid ' + (brandColors?.primary || 'rgba(255,255,255,0.3)'),
              }}
            >
              {slide.callToAction}
            </div>
          </div>
        )}

        {/* Decorative Dots */}
        <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: brandColors?.primary || 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: brandColors?.primary || 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: brandColors?.primary || 'rgba(255,255,255,0.4)' }} />
        </div>
      </div>
    </div>
  );
}
