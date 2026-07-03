import React, { createContext, useContext, useState, type ReactNode, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';

type CurtainOptions = {
  duration?: number;
  color?: string;
};

type CurtainsContextType = {
  triggerTransition: (action: () => void, options?: CurtainOptions) => void;
  isAnimating: boolean;
};

const CurtainsContext = createContext<CurtainsContextType | undefined>(undefined);

export const useCurtains = () => {
  const context = useContext(CurtainsContext);
  if (!context) {
    throw new Error('useCurtains must be used within a CurtainsProvider');
  }
  return context;
};

export const CurtainsProvider = ({ children }: { children: ReactNode }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [options, setOptions] = useState<CurtainOptions>({ duration: 1.0, color: '#1c1c1a' });
  const [phase, setPhase] = useState<'IDLE' | 'IN' | 'OUT'>('IDLE');

  const triggerTransition = useCallback((action: () => void, customOptions?: CurtainOptions) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setOptions(prev => ({ ...prev, ...customOptions }));
    setPhase('IN');

    const duration = customOptions?.duration || 1.0;

    // Halfway through, we execute the action and switch to OUT phase
    setTimeout(() => {
      action();
      setPhase('OUT');
    }, (duration / 2) * 1000);

    // Finish animation
    setTimeout(() => {
      setPhase('IDLE');
      setIsAnimating(false);
    }, duration * 1000);
  }, [isAnimating]);

  const halfDuration = (options.duration || 1.0) / 2;

  // In: screen is empty -> wave moves in to cover screen from left to right
  const animIn: Variants = {
    initial: { d: "M 0 0 L 0 0 Q 0 50 0 100 L 0 100 Z" },
    animate: {
      d: [
        "M 0 0 L 0 0 Q 0 50 0 100 L 0 100 Z",
        "M 0 0 L 50 0 Q 75 50 50 100 L 0 100 Z",
        "M 0 0 L 100 0 Q 100 50 100 100 L 0 100 Z"
      ],
      transition: { duration: halfDuration, ease: [0.65, 0, 0.35, 1] } // smooth easeInOut
    }
  };

  // Out: screen is covered -> wave moves out to reveal screen moving left to right
  const animOut: Variants = {
    initial: { d: "M 0 0 L 100 0 L 100 100 L 0 100 Q 0 50 0 0" },
    animate: {
      d: [
        "M 0 0 L 100 0 L 100 100 L 0 100 Q 0 50 0 0",
        "M 50 0 L 100 0 L 100 100 L 50 100 Q 75 50 50 0",
        "M 100 0 L 100 0 L 100 100 L 100 100 Q 100 50 100 0"
      ],
      transition: { duration: halfDuration, ease: [0.65, 0, 0.35, 1] }
    }
  };

  return (
    <CurtainsContext.Provider value={{ triggerTransition, isAnimating }}>
      {children}
      <AnimatePresence>
        {phase !== 'IDLE' && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 99999,
              pointerEvents: 'none',
              display: 'flex'
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ width: '100%', height: '100%', display: 'block' }}
            >
              <motion.path
                fill={options.color}
                variants={phase === 'IN' ? animIn : animOut}
                initial="initial"
                animate="animate"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </CurtainsContext.Provider>
  );
};
