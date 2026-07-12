import { useState, useEffect, Suspense, lazy } from 'react';
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
const Lanyard = lazy(() => import('../../components/Lanyard/Lanyard'));

export function AboutMe() {
  const { t } = useTranslation();
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    // Retrasar la carga del componente 3D para que no interrumpa la animación de entrada
    const timer = setTimeout(() => {
      setShow3D(true);
    }, 800); // 800ms es suficiente para que termine la transición de navegación
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="about section section--alt" aria-label={t('nav.about')}>
      <div className="about__scroll-container">
        <div className="about__sticky-content">
          {show3D && (
            <Suspense fallback={null}>
              <Lanyard
                position={[0, 0, 20]}
                gravity={[0, -40, 0]}
                frontImage="/BackImage.jpeg"
                backImage="/SLogo.jpeg"
              />
            </Suspense>
          )}

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
