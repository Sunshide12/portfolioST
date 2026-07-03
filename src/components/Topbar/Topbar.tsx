
import { useTranslation } from 'react-i18next';
import { TranslatedText } from '../TranslatedText/TranslatedText';
import { useScrolled } from '../../hooks/useScrolled';
import { useCurtains } from '../Curtains/CurtainsContext';
import { LanguageToggle } from '../LanguageToggle/LanguageToggle';
// ThemeToggle is not used here
import StaggeredMenu from '../StaggeredMenu/StaggeredMenu';
import './Topbar.css';

interface NavLink {
  key: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { key: 'nav.home', href: '#inicio' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.technologies', href: '#technologies' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.contact', href: '#contact' },
];

export function Topbar() {
  const { t } = useTranslation();
  const scrolled = useScrolled(10);
  const { triggerTransition } = useCurtains();

  const handleNavClick = (href: string) => {
    // Activa la transición y cambia de sección
    triggerTransition(() => {
      window.location.hash = href;
      window.scrollTo(0, 0);
    });
  };

  return (
    <>
      <header className={`topbar${scrolled ? ' topbar--scrolled' : ''}`} role="banner">
        <div className="container topbar__inner">

          {/* Logo / Nombre */}
          <a
            href="#inicio"
            className="topbar__logo"
            onClick={(e) => { e.preventDefault(); handleNavClick('#inicio'); }}
            aria-label="Sunshide — Inicio"
          >
            Sunshide
          </a>

          {/* Navegación desktop */}
          <nav className="topbar__nav" role="navigation" aria-label="Navegación principal">
            <ul className="topbar__nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="topbar__nav-link"
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  >
                    <TranslatedText i18nKey={link.key} animateOn="view" speed={30} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Controles derechos: tema + idioma + menú móvil */}
          <div className="topbar__controls">

            <LanguageToggle />

            {/* Menú móvil */}
            <div className="topbar__mobile-menu-wrapper">
              <StaggeredMenu 
                items={NAV_LINKS.map(link => ({ label: t(link.key), link: link.href, ariaLabel: t(link.key) }))}
                onNavigate={handleNavClick}
                displaySocials={false}
              />
            </div>
          </div>

        </div>
      </header>
    </>
  );
}
