import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PORTFOLIO_PROJECTS } from '../constants/portfolioProjects';
import { scrollToTopInstant } from '../utils/scroll';
import './Projects.css';

export default function Projects() {
  const navigate = useNavigate();
  useScrollAnimation();
  
  // Get all projects that have cover images
  const projects = Object.values(PORTFOLIO_PROJECTS).filter(
    (project): project is typeof project & { coverImage: string } => 
      'coverImage' in project
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [prevIndex, setPrevIndex] = useState(0);
  const currentProject = projects[currentIndex];
  const prevProject = projects[prevIndex];

  const handleImageClick = () => {
    scrollToTopInstant();
    navigate(`/projects/${currentProject.id}`);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (isInitialLoad) {
      // After first image loads, mark initial load as complete
      setTimeout(() => {
        setIsInitialLoad(false);
        setPrevIndex(currentIndex);
      }, 100);
    }
  };

  // Update prevIndex after transition completes
  useEffect(() => {
    if (!isInitialLoad && imageLoaded && currentIndex !== prevIndex) {
      const timer = setTimeout(() => {
        setPrevIndex(currentIndex);
      }, 800); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [currentIndex, prevIndex, imageLoaded, isInitialLoad]);


  const goToNext = () => {
    setPrevIndex(currentIndex);
    setImageLoaded(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const goToPrevious = () => {
    setPrevIndex(currentIndex);
    setImageLoaded(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  return (
    <div className="projects">
      {/* Large Text Section */}
      <section className="projects__intro">
        <div className="container--narrow">
          <h1 className="projects__title fade-in-up">Featured Projects</h1>
          <div className="projects__text fade-in-up stagger-delay-1">
            <p>
              Each custom home we build is a reflection of our commitment to thoughtful design and enduring quality. From concept to completion, we craft spaces that embody elegance, sophistication, and the unique vision of every client.
            </p>
          </div>
        </div>
      </section>

      {/* Full Screen Image Carousel */}
      <section className="projects__carousel">
        <div className="projects__carousel-wrapper">
          <button 
            className="projects__nav projects__nav--prev"
            onClick={goToPrevious}
            aria-label="Previous project"
          >
            ‹
          </button>
          
          <div 
            className={`projects__image-container ${isInitialLoad ? 'fade-in-scale' : 'fade-transition'} ${imageLoaded ? 'image-loaded' : ''}`}
            onClick={handleImageClick}
          >
            {/* Previous image fading out - only show when transitioning */}
            {!isInitialLoad && currentIndex !== prevIndex && (
              <img 
                src={prevProject.coverImage} 
                alt={prevProject.name}
                className="projects__image projects__image--fade-out"
                key={`prev-${prevProject.id}`}
              />
            )}
            {/* Current image fading in */}
            <img 
              src={currentProject.coverImage} 
              alt={currentProject.name}
              className={`projects__image ${!isInitialLoad && currentIndex !== prevIndex ? 'projects__image--fade-in' : ''}`}
              key={currentProject.id}
              onLoad={handleImageLoad}
              onLoadStart={() => setImageLoaded(false)}
            />
            <div className={`projects__overlay ${imageLoaded ? 'projects__overlay--visible' : ''}`}>
              <h3 className="projects__name">{currentProject.name}</h3>
              <div className="projects__counter">
                {currentIndex + 1} / {projects.length}
              </div>
            </div>
          </div>

          <button 
            className="projects__nav projects__nav--next"
            onClick={goToNext}
            aria-label="Next project"
          >
            ›
          </button>
        </div>
      </section>
    </div>
  );
}
