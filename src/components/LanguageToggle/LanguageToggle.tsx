import { useTranslation } from 'react-i18next';
import './LanguageToggle.css';

const FADE_DURATION = 200; // ms — mitad del ciclo total de 0.4s

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const isES = i18n.language?.startsWith('es');

  const toggleLanguage = () => {
    const next = isES ? 'en' : 'es';
    const root = document.getElementById('root');

    if (!root) {
      // Fallback sin animación
      i18n.changeLanguage(next);
      document.documentElement.lang = next;
      return;
    }

    // 1. Fade OUT — añadir clase que reduce opacidad a 0 en 0.5s
    root.classList.add('lang-fade-out');

    setTimeout(() => {
      // 2. Cambiar idioma cuando la pantalla ya está oscura
      i18n.changeLanguage(next);
      document.documentElement.lang = next;

      // 3. Fade IN — quitar clase para que vuelva a opacity 1 en 0.5s
      root.classList.remove('lang-fade-out');
    }, FADE_DURATION);
  };

  return (
    <button
      className="lang-toggle"
      onClick={toggleLanguage}
      aria-label={isES ? 'Switch to English' : 'Cambiar a Español'}
      title={isES ? 'Switch to English' : 'Cambiar a Español'}
    >
      <span className={`lang-option ${isES ? 'lang-active' : ''}`}>ES</span>
      <span className="lang-separator" aria-hidden="true">/</span>
      <span className={`lang-option ${!isES ? 'lang-active' : ''}`}>EN</span>
    </button>
  );
}
