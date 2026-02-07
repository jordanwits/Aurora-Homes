import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTopInstant } from '../utils/scroll';

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  // Prevent the browser from restoring the previous scroll position on
  // back/forward navigation. We want every route to start at the top.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Use layout effect so the scroll position is reset before paint.
  useLayoutEffect(() => {
    scrollToTopInstant();
  }, [pathname, search]);

  return null;
}
