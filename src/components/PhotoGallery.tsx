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

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
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

  // Core navigation
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

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), isMobile ? 400 : 600);
    },
    [currentIndex, isTransitioning, isMobile]
  );

  // --- Autoplay: start/stop/reset helpers ---
  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetAutoplay = useCallback(() => {
    if (!autoPlay) return;
    stopAutoplay();
    intervalRef.current = window.setInterval(() => {
      goToNext();
    }, autoPlayInterval);
  }, [autoPlay, autoPlayInterval, goToNext, stopAutoplay]);

  useEffect(() => {
    if (autoPlay) resetAutoplay();
    return () => stopAutoplay();
  }, [autoPlay, autoPlayInterval, resetAutoplay, stopAutoplay]);

  // Interacciones manuales reinician timer
  const handleNextManual = useCallback(() => {
    goToNext();
    resetAutoplay();
  }, [goToNext, resetAutoplay]);

  const handlePrevManual = useCallback(() => {
    goToPrevious();
    resetAutoplay();
  }, [goToPrevious, resetAutoplay]);

  const handleGoToSlideManual = useCallback(
    (index: number) => {
      goToSlide(index);
      resetAutoplay();
    },
    [goToSlide, resetAutoplay]
  );

  // Swipe + teclado
  const swipeHandlers = useSwipeHandlers({
    onSwipeLeft: handleNextManual,
    onSwipeRight: handlePrevManual,
    threshold: isMobile ? 30 : 50
  });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevManual();
      if (e.key === 'ArrowRight') handleNextManual();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleNextManual, handlePrevManual]);

  // Lazy load vecinos
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

  // Hover pausa/resume (desktop)
  const handleMouseEnter = () => {
    if (!isMobile) stopAutoplay();
  };
  const handleMouseLeave = () => {
    if (!isMobile) resetAutoplay();
  };

  // Posición relativa del slide
  const getSlidePosition = (index: number) => {
    let diff = index - currentIndex;
    const mid = photos.length / 2;
    if (diff > mid) diff -= photos.length;
    if (diff < -mid) diff += photos.length;
    return diff;
  };

  const getMobileSlideStyles = (pos: number) => {
    const base = 'absolute top-0 w-full h-full transition-all ease-[cubic-bezier(.2,.8,.2,1)] will-change-transform';
    const dur = 'duration-600';
    if (pos === 0) {
      // ⬆️ subimos el z para asegurar que tape a los laterales
      return { className: `${base} ${dur} z-[30]`, style: { left: '0%', transform: 'translateX(0%) scale(1)', opacity: 1 } };
    }
    if (pos === -1) {
      return { className: `${base} ${dur} z-10 pointer-events-none`, style: { left: '0%', transform: 'translateX(-100%) scale(0.94)', opacity: 0 } };
    }
    if (pos === 1) {
      return { className: `${base} ${dur} z-10 pointer-events-none`, style: { left: '0%', transform: 'translateX(100%) scale(0.94)', opacity: 0 } };
    }
    return {
      className: `${base} ${dur} z-0 pointer-events-none`,
      style: { left: '0%', transform: pos < 0 ? 'translateX(-200%) scale(0.88)' : 'translateX(200%) scale(0.88)', opacity: 0 }
    };
  };

  const getDesktopSlideStyles = (pos: number) => {
    const base = 'absolute top-0 h-full transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)] cursor-pointer will-change-transform';
    switch (pos) {
      case -2:
        return { className: `${base} z-[5]`, style: { left: '0%', width: '16%', transform: 'scale(0.64)', opacity: 0.32 } };
      case -1:
        return { className: `${base} z-10`, style: { left: '12%', width: '22%', transform: 'scale(0.78)', opacity: 0.72 } };
      case 0:
        // ⬆️ z-[30] para que el slide central esté seguro por encima de todo
        return { className: `${base} z-[30] cursor-default`, style: { left: '29%', width: '42%', transform: 'scale(1)', opacity: 1 } };
      case 1:
        return { className: `${base} z-10`, style: { right: '12%', width: '22%', transform: 'scale(0.78)', opacity: 0.72 } };
      case 2:
        return { className: `${base} z-[5]`, style: { right: '0%', width: '16%', transform: 'scale(0.64)', opacity: 0.32 } };
      default:
        return { className: `${base} z-0 pointer-events-none`, style: { left: pos < 0 ? '-100%' : '100%', width: '42%', transform: 'scale(0.5)', opacity: 0 } };
    }
  };

  // Guard: sin fotos
  if (!photos || photos.length === 0) {
    return (
      <div className={`relative w-screen ${className}`} style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
        <div className="mx-auto max-w-6xl h-[50vh] min-h-[320px] grid place-items-center text-neutral-500">No hay fotos para mostrar.</div>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`relative w-screen overflow-hidden ${className} ${isMobile ? 'h-[60vh] min-h-[420px] max-h-[620px]' : 'h-[72vh] min-h-[520px] max-h-[860px]'}`}
        ref={galleryRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...swipeHandlers}
        role="region"
        aria-roledescription="carousel"
        aria-label="Photo gallery"
        style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', marginTop: '1rem', paddingTop: '1rem', paddingBottom: '1rem', borderRadius: '1.5rem' }}
      >
        {/* Marco suave */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-black/[0.02] via-transparent to-black/[0.04] dark:from-white/[0.03] dark:to-white/[0.06]" />
        <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5 dark:ring-white/10" />

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
                style={slide.style as React.CSSProperties}
                onClick={() => !isMobile && pos !== 0 && handleGoToSlideManual(idx)}
                role="button"
                tabIndex={pos === 0 ? 0 : -1}
                aria-label={`Photo ${idx + 1} de ${photos.length}: ${photo.alt}`}
              >
                <div
                  className={`relative w-full h-full overflow-hidden flex items-center justify-center transition-all ${isMobile ? 'rounded-none' : 'rounded-3xl mx-2'} shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.18)]`}
                >
                  {/* ⬇️ Fondo "cover" opaco: NO usa transparencia (opacity-100) y se ubica con z-[1],
                      de modo que TAPA cualquier slide posterior pero queda debajo de la imagen principal */}
                  {shouldLoad && (
                    <img
                      src={photo.url}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover blur-xl scale-105 opacity-100 brightness-[0.95] saturate-110 z-[1]"
                      draggable={false}
                    />
                  )}

                  {/* Imagen principal (contain) por encima del blur */}
                  {shouldLoad && (
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      loading="lazy"
                      className="relative z-[2] max-w-full max-h-full object-contain select-none opacity-0 data-[ready=true]:opacity-100 transition-opacity duration-700 ease-out"
                      draggable={false}
                      onLoad={(e) => e.currentTarget.setAttribute('data-ready', 'true')}
                    />
                  )}

                  {/* Velo sutil en no-centrales (desktop) */}
                  {!isMobile && pos !== 0 && <div className="absolute inset-0 z-[3] bg-black/10 hover:bg-black/6 transition-colors duration-300" />}

                  {/* Título en la central */}
                  {photo.title && pos === 0 && (
                    <>
                      <div className="absolute bottom-0 left-0 right-0 z-[3] bg-gradient-to-t from-black/90 via-black/60 to-transparent h-44 md:h-48" />
                      <div className="absolute z-[4] left-6 right-6 bottom-20 md:bottom-24">
                        <h3 className="text-white font-semibold tracking-tight drop-shadow-xl leading-tight text-2xl md:text-3xl">{photo.title}</h3>
                      </div>
                    </>
                  )}

                  {/* Indicador índice (desktop, no central) */}
                  {!isMobile && pos !== 0 && (
                    <div className="absolute z-[4] bottom-4 left-1/2 -translate-x-1/2 bg-black/55 rounded-full px-3 py-1 backdrop-blur-md">
                      <span className="text-white text-xs font-medium">{idx + 1}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Flechas */}
        {showArrows && (
          <>
            <button
              onClick={handlePrevManual}
              className={`absolute top-1/2 -translate-y-1/2 z-40 bg-black/45 hover:bg-black/60 backdrop-blur-md rounded-full transition-transform duration-200 hover:scale-110 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${isMobile ? 'left-4 p-3' : 'left-8 p-4'}`}
              aria-label="Imagen anterior"
              title="Anterior"
              type="button"
            >
              <ChevronLeft className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-white drop-shadow`} />
            </button>
            <button
              onClick={handleNextManual}
              className={`absolute top-1/2 -translate-y-1/2 z-40 bg-black/45 hover:bg-black/60 backdrop-blur-md rounded-full transition-transform duration-200 hover:scale-110 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${isMobile ? 'right-4 p-3' : 'right-8 p-4'}`}
              aria-label="Imagen siguiente"
              title="Siguiente"
              type="button"
            >
              <ChevronRight className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-white drop-shadow`} />
            </button>
          </>
        )}

        {/* Dots */}
        {showDots && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-black/45 backdrop-blur-md rounded-full ${isMobile ? 'bottom-2 mb-[15px] px-2 py-1' : 'bottom-8 mb-[15px] px-4 py-2'}`}
            role="tablist"
            aria-label="Elegir diapositiva"
          >
            {photos.map((_, i) => {
              const isActive = i === currentIndex;
              return (
                <button
                  key={i}
                  onClick={() => handleGoToSlideManual(i)}
                  className={`relative inline-flex items-center justify-center transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                    isMobile ? (isActive ? 'w-4 h-4 bg-white' : 'w-3.5 h-3.5 bg-white/70 hover:bg-white') : isActive ? 'w-3.5 h-3.5 bg-white' : 'w-3 h-3 bg-white/70 hover:bg-white'
                  }`}
                  aria-label={`Ir a la diapositiva ${i + 1}`}
                  aria-selected={isActive}
                  role="tab"
                  type="button"
                  style={{ minWidth: 0, minHeight: 0 }}
                >
                  {isActive && <span className="absolute inset-0 rounded-full animate-pulse bg-white" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Contador móvil */}
        {isMobile && (
          <div className="absolute top-4 right-4 z-40">
            <div className="bg-black/55 backdrop-blur-md rounded-full px-3 py-1 text-white text-xs font-medium" aria-live="polite">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
