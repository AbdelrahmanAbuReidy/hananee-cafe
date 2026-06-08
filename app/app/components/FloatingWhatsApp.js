'use client';

import { useSyncExternalStore } from 'react';
import styles from './FloatingWhatsApp.module.css';
import { WhatsAppIcon } from './BrandIcons';

function subscribeScroll(callback) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('scroll', callback, { passive: true });
  return () => window.removeEventListener('scroll', callback);
}

function getScrolledPast300() {
  return typeof window !== 'undefined' && window.scrollY > 300;
}

function getScrolledServer() {
  return false;
}

function useScrolledPast() {
  return useSyncExternalStore(subscribeScroll, getScrolledPast300, getScrolledServer);
}

export default function FloatingWhatsApp() {
  const scrolled = useScrolledPast();

  return (
    <a
      href="https://wa.me/60109203889?text=Hi%20Hananee!%20I'd%20like%20to%20ask%20about..."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Hananee Café on WhatsApp"
      className={`${styles.fab} ${scrolled ? styles.scrolled : ''}`}
    >
      <WhatsAppIcon size={26} />
      <span className={styles.label}>
        <strong>Order on WhatsApp</strong>
        <small>Tap to chat now</small>
      </span>
      <span className={styles.pulse} aria-hidden="true" />
    </a>
  );
}
