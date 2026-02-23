import FeaturedWork from '../components/FeaturedWork';
import { useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useHeroSlideshow } from '../hooks/useHeroSlideshow';
import '../styles/App.css';

export default function Home() {
  useScrollAnimation();
  const { currentImage, nextImage, activeIndex } = useHeroSlideshow();
  
  // Pre-decode large background images to avoid scroll-time jank
  useEffect(() => {
    const src = '/Hands-bw-vintage.jpg';
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
    img.fetchPriority = 'high';
    img.decode?.().catch(() => {});
  }, []);
  
  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero section--hero">
        <div 
          className={`hero__background hero__background--layer0 ${activeIndex === 0 ? 'hero__background--active' : 'hero__background--inactive'}`}
          style={{ backgroundImage: `url(${currentImage})` }}
        ></div>
        <div 
          className={`hero__background hero__background--layer1 ${activeIndex === 1 ? 'hero__background--active' : 'hero__background--inactive'}`}
          style={{ backgroundImage: `url(${nextImage})` }}
        ></div>
        <div className="hero__overlay"></div>
        <div className="hero__content">
          <h1 className="hero__title hero-animate">Curated Homes Crafted to Inspire</h1>
          <p className="hero__subtitle hero-animate">Custom builds where vision meets craftsmanship</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="intro section">
        <div className="container">
          <div className="intro__text fade-in-up">
            <p>
              We believe every piece of land carries its own character.
            </p>
            <p>
              Each home begins with listening—understanding the vision, the setting, and the life meant to unfold there. From that foundation, we craft spaces that feel rooted, intentional, and enduring.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <FeaturedWork />

      {/* Approach Section */}
      <section id="approach" className="approach">
        <div className="approach__content">
          <h2 className="approach__title fade-in-up">Our Approach</h2>
          <div className="approach__grid">
            <div className="approach__pillar fade-in-up stagger-delay-1">
              <h3>Site-Fit Design</h3>
              <p>Every property has a unique character. We design with the land, not against it, ensuring your home feels perfectly placed.</p>
            </div>
            <div className="approach__pillar fade-in-up stagger-delay-2">
              <h3>Thoughtful Craft</h3>
              <p>Details matter. From foundation to finish, we approach every element with care, precision, and a commitment to quality.</p>
            </div>
            <div className="approach__pillar fade-in-up stagger-delay-3">
              <h3>True Collaboration</h3>
              <p>Your home, your vision. We work closely with you throughout the process to ensure the final result exceeds expectations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container--narrow">
          <h2 className="about__title fade-in-up">About Aurora Homes</h2>
          <div className="about__content">
            <p className="fade-in-up stagger-delay-1">
              Aurora Homes was founded on the belief that custom homebuilding should be an inspiring, collaborative journey. With years of experience and a passion for thoughtful design, we've built a reputation for creating homes that reflect the unique vision of each client.
            </p>
            <p className="fade-in-up stagger-delay-2">
              We don't build houses—we build places that inspire. Places where families grow, memories are made, and life unfolds beautifully.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
