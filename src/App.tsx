import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Layout } from './components/Layout/Layout';
import { Hero } from './components/sections/Hero/Hero';
import { AboutMe } from './components/sections/AboutMe/AboutMe';
import { Technologies } from './components/sections/Technologies/Technologies';
import { Projects } from './components/sections/Projects/Projects';
import { Footer } from './components/Footer/Footer';
import { Preloader } from './components/Preloader/Preloader';
import { CurtainsProvider } from './components/Curtains/CurtainsContext';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(() => window.location.hash || '#inicio');

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(window.location.hash || '#inicio');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Bloquear el scroll mientras carga el preloader
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  return (
    <CurtainsProvider>
      {/* Preloader — visible solo en la primera carga */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/*
        La página aparece con un fade-in + ligero desplazamiento hacia arriba
        justo cuando el Preloader termina su animación de salida (onExitComplete)
      */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={!loading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Layout>
          {/*
            ════════════════════════════════════════════════════════════
            SECCIONES DEL PORTAFOLIO
            ════════════════════════════════════════════════════════════
            Añade o quita secciones aquí según necesites.
            Cada sección tiene su propio id para smooth scroll:
              #inicio       → Hero
              #about        → AboutMe
              #technologies → Technologies
              #projects     → Projects
              #contact      → Footer (formulario de contacto)
            ════════════════════════════════════════════════════════════
          */}
          {activeSection === '#inicio' && <Hero />}
          {activeSection === '#about' && <AboutMe />}
          {activeSection === '#technologies' && <Technologies />}
          {activeSection === '#projects' && <Projects />}
          {activeSection === '#contact' && <Footer />}
        </Layout>
      </motion.div>
    </CurtainsProvider>
  );
}

export default App;
