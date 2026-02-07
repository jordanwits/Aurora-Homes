import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { scrollToTopInstant } from '../utils/scroll';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const bodyScrollLockRef = useRef<{
    htmlOverflow: string;
    overflow: string;
    position: string;
    top: string;
    left: string;
    right: string;
    width: string;
    scrollY: number;
  } | null>(null);

  const restoreBodyScroll = (opts?: { scrollToY?: number }) => {
    const restore = bodyScrollLockRef.current;

    // Always clear the lock styles (in case state/ref got out of sync).
    document.documentElement.style.overflow = restore?.htmlOverflow ?? '';
    document.body.style.overflow = restore?.overflow ?? '';
    document.body.style.position = restore?.position ?? '';
    document.body.style.top = restore?.top ?? '';
    document.body.style.left = restore?.left ?? '';
    document.body.style.right = restore?.right ?? '';
    document.body.style.width = restore?.width ?? '';

    bodyScrollLockRef.current = null;

    const y = opts?.scrollToY ?? restore?.scrollY;
    if (typeof y === 'number') window.scrollTo(0, y);
  };

  // Always close the mobile menu on navigation.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger transition after scrolling 40px (only on home page)
      if (location.pathname === '/') {
        setIsScrolled(window.scrollY > 40);
      } else {
        // On other pages, navbar should be scrolled state by default
        setIsScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Allow closing the mobile menu with Escape.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  // Prevent background scroll when mobile menu is open (mobile-friendly, including iOS)
  useEffect(() => {
    if (!isMobileMenuOpen) {
      // If a prior lock got stuck (e.g. hot reload), force-restore.
      const { style } = document.body;
      const htmlOverflow = document.documentElement.style.overflow;
      const top = style.top;
      const stuck =
        htmlOverflow === 'hidden' ||
        style.position === 'fixed' ||
        style.overflow === 'hidden' ||
        (top.startsWith('-') && top.endsWith('px'));

      if (bodyScrollLockRef.current || stuck) {
        // Try to infer scroll position from `top` when we don't have saved state.
        const inferredY =
          top.startsWith('-') && top.endsWith('px')
            ? Math.abs(parseInt(top, 10))
            : undefined;
        restoreBodyScroll({ scrollToY: inferredY });
      }
      return;
    }

    const scrollY = window.scrollY;
    const saved = {
      htmlOverflow: document.documentElement.style.overflow,
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      scrollY,
    };
    bodyScrollLockRef.current = saved;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    return () => {
      // Prefer the latest saved ref; fall back to this run's snapshot.
      bodyScrollLockRef.current = bodyScrollLockRef.current ?? saved;
      restoreBodyScroll();
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);

  const handleLinkClick = () => {
    scrollToTopInstant();
    // Close mobile menu when a link is clicked
    closeMobileMenu();
  };

  // Determine logo based on scrolled state and current page
  const logoSrc = (location.pathname === '/' && !isScrolled) 
    ? "/AH White Text.png" 
    : "/AH Black Text.png";

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container">
          {/* Brand */}
          <Link to="/" className="navbar__brand" onClick={handleLinkClick}>
            <img 
              src={logoSrc}
              alt="Aurora Homes" 
              className="navbar__logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} onClick={handleLinkClick}>{link.label}</Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar__toggle"
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="navbar-mobile-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay (rendered outside <nav> so fixed positioning is reliable) */}
      {isMobileMenuOpen && (
        <div
          id="navbar-mobile-menu"
          className="navbar__mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          onClick={(e) => {
            // Only close when clicking the backdrop, not the menu content.
            if (e.target === e.currentTarget) closeMobileMenu();
          }}
        >
          <ul onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} onClick={handleLinkClick}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
