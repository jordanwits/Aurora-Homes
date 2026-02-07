export function scrollToTopInstant() {
  if (typeof window === 'undefined') return;

  const scrollingElement =
    document.scrollingElement ?? document.documentElement ?? document.body;

  // If the app has global `scroll-behavior: smooth`, force this reset to be instant.
  const prevHtml = document.documentElement.style.scrollBehavior;
  const prevBody = document.body.style.scrollBehavior;
  const prevScrollingEl = (scrollingElement as HTMLElement).style.scrollBehavior;

  document.documentElement.style.scrollBehavior = 'auto';
  document.body.style.scrollBehavior = 'auto';
  (scrollingElement as HTMLElement).style.scrollBehavior = 'auto';

  // Set scroll positions directly to avoid any smooth-scroll heuristics.
  (scrollingElement as HTMLElement).scrollTop = 0;
  (scrollingElement as HTMLElement).scrollLeft = 0;
  window.scrollTo(0, 0);

  (scrollingElement as HTMLElement).style.scrollBehavior = prevScrollingEl;
  document.body.style.scrollBehavior = prevBody;
  document.documentElement.style.scrollBehavior = prevHtml;
}

