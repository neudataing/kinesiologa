import { useState, useRef } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
}

interface TouchPosition {
  x: number;
  y: number;
  time: number;
}

export const useSwipeHandlers = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 30
}: SwipeHandlers) => {
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null);
  const [touchMove, setTouchMove] = useState<TouchPosition | null>(null);
  const preventScroll = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    });
    setTouchMove(null);
    preventScroll.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchMove({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    });

    if (touchStart) {
      const deltaX = Math.abs(touch.clientX - touchStart.x);
      const deltaY = Math.abs(touch.clientY - touchStart.y);
      
      // More sensitive for mobile devices
      if (deltaX > deltaY && deltaX > threshold / 3) {
        preventScroll.current = true;
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchMove) return;

    const deltaX = touchMove.x - touchStart.x;
    const deltaY = touchMove.y - touchStart.y;
    const deltaTime = touchMove.time - touchStart.time;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Minimum swipe distance and maximum time for a valid swipe
    const minSwipeDistance = threshold;
    const maxSwipeTime = 500;

    if (deltaTime > maxSwipeTime) return;

    // Determine swipe direction
    if (absDeltaX > absDeltaY && absDeltaX > minSwipeDistance) {
      if (deltaX > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    } else if (absDeltaY > absDeltaX && absDeltaY > minSwipeDistance) {
      if (deltaY > 0) {
        onSwipeDown?.();
      } else {
        onSwipeUp?.();
      }
    }

    setTouchStart(null);
    setTouchMove(null);
    preventScroll.current = false;
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    style: {
      touchAction: preventScroll.current ? 'none' : 'auto'
    }
  };
};