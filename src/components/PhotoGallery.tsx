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
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const [isMobile, setIsMobile] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navigation
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    setTimeout(() => setIsTransitioning(false), isMobile ? 400 : 600);
  }, [photos.length, isTransitioning, isMobile]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setTimeout(() => setIsTransitioning(false), isMobile ? 400 : 600);
  }, [photos.length, isTransitioning, isMobile]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), isMobile ? 400 : 600);
  }, [currentIndex, isTransitioning, isMobile]);

  // Swipe handlers
  const swipeHandlers = useSwipeHandlers({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
    threshold: isMobile ? 30 : 50
  });

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goToNext, goToPrevious]);

  // Auto-play
  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = window.setInterval(goToNext, autoPlayInterval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, goToNext]);

  // Lazy load neighboring images
  useEffect(() => {
    setLoadedImages((prev) => {
      const toLoad = new Set(prev);
      const range = isMobile ? 1 : 2;
      for (let i = -range; i <= range; i++) {
        const idx = (currentIndex + i + photos.length) % photos.length;
        toLoad.add(idx);
      }
      return toLoad;
    });
  }, [currentIndex, photos.length, isMobile]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (!isMobile && intervalRef.current) clearInterval(intervalRef.current);
  };
  const handleMouseLeave = () => {
    if (!isMobile && autoPlay) {
      intervalRef.current = window.setInterval(goToNext, autoPlayInterval);
    }
  };

  // Slide positioning helpers
  const getSlidePosition = (index: number) => {
    let diff = index - currentIndex;
    const mid = photos.length / 2;
    if (diff > mid) diff -= photos.length;
    if (diff < -mid) diff += photos.length;
    return diff;
  };

  const getMobileSlideStyles = (pos: number) => {
    const base = 'absolute top-0 w-full h-full transition-all ease-out';
    const dur = 'duration-400';
    if (pos === 0) {
      return { className: `${base} ${dur} z-20`, style: { left: '0%', transform: 'translateX(0%) scale(1)', opacity: 1 } };
    }
    if (pos === -1) {
      return { className: `${base} ${dur} z-10 pointer-events-none`, style: { left: '0%', transform: 'translateX(-100%) scale(0.9)', opacity: 0 } };
    }
    if (pos === 1) {
      return { className: `${base} ${dur} z-10 pointer-events-none`, style: { left: '0%', transform: 'translateX(100%) scale(0.9)', opacity: 0 } };
    }
    return {
      className: `${base} ${dur} z-0 pointer-events-none`,
      style: { left: '0%', transform: pos < 0 ? 'translateX(-200%) scale(0.8)' : 'translateX(200%) scale(0.8)', opacity: 0 }
    };
  };

  const getDesktopSlideStyles = (pos: number) => {
    const base = 'absolute top-0 h-full transition-all duration-600 ease-out cursor-pointer';
    switch (pos) {
      case -2:
        return { className: `${base} z-5`, style: { left: '0%', width: '15%', transform: 'scale(0.6)', opacity: 0.4 } };
      case -1:
        return { className: `${base} z-10`, style: { left: '12%', width: '20%', transform: 'scale(0.75)', opacity: 0.7 } };
      case 0:
        return { className: `${base} z-20 cursor-default`, style: { left: '30%', width: '40%', transform: 'scale(1)', opacity: 1 } };
      case 1:
        return { className: `${base} z-10`, style: { right: '12%', width: '20%', transform: 'scale(0.75)', opacity: 0.7 } };
      case 2:
        return { className: `${base} z-5`, style: { right: '0%', width: '15%', transform: 'scale(0.6)', opacity: 0.4 } };
      default:
        return {
          className: `${base} z-0 pointer-events-none`,
          style: { left: pos < 0 ? '-100%' : '100%', width: '40%', transform: 'scale(0.5)', opacity: 0 }
        };
    }
  };

  return (
    <div>
      <div
        className={`relative w-screen bg-transparent overflow-hidden ${className} ${
          isMobile ? 'h-[60vh] min-h-[400px] max-h-[600px]' : 'h-[70vh] min-h-[500px] max-h-[800px]'
        }`}
        ref={galleryRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...swipeHandlers}
        role="region"
        aria-label="Photo gallery"
        style={{
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          marginTop: '1rem',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          borderRadius: '1.5rem'
        }}
      >
        {/* Slides */}
        <div className="relative w-full h-full">
          {photos.map((photo, idx) => {
            const pos = getSlidePosition(idx);
            const shouldLoad = loadedImages.has(idx);
            const isVisible = isMobile ? Math.abs(pos) <= 1 : Math.abs(pos) <= 2;
            if (!isVisible) return null;
            const slide = isMobile ? getMobileSlideStyles(pos) : getDesktopSlideStyles(pos);

            return (
              <div
                key={photo.id}
                className={slide.className}
                style={slide.style}
                onClick={() => !isMobile && pos !== 0 && goToSlide(idx)}
                role="button"
                tabIndex={pos === 0 ? 0 : -1}
                aria-label={`Photo ${idx + 1} of ${photos.length}: ${photo.alt}`}
              >
                <div
                  className={`relative w-full h-full overflow-hidden flex items-center justify-center shadow-xl transition-all duration-300 ${
                    isMobile ? 'rounded-none' : 'rounded-2xl hover:shadow-2xl mx-2'
                  }`}
                >
                  {shouldLoad && (
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain"
                    />
                  )}

                  {/* Desktop hover overlay */}
                  {!isMobile && pos !== 0 && (
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-all duration-300" />
                  )}

                  {/* Title overlay on center slide */}
                  {photo.title && pos === 0 && (
                    <>
                      <div
                        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent ${
                          isMobile ? 'h-32' : 'h-48'
                        }`}
                      />
                      <div
                        className={`absolute left-4 right-4 z-10 ${
                          isMobile ? 'bottom-16' : 'bottom-24 left-8 right-8'
                        }`}
                      >
                        <h3 className={`text-white font-bold drop-shadow-2xl leading-tight ${
                          isMobile ? 'text-xl' : 'text-3xl'
                        }`}>
                          {photo.title}
                        </h3>
                      </div>
                    </>
                  )}

                  {/* Desktop thumbnail indicator */}
                  {!isMobile && pos !== 0 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-sm font-medium">
                        {idx + 1}
                      </span>
                    </div>
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
              className={`absolute top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full transition-all duration-200 hover:scale-110 shadow-xl ${
                isMobile ? 'left-4 p-3' : 'left-8 p-4'
              }`}
              aria-label="Previous image"
            >
              <ChevronLeft className={`text-white drop-shadow-lg ${
                isMobile ? 'w-6 h-6' : 'w-8 h-8'
              }`} />
            </button>
            <button
              onClick={goToNext}
              className={`absolute top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full transition-all duration-200 hover:scale-110 shadow-xl ${
                isMobile ? 'right-4 p-3' : 'right-8 p-4'
              }`}
              aria-label="Next image"
            >
              <ChevronRight className={`text-white drop-shadow-lg ${
                isMobile ? 'w-6 h-6' : 'w-8 h-8'
              }`} />
            </button>
          </>
        )}

        {/* Dots */}
        {showDots && (
          <div className={`absolute left-1/2 -translate-x-1/2 z-30 flex bg-black/40 backdrop-blur-sm rounded-full ${
            isMobile ? 'bottom-2 mb-[15px] space-x-1 px-1.5 py-1' : 'bottom-8 mb-[15px] space-x-4 px-8 py-4'
          }`}>
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`relative transition-all duration-300 rounded-full ${
                  i === currentIndex
                    ? isMobile
                      ? 'w-[20px] h-[20px] bg-white scale-100 shadow-md'
                      : 'w-4 h-4 bg-white scale-125 shadow-lg'
                    : isMobile
                      ? 'w-[18px] h-[18px] bg-white/60 hover:bg-white/80 hover:scale-105'
                      : 'w-3 h-3 bg-white/60 hover:bg-white/80 hover:scale-110'
                }`}
                aria-label={`Go to slide ${i + 1}`}
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
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};