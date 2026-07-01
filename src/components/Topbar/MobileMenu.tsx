import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '../LanguageToggle/LanguageToggle';
import './MobileMenu.css';

interface MobileMenuProps {
  id: string;
  isOpen: boolean;
  links: { key: string; href: string }[];
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export function MobileMenu({ id, isOpen, links, onClose, onNavigate }: MobileMenuProps) {
  const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Cerrar al presionar Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`mobile-overlay${isOpen ? ' mobile-overlay--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel del menú */}
      <div
        id={id}
        ref={menuRef}
        className={`mobile-menu${isOpen ? ' mobile-menu--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {/* Header del menú */}
        <div className="mobile-menu__header">
          <span className="mobile-menu__title">Sunshide.</span>
          <button
            className="mobile-menu__close"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        {/* Links de navegación */}
        <nav aria-label="Menú móvil">
          <ul className="mobile-menu__list">
            {links.map((link, index) => (
              <li
                key={link.key}
                className="mobile-menu__item"
                style={{ animationDelay: isOpen ? `${index * 60}ms` : '0ms' }}
              >
                <a
                  href={link.href}
                  className="mobile-menu__link"
                  onClick={(e) => { e.preventDefault(); onNavigate(link.href); }}
                >
                  <span className="mobile-menu__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer del menú: idioma */}
        <div className="mobile-menu__footer">
          <LanguageToggle />
        </div>
      </div>
    </>
  );
}
