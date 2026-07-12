import { useTranslation } from 'react-i18next';
import { TranslatedText } from '../../components/TranslatedText/TranslatedText';
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
          <h2 className="section__title"><TranslatedText i18nKey="about.title" animateOn="view" speed={30} /></h2>
          <p className="section__subtitle"><TranslatedText i18nKey="about.subtitle" animateOn="view" speed={20} /></p>
        </header>

        {/* ── TU CONTENIDO AQUÍ ── */}
        <div className="about__content">
          <p className="about__description" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
            <TranslatedText i18nKey="about.description" animateOn="view" speed={15} />
          </p>
        </div>
      </div>
    </section>
  );
}
