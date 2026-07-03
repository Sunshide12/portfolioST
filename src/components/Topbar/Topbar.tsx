import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrolled } from '../../hooks/useScrolled';
import { LanguageToggle } from '../LanguageToggle/LanguageToggle';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { MobileMenu } from './MobileMenu';
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (href: string) => {
    // Cierra el menú móvil al navegar
    setMobileOpen(false);
    // Scroll suave al elemento destino
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
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
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Controles derechos: tema + idioma + hamburguesa */}
          <div className="topbar__controls">

            <LanguageToggle />

            {/* Botón hamburguesa — solo visible en móvil */}
            <button
              className={`topbar__hamburger${mobileOpen ? ' topbar__hamburger--open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span className="hamburger__bar" />
              <span className="hamburger__bar" />
              <span className="hamburger__bar" />
            </button>
          </div>

        </div>
      </header>

      {/* Menú móvil */}
      <MobileMenu
        id="mobile-menu"
        isOpen={mobileOpen}
        links={NAV_LINKS}
        onClose={() => setMobileOpen(false)}
        onNavigate={handleNavClick}
      />
    </>
  );
}
