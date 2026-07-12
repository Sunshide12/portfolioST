import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import Galaxy from '../../components/Galaxy/Galaxy';
import { TranslatedText } from '../../components/TranslatedText/TranslatedText';
import './Hero.css';

/**
 * SECCIÓN: HERO (id="inicio")
 * ─────────────────────────────────────────────────────────────────────────
 * Sección con fondo animado Galaxy interactivo.
 * ─────────────────────────────────────────────────────────────────────────
 */
export function Hero() {
  const { t, i18n } = useTranslation();
  
  // Array de frases obtenidas de los archivos de traducción
  const quotes = t('hero.quotes', { returnObjects: true }) as Array<{ text: string; author: string }>;
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    // Escoger una frase aleatoria inicial
    if (quotes && quotes.length > 0) {
      setQuoteIndex(Math.floor(Math.random() * quotes.length));
    }

    // Rotar cada 12 segundos
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % (quotes?.length || 1));
    }, 12000);

    return () => clearInterval(interval);
  }, [quotes?.length]);

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
      <div className="container hero__content" style={{ position: 'relative', zIndex: 1, pointerEvents: 'none', marginTop: '12vh' }}>
        <div style={{ pointerEvents: 'auto' }}>
          <h1 className="section__title"><TranslatedText i18nKey="hero.title" animateOn="view" speed={30} /></h1>
          <p className="section__subtitle"><TranslatedText i18nKey="hero.subtitle" animateOn="view" speed={20} /></p>
        </div>
      </div>

      {quotes && quotes.length > 0 && (
        <div className="hero__quote-container">
          <blockquote className="hero__quote">
            <p className="hero__quote-text" style={{ minHeight: '3em' }}>
              <TranslatedText 
                key={`quote-text-${quoteIndex}-${i18n.language}`} 
                i18nKey={`hero.quotes.${quoteIndex}.text`} 
                animateOn="view" 
                speed={15} 
              />
            </p>
            <footer className="hero__quote-author">
              — <TranslatedText 
                  key={`quote-author-${quoteIndex}-${i18n.language}`} 
                  i18nKey={`hero.quotes.${quoteIndex}.author`} 
                  animateOn="view" 
                  speed={10} 
                />
            </footer>
          </blockquote>
        </div>
      )}
    </section>
  );
}
