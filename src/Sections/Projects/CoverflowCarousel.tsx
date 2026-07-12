/**
 * CoverflowCarousel — a flat-slat "cover flow" gallery.
 * Adapted from Originkit for use with `motion` v12 (motion/react).
 *
 * The active item is a big landscape card centred in the stage; every other
 * item is a thin flat slat. Each card is positioned by its wrapped relative
 * offset from the active index. A windowed set is rendered; cards animate
 * in from one edge as they animate out the other.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'motion/react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CoverflowImage = {
  src?: string;
  alt?: string;
  /** Optional overlay label shown at the bottom of the card */
  label?: string;
};

type Sizing = {
  restWidth: number;
  restHeight: number;
  activeWidth: number;
  activeHeight: number;
};

export type CoverflowCarouselProps = {
  images: CoverflowImage[];
  activeWidth?: number;
  activeHeight?: number;
  restWidth?: number;
  restHeight?: number;
  gap?: number;
  radius?: number;
  showArrows?: boolean;
  arrowColor?: string;
  arrowBackground?: string;
  arrowSize?: number;
  arrowPosition?: number;
  autoplay?: boolean;
  autoplayDirection?: 'leftToRight' | 'rightToLeft';
  moveDuration?: number;
  dwell?: number;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GRADIENT_FALLBACKS = [
  'linear-gradient(160deg, #ff6b6b, #ffd93d)',
  'linear-gradient(160deg, #4facfe, #00f2fe)',
  'linear-gradient(160deg, #43e97b, #38f9d7)',
  'linear-gradient(160deg, #fa709a, #fee140)',
  'linear-gradient(160deg, #a18cd1, #fbc2eb)',
  'linear-gradient(160deg, #f093fb, #f5576c)',
  'linear-gradient(160deg, #5ee7df, #b490ca)',
];

const RENDER_RANGE = 6;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relOf(index: number, pos: number, count: number): number {
  let rel = (((index - pos) % count) + count) % count;
  if (rel > count / 2) rel -= count;
  return rel;
}

function xForRel(rel: number, s: Sizing, gap: number): number {
  const ar = Math.abs(rel);
  const c1 = s.activeWidth / 2 + gap + s.restWidth / 2;
  const pitch = s.restWidth + gap;
  const mag = ar <= 1 ? ar * c1 : c1 + (ar - 1) * pitch;
  return (rel < 0 ? -1 : 1) * mag;
}

function blendForRel(rel: number): number {
  return Math.min(Math.abs(rel), 1);
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

function Card({
  item,
  index,
  pos,
  count,
  R,
  sizing,
  gap,
  radius,
  gradient,
  onSelect,
}: {
  item: CoverflowImage | undefined;
  index: number;
  pos: MotionValue<number>;
  count: number;
  R: number;
  sizing: Sizing;
  gap: number;
  radius: number;
  gradient: string;
  onSelect: ((index: number) => void) | undefined;
}) {
  const x = useTransform(pos, (p: number) =>
    xForRel(relOf(index, p, count), sizing, gap)
  );
  const opacity = useTransform(pos, (p: number) => {
    const ar = Math.abs(relOf(index, p, count));
    return ar <= R ? 1 : ar >= R + 1 ? 0 : 1 - (ar - R);
  });
  const zIndex = useTransform(pos, (p: number) =>
    Math.round(1000 - Math.abs(relOf(index, p, count)) * 100)
  );
  const width = useTransform(pos, (p: number) => {
    const a = blendForRel(relOf(index, p, count));
    return sizing.activeWidth + (sizing.restWidth - sizing.activeWidth) * a;
  });
  const height = useTransform(pos, (p: number) => {
    const a = blendForRel(relOf(index, p, count));
    return sizing.activeHeight + (sizing.restHeight - sizing.activeHeight) * a;
  });
  const borderRadius = useTransform(pos, (p: number) => {
    const a = blendForRel(relOf(index, p, count));
    const w = sizing.activeWidth + (sizing.restWidth - sizing.activeWidth) * a;
    const h = sizing.activeHeight + (sizing.restHeight - sizing.activeHeight) * a;
    return (Math.max(0, Math.min(20, radius)) / 20) * (Math.min(w, h) / 2);
  });
  const boxShadow = useTransform(pos, (p: number) =>
    Math.abs(relOf(index, p, count)) < 0.5
      ? '0 24px 70px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.06)'
      : '0 14px 40px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.05)'
  );

  return (
    <motion.div
      onClick={onSelect ? () => onSelect(index) : undefined}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        x,
        zIndex,
        opacity,
        cursor: onSelect ? 'pointer' : 'default',
      }}
    >
      <motion.div
        style={{
          x: '-50%',
          y: '-50%',
          width,
          height,
          borderRadius,
          overflow: 'hidden',
          background: gradient,
          boxShadow,
        }}
      >
        {item?.src ? (
          <img
            src={item.src}
            alt={item.alt ?? ''}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        ) : null}
        {item?.label && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '12px 16px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.02em',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {item.label}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ArrowButton
// ---------------------------------------------------------------------------

function ArrowButton({
  side,
  onClick,
  color,
  background,
  size,
  position,
}: {
  side: 'left' | 'right';
  onClick: () => void;
  color: string;
  background: string;
  size: number;
  position: number;
}) {
  const isLeft = side === 'left';
  const p = Math.max(0, Math.min(100, position));
  const inset = `calc((50% - ${size}px) * ${(100 - p) / 100})`;

  return (
    <button
      type="button"
      aria-label={isLeft ? 'Previous' : 'Next'}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        position: 'absolute',
        top: '50%',
        [isLeft ? 'left' : 'right']: inset,
        transform: 'translateY(-50%)',
        width: size,
        height: size,
        borderRadius: '50%',
        border: 'none',
        background,
        color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 0,
        zIndex: 2000,
        boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <svg
        width={size * 0.4}
        height={size * 0.4}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pointerEvents: 'none' }}
      >
        {isLeft ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
}

// ---------------------------------------------------------------------------
// CoverflowCarousel
// ---------------------------------------------------------------------------

const DEFAULTS = {
  activeWidth: 600,
  activeHeight: 400,
  restWidth: 200,
  restHeight: 270,
  gap: 30,
  radius: 2,
  showArrows: true,
  arrowColor: '#ffffff',
  arrowBackground: 'rgba(255,255,255,0.15)',
  arrowSize: 48,
  arrowPosition: 95,
  autoplay: false,
  autoplayDirection: 'rightToLeft' as const,
  moveDuration: 0.3,
  dwell: 1.2,
};

export function CoverflowCarousel(rawProps: CoverflowCarouselProps) {
  const props = { ...DEFAULTS, ...rawProps };
  const {
    images,
    activeWidth,
    activeHeight,
    restWidth,
    restHeight,
    gap,
    radius,
    showArrows,
    arrowColor,
    arrowBackground,
    arrowSize,
    arrowPosition,
    autoplay,
    autoplayDirection,
    moveDuration,
    dwell,
  } = props;

  const prefersReducedMotion = useReducedMotion();
  const count = Math.max(1, images.length);

  const sizing: Sizing = useMemo(
    () => ({ restWidth, restHeight, activeWidth, activeHeight }),
    [restWidth, restHeight, activeWidth, activeHeight]
  );

  const R = Math.max(1, Math.min(RENDER_RANGE, Math.floor(count / 2) - 1));

  // ---- rAF driver -------------------------------------------------------
  const pos = useMotionValue(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTRef = useRef<number | null>(null);
  const autoplayingRef = useRef(false);
  const dirRef = useRef(1);
  const dwellAccRef = useRef(0);
  const moveDurRef = useRef(moveDuration);
  moveDurRef.current = moveDuration;
  const dwellRef = useRef(dwell);
  dwellRef.current = dwell;
  const reducedRef = useRef(prefersReducedMotion);
  reducedRef.current = prefersReducedMotion;

  const tick = useCallback(
    (t: number) => {
      const last = lastTRef.current ?? t;
      const dt = Math.min((t - last) / 1000, 1 / 30);
      lastTRef.current = t;

      const cur = pos.get();
      const diff = targetRef.current - cur;
      const dur = Math.max(0.08, moveDurRef.current);
      const step = (1 / dur) * dt;
      const arriving = reducedRef.current || Math.abs(diff) <= step;

      if (arriving) {
        pos.set(targetRef.current);
        if (autoplayingRef.current) {
          dwellAccRef.current += dt;
          if (dwellAccRef.current >= Math.max(0, dwellRef.current)) {
            dwellAccRef.current = 0;
            targetRef.current += dirRef.current;
          }
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
        rafRef.current = null;
        lastTRef.current = null;
        return;
      }

      pos.set(cur + Math.sign(diff) * step);
      rafRef.current = requestAnimationFrame(tick);
    },
    [pos]
  );

  const ensureRunning = useCallback(() => {
    if (rafRef.current == null) {
      lastTRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const goNext = useCallback(() => {
    targetRef.current += 1;
    ensureRunning();
  }, [ensureRunning]);

  const goPrev = useCallback(() => {
    targetRef.current -= 1;
    ensureRunning();
  }, [ensureRunning]);

  const goTo = useCallback(
    (index: number) => {
      const cur = targetRef.current;
      let d = index - cur;
      d = ((d % count) + count) % count;
      if (d > count / 2) d -= count;
      targetRef.current = cur + d;
      ensureRunning();
    },
    [ensureRunning, count]
  );

  // Stop on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  // ---- Autoplay ----------------------------------------------------------
  useEffect(() => {
    const on = autoplay && count > 1;
    autoplayingRef.current = on;
    if (on) {
      dirRef.current = autoplayDirection === 'leftToRight' ? -1 : 1;
      dwellAccRef.current = 0;
      ensureRunning();
    }
    return () => {
      autoplayingRef.current = false;
    };
  }, [autoplay, autoplayDirection, count, ensureRunning]);

  // ---- Keyboard ----------------------------------------------------------
  const isHoveredRef = useRef(false);
  useEffect(() => {
    if (autoplay) return;
    const onKey = (e: KeyboardEvent) => {
      if (!isHoveredRef.current) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [autoplay, goPrev, goNext]);

  // ---- Render ------------------------------------------------------------
  const cards = images.map((img, i) => (
    <Card
      key={i}
      item={img}
      index={i}
      pos={pos}
      count={count}
      R={R}
      sizing={sizing}
      gap={gap}
      radius={radius}
      gradient={GRADIENT_FALLBACKS[i % GRADIENT_FALLBACKS.length]}
      onSelect={!autoplay ? goTo : undefined}
    />
  ));

  const arrows = showArrows && count > 1 && (
    <>
      <ArrowButton
        side="left"
        onClick={goPrev}
        color={arrowColor}
        background={arrowBackground}
        size={arrowSize}
        position={arrowPosition}
      />
      <ArrowButton
        side="right"
        onClick={goNext}
        color={arrowColor}
        background={arrowBackground}
        size={arrowSize}
        position={arrowPosition}
      />
    </>
  );

  return (
    <div
      tabIndex={0}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      onFocus={() => { isHoveredRef.current = true; }}
      onBlur={() => { isHoveredRef.current = false; }}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minWidth: 320,
        minHeight: 240,
        overflow: 'hidden',
        userSelect: 'none',
        touchAction: 'pan-y',
        outline: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          isolation: 'isolate',
          zIndex: 0,
        }}
      >
        {cards}
      </div>
      {arrows}
    </div>
  );
}
