import { useTranslation } from 'react-i18next';
import { TranslatedText } from '../../TranslatedText/TranslatedText';
import './AboutMe.css';

/**
 * SECCIÓN: MÁS DE MÍ (id="about")
 * ─────────────────────────────────────────────────────────────────────────
 * Sección stub — lista para que rellenes con tu contenido.
 * Añade tu foto, bio, experiencia, etc. dentro de .about__content
 * ─────────────────────────────────────────────────────────────────────────
 */
import Lanyard from '../../Lanyard/Lanyard';

export function AboutMe() {
  const { t } = useTranslation();

  return (
    <section id="about" className="about section section--alt" aria-label={t('nav.about')}>
      <div className="about__scroll-container">
        <div className="about__sticky-content">
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            frontImage="/BackImage.jpeg"
            backImage="/SLogo.jpeg"
          />

          <div className="about__overlay">
            <div className="container">
              {/* Encabezado de sección */}
              <header className="section__header">
                <span className="section__label">02</span>
                <h2 className="section__title"><TranslatedText i18nKey="about.title" animateOn="view" speed={30} /></h2>
                <p className="section__subtitle"><TranslatedText i18nKey="about.subtitle" animateOn="view" speed={20} /></p>
              </header>

              {/* ── TU CONTENIDO AQUÍ ── */}
              <div className="about__content">
                {/* Ejemplo de estructura para cuando lo rellenes:
                    - Columna izquierda: foto / avatar
                    - Columna derecha: párrafos de bio, intereses, etc. */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
