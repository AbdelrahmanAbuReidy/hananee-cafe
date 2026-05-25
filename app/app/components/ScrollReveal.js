'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const ANIMATIONS = {
  fadeUp: {
    initial: { opacity: 0, transform: 'translateY(40px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  fadeDown: {
    initial: { opacity: 0, transform: 'translateY(-40px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  fadeLeft: {
    initial: { opacity: 0, transform: 'translateX(-50px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  fadeRight: {
    initial: { opacity: 0, transform: 'translateX(50px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  scaleUp: {
    initial: { opacity: 0, transform: 'scale(0.85)' },
    visible: { opacity: 1, transform: 'scale(1)' },
  },
  rotateIn: {
    initial: { opacity: 0, transform: 'rotate(-5deg) scale(0.9)' },
    visible: { opacity: 1, transform: 'rotate(0deg) scale(1)' },
  },
  flipUp: {
    initial: { opacity: 0, transform: 'perspective(600px) rotateX(15deg) translateY(30px)' },
    visible: { opacity: 1, transform: 'perspective(600px) rotateX(0deg) translateY(0)' },
  },
  slideReveal: {
    initial: { opacity: 0, transform: 'translateY(20px)', clipPath: 'inset(100% 0 0 0)' },
    visible: { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)' },
  },
  zoomFade: {
    initial: { opacity: 0, transform: 'scale(1.1)', filter: 'blur(8px)' },
    visible: { opacity: 1, transform: 'scale(1)', filter: 'blur(0px)' },
  },
};

function subscribeReducedMotion(callback) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServer() {
  return false;
}

function useReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getReducedMotionServer);
}

export default function ScrollReveal({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 800,
  threshold = 0.15,
  stagger = 0,
  index = 0,
  className = '',
  once = true,
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold, once, reduceMotion]);

  const anim = ANIMATIONS[animation] || ANIMATIONS.fadeUp;
  const totalDelay = delay + stagger * index;
  const shouldShow = reduceMotion || isVisible;

  const style = reduceMotion
    ? { opacity: 1 }
    : {
        ...(shouldShow ? anim.visible : anim.initial),
        transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${totalDelay}ms`,
        willChange: 'opacity, transform',
      };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
