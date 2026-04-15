'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Download, Image, FileText, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ExportButtonProps {
  slideCount: number;
  format: string;
  title: string;
  slides: any[];
  onSlideChange: (index: number) => void;
  currentSlideIndex: number;
}

export default function ExportButton({
  slideCount,
  format,
  title,
  slides,
  onSlideChange,
  currentSlideIndex,
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [exportProgress, setExportProgress] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown]);

  // Capture the current slide
  const captureCurrentSlide = async (): Promise<HTMLCanvasElement | null> => {
    await new Promise((r) => setTimeout(r, 300));

    const element = document.getElementById(`slide-${currentSlideIndex}`);
    if (!element) {
      console.error(`Slide element not found: slide-${currentSlideIndex}`);
      return null;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
      return canvas;
    } catch (err) {
      console.error('Error capturing slide:', err);
      return null;
    }
  };

  // Download the current slide as PNG
  const downloadCurrentSlide = async () => {
    setIsExporting(true);
    try {
      const canvas = await captureCurrentSlide();
      if (canvas) {
        const link = document.createElement('a');
        link.download = `cuemath-slide-${currentSlideIndex + 1}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } catch (err) {
      console.error('Error downloading slide:', err);
    } finally {
      setIsExporting(false);
      setShowDropdown(false);
    }
  };

  // Download all slides as PDF
  const downloadAllAsPDF = async () => {
    setIsExporting(true);
    try {
      const { jsPDF } = await import('jspdf');

      let pdf: any = null;

      for (let i = 0; i < slideCount; i++) {
        // Navigate to slide
        onSlideChange(i);
        setExportProgress('Processing slide ' + (i + 1) + ' of ' + slideCount + '...');

        // Wait for slide to render
        await new Promise((r) => setTimeout(r, 1000));

        // Find the slide element
        const element = document.getElementById('slide-' + i);
        if (!element) continue;

        // Capture with html2canvas
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          logging: false,
        });

        // Get exact dimensions from canvas
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Create PDF on first slide using exact canvas dimensions
        if (pdf === null) {
          pdf = new jsPDF({
            orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
            unit: 'px',
            format: [imgWidth, imgHeight],
            hotfixes: ['px_scaling'],
          });
        } else {
          // Add new page with same exact dimensions
          pdf.addPage([imgWidth, imgHeight], imgWidth > imgHeight ? 'landscape' : 'portrait');
        }

        // Add image to fill the entire page exactly
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      }

      if (pdf) {
        pdf.save('cuemath-carousel-' + Date.now() + '.pdf');
      }
    } catch (error) {
      console.error('PDF export error:', error);
    } finally {
      setExportProgress('');
      setIsExporting(false);
    }
  };

  // Download all slides as individual PNGs
  const downloadAllAsPNGs = async () => {
    setIsExporting(true);
    try {
      for (let i =0; i < slideCount; i++) {
        // Step 1: Navigate to slide
        onSlideChange(i);
        setExportProgress('Exporting slide ' + (i + 1) + ' of ' + slideCount + '...');

        // Step 2: Wait longer for DOM to fully re-render
        await new Promise((r) => setTimeout(r, 1200));

        // Step 3: Find element
        const element = document.getElementById('slide-' + i);
        if (!element) {
          console.log('Element not found for slide', i);
          continue;
        }

        // Step 4: Capture
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          logging: false,
        });

        // Step 5: Convert to blob and use blob URL for download
        // This is more reliable than dataURL for multiple downloads
        await new Promise<void>((resolve) => {
          canvas.toBlob((blob) => {
            if (!blob) {
              resolve();
              return;
            }
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'cuemath-slide-' + (i + 1) + '-' + Date.now() + '.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Revoke blob URL after short delay
            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
            resolve();
          }, 'image/png');
        });

        // Step 6: Wait between downloads to prevent browser blocking
        await new Promise((r) => setTimeout(r, 1500));
      }
    } catch (error) {
      console.error('PNG export error:', error);
    } finally {
      // Navigate back to slide 1 after done
      onSlideChange(0);
      setExportProgress('');
      setIsExporting(false);
    }
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Main Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        disabled={isExporting}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid rgba(255,107,53,0.4)',
          background: 'rgba(255,107,53,0.1)',
          color: '#FF6B35',
          cursor: isExporting ? 'not-allowed' : 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          position: 'relative',
          transition: 'all 0.2s',
          opacity: isExporting ? 0.6 : 1,
        }}
      >
        {isExporting ? (
          <>
            <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
            <span>{exportProgress || 'Exporting...'}</span>
          </>
        ) : (
          <>
            <Download size={16} />
            <span>Export</span>
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {showDropdown && !isExporting && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            background: '#1E1E2E',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '8px',
            minWidth: '220px',
            zIndex: 100,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {/* Download This Slide */}
          <button
            onClick={downloadCurrentSlide}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              color: 'white',
              border: 'none',
              background: 'none',
              width: '100%',
              textAlign: 'left',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            <Image size={16} />
            <span>Download This Slide (PNG)</span>
          </button>

          {/* Download All as PDF */}
          <button
            onClick={downloadAllAsPDF}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              color: 'white',
              border: 'none',
              background: 'none',
              width: '100%',
              textAlign: 'left',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            <FileText size={16} />
            <span>Download All as PDF</span>
          </button>

          {/* Download All as PNGs */}
          <button
            onClick={downloadAllAsPNGs}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              color: 'white',
              border: 'none',
              background: 'none',
              width: '100%',
              textAlign: 'left',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            <Image size={16} />
            <span>Download All as PNGs</span>
          </button>
        </div>
      )}

      {/* Style for spinning loader */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
