import FeaturedWork from '../components/FeaturedWork';
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useHeroSlideshow } from '../hooks/useHeroSlideshow';
import '../styles/App.css';

export default function Home() {
  useScrollAnimation();
  const { currentImage, nextImage, activeIndex } = useHeroSlideshow();
  
  // Intro text carousel options
  const introTexts = [
    {
      id: 1,
      text: 'We believe every piece of land carries its own character. Each home begins with listening—understanding the vision, the setting, and the life meant to unfold there. From that foundation, we craft spaces that feel rooted, intentional, and enduring.'
    },
    {
      id: 2,
      text: 'Every property has a story waiting to be revealed. We begin by listening—to your vision and to the land itself—seeking a design that brings both to life. What follows is a home shaped with intention, craftsmanship, and lasting integrity.'
    },
    {
      id: 3,
      text: 'Each project begins with a question: what wants to be built here? By listening to the land and to those who will call it home, we shape spaces that feel alive, grounded, and deeply intentional—crafted with care that stands the test of time.'
    }
  ];
  
  const [currentIntroIndex, setCurrentIntroIndex] = useState(0);
  
  const goToNextIntro = () => {
    setCurrentIntroIndex((prevIndex) => (prevIndex + 1) % introTexts.length);
  };
  
  const goToPreviousIntro = () => {
    setCurrentIntroIndex((prevIndex) => (prevIndex - 1 + introTexts.length) % introTexts.length);
  };
  
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
          <div className="intro__carousel-wrapper">
            <button 
              className="intro__carousel-nav intro__carousel-nav--prev"
              onClick={goToPreviousIntro}
              aria-label="Previous intro text"
            >
              <svg width="48" height="48" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 15l-5-5 5-5"/>
              </svg>
            </button>
            
            <div className="intro__carousel-container">
              {introTexts.map((text, index) => (
                <div
                  key={text.id}
                  className={`intro__text-slide ${index === currentIntroIndex ? 'intro__text-slide--active' : ''}`}
                >
                  <div className="intro__text fade-in-up">
                    <p>{text.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="intro__carousel-nav intro__carousel-nav--next"
              onClick={goToNextIntro}
              aria-label="Next intro text"
            >
              <svg width="48" height="48" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 15l5-5-5-5"/>
              </svg>
            </button>
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
