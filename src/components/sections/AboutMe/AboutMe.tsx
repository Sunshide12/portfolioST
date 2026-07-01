import { useTranslation } from 'react-i18next';
import './AboutMe.css';

/**
 * SECCIÓN: MÁS DE MÍ (id="about")
 * ─────────────────────────────────────────────────────────────────────────
 * Sección stub — lista para que rellenes con tu contenido.
 * Añade tu foto, bio, experiencia, etc. dentro de .about__content
 * ─────────────────────────────────────────────────────────────────────────
 */
export function AboutMe() {
  const { t } = useTranslation();

  return (
    <section id="about" className="about section section--alt" aria-label={t('nav.about')}>
      <div className="container">
        {/* Encabezado de sección */}
        <header className="section__header">
          <span className="section__label">02</span>
          <h2 className="section__title">{t('about.title')}</h2>
          <p className="section__subtitle">{t('about.subtitle')}</p>
        </header>

        {/* ── TU CONTENIDO AQUÍ ── */}
        <div className="about__content">
          {/* Ejemplo de estructura para cuando lo rellenes:
              - Columna izquierda: foto / avatar
              - Columna derecha: párrafos de bio, intereses, etc. */}
        </div>
      </div>
    </section>
  );
}
