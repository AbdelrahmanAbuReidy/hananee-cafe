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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo} aria-label="Hananee Cafe Home">
            <div className={styles.logoImage}>
              <Image src="/logo.jpg" alt="Hananee Cafe Logo" width={45} height={45} priority />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>Hananee</span>
              <span className={styles.logoTag}>Café</span>
            </div>
          </Link>

          <div className={styles.navLinks}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              >
                <span className={styles.navLinkText}>{link.label}</span>
                {pathname === link.href && <span className={styles.activeDot} />}
              </Link>
            ))}
          </div>

          <div className={styles.navRight}>
            <a
              href="https://wa.me/60109203889"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-accent ${styles.orderBtn}`}
            >
              <span className={styles.orderIcon}>🏁</span>
              Order Now
            </a>

            <button
              className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Racing stripe at bottom */}
        <div className={styles.racingLine} />
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileMenuInner}>
          <div className={styles.mobileHeader}>
            <span className={styles.f1Badge}>🏎️ PIT LANE MENU</span>
          </div>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileActive : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className={styles.mobileLinkIcon}>{link.icon}</span>
              <span className={styles.mobileLinkText}>{link.label}</span>
              {pathname === link.href && <span className={styles.mobileActiveBadge}>CURRENT</span>}
            </Link>
          ))}
          <a
            href="https://wa.me/60109203889"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileCTA}
          >
            🏁 Order via WhatsApp
          </a>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}
