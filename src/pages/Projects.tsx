import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PORTFOLIO_PROJECTS } from '../constants/portfolioProjects';
import { scrollToTopInstant } from '../utils/scroll';
import './Projects.css';

export default function Projects() {
  const navigate = useNavigate();
  useScrollAnimation();
  
  // Get all projects that have cover images and images array, excluding Columbia Historic Renovations
  const projects = Object.values(PORTFOLIO_PROJECTS).filter(
    (project): project is typeof project & { coverImage: string; images?: string[] } => 
      'coverImage' in project && project.id !== 'columbia-historic-renovations'
  );

  // Track current image index for each project
  const [projectImageIndices, setProjectImageIndices] = useState<Record<string, number>>({});
  // Track if hovering over arrows to prevent overlay
  const [hoveringArrow, setHoveringArrow] = useState<Record<string, boolean>>({});

  const getCurrentImageIndex = (projectId: string) => {
    return projectImageIndices[projectId] || 0;
  };

  const getProjectImages = (project: typeof projects[0]) => {
    if ('images' in project && project.images && project.images.length > 0) {
      return project.images;
    }
    return [project.coverImage];
  };

  const goToNextImage = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const images = getProjectImages(project);
    const currentIndex = getCurrentImageIndex(projectId);
    const nextIndex = (currentIndex + 1) % images.length;
    
    setProjectImageIndices(prev => ({
      ...prev,
      [projectId]: nextIndex
    }));
  };

  const goToPreviousImage = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const images = getProjectImages(project);
    const currentIndex = getCurrentImageIndex(projectId);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    
    setProjectImageIndices(prev => ({
      ...prev,
      [projectId]: prevIndex
    }));
  };

  const handleProjectClick = (projectId: string) => {
    scrollToTopInstant();
    navigate(`/projects/${projectId}`);
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

      {/* Projects Grid */}
      <section className="projects__grid">
        {projects.map((project, index) => {
          const images = getProjectImages(project);
          const currentImageIndex = getCurrentImageIndex(project.id);
          const hasMultipleImages = images.length > 1;

          return (
            <div 
              key={project.id}
              className={`projects__project-item fade-in-scale ${index % 3 === 1 ? 'stagger-delay-1' : index % 3 === 2 ? 'stagger-delay-2' : ''}`}
            >
              <div className="projects__carousel-wrapper">
                <div 
                  className={`projects__image-container ${hoveringArrow[project.id] ? 'projects__image-container--arrow-hover' : ''}`}
                  onClick={() => handleProjectClick(project.id)}
                >
                  {/* Render all images as slides */}
                  {images.map((image, imgIndex) => (
                    <div
                      key={`${project.id}-slide-${imgIndex}`}
                      className={`projects__slide ${imgIndex === currentImageIndex ? 'projects__slide--active' : ''}`}
                    >
                      <img 
                        src={image} 
                        alt={`${project.name} - Image ${imgIndex + 1}`}
                        className="projects__image"
                      />
                    </div>
                  ))}
                  
                  {/* Hover overlay with project name */}
                  <div className="projects__overlay projects__overlay--center">
                    <h3 className="projects__name">{project.name}</h3>
                  </div>

                  {/* Image counter - only show if multiple images */}
                  {hasMultipleImages && (
                    <div className="projects__image-counter">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}

                  {/* Carousel navigation buttons - only show if multiple images */}
                  {hasMultipleImages && (
                    <>
                      <button 
                        className="projects__carousel-nav projects__carousel-nav--prev"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToPreviousImage(project.id, e);
                        }}
                        onMouseEnter={() => setHoveringArrow(prev => ({ ...prev, [project.id]: true }))}
                        onMouseLeave={() => setHoveringArrow(prev => ({ ...prev, [project.id]: false }))}
                        aria-label={`Previous image for ${project.name}`}
                      >
                        <svg width="48" height="48" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 15l-5-5 5-5"/>
                        </svg>
                      </button>
                      <button 
                        className="projects__carousel-nav projects__carousel-nav--next"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToNextImage(project.id, e);
                        }}
                        onMouseEnter={() => setHoveringArrow(prev => ({ ...prev, [project.id]: true }))}
                        onMouseLeave={() => setHoveringArrow(prev => ({ ...prev, [project.id]: false }))}
                        aria-label={`Next image for ${project.name}`}
                      >
                        <svg width="48" height="48" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M8 15l5-5-5-5"/>
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
