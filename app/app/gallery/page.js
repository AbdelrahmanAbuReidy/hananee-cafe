'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import ScrollReveal from '../components/ScrollReveal';
import Lightbox from '../components/Lightbox';

const galleryItems = [
  { src: '/hero-interior.png', alt: 'F1 themed interior with checkered patterns and racing memorabilia', category: 'Interior', caption: 'Racing vibes in every corner' },
  { src: '/coffee-latte.png', alt: 'Handcrafted latte with intricate latte art', category: 'Drinks', caption: 'Handcrafted latte art' },
  { src: '/food-spread.png', alt: 'Spread of pasta, nasi lemak and other dishes from Hananee Café', category: 'Food', caption: 'Delicious food spread' },
  { src: '/cafe-ambiance.png', alt: 'Warm interior ambiance with cozy seating, perfect for studying', category: 'Interior', caption: 'Cozy study & chill spot' },
  { src: '/drinks-specialty.png', alt: 'Specialty iced matcha and signature coffee drinks', category: 'Drinks', caption: 'Iced matcha & coffee' },
  { src: '/cafe-exterior.png', alt: 'Welcoming exterior of Hananee Café on Jalan Simpang Tiga', category: 'Exterior', caption: 'Our welcoming facade' },
];

const categories = ['All', 'Interior', 'Drinks', 'Food', 'Exterior'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setLightboxIndex(null); // close lightbox if the filtered list changes under it
  };

  const onItemKey = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setLightboxIndex(index);
    }
  };

  return (
    <div className={styles.galleryPage}>
      {/* Gallery Hero */}
      <section className={styles.galleryHero}>
        <div className={styles.galleryHeroOverlay} />
        <div className={styles.galleryHeroImage}>
          <Image
            src="/cafe-ambiance.png"
            alt=""
            fill
            priority
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
        </div>
        <div className={`container ${styles.galleryHeroContent}`}>
          <ScrollReveal animation="fadeRight">
            <span className="f1-tag">Gallery</span>
          </ScrollReveal>
          <ScrollReveal animation="fadeLeft" delay={200}>
            <h1 className={styles.galleryHeroTitle}>Capture the Vibes</h1>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={400}>
            <p className={styles.galleryHeroDesc}>
              Every corner of Hananee is designed to be photogenic. Explore our F1-inspired
              interiors, artisan drinks, and delicious food — your phone shoots content on its own. 📸
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Content */}
      <section className={`section ${styles.galleryContent}`}>
        <div className="container">
          {/* Category Filters */}
          <ScrollReveal animation="fadeDown">
            <div className={styles.filterBar} role="tablist" aria-label="Filter gallery by category">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.filterBtn} ${isActive ? styles.filterActive : ''}`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Gallery Grid */}
          <div className={styles.galleryGrid}>
            {filteredItems.map((item, i) => (
              <ScrollReveal key={`${item.src}-${i}`} animation="scaleUp" stagger={80} index={i}>
                <button
                  type="button"
                  className={styles.galleryItem}
                  onClick={() => setLightboxIndex(i)}
                  onKeyDown={(e) => onItemKey(e, i)}
                  aria-label={`Open ${item.caption} in full view`}
                >
                  <div className={styles.galleryImageWrapper}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className={styles.galleryItemOverlay}>
                      <span className={styles.galleryCategory}>{item.category}</span>
                      <h3 className={styles.galleryCaption}>{item.caption}</h3>
                      <span className={styles.galleryView}>🔍 View Full</span>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>

          {/* Instagram CTA */}
          <ScrollReveal animation="fadeUp" delay={200}>
            <div className={styles.instaCTA}>
              <div className={styles.instaIcon} aria-hidden="true">📸</div>
              <h3 className={styles.instaTitle}>See More on Instagram</h3>
              <p className={styles.instaDesc}>
                Follow <strong>@hananeecafe</strong> for daily updates, behind-the-scenes,
                and new menu drops.
              </p>
              <a
                href="https://www.instagram.com/hananeecafe/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Follow on Instagram →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Lightbox
        items={filteredItems}
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
