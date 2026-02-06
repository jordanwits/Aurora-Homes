import { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../constants/portfolioProjects';
import './FeaturedWork.css';

export default function FeaturedWork() {
  // Take the first 6 projects for the carousel, filtering out projects without coverImage
  const projects = Object.values(PORTFOLIO_PROJECTS)
    .filter((project): project is typeof project & { coverImage: string } => 'coverImage' in project)
    .slice(0, 6);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  return (
    <section id="work" className="section featured-work">
      <div className="container">
        <h2 className="featured-work__title fade-in-up">Projects</h2>
      </div>
      
      <div className="featured-work__carousel-wrapper fade-in-up">
        <div className="featured-work__carousel">
          {/* Previous button */}
          <button 
            className="featured-work__nav featured-work__nav--prev"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            <svg width="48" height="48" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 15l-5-5 5-5"/>
            </svg>
          </button>

          <div className="featured-work__carousel-container">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`featured-work__slide ${index === currentIndex ? 'featured-work__slide--active' : ''}`}
              >
                <div 
                  className="featured-work__image"
                  style={{ backgroundImage: `url(${project.coverImage})` }}
                >
                </div>
              </div>
            ))}
          </div>

          {/* Next button */}
          <button 
            className="featured-work__nav featured-work__nav--next"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <svg width="48" height="48" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 15l5-5-5-5"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
