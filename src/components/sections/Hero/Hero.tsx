import { useTranslation } from 'react-i18next';
import Galaxy from '../../Galaxy/Galaxy';
import './Hero.css';

/**
 * SECCIÓN: HERO (id="inicio")
 * ─────────────────────────────────────────────────────────────────────────
 * Sección con fondo animado Galaxy interactivo.
 * ─────────────────────────────────────────────────────────────────────────
 */
export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="inicio" className="hero section" aria-label={t('nav.home')} style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Galaxy
          mouseInteraction={true}
          mouseRepulsion={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0}
          hueShift={240}
        />
      </div>
      <div className="container hero__content" style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          <h1 className="section__title">Bienvenidos a mi Portafolio</h1>
          <p className="section__subtitle">
            Explora mis proyectos y descubre lo que puedo construir. Transformando ideas en realidad a través del código y diseño moderno.
          </p>
        </div>
      </div>
    </section>
  );
}
