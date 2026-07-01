import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Layout } from './components/Layout/Layout';
import { Hero } from './components/sections/Hero/Hero';
import { AboutMe } from './components/sections/AboutMe/AboutMe';
import { Technologies } from './components/sections/Technologies/Technologies';
import { Projects } from './components/sections/Projects/Projects';
import { Preloader } from './components/Preloader/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

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
    <>
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
          <Hero />
          <AboutMe />
          <Technologies />
          <Projects />
        </Layout>
      </motion.div>
    </>
  );
}

export default App;
