import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { scrollToTopInstant } from '../utils/scroll';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const bodyScrollLockRef = useRef<{
    overflow: string;
    position: string;
    top: string;
    left: string;
    right: string;
    width: string;
    scrollY: number;
  } | null>(null);

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

  // Prevent background scroll when mobile menu is open (mobile-friendly, including iOS)
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const scrollY = window.scrollY;
    const saved = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      scrollY,
    };
    bodyScrollLockRef.current = saved;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    return () => {
      const restore = bodyScrollLockRef.current ?? saved;
      document.body.style.overflow = restore.overflow;
      document.body.style.position = restore.position;
      document.body.style.top = restore.top;
      document.body.style.left = restore.left;
      document.body.style.right = restore.right;
      document.body.style.width = restore.width;
      bodyScrollLockRef.current = null;
      window.scrollTo(0, restore.scrollY);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
  ];

  const handleLinkClick = () => {
    scrollToTopInstant();
    // Close mobile menu when a link is clicked
    setIsMobileMenuOpen(false);
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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay (rendered outside <nav> so fixed positioning is reliable) */}
      {isMobileMenuOpen && (
        <div className="navbar__mobile-menu">
          <ul>
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
