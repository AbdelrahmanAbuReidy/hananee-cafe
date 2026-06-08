import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import OpenStatus from './OpenStatus';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './BrandIcons';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Racing stripe top */}
      <div className={styles.racingStripe} aria-hidden="true" />

      <div className={`container ${styles.footerGrid}`}>
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <Link href="/" className={styles.footerLogo} aria-label="Hananee Café — home">
            <Image src="/logo.jpg" alt="" width={50} height={50} />
            <div>
              <h3 className={styles.brandName}>Hananee</h3>
              <span className={styles.brandTag}>Café</span>
            </div>
          </Link>
          <p className={styles.brandDesc}>
            Coffee + vibes + aesthetics. The trendiest F1-themed café in Kuching, Sarawak —
            where every cup is a lap of pure delight. 🏎️
          </p>
          <div className={styles.socialLinks}>
            <a
              href="https://www.instagram.com/hananeecafe/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Hananee Café on Instagram"
              className={styles.socialLink}
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href="https://www.facebook.com/p/Hananee-61581697183774/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Hananee Café on Facebook"
              className={styles.socialLink}
            >
              <FacebookIcon size={20} />
            </a>
            <a
              href="https://wa.me/60109203889"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Hananee Café on WhatsApp"
              className={styles.socialLink}
            >
              <WhatsAppIcon size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Navigate</h4>
          <nav className={styles.footerNav} aria-label="Footer navigation">
            <Link href="/">Home</Link>
            <Link href="/menu">Our Menu</Link>
            <Link href="/about">Our Story</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        {/* Hours */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Opening Hours</h4>
          <div className={styles.hours}>
            <div className={styles.hourRow}>
              <span>Monday – Sunday</span>
              <span className={styles.hourTime}>9 AM – 11 PM</span>
            </div>
          </div>
          <OpenStatus variant="footer" />
        </div>

        {/* Contact */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Find Us</h4>
          <div className={styles.contactInfo}>
            <p>📍 Lot 8155 & 8156, Section 64, KTLD,<br/>Jalan Simpang Tiga, Kuching, Sarawak</p>
            <p>📞 <a href="tel:+60109203889">+60 10-920 3889</a></p>
            <p>📱 <a href="https://wa.me/60109203889" target="_blank" rel="noopener noreferrer">WhatsApp Us</a></p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomInner}`}>
          <p>© {new Date().getFullYear()} Hananee Café. All rights reserved.</p>
          <p className={styles.madeWith}>
            Crafted with ☕ &amp; 🏁 in Kuching, Sarawak
          </p>
        </div>
      </div>
    </footer>
  );
}
