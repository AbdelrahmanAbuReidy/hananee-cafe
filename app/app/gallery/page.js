'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const galleryItems = [
  { src: '/hero-interior.png', alt: 'F1 Themed Interior', category: 'Interior', caption: 'Racing vibes in every corner' },
  { src: '/coffee-latte.png', alt: 'Artisan Coffee Latte', category: 'Drinks', caption: 'Handcrafted latte art' },
  { src: '/food-spread.png', alt: 'Food Selection', category: 'Food', caption: 'Delicious food spread' },
  { src: '/cafe-ambiance.png', alt: 'Cafe Ambiance', category: 'Interior', caption: 'Cozy study & chill spot' },
  { src: '/drinks-specialty.png', alt: 'Specialty Drinks', category: 'Drinks', caption: 'Iced matcha & coffee' },
  { src: '/cafe-exterior.png', alt: 'Cafe Exterior', category: 'Exterior', caption: 'Our welcoming facade' },
];

const categories = ['All', 'Interior', 'Drinks', 'Food', 'Exterior'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex(prev => (prev + 1) % filteredItems.length);
  const prevImage = () => setLightboxIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);

  return (
    <div className={styles.galleryPage}>
      {/* Gallery Hero */}
      <section className={styles.galleryHero}>
        <div className={styles.galleryHeroOverlay} />
        <div className={styles.galleryHeroImage}>
          <Image 
            src="/cafe-ambiance.png" 
            alt="Hananee Cafe Gallery" 
            fill 
            priority 
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
        </div>
        <div className={`container ${styles.galleryHeroContent}`}>
          <span className="f1-tag">Gallery</span>
          <h1 className={styles.galleryHeroTitle}>Capture the Vibes</h1>
          <p className={styles.galleryHeroDesc}>
            Every corner of Hananee is designed to be photogenic. Explore our F1-inspired 
            interiors, artisan drinks, and delicious food — your phone shoots content on its own. 📸
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className={`section ${styles.galleryContent}`}>
        <div className="container">
          {/* Category Filters */}
          <div className={styles.filterBar}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className={styles.galleryGrid}>
            {filteredItems.map((item, i) => (
              <div
                key={i}
                className={styles.galleryItem}
                onClick={() => openLightbox(i)}
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
              </div>
            ))}
          </div>

          {/* Instagram CTA */}
          <div className={styles.instaCTA}>
            <div className={styles.instaIcon}>📸</div>
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
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.lightboxClose} onClick={closeLightbox}>✕</button>
          <button className={styles.lightboxPrev} onClick={(e) => { e.stopPropagation(); prevImage(); }}>‹</button>
          <div className={styles.lightboxImage} onClick={(e) => e.stopPropagation()}>
            <Image 
              src={filteredItems[lightboxIndex].src} 
              alt={filteredItems[lightboxIndex].alt}
              fill
              style={{ objectFit: 'contain' }}
              sizes="90vw"
            />
          </div>
          <button className={styles.lightboxNext} onClick={(e) => { e.stopPropagation(); nextImage(); }}>›</button>
          <div className={styles.lightboxCaption}>
            <span>{filteredItems[lightboxIndex].category}</span>
            <p>{filteredItems[lightboxIndex].caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
