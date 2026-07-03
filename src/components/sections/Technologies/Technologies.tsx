import { useTranslation } from 'react-i18next';
import { TranslatedText } from '../../TranslatedText/TranslatedText';
import './Technologies.css';

/**
 * SECCIÓN: TECNOLOGÍAS (id="technologies")
 * ─────────────────────────────────────────────────────────────────────────
 * Sección stub — lista para que rellenes con tus tecnologías.
 * Añade iconos, badges o tarjetas dentro de .tech__grid
 * ─────────────────────────────────────────────────────────────────────────
 */
export function Technologies() {
  const { t } = useTranslation();

  return (
    <section id="technologies" className="technologies section" aria-label={t('nav.technologies')}>
      <div className="container">
        {/* Encabezado de sección */}
        <header className="section__header">
          <span className="section__label">03</span>
          <h2 className="section__title"><TranslatedText i18nKey="technologies.title" animateOn="view" speed={30} /></h2>
          <p className="section__subtitle"><TranslatedText i18nKey="technologies.subtitle" animateOn="view" speed={20} /></p>
        </header>

        {/* ── TU CONTENIDO AQUÍ ── */}
        <div className="tech__grid">
          {/* Ejemplo de estructura para cuando lo rellenes:
              - Badge / chip por cada tecnología
              - Agrupados por categoría (Frontend, Backend, DevOps, etc.) */}
        </div>
      </div>
    </section>
  );
}
