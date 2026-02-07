import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    // Track if this is the initial page load
    let isInitialLoad = true;
    const observedElements = new WeakSet<Element>();
    const initiallyIntersecting = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const isFirstObservation = !observedElements.has(element);
            
            // Track elements that were already intersecting on initial load
            if (isInitialLoad && isFirstObservation) {
              initiallyIntersecting.add(element);
            }
            
            // If element was already in viewport on initial load, delay animation
            // to ensure CSS initial state is rendered first
            if (initiallyIntersecting.has(element)) {
              // Force a reflow to ensure initial CSS state is applied
              void element.offsetHeight;
              
              // Use double RAF to ensure browser has painted initial state
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  element.classList.add('animate');
                });
              });
            } else {
              // Normal case: element scrolled into view
              element.classList.add('animate');
            }
            
            observedElements.add(element);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Function to observe all animated elements
    const observeElements = () => {
      const selectors = [
        '.fade-in-up:not(.animate)',
        '.fade-in:not(.animate)',
        '.fade-in-scale:not(.animate)',
        '.slide-in-left:not(.animate)',
        '.slide-in-right:not(.animate)'
      ];
      
      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          if (!observedElements.has(el)) {
            observer.observe(el);
          }
        });
      });
    };

    // Delay initial observation to ensure DOM is ready and CSS is applied
    // This gives the browser time to render elements in their initial (hidden) state
    const initialTimeout = setTimeout(() => {
      observeElements();
      // Mark initial load as complete after elements have been observed
      setTimeout(() => {
        isInitialLoad = false;
      }, 200);
    }, 100);

    // Use MutationObserver to detect new elements being added to DOM
    const mutationObserver = new MutationObserver(() => {
      // Always observe new elements, but they'll be handled appropriately
      // based on whether initial load is still active
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup
    return () => {
      clearTimeout(initialTimeout);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
