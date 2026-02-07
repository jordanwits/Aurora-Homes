import { useState, useEffect, useRef } from 'react';

const images = [
  '/AuroraH-hero.webp',
  '/AframeFront.webp',
  '/santeFeBath.webp',
  '/backDeck.webp',
  '/SanteFe-livingRoom.webp',
  '/altamontBath.webp',
];

const SLIDE_INTERVAL = 7000; // 7 seconds per slide (5s visible + 2s transition)
const TRANSITION_DURATION = 2000; // 2 seconds for fade transition

export function useHeroSlideshow() {
  const [layer0Index, setLayer0Index] = useState(0);
  const [layer1Index, setLayer1Index] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const isTransitioningRef = useRef(false);
  const activeIndexRef = useRef(0);
  const layer0IndexRef = useRef(0);
  const layer1IndexRef = useRef(1);
  
  // Keep refs in sync with state
  useEffect(() => {
    layer0IndexRef.current = layer0Index;
  }, [layer0Index]);
  
  useEffect(() => {
    layer1IndexRef.current = layer1Index;
  }, [layer1Index]);

  useEffect(() => {
    const startTime = Date.now();
    let firstTransitionScheduled = false;

    const startTransition = () => {
      if (isTransitioningRef.current) return;
      
      isTransitioningRef.current = true;
      
      // Cross-fade to the other layer
      const newActiveIndex = activeIndexRef.current === 0 ? 1 : 0;
      activeIndexRef.current = newActiveIndex;
      setActiveIndex(newActiveIndex);
      
      // After transition completes, update the hidden layer's image
      timeoutRef.current = window.setTimeout(() => {
        // The layer that's now hidden can be updated safely
        if (newActiveIndex === 1) {
          // Layer 0 is now hidden, update it to show the image after layer1Index
          const nextIndex = (layer1IndexRef.current + 1) % images.length;
          layer0IndexRef.current = nextIndex;
          setLayer0Index(nextIndex);
        } else {
          // Layer 1 is now hidden, update it to show the image after layer0Index
          const nextIndex = (layer0IndexRef.current + 1) % images.length;
          layer1IndexRef.current = nextIndex;
          setLayer1Index(nextIndex);
        }
        
        isTransitioningRef.current = false;
      }, TRANSITION_DURATION) as unknown as number;
    };

    const scheduleFirstTransition = () => {
      if (firstTransitionScheduled) return;
      firstTransitionScheduled = true;

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, SLIDE_INTERVAL - elapsed);

      // Schedule first transition after remaining time, then start regular interval
      timeoutRef.current = window.setTimeout(() => {
        startTransition();
        intervalRef.current = window.setInterval(startTransition, SLIDE_INTERVAL) as unknown as number;
      }, remaining) as unknown as number;
    };

    // Preload all images
    const imagePromises = images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      scheduleFirstTransition();
    });

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      isTransitioningRef.current = false;
    };
  }, []);

  return {
    currentImage: images[layer0Index],
    nextImage: images[layer1Index],
    activeIndex,
  };
}
