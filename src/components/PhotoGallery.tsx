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
    setTimeout(() => setIsTransitioning(false), 300);
  }, [photos.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [photos.length, isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
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

  // Lazy loading
  useEffect(() => {
    const preloadAdjacent = () => {
      const toLoad = new Set(loadedImages);
      const prev = (currentIndex - 1 + photos.length) % photos.length;
      const next = (currentIndex + 1) % photos.length;
      
      toLoad.add(currentIndex);
      toLoad.add(prev);
      toLoad.add(next);
      
      setLoadedImages(toLoad);
    };

    preloadAdjacent();
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
    
    if (diff === 0) return 0;
    if (diff === 1 || diff === -(total - 1)) return 1;
    if (diff === -1 || diff === total - 1) return -1;
    
    return diff > 0 ? 2 : -2;
  };

  const getSlideClasses = (position: number) => {
    const baseClasses = 'absolute top-0 h-full transition-all duration-300 ease-in-out';
    
    switch (position) {
      case -1:
        return `${baseClasses} left-0 w-1/4 opacity-60 scale-90 z-10`;
      case 0:
        return `${baseClasses} left-1/2 w-1/2 -translate-x-1/2 opacity-100 scale-100 z-20`;
      case 1:
        return `${baseClasses} right-0 w-1/4 opacity-60 scale-90 z-10`;
      default:
        return `${baseClasses} opacity-0 scale-75 z-0`;
    }
  };

  return (
    <div 
      className={`relative w-full h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl ${className}`}
      ref={galleryRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...swipeHandlers}
      role="region"
      aria-label="Photo gallery"
    >
      {/* Main Gallery Container */}
      <div className="relative w-full h-full">
        {photos.map((photo, index) => {
          const position = getSlidePosition(index);
          const shouldLoad = loadedImages.has(index);
          
          return (
            <div
              key={photo.id}
              className={getSlideClasses(position)}
              onClick={() => position !== 0 && goToSlide(index)}
              role="button"
              tabIndex={position === 0 ? 0 : -1}
              aria-label={`Photo ${index + 1} of ${photos.length}: ${photo.alt}`}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {shouldLoad && (
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Image Title */}
                {photo.title && position === 0 && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-semibold drop-shadow-lg">
                      {photo.title}
                    </h3>
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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Loading Indicator */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-black/10 z-40 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};