'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';
import Lightbox from './Lightbox';
import { InstagramIcon } from './BrandIcons';
import styles from './LatestPosters.module.css';

const posters = [
  {
    id: 'pistachio-series',
    src: '/ig-pics/poster-pistachio-series.jpg',
    alt: 'Hananee Pistachio Series promo — Pistachio Frappe, Pistachio Latte, Coconut Pistachio, and Strawberry Pistachio',
    tag: 'NEW LINEUP',
    title: 'Pistachio Series',
    caption: 'Best Seller: Pistachio Frappe (RM15). Plus Pistachio Latte, Coconut Pistachio & Strawberry Pistachio (RM15–16).',
    cta: { label: 'See on Menu', icon: '☕', href: '/menu', external: false },
  },
  {
    id: 'tiramisu',
    src: '/ig-pics/poster-tiramisu.jpg',
    alt: 'Hananee Tiramisu promo — Classic RM 20, made live before your eyes',
    tag: 'PODIUM SWEETS',
    title: 'Hananee Tiramisu',
    caption: 'The art of tiramisu, made live right before your eyes. Classic at RM20.',
    cta: { label: 'View Desserts', icon: '🍰', href: '/menu', external: false },
  },
  {
    id: '520-rose-match',
    src: '/ig-pics/poster-520-rose-match.jpg',
    alt: '520 Rose & Match — a social dating event held at Hananee Café',
    tag: 'SPECIAL EVENT',
    title: '520 Rose & Match',
    caption: 'A cozy night to meet new people, sip coffee, and see where it goes — watch for our next one.',
    cta: {
      label: 'Ask About Events',
      icon: '💬',
      href: "https://wa.me/60109203889?text=Hi%20Hananee!%20I'd%20like%20to%20know%20about%20upcoming%20events.",
      external: true,
    },
  },
];

export default function LatestPosters() {
  const [activeIndex, setActiveIndex] = useState(null);
  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const onCardKey = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIndex(index);
    }
  };

  return (
    <section className={styles.section} aria-labelledby="latest-posters-heading">
      <div className="container">
        <ScrollReveal animation="fadeUp">
          <div className={styles.header}>
            <span className="f1-tag">Pit Lane News</span>
            <h2 id="latest-posters-heading" className="section-title">
              Latest from Hananee
            </h2>
            <p className="section-subtitle">
              Fresh drops, signature dishes, and one-off events — straight from our paddock.
              Tap any poster to view it full-size.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {posters.map((poster, i) => (
            <ScrollReveal key={poster.id} animation="fadeUp" stagger={120} index={i}>
              <article className={styles.card}>
                <button
                  type="button"
                  className={styles.imageButton}
                  onClick={() => setActiveIndex(i)}
                  onKeyDown={(e) => onCardKey(e, i)}
                  aria-label={`Open ${poster.title} poster full-size`}
                >
                  <div className={styles.imageWrap}>
                    <Image
                      src={poster.src}
                      alt={poster.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className={styles.imageOverlay} aria-hidden="true">
                      <span className={styles.zoomChip}>🔍 View Full Poster</span>
                    </div>
                  </div>
                  <span className={styles.tag}>{poster.tag}</span>
                </button>

                <div className={styles.body}>
                  <h3 className={styles.title}>{poster.title}</h3>
                  <p className={styles.caption}>{poster.caption}</p>
                  {poster.cta.external ? (
                    <a
                      href={poster.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn btn-secondary ${styles.cta}`}
                    >
                      <span aria-hidden="true">{poster.cta.icon}</span>
                      {poster.cta.label}
                    </a>
                  ) : (
                    <Link href={poster.cta.href} className={`btn btn-secondary ${styles.cta}`}>
                      <span aria-hidden="true">{poster.cta.icon}</span>
                      {poster.cta.label}
                    </Link>
                  )}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="fadeUp" delay={200}>
          <div className={styles.footer}>
            <p className={styles.followCopy}>
              Catch every new drop and behind-the-scenes on Instagram.
            </p>
            <a
              href="https://www.instagram.com/hananeecafe/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <InstagramIcon size={18} /> Follow @hananeecafe
            </a>
          </div>
        </ScrollReveal>
      </div>

      <Lightbox
        items={posters}
        activeIndex={activeIndex}
        onClose={closeLightbox}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}
