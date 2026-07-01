import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CountUp from '../CountUp/CountUp';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

// Duración del conteo en segundos (debe coincidir con el prop duration de CountUp)
const COUNT_DURATION_S = 0.5;
// Tiempo adicional para mostrar el 100% antes de salir (ms)
const HOLD_AFTER_END_MS = 2500;

export function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Calculamos el momento exacto: duración del conteo + tiempo de visualización del 100%
    // Esto es más fiable que onEnd porque el spring puede disparar onEnd antes
    // de que el número llegue visualmente a 100
    const totalMs = COUNT_DURATION_S * 1000 + HOLD_AFTER_END_MS;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, totalMs);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100vh' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader__content">
            <CountUp
              from={0}
              to={100}
              duration={COUNT_DURATION_S}
              className="preloader__counter"
            />
            <span className="preloader__percent">%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
