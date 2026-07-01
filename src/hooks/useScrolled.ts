import { useState, useEffect } from 'react';

/**
 * Detecta si el usuario ha hecho scroll más de un umbral (threshold).
 * Útil para activar estilos del topbar al hacer scroll.
 *
 * @param threshold - píxeles de scroll antes de retornar true (por defecto: 10)
 * @returns boolean — true si scrollY > threshold
 */
export function useScrolled(threshold = 10): boolean {
  const [scrolled, setScrolled] = useState<boolean>(
    typeof window !== 'undefined' ? window.scrollY > threshold : false
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    // Escucha el evento scroll con passive: true para no bloquear el render
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Verificar estado inicial por si ya se cargó con scroll
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return scrolled;
}
