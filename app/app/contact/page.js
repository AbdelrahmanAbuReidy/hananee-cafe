import styles from './page.module.css';
import Image from 'next/image';

export const metadata = {
  title: 'Contact Us — Hananee Café | Find Us in Kuching',
  description: 'Visit Hananee Café at Jalan Simpang Tiga, Kuching, Sarawak. Open daily 9AM-11PM. Call +60 10-920 3889 or WhatsApp us. Free parking available.',
};

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      {/* Contact Hero */}
      <section className={styles.contactHero}>
        <div className={styles.contactHeroOverlay} />
        <div className={styles.contactHeroImage}>
          <Image 
            src="/cafe-exterior.png" 
            alt="Hananee Cafe Exterior" 
            fill 
            priority 
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
        </div>
        <div className={`container ${styles.contactHeroContent}`}>
          <span className="f1-tag">Contact Us</span>
          <h1 className={styles.contactHeroTitle}>Let&apos;s Connect</h1>
          <p className={styles.contactHeroDesc}>
            Ready for the best coffee in Kuching? Come visit our pit lane — 
            we&apos;re always open for new friends. 🏎️
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className={`section ${styles.contactInfo}`}>
        <div className="container">
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📍</div>
              <h3>Our Location</h3>
              <p>Lot 8155 & 8156, Section 64, KTLD,<br/>Jalan Simpang Tiga, Kampung Kenyalang Park,<br/>93200 Kuching, Sarawak, Malaysia</p>
              <span className={styles.infoNote}>Beside Titik Temu • Near Swinburne University</span>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🕘</div>
              <h3>Opening Hours</h3>
              <div className={styles.hoursTable}>
                <div className={styles.hourRow}>
                  <span>Monday – Sunday</span>
                  <span className={styles.hourValue}>9 AM – 11 PM</span>
                </div>
              </div>
              <span className={styles.infoNote}>🏎️ Open 7 days a week — pit stops welcome!</span>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📞</div>
              <h3>Get in Touch</h3>
              <div className={styles.contactLinks}>
                <a href="tel:+60109203889" className={styles.contactLink}>
                  📞 +60 10-920 3889
                </a>
                <a href="https://wa.me/60109203889" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  💬 WhatsApp Us
                </a>
                <a href="https://www.instagram.com/hananeecafe/" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  📸 @hananeecafe
                </a>
                <a href="https://www.facebook.com/p/Hananee-61581697183774/" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  👤 Facebook Page
                </a>
              </div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🅿️</div>
              <h3>Parking</h3>
              <p>Free parking lot available with plenty of spaces. No worries about your ride while you enjoy your coffee! 🚗</p>
              <span className={styles.infoNote}>Easy access from main road</span>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <div className="container">
          <div className={styles.mapWrapper}>
            <div className={styles.mapHeader}>
              <span className="f1-tag">Navigate to Us</span>
              <h2 className={`section-title ${styles.mapTitle}`}>Find Our Starting Grid</h2>
            </div>
            <div className={styles.mapEmbed}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.3!2d110.3558167!3d1.5346085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31fba7fb3945957b%3A0xb77415e462fd6d91!2sHananee!5e0!3m2!1sen!2smy!4v1700000000000!5m2!1sen!2smy"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hananee Cafe Location"
              ></iframe>
            </div>
            <div className={styles.mapActions}>
              <a
                href="https://www.google.com/maps/place/Hananee/@1.5346085,110.3558167,17z/data=!3m1!4b1!4m6!3m5!1s0x31fba7fb3945957b:0xb77415e462fd6d91!8m2!3d1.5346085!4d110.3558167"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                📍 Open in Google Maps
              </a>
              <a
                href="https://wa.me/60109203889?text=Hi%20Hananee!%20I'd%20like%20to%20make%20a%20reservation."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
              >
                🏁 Reserve via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={`section ${styles.servicesSection}`}>
        <div className="container">
          <div className={styles.servicesHeader}>
            <span className="f1-tag">Service Options</span>
            <h2 className="section-title">How to Enjoy Hananee</h2>
          </div>
          <div className={styles.servicesGrid}>
            {[
              { icon: "🍽️", title: "Dine-In", desc: "Enjoy the full F1 ambiance experience. Every corner is Instagram-ready!" },
              { icon: "🥡", title: "Takeaway", desc: "Grab your favorite drinks and food to go. We'll have it ready fast!" },
              { icon: "🛵", title: "Delivery", desc: "Can't make it? We deliver! Order via WhatsApp or your favorite app." },
              { icon: "🎉", title: "Events", desc: "Private gatherings, F1 race screenings, birthday celebrations welcome!" },
            ].map((service, i) => (
              <div key={i} className={styles.serviceCard}>
                <span className={styles.serviceIcon}>{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.contactCTA}>
        <div className={`container ${styles.ctaInner}`}>
          <h2 className={styles.ctaTitle}>Ready to Visit?</h2>
          <p className={styles.ctaDesc}>Drop by anytime — we&apos;re here 7 days a week, serving the best coffee in Kuching!</p>
          <div className={styles.ctaActions}>
            <a href="tel:+60109203889" className="btn btn-primary">📞 Call Us Now</a>
            <a href="https://wa.me/60109203889" target="_blank" rel="noopener noreferrer" className="btn btn-accent">💬 WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  );
}
