'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import styles from './Lightbox.module.css';

/**
 * Shared full-screen image viewer. Used by Gallery and LatestPosters.
 * Handles: Esc/←/→ keyboard nav, body scroll lock, click-outside to close,
 * caption with "n / total · Use ← → or Esc" hint.
 *
 * Each item must have { src, alt }. Optional: { category, caption, title }.
 */
export default function Lightbox({ items, activeIndex, onClose, onNavigate }) {
  const item = activeIndex !== null && activeIndex !== undefined ? items[activeIndex] : null;
  const isOpen = item !== null;

  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add('no-scroll');

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNavigate((activeIndex + 1) % items.length);
      } else if (e.key === 'ArrowLeft') {
        onNavigate((activeIndex - 1 + items.length) % items.length);
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, activeIndex, items.length, onClose, onNavigate]);

  if (!isOpen) return null;

  const heading = item.caption || item.title || item.alt || 'image';

  return (
    <div
      className={styles.lightbox}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${heading}`}
    >
      <button
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label="Close image viewer"
      >
        ✕
      </button>
      <button
        type="button"
        className={styles.prev}
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((activeIndex - 1 + items.length) % items.length);
        }}
        aria-label="Previous image"
      >
        ‹
      </button>
      <div className={styles.image} onClick={(e) => e.stopPropagation()}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          style={{ objectFit: 'contain' }}
          sizes="90vw"
          priority
        />
      </div>
      <button
        type="button"
        className={styles.next}
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((activeIndex + 1) % items.length);
        }}
        aria-label="Next image"
      >
        ›
      </button>
      <div className={styles.caption}>
        {item.category && <span>{item.category}</span>}
        {(item.caption || item.title) && <p>{item.caption || item.title}</p>}
        <small className={styles.hint}>
          {activeIndex + 1} / {items.length} · Use ← → or Esc
        </small>
      </div>
    </div>
  );
}
