import { useTranslation } from 'react-i18next';
import './Hero.css';

/**
 * SECCIÓN: HERO (id="inicio")
 * ─────────────────────────────────────────────────────────────────────────
 * Sección stub — lista para que rellenes con tu contenido.
 * El contenedor tiene suficiente alto mínimo para que el layout
 * se vea bien incluso vacío.
 *
 * Cuando quieras añadir contenido, hazlo dentro de .hero__content
 * ─────────────────────────────────────────────────────────────────────────
 */
export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="inicio" className="hero section" aria-label={t('nav.home')}>
      <div className="container hero__content">
        {/* ── TU CONTENIDO AQUÍ ── */}
      </div>
    </section>
  );
}
