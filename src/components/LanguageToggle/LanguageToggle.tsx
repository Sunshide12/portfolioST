import { useTranslation } from 'react-i18next';
import './LanguageToggle.css';

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const isES = i18n.language?.startsWith('es');

  const toggleLanguage = () => {
    const next = isES ? 'en' : 'es';

    // Cambiar idioma
    i18n.changeLanguage(next);
    document.documentElement.lang = next;

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
