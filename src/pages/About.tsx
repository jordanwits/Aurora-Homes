import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './About.css';

export default function About() {
  useScrollAnimation();

  return (
    <div className="about-page">
      {/* Hero Section with Background Image */}
      <section className="about-page__hero">
        <div className="about-page__hero-overlay"></div>
      </section>

      {/* Content Section */}
      <section className="about-page__content">
        <div className="container">
          <div className="about-page__content-wrapper">
            <h1 className="about-page__title fade-in-up">the start of building places that matter</h1>
            <div className="about-page__text fade-in-up stagger-delay-1">
              <p>
                We believe that your home is meant to be a place that reflects the story of you: what you value, your legacy in the people you love, the friends you gather, the dreams that begin around a table, the place that restores you and brings you rest.
              </p>
              <p>
                I've always loved building - some would say that it runs in the family - I was raised Mennonite and born into a family business focused around building sheds, barns and homes for families across the U.S.
              </p>
              <p>
                About a decade ago, I stepped into the world of real estate development and found that I loved bringing purpose and life to places. And that has continued to grow as I get to partner with families to build their dream homes — a place for their stories, their legacy, and their memories to grow for generations.
              </p>
              <p>
                We can't wait to help you create a home that's not just beautiful, but truly yours. Our heart is to build places that inspire, that breathe life into people and places. A place for your children and theirs to be marked by intentionality and care.
              </p>
            </div>
            <div className="about-page__signature fade-in-up stagger-delay-2">
              <p className="about-page__name">BEN LAPP</p>
              <p className="about-page__role">Owner & Founder</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
