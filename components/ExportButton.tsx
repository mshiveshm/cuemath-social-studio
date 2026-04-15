'use client';

import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Download, Image, FileText, Images, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExportButtonProps {
  slideCount: number;
  format: string;
  title: string;
  selectedSlideIndex?: number;
}

export default function ExportButton({
  slideCount,
  format,
  title,
  selectedSlideIndex = 0,
}: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const downloadCurrentSlide = async () => {
    setIsExporting(true);
    try {
      const slideElement = document.getElementById(`slide-${selectedSlideIndex}`);
      if (!slideElement) {
        console.error(
          `Slide element with id slide-${selectedSlideIndex} not found`
        );
        alert('Could not find slide to export');
        return;
      }

      const canvas = await html2canvas(slideElement, {
        scale: 2,
        useCORS: true,
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      const timestamp = Date.now();
      link.download = `cuemath-slide-${selectedSlideIndex + 1}-${timestamp}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading slide:', error);
      alert('Failed to download slide');
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  const downloadAllAsPDF = async () => {
    setIsExporting(true);
    try {
      const { jsPDF } = await import('jspdf');

      let pageFormat: [number, number] | string = 'a5';
      if (format === 'story') {
        pageFormat = [400, 711];
      } else if (format === 'post') {
        pageFormat = [400, 400];
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: pageFormat,
      });

      for (let i = 0; i < slideCount; i++) {
        const slideElement = document.getElementById(`slide-${i}`);
        if (!slideElement) continue;

        const canvas = await html2canvas(slideElement, {
          scale: 2,
          useCORS: true,
        });

        const imgData = canvas.toDataURL('image/png');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        if (i > 0) {
          pdf.addPage([pageWidth, pageHeight], 'portrait');
        }

        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
      }

      const timestamp = Date.now();
      pdf.save(`cuemath-carousel-${timestamp}.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF');
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  const downloadAllAsPNGs = async () => {
    setIsExporting(true);
    try {
      for (let i = 0; i < slideCount; i++) {
        const slideElement = document.getElementById(`slide-${i}`);
        if (!slideElement) continue;

        const canvas = await html2canvas(slideElement, {
          scale: 2,
          useCORS: true,
        });

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        const timestamp = Date.now();
        link.download = `cuemath-slide-${i + 1}-${timestamp}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Wait 500ms between downloads
        if (i < slideCount - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    } catch (error) {
      console.error('Error downloading slides:', error);
      alert('Failed to download slides');
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => !isExporting && setIsOpen(!isOpen)}
        disabled={isExporting}
        className={cn(
          'flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200',
          'bg-gradient-to-r from-[#FF6B35] to-[#6B4EFF]',
          isExporting && 'opacity-50 cursor-not-allowed'
        )}
      >
        {isExporting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Exporting...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Export
          </>
        )}
      </button>

      {isOpen && !isExporting && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50">
          <button
            onClick={downloadCurrentSlide}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-gray-800 transition-colors border-b border-gray-700"
          >
            <Image className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="text-sm">Download Current Slide (PNG)</span>
          </button>

          <button
            onClick={downloadAllAsPDF}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-gray-800 transition-colors border-b border-gray-700"
          >
            <FileText className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="text-sm">Download All Slides (PDF)</span>
          </button>

          <button
            onClick={downloadAllAsPNGs}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-gray-800 transition-colors"
          >
            <Images className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="text-sm">Download All as PNGs</span>
          </button>
        </div>
      )}
    </div>
  );
}
