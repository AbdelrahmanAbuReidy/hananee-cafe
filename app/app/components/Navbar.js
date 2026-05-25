'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/menu', label: 'Our Menu', icon: '☕' },
  { href: '/about', label: 'Our Story', icon: '📖' },
  { href: '/gallery', label: 'Gallery', icon: '📸' },
  { href: '/contact', label: 'Contact', icon: '📍' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change. This is a legitimate "reset on prop change"
  // side effect — Navbar isn't remounted on navigation so we can't reset via key.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu is open + Escape closes it
  useEffect(() => {
    if (!mobileOpen) {
      document.body.classList.remove('no-scroll');
      return;
    }
    document.body.classList.add('no-scroll');
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} aria-label="Primary">
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo} aria-label="Hananee Café — home">
            <div className={styles.logoImage}>
              <Image src="/logo.jpg" alt="" width={45} height={45} priority />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>Hananee</span>
              <span className={styles.logoTag}>Café</span>
            </div>
          </Link>

          <div className={styles.navLinks}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={styles.navLinkText}>{link.label}</span>
                  {isActive && <span className={styles.activeDot} aria-hidden="true" />}
                </Link>
              );
            })}
          </div>

          <div className={styles.navRight}>
            <a
              href="https://wa.me/60109203889"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-accent ${styles.orderBtn}`}
              aria-label="Order from Hananee Café on WhatsApp"
            >
              <span className={styles.orderIcon} aria-hidden="true">🏁</span>
              Order Now
            </a>

            <button
              type="button"
              className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Racing stripe at bottom */}
        <div className={styles.racingLine} aria-hidden="true" />
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-nav"
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ''}`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-modal={mobileOpen ? 'true' : 'false'}
        aria-label="Mobile navigation"
      >
        <div className={styles.mobileMenuInner}>
          <div className={styles.mobileHeader}>
            <span className={styles.f1Badge}>🏎️ PIT LANE MENU</span>
          </div>
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`}
                style={{ transitionDelay: mobileOpen ? `${0.05 + i * 0.06}s` : '0s' }}
                aria-current={isActive ? 'page' : undefined}
                tabIndex={mobileOpen ? 0 : -1}
              >
                <span className={styles.mobileLinkIcon} aria-hidden="true">{link.icon}</span>
                <span className={styles.mobileLinkText}>{link.label}</span>
                {isActive && <span className={styles.mobileActiveBadge}>CURRENT</span>}
              </Link>
            );
          })}
          <a
            href="https://wa.me/60109203889"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileCTA}
            tabIndex={mobileOpen ? 0 : -1}
          >
            🏁 Order via WhatsApp
          </a>
          <a
            href="tel:+60109203889"
            className={styles.mobileSecondary}
            tabIndex={mobileOpen ? 0 : -1}
          >
            📞 Call +60 10-920 3889
          </a>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
