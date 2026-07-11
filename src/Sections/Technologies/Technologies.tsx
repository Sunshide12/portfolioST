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
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiHtml5, SiCss, SiVite, SiGit, SiFigma } from 'react-icons/si';
import LogoLoop from '../../LogoLoop/LogoLoop';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Glossary/HTML5" },
  { node: <SiCss />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <SiVite />, title: "Vite", href: "https://vitejs.dev" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
  { node: <SiFigma />, title: "Figma", href: "https://www.figma.com" },
];

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
        <div className="tech__loop-container" style={{ margin: 'var(--space-10) 0 var(--space-20) 0', position: 'relative', overflow: 'hidden' }}>
          <LogoLoop
            logos={techLogos}
            speed={60}
            direction="left"
            logoHeight={48}
            gap={60}
            hoverSpeed={10}
            scaleOnHover
            fadeOut
            fadeOutColor="var(--color-bg)"
            ariaLabel="Technology partners"
          />
        </div>

        <div className="tech__grid">
          {/* Ejemplo de estructura para cuando lo rellenes:
              - Badge / chip por cada tecnología
              - Agrupados por categoría (Frontend, Backend, DevOps, etc.) */}
        </div>
      </div>
    </section>
  );
}
