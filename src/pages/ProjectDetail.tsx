import { useParams, useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PORTFOLIO_PROJECTS } from '../constants/portfolioProjects';
import { scrollToTopInstant } from '../utils/scroll';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  useScrollAnimation();

  // Get all projects that have cover images and images array (for navigation), excluding Columbia Historic Renovations
  const projectsWithImages = Object.values(PORTFOLIO_PROJECTS).filter(
    (project): project is typeof project & { coverImage: string; images: string[] } => 
      'coverImage' in project && 'images' in project && project.id !== 'columbia-historic-renovations'
  );

  // Find the project by ID from all projects, excluding Columbia Historic Renovations
  const project = Object.values(PORTFOLIO_PROJECTS).find(
    (p) => p.id === projectId && p.id !== 'columbia-historic-renovations'
  );

  if (!project) {
    return (
      <div className="project-detail">
        <div className="container">
          <p>Project not found</p>
          <button onClick={() => { scrollToTopInstant(); navigate('/projects'); }}>
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const images = 'images' in project ? project.images || [] : [];
  const hasImages = images.length > 0;
  const subtitle = 'subtitle' in project && typeof (project as { subtitle?: string }).subtitle === 'string' 
    ? (project as { subtitle: string }).subtitle 
    : null;
  
  // Only calculate navigation if project has images
  const currentIndex = hasImages ? projectsWithImages.findIndex((p) => p.id === projectId) : -1;
  const nextProject = hasImages && currentIndex >= 0 ? projectsWithImages[(currentIndex + 1) % projectsWithImages.length] : null;
  const prevProject = hasImages && currentIndex >= 0 ? projectsWithImages[(currentIndex - 1 + projectsWithImages.length) % projectsWithImages.length] : null;

  const handleNextProject = () => {
    if (!nextProject) return;
    scrollToTopInstant();
    navigate(`/projects/${nextProject.id}`);
  };

  const handlePrevProject = () => {
    if (!prevProject) return;
    scrollToTopInstant();
    navigate(`/projects/${prevProject.id}`);
  };

  return (
    <div className="project-detail">
      {/* Header Section */}
      <section className="project-detail__header">
        <div className="container--narrow">
          <button 
            className="project-detail__back"
            onClick={() => { scrollToTopInstant(); navigate('/projects'); }}
            aria-label="Back to projects"
          >
            ← Back to Projects
          </button>
          <h1 className="project-detail__title fade-in-up">{project.name}</h1>
          {subtitle && (
            <p className="project-detail__subtitle fade-in-up stagger-delay-1">{subtitle}</p>
          )}
        </div>
      </section>

      {/* Images Section */}
      {hasImages && (
        <section className="project-detail__images">
          {images.map((image, index) => (
            <div 
              key={`${project.id}-${index}`} 
              className={`project-detail__image-wrapper fade-in-scale ${index % 3 === 1 ? 'stagger-delay-1' : index % 3 === 2 ? 'stagger-delay-2' : ''}`}
            >
              <img 
                src={image} 
                alt={`${project.name} - Image ${index + 1}`}
                className="project-detail__image"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </section>
      )}

      {/* Navigation Section */}
      {hasImages && nextProject && prevProject && (
        <section className="project-detail__navigation">
          <div className="container--narrow">
            <div className="project-detail__nav-buttons">
              <button 
                className="project-detail__nav project-detail__nav--prev"
                onClick={handlePrevProject}
                aria-label="Previous project"
              >
                <span className="project-detail__nav-arrow">‹</span>
                <span className="project-detail__nav-label">{prevProject.name.toLowerCase()}</span>
              </button>
              <button 
                className="project-detail__nav project-detail__nav--next"
                onClick={handleNextProject}
                aria-label="Next project"
              >
                <span className="project-detail__nav-label">{nextProject.name.toLowerCase()}</span>
                <span className="project-detail__nav-arrow">›</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
