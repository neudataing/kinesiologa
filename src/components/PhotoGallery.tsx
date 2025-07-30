// src/components/PhotoGallery.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipeHandlers } from '../hooks/useSwipeHandlers';

interface Photo {
  id: string;
  url: string;
  alt: string;
  title?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  autoPlay = false,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(new Set([0]));
  const [isMobile, setIsMobile] = useState(false);
  const [highResLoaded, setHighResLoaded] = useState<Set<number>>(new Set());
  const galleryRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  // 1) Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2) Compute average background colors with Canvas
  const bgColors = useAverageColors(photos.map(p => p.url));

  // 3) Navigation helpers
  const goTo = useCallback((newIndex: number) => {
    if (isTransitioning || newIndex === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), isMobile ? 400 : 600);
  }, [currentIndex, isTransitioning, isMobile]);

  const goToNext = useCallback(() => goTo((currentIndex + 1) % photos.length),
    [currentIndex, goTo, photos.length]
  );
  const goToPrevious = useCallback(() => goTo((currentIndex - 1 + photos.length) % photos.length),
    [currentIndex, goTo, photos.length]
  );

  // 4) Swipe & keyboard
  const swipeHandlers = useSwipeHandlers({ onSwipeLeft: goToNext, onSwipeRight: goToPrevious, threshold: isMobile ? 30 : 50 });
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goToNext, goToPrevious]);

  // 5) Auto-play
  useEffect(() => {
    if (autoPlay) intervalRef.current = window.setInterval(goToNext, autoPlayInterval);
    return () => { if (intervalRef.current != null) clearInterval(intervalRef.current); };
  }, [autoPlay, autoPlayInterval, goToNext]);

  // 6) Lazy-load neighbors
  useEffect(() => {
    setLoadedSlides(prev => {
      const toLoad = new Set(prev);
      const range = isMobile ? 1 : 2;
      for (let i = -range; i <= range; i++) {
        toLoad.add((currentIndex + i + photos.length) % photos.length);
      }
      return toLoad;
    });
  }, [currentIndex, photos.length, isMobile]);

  // 7) Pause/resume on hover
  const handleMouseEnter = () => { if (!isMobile && intervalRef.current != null) clearInterval(intervalRef.current); };
  const handleMouseLeave = () => { if (!isMobile && autoPlay) intervalRef.current = window.setInterval(goToNext, autoPlayInterval); };

  // 8) Slide positioning
  const getSlidePosition = (idx: number) => {
    let diff = idx - currentIndex;
    const half = photos.length / 2;
    if (diff > half) diff -= photos.length;
    if (diff < -half) diff += photos.length;
    return diff;
  };
  const getStyles = (pos: number) => {
    const mobileBase = 'absolute top-0 w-full h-full transition-all ease-out duration-400';
    const desktopBase = 'absolute top-0 h-full transition-all duration-600 ease-out cursor-pointer';
    if (isMobile) {
      if (pos === 0) return { className: `${mobileBase} z-20`, style: { left: '0%', transform: 'translateX(0) scale(1)', opacity: 1 } };
      if (pos === -1) return { className: `${mobileBase} z-10 pointer-events-none`, style: { left: '0%', transform: 'translateX(-100%) scale(0.9)', opacity: 0 } };
      if (pos === 1) return { className: `${mobileBase} z-10 pointer-events-none`, style: { left: '0%', transform: 'translateX(100%) scale(0.9)', opacity: 0 } };
      return { className: `${mobileBase} z-0 pointer-events-none`, style: { left: '0%', transform: pos < 0 ? 'translateX(-200%) scale(0.8)' : 'translateX(200%) scale(0.8)', opacity: 0 } };
    } else {
      switch (pos) {
        case -2: return { className: `${desktopBase} z-5`,  style: { left: '0%', width: '15%', transform: 'scale(0.6)', opacity: 0.4 } };
        case -1: return { className: `${desktopBase} z-10`, style: { left: '12%', width: '20%', transform: 'scale(0.75)', opacity: 0.7 } };
        case 0:  return { className: `${desktopBase} z-20 cursor-default`, style: { left: '30%', width: '40%', transform: 'scale(1)', opacity: 1 } };
        case 1:  return { className: `${desktopBase} z-10`, style: { right: '12%', width: '20%', transform: 'scale(0.75)', opacity: 0.7 } };
        case 2:  return { className: `${desktopBase} z-5`,  style: { right: '0%', width: '15%', transform: 'scale(0.6)', opacity: 0.4 } };
        default: return { className: `${desktopBase} z-0 pointer-events-none`, style: { left: pos < 0 ? '-100%' : '100%', width: '40%', transform: 'scale(0.5)', opacity: 0 } };
      }
    }
  };

  return (
    <div>
      <div
        ref={galleryRef}
        {...swipeHandlers}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="region"
        aria-label="Photo gallery"
        className={`relative w-screen overflow-hidden bg-transparent ${className} ${
          isMobile ? 'h-[60vh] min-h-[400px] max-h-[600px]' : 'h-[70vh] min-h-[500px] max-h-[800px]'
        }`}
        style={{
          margin: '1rem calc(-50vw + 50%)',
          padding: '1rem 0',
          borderRadius: '1.5rem'
        }}
      >
        {/* Slides */}
        <div className="relative w-full h-full">
          {photos.map((photo, idx) => {
            const pos = getSlidePosition(idx);
            if (!loadedSlides.has(idx) || (isMobile ? Math.abs(pos) > 1 : Math.abs(pos) > 2)) return null;
            const { className: cls, style } = getStyles(pos);
            const bg = bgColors[idx] || '#f0f0f0';

            return (
              <div
                key={photo.id}
                className={cls}
                style={{ ...style, backgroundColor: bg, aspectRatio: '16/9' }}
                onClick={() => !isMobile && pos !== 0 && goTo(idx)}
                role="button"
                tabIndex={pos === 0 ? 0 : -1}
                aria-label={`Photo ${idx + 1} of ${photos.length}: ${photo.alt}`}
              >
                <div className="relative w-full h-full overflow-hidden flex items-center justify-center rounded-2xl mx-2 shadow-xl transition-all duration-300">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    loading="lazy"
                    onLoad={() => setHighResLoaded(prev => new Set(prev).add(idx))}
                    className="w-full h-full object-cover"
                    style={{
                      filter: highResLoaded.has(idx) ? 'none' : 'blur(20px)',
                      transition: 'filter 0.5s ease-out'
                    }}
                  />

                  {/* Title overlay */}
                  {photo.title && pos === 0 && (
                    <>
                      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent ${isMobile ? 'h-32' : 'h-48'}`} />
                      <div className={`absolute left-8 right-8 ${isMobile ? 'bottom-16' : 'bottom-24'} z-10`}>
                        <h3 className={`text-white font-bold drop-shadow-2xl ${isMobile ? 'text-xl' : 'text-3xl'}`}>
                          {photo.title}
                        </h3>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        {showArrows && (
          <>
            <button
              onClick={goToPrevious}
              aria-label="Previous image"
              className={`absolute top-1/2 -translate-y-1/2 z-30 backdrop-blur-sm rounded-full bg-black/40 hover:bg-black/60 transition-all duration-200 hover:scale-110 shadow-xl ${
                isMobile ? 'left-4 p-3' : 'left-8 p-4'
              }`}
            >
              <ChevronLeft className={`drop-shadow-lg text-white ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
            </button>
            <button
              onClick={goToNext}
              aria-label="Next image"
              className={`absolute top-1/2 -translate-y-1/2 z-30 backdrop-blur-sm rounded-full bg-black/40 hover:bg-black/60 transition-all duration-200 hover:scale-110 shadow-xl ${
                isMobile ? 'right-4 p-3' : 'right-8 p-4'
              }`}
            >
              <ChevronRight className={`drop-shadow-lg text-white ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
            </button>
          </>
        )}

        {/* Dots */}
        {showDots && (
          <div className={`absolute left-1/2 -translate-x-1/2 z-30 flex backdrop-blur-sm rounded-full bg-black/40 ${
            isMobile ? 'bottom-2 mb-[15px] space-x-1 px-1.5 py-1' : 'bottom-8 mb-[15px] space-x-4 px-8 py-4'
          }`}>
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i+1}`}
                className={`relative transition-all duration-300 rounded-full ${
                  i === currentIndex
                    ? isMobile
                      ? 'w-[20px] h-[20px] bg-white scale-100 shadow-md'
                      : 'w-4 h-4 bg-white scale-125 shadow-lg'
                    : isMobile
                      ? 'w-[18px] h-[18px] bg-white/60 hover:bg-white/80 hover:scale-105'
                      : 'w-3 h-3 bg-white/60 hover:bg-white/80 hover:scale-110'
                }`}
                style={{ minWidth: 0, minHeight: 0 }}
              >
                {i === currentIndex && <div className="absolute inset-0 bg-white rounded-full animate-pulse" />}
              </button>
            ))}
          </div>
        )}

        {/* Mobile counter */}
        {isMobile && (
          <div className="absolute top-4 right-4 z-30">
            <div className="backdrop-blur-sm rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white">
              {currentIndex+1} / {photos.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// Custom hook: usa Canvas para extraer el color promedio en hex
function useAverageColors(urls: string[]): string[] {
  const [colors, setColors] = useState<string[]>([]);
  useEffect(() => {
    const result: string[] = [];
    urls.forEach((url, idx) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, 1, 1);
        const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
        const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
        result[idx] = hex;
        // una vez calculado todos:
        if (result.filter(Boolean).length === urls.length) {
          setColors(result);
        }
      };
      img.onerror = () => {
        result[idx] = '#f0f0f0';
        if (result.filter(Boolean).length === urls.length) {
          setColors(result);
        }
      };
    });
  }, [urls]);
  return colors;
}
