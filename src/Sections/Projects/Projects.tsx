import { useTranslation } from 'react-i18next';
import { TranslatedText } from '../../TranslatedText/TranslatedText';
import './Projects.css';

/**
 * SECCIÓN: PROYECTOS (id="projects")
 * ─────────────────────────────────────────────────────────────────────────
 * Sección stub — lista para que rellenes con tus proyectos.
 * Añade tarjetas de proyectos dentro de .projects__grid
 * ─────────────────────────────────────────────────────────────────────────
 */
export function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="projects section section--alt" aria-label={t('nav.projects')}>
      <div className="container">
        {/* Encabezado de sección */}
        <header className="section__header">
          <span className="section__label">04</span>
          <h2 className="section__title"><TranslatedText i18nKey="projects.title" animateOn="view" speed={30} /></h2>
          <p className="section__subtitle"><TranslatedText i18nKey="projects.subtitle" animateOn="view" speed={20} /></p>
        </header>

        {/* ── TU CONTENIDO AQUÍ ── */}
        <div className="projects__grid">
          {/* Ejemplo de estructura para cuando lo rellenes:
              - Tarjeta por cada proyecto con título, descripción,
                tecnologías usadas y links a GitHub/demo */}
        </div>
      </div>
    </section>
  );
}
