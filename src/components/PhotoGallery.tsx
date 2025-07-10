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

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navigation functions
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

  // Swipe handlers with mobile-optimized threshold
  const swipeHandlers = useSwipeHandlers({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
    threshold: isMobile ? 30 : 50
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(goToNext, autoPlayInterval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, goToNext]);

  // Enhanced lazy loading - mobile loads fewer images to save data
  useEffect(() => {
    const preloadImages = () => {
      const toLoad = new Set(loadedImages);
      
      if (isMobile) {
        // Mobile: Load current and 1 image on each side
        for (let i = -1; i <= 1; i++) {
          const index = (currentIndex + i + photos.length) % photos.length;
          toLoad.add(index);
        }
      } else {
        // Desktop: Load current and 2 images on each side for smooth transitions
        for (let i = -2; i <= 2; i++) {
          const index = (currentIndex + i + photos.length) % photos.length;
          toLoad.add(index);
        }
      }
      
      setLoadedImages(toLoad);
    };

    preloadImages();
  }, [currentIndex, photos.length, loadedImages, isMobile]);

  // Pause auto-play on hover (desktop only)
  const handleMouseEnter = () => {
    if (!isMobile && intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    if (!isMobile && autoPlay) {
      intervalRef.current = setInterval(goToNext, autoPlayInterval);
    }
  };

  const getSlidePosition = (index: number) => {
    const diff = index - currentIndex;
    const total = photos.length;
    
    // Handle wrap-around for infinite scroll
    let position = diff;
    if (diff > total / 2) position = diff - total;
    if (diff < -total / 2) position = diff + total;
    
    return position;
  };

  const getMobileSlideStyles = (position: number) => {
    const baseStyles = 'absolute top-0 w-full h-full transition-all ease-out';
    const duration = 'duration-400';
    
    switch (position) {
      case 0:
        // Current image - center, full scale, fully visible
        return {
          className: `${baseStyles} ${duration} z-20`,
          style: {
            left: '0%',
            transform: 'translateX(0%) scale(1)',
            opacity: 1
          }
        };
      case -1:
        // Previous image - slide out to left
        return {
          className: `${baseStyles} ${duration} z-10 pointer-events-none`,
          style: {
            left: '0%',
            transform: 'translateX(-100%) scale(0.9)',
            opacity: 0
          }
        };
      case 1:
        // Next image - slide out to right
        return {
          className: `${baseStyles} ${duration} z-10 pointer-events-none`,
          style: {
            left: '0%',
            transform: 'translateX(100%) scale(0.9)',
            opacity: 0
          }
        };
      default:
        // Hidden images - completely off screen
        return {
          className: `${baseStyles} ${duration} z-0 pointer-events-none`,
          style: {
            left: '0%',
            transform: position < 0 ? 'translateX(-200%) scale(0.8)' : 'translateX(200%) scale(0.8)',
            opacity: 0
          }
        };
    }
  };

  const getDesktopSlideStyles = (position: number) => {
    const baseStyles = 'absolute top-0 h-full transition-all duration-600 ease-out cursor-pointer';
    
    switch (position) {
      case -2:
        // Far left thumbnail
        return {
          className: `${baseStyles} z-5`,
          style: {
            left: '0%',
            width: '15%',
            transform: 'scale(0.6)',
            opacity: 0.4
          }
        };
      case -1:
        // Left thumbnail - more prominent
        return {
          className: `${baseStyles} z-10`,
          style: {
            left: '12%',
            width: '20%',
            transform: 'scale(0.75)',
            opacity: 0.7
          }
        };
      case 0:
        // Current image - center, full scale, fully visible
        return {
          className: `${baseStyles} z-20 cursor-default`,
          style: {
            left: '30%',
            width: '40%',
            transform: 'scale(1)',
            opacity: 1
          }
        };
      case 1:
        // Right thumbnail - more prominent
        return {
          className: `${baseStyles} z-10`,
          style: {
            right: '12%',
            width: '20%',
            transform: 'scale(0.75)',
            opacity: 0.7
          }
        };
      case 2:
        // Far right thumbnail
        return {
          className: `${baseStyles} z-5`,
          style: {
            right: '0%',
            width: '15%',
            transform: 'scale(0.6)',
            opacity: 0.4
          }
        };
      default:
        // Hidden images - completely off screen
        return {
          className: `${baseStyles} z-0 pointer-events-none`,
          style: {
            left: position < 0 ? '-100%' : '100%',
            width: '40%',
            transform: 'scale(0.5)',
            opacity: 0
          }
        };
    }
  };

  return (
    
    <div style = {{ background: 'white'}}> 
      <h3 className="text-3xl font-bold text-gray-900 text-center mb-12" style ={{paddingBottom: '10px'}}>
        Nuestro trabajo en imágenes
      </h3>
    <div 
      className={`relative w-screen bg-white overflow-hidden shadow-2xl ${className} ${
        isMobile ? 'h-[60vh] min-h-[400px] max-h-[600px]' : 'h-[70vh] min-h-[500px] max-h-[800px]'
      }`}
      ref={galleryRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...swipeHandlers}
      role="region"
      aria-label="Photo gallery"
      style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)',  marginTop: '5px', paddingTop: '10px', paddingBottom: '10px' }}
    >
      {/* Main Gallery Container */}
      <div className="relative w-full h-full">
        {photos.map((photo, index) => {
          const position = getSlidePosition(index);
          const shouldLoad = loadedImages.has(index);
          const isVisible = isMobile ? Math.abs(position) <= 1 : Math.abs(position) <= 2;
          
          if (!isVisible) return null;
          
          const slideStyles = isMobile ? getMobileSlideStyles(position) : getDesktopSlideStyles(position);
          
          return (
            <div
              key={photo.id}
              className={slideStyles.className}
              style={slideStyles.style}
              onClick={() => !isMobile && position !== 0 && goToSlide(index)}
              role="button"
              tabIndex={position === 0 ? 0 : -1}
              aria-label={`Photo ${index + 1} of ${photos.length}: ${photo.alt}`}
            >
              <div className={`relative w-full h-full overflow-hidden shadow-xl transition-all duration-300 ${
                isMobile ? 'rounded-none' : 'rounded-2xl hover:shadow-2xl mx-2'
              }`}>
                {shouldLoad && (
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className={`w-full h-full ${
                      isMobile ? 'object-cover' : 'object-cover'
                    }`}
                    loading="lazy"
                  />
                )}
                
                {/* Hover overlay for thumbnails (desktop only) */}
                {!isMobile && position !== 0 && (
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-all duration-300" />
                )}
                
                {/* Text Overlay with Dark Gradient - only for center image */}
                {photo.title && position === 0 && (
                  <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent ${
                    isMobile ? 'h-32' : 'h-48'
                  }`} />
                )}
                
                {/* Image Title - only for center image with proper spacing from dots */}
                {photo.title && position === 0 && (
                  <div className={`absolute left-4 right-4 z-10 ${
                    isMobile ? 'bottom-16' : 'bottom-24 left-8 right-8'
                  }`}>
                    <h3 className={`text-white font-bold drop-shadow-2xl leading-tight ${
                      isMobile ? 'text-xl' : 'text-3xl'
                    }`}>
                      {photo.title}
                    </h3>
                  </div>
                )}

                {/* Thumbnail indicators (desktop only) */}
                {!isMobile && position !== 0 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-sm font-medium">
                      {index + 1}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
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

      {/* Enhanced Dots Indicator - positioned to avoid text overlap */}
      {showDots && (
        <div className={`absolute left-1/2 -translate-x-1/2 z-30 flex bg-black/40 backdrop-blur-sm rounded-full ${
          isMobile 
            ? 'bottom-4 space-x-2 px-4 py-2' 
            : 'bottom-8 space-x-4 px-8 py-4'
        }`}>
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? isMobile 
                    ? 'w-3 h-3 bg-white scale-125 shadow-lg'
                    : 'w-4 h-4 bg-white scale-125 shadow-lg'
                  : isMobile
                    ? 'w-2 h-2 bg-white/60 hover:bg-white/80 hover:scale-110'
                    : 'w-3 h-3 bg-white/60 hover:bg-white/80 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentIndex && (
                <div className="absolute inset-0 bg-white rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Mobile Photo Counter */}
      {isMobile && (
        <div className="absolute top-4 right-4 z-30">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>
      )}

      {/* Mobile Swipe Hint (shows briefly on first load) */}
      {isMobile && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 text-white text-xs animate-pulse">
            Swipe to navigate
          </div>
        </div>
      )}
    </div>
    </div>
  );
};