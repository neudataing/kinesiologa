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
  const galleryRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  // Navigation functions
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [photos.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [photos.length, isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [currentIndex, isTransitioning]);

  // Swipe handlers
  const swipeHandlers = useSwipeHandlers({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
    threshold: 50
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

  // Enhanced lazy loading - preload more images for smooth navigation
  useEffect(() => {
    const preloadImages = () => {
      const toLoad = new Set(loadedImages);
      
      // Load current and 2 images on each side for smooth transitions
      for (let i = -2; i <= 2; i++) {
        const index = (currentIndex + i + photos.length) % photos.length;
        toLoad.add(index);
      }
      
      setLoadedImages(toLoad);
    };

    preloadImages();
  }, [currentIndex, photos.length, loadedImages]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    if (autoPlay) {
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

  const getSlideStyles = (position: number) => {
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
    <div 
      className={`relative w-screen h-[70vh] min-h-[500px] max-h-[800px] bg-white overflow-hidden shadow-2xl ${className}`}
      ref={galleryRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...swipeHandlers}
      role="region"
      aria-label="Photo gallery"
      style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}
    >
      {/* Main Gallery Container */}
      <div className="relative w-full h-full">
        {photos.map((photo, index) => {
          const position = getSlidePosition(index);
          const shouldLoad = loadedImages.has(index);
          const isVisible = Math.abs(position) <= 2;
          
          if (!isVisible) return null;
          
          const slideStyles = getSlideStyles(position);
          
          return (
            <div
              key={photo.id}
              className={slideStyles.className}
              style={slideStyles.style}
              onClick={() => position !== 0 && goToSlide(index)}
              role="button"
              tabIndex={position === 0 ? 0 : -1}
              aria-label={`Photo ${index + 1} of ${photos.length}: ${photo.alt}`}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 mx-2">
                {shouldLoad && (
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
                
                {/* Hover overlay for thumbnails */}
                {position !== 0 && (
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-all duration-300" />
                )}
                
                {/* Text Overlay with Dark Gradient - only for center image */}
                {photo.title && position === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                )}
                
                {/* Image Title - only for center image with proper spacing from dots */}
                {photo.title && position === 0 && (
                  <div className="absolute bottom-24 left-8 right-8 z-10">
                    <h3 className="text-white text-3xl font-bold drop-shadow-2xl leading-tight">
                      {photo.title}
                    </h3>
                  </div>
                )}

                {/* Thumbnail indicators */}
                {position !== 0 && (
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
            className="absolute left-8 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-4 transition-all duration-200 hover:scale-110 shadow-xl"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 text-white drop-shadow-lg" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-4 transition-all duration-200 hover:scale-110 shadow-xl"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 text-white drop-shadow-lg" />
          </button>
        </>
      )}

      {/* Enhanced Dots Indicator - positioned to avoid text overlap */}
      {showDots && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-4 bg-black/40 backdrop-blur-sm rounded-full px-8 py-4">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 ${
                index === currentIndex
                  ? 'w-4 h-4 bg-white scale-125 shadow-lg'
                  : 'w-3 h-3 bg-white/60 hover:bg-white/80 hover:scale-110'
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentIndex && (
                <div className="absolute inset-0 bg-white rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Mobile Touch Indicators */}
      <div className="absolute bottom-4 left-4 z-30 md:hidden">
        <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-2 text-white text-sm">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>
    </div>
  );
};