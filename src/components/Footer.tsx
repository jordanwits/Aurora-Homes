import './Footer.css';

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer__content">
          {/* Brand & Tagline */}
          <div className="footer__brand">
            <img 
              src="/AH White Text.png" 
              alt="Aurora Homes" 
              className="footer__logo"
            />
            <p className="footer__tagline">Curated Homes Crafted to Inspire</p>
          </div>

          {/* Contact Info */}
          <div className="footer__section">
            <h4>Contact</h4>
            <p>
              <a href="tel:+1234567890">(123) 456-7890</a>
            </p>
            <p>
              <a href="mailto:info@aurorahomes.com">info@aurorahomes.com</a>
            </p>
          </div>

          {/* Social Links */}
          <div className="footer__section">
            <h4>Follow</h4>
            <div className="footer__social">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Aurora Homes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
