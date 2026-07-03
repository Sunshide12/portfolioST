import { useTranslation } from 'react-i18next';
import { useForm, ValidationError } from '@formspree/react';
import { TranslatedText } from '../TranslatedText/TranslatedText';
import './Footer.css';

/* ============================================================
   SVG Icons inline (sin dependencias externas)
   ============================================================ */
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.909 1.528-1.147C21.69 2.28 24 3.434 24 5.457z" />
  </svg>
);

/* ============================================================
   FOOTER COMPONENT
   ============================================================ */

/**
 * Para activar el formulario, reemplaza "YOUR_FORM_ID" con tu
 * form ID de Formspree (lo encuentras en tu dashboard como:
 * https://formspree.io/f/YOUR_FORM_ID)
 */
const FORMSPREE_ID = 'mvzrjnzd';

export function Footer() {
  const { t } = useTranslation();
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  return (
    <footer id="contact" className="footer" role="contentinfo" aria-label={t('nav.contact')}>
      <div className="container footer__inner">

        {/* ── COLUMNA IZQUIERDA: Info + Redes Sociales ── */}
        <div className="footer__info">
          <div className="footer__brand">
            <span className="footer__name">Sunshide.</span>
            <p className="footer__tagline">
              <TranslatedText i18nKey="contact.subtitle" animateOn="view" speed={30} />
            </p>
          </div>

          {/* Redes Sociales */}
          <nav className="footer__social" aria-label="Redes sociales">
            <a
              href="https://github.com/sunshide12"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
              title="GitHub"
            >
              <GithubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/steban-martinez-074697267/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedinIcon />
            </a>
            <a
              href="mailto:stebanbusiness@gmail.com"
              className="social-link"
              aria-label="Email: stebanbusiness@gmail.com"
              title="stebanbusiness@gmail.com"
            >
              <GmailIcon />
            </a>
          </nav>

          {/* Built with */}
          <p className="footer__built"><TranslatedText i18nKey="footer.builtWith" animateOn="view" speed={30} /></p>
        </div>

        {/* ── COLUMNA DERECHA: Formulario de Contacto ── */}
        <div className="footer__contact">
          <h2 className="footer__contact-title"><TranslatedText i18nKey="contact.title" animateOn="view" speed={30} /></h2>

          {state.succeeded ? (
            /* Estado de éxito */
            <div className="form-success" role="alert">
              <div className="form-success__icon" aria-hidden="true">✓</div>
              <h3 className="form-success__title"><TranslatedText i18nKey="contact.successTitle" animateOn="view" speed={30} /></h3>
              <p className="form-success__message"><TranslatedText i18nKey="contact.successMessage" animateOn="view" speed={30} /></p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              {/* Campo: Nombre */}
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  <TranslatedText i18nKey="contact.name" animateOn="view" speed={30} />
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder={t('contact.namePlaceholder')}
                  autoComplete="name"
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                  className="form-error"
                />
              </div>

              {/* Campo: Email */}
              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">
                  <TranslatedText i18nKey="contact.email" animateOn="view" speed={30} />
                  <span className="form-required" aria-hidden="true"> *</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  className="form-input"
                  placeholder={t('contact.emailPlaceholder')}
                  autoComplete="email"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="form-error"
                />
              </div>

              {/* Campo: Mensaje */}
              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  <TranslatedText i18nKey="contact.message" animateOn="view" speed={30} />
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  className="form-textarea"
                  placeholder={t('contact.messagePlaceholder')}
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="form-error"
                />
              </div>

              {/* Errores generales */}
              <ValidationError
                errors={state.errors}
                className="form-error form-error--general"
              />

              {/* Botón enviar */}
              <button
                type="submit"
                id="contact-submit"
                disabled={state.submitting}
                className={`form-submit${state.submitting ? ' form-submit--loading' : ''}`}
              >
                {state.submitting ? <TranslatedText i18nKey="contact.sending" animateOn="view" speed={30} /> : <TranslatedText i18nKey="contact.send" animateOn="view" speed={30} />}
              </button>
            </form>
          )}
        </div>

      </div>

      {/* ── BARRA INFERIOR ── */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">{t('footer.copyright')}</p>
          <a
            href="https://formspree.io"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__powered"
            title="Formspree — Form backend"
          >
            {t('footer.poweredBy')} Formspree
          </a>
        </div>
      </div>
    </footer>
  );
}
