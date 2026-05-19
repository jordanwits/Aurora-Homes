import './Footer.css';

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer__content">
          {/* Brand & Tagline */}
          <div className="footer__brand fade-in-up">
            <img 
              src="/AH White Text.png" 
              alt="Aurora Homes" 
              className="footer__logo"
            />
            <p className="footer__tagline">Curated Homes Crafted to Inspire</p>
          </div>

          {/* Contact Info */}
          <div className="footer__section fade-in-up stagger-delay-1">
            <h4>Contact</h4>
            <p>
              <a href="tel:+16156691442">615-669-1442</a>
            </p>
            <p>
              <a href="mailto:info@aurorahomes.com">info@aurorahomes.com</a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer__bottom fade-in">
          <p>&copy; {new Date().getFullYear()} Aurora Homes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
