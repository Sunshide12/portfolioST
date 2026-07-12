import { useTranslation } from 'react-i18next';
import { TranslatedText } from '../../components/TranslatedText/TranslatedText';
import { CoverflowCarousel, type CoverflowImage } from './CoverflowCarousel';
import './Projects.css';

// ---------------------------------------------------------------------------
// Project data
// Replace `src` with your actual project screenshots/images.
// The gradient fallback kicks in when `src` is omitted.
// ---------------------------------------------------------------------------
const PROJECTS: CoverflowImage[] = [
  {
    label: 'Portfolio — React + Vite',
  },
  {
    label: 'DocuBrain — Full-stack App',
  },
  {
    label: 'E-commerce UI',
  },
  {
    label: '3D Scene — Three.js',
  },
  {
    label: 'REST API — Node + PostgreSQL',
  },
  {
    label: 'Design System',
  },
  {
    label: 'Mobile App — React Native',
  },
];

/**
 * SECCIÓN: PROYECTOS (id="projects")
 * ─────────────────────────────────────────────────────────────────────────
 * Showcases projects using a Coverflow carousel.
 * ─────────────────────────────────────────────────────────────────────────
 */
export function Projects() {
  const { t } = useTranslation();

  return (
    <section
      id="projects"
      className="projects section section--alt"
      aria-label={t('nav.projects')}
    >
      <div className="container">
        {/* Section header */}
        <header className="section__header">
          <span className="section__label">04</span>
          <h2 className="section__title">
            <TranslatedText i18nKey="projects.title" animateOn="view" speed={30} />
          </h2>
          <p className="section__subtitle">
            <TranslatedText i18nKey="projects.subtitle" animateOn="view" speed={20} />
          </p>
        </header>

        {/* Coverflow carousel */}
        <div className="projects__carousel-wrapper">
          <CoverflowCarousel
            images={PROJECTS}
            activeWidth={560}
            activeHeight={380}
            restWidth={180}
            restHeight={260}
            gap={24}
            radius={2}
            showArrows={true}
            arrowColor="#ffffff"
            arrowBackground="rgba(255,255,255,0.12)"
            arrowSize={44}
            arrowPosition={95}
            autoplay={false}
            autoplayDirection="rightToLeft"
            moveDuration={0.35}
            dwell={1.5}
          />
        </div>
      </div>
    </section>
  );
}
