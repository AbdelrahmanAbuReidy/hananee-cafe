'use client';

import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from './components/ScrollReveal';

export default function Home() {
  return (
    <>
      {/* ======= HERO SECTION ======= */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroImage}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.heroVideo}
          >
            <source src="/Generating_Website_Hero_Section_Video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroMainBranding}>
            <ScrollReveal animation="fadeRight" duration={1000}>
              <div className={styles.heroLogoWrapper}>
                <Image src="/logo.jpg" alt="Hananee Cafe Logo" width={140} height={140} className={styles.heroLogo} priority />
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeLeft" duration={1000} delay={200}>
              <div className={styles.heroBrandInfo}>
                <h1 className={styles.heroBrandName}>Hananee</h1>
                <div className={styles.heroBrandTagline}>
                  <span className={styles.heroTagF1}>CAFÉ</span>
                  <div className={styles.heroTagLine} />
                  <span className={styles.heroTagSlogan}>EST. 2025</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fadeUp" delay={600}>
            <div className={styles.heroSubtitle}>
              <p>Where Every Cup Is a Winning Lap</p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={800}>
            <div className={styles.heroCTA}>
              <Link href="/menu" className="btn btn-primary">
                ☕ Explore Our Menu
              </Link>
              <Link href="/about" className="btn btn-secondary">
                🏎️ Our Story
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={1000}>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.statValue}>4.5</span>
                <span className={styles.statLabel}>⭐ Google Rating</span>
              </div>
              <div className={styles.heroDivider} />
              <div className={styles.heroStat}>
                <span className={styles.statValue}>7</span>
                <span className={styles.statLabel}>Days Open</span>
              </div>
              <div className={styles.heroDivider} />
              <div className={styles.heroStat}>
                <span className={styles.statValue}>9–11</span>
                <span className={styles.statLabel}>AM to PM</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollWheel} />
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ======= FEATURED DRINKS ======= */}
      <section className={`section ${styles.featured}`}>
        <div className="container">
          <ScrollReveal animation="fadeUp">
            <div className={styles.sectionHeader}>
              <span className="f1-tag">Signature Lineup</span>
              <h2 className="section-title">Our Signature Menu</h2>
              <p className="section-subtitle">
                Handcrafted with passion, each drink is a masterpiece — just like a precision-tuned F1 machine.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.drinkGrid}>
            {[
              { name: "Matcha Latte", desc: "Signature matcha with perfectly steamed milk, consistently smooth every time.", rating: "4.8", price: "RM 14", image: "/Matcha Latte.png" },
              { name: "Houjicha Latte", desc: "Roasted Japanese green tea latte with a warm, toasty flavor profile.", rating: "4.6", price: "RM 14", image: "/Houjicha Latte.png" },
              { name: "Espresso Shot", desc: "Bold, rich espresso — the fuel that powers your day like a turbo engine.", rating: "4.7", price: "RM 8", image: "/Espresso Shot.png" },
              { name: "Iced Spanish Latte", desc: "Creamy condensed milk meets bold espresso over ice. Sweet victory in a glass.", rating: "4.9", price: "RM 15", image: "/Iced Spanish Latte.png" },
            ].map((drink, i) => (
              <ScrollReveal key={i} animation="flipUp" stagger={120} index={i}>
                <div className={styles.drinkCard}>
                  <div className={styles.drinkImageWrapper}>
                    <Image
                      src={drink.image}
                      alt={drink.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <div className={styles.drinkCardContent}>
                    <h3 className={styles.drinkName}>{drink.name}</h3>
                    <p className={styles.drinkDesc}>{drink.desc}</p>
                    <div className={styles.drinkPrice}>{drink.price}</div>
                  </div>
                  <div className={styles.drinkStripe} />
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="fadeUp" delay={300}>
            <div className={styles.featuredCTA}>
              <Link href="/menu" className="btn btn-primary">
                View Full Menu →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ======= ABOUT PREVIEW ======= */}
      <section className={`section ${styles.aboutPreview}`}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <ScrollReveal animation="fadeLeft">
              <div className={styles.aboutImages}>
                <div className={styles.aboutImageMain}>
                  <Image
                    src="/cafe-ambiance.png"
                    alt="Hananee Cafe Ambiance"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className={styles.aboutImageSmall}>
                  <Image
                    src="/coffee-latte.png"
                    alt="Hananee Coffee Latte"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="200px"
                  />
                </div>
                <div className={styles.aboutBadge}>
                  <span className={styles.badgeNumber}>F1</span>
                  <span className={styles.badgeText}>Inspired</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeRight">
              <div className={styles.aboutText}>
                <span className="f1-tag">Get to Know Us</span>
                <h2 className={`section-title ${styles.aboutTitle}`}>
                  Handcrafting Exotic Flavors with Racing Passion
                </h2>
                <p className={styles.aboutDesc}>
                  Hananee Café is where the owner&apos;s long-time dream became reality — a cozy environment
                  with a unique F1 racing style. Every corner is designed around racing elements — walls,
                  displays, lighting — everything screams Formula 1 vibes.
                </p>
                <p className={styles.aboutDesc}>
                  Located near Swinburne University in Kuching, we&apos;re the perfect spot for students,
                  coffee lovers, and anyone seeking a peaceful refuge with world-class vibes and delicious food.
                </p>
                <div className={styles.aboutFeatures}>
                  {[
                    { icon: '🏎️', label: 'F1 Themed Interior' },
                    { icon: '📸', label: 'Instagram-Worthy' },
                    { icon: '🎲', label: 'Board Games Available' },
                    { icon: '🅿️', label: 'Free Parking' },
                  ].map((feat, i) => (
                    <ScrollReveal key={i} animation="scaleUp" stagger={100} index={i}>
                      <div className={styles.feature}>
                        <span className={styles.featureIcon}>{feat.icon}</span>
                        <span>{feat.label}</span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
                <Link href="/about" className="btn btn-primary">
                  Read Our Full Story →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ======= FOOD SECTION ======= */}
      <section className={`section ${styles.foodSection}`}>
        <div className="container">
          <ScrollReveal animation="fadeUp">
            <div className={styles.sectionHeader}>
              <span className="f1-tag">Pit Stop Bites</span>
              <h2 className="section-title">Fuel Up with Our Best Dishes</h2>
              <p className="section-subtitle">
                From fragrant nasi lemak to rich pasta — refuel at Hananee before your next lap.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.foodShowcase}>
            <ScrollReveal animation="fadeLeft">
              <div className={styles.foodImageWrapper}>
                <Image
                  src="/food-spread.png"
                  alt="Hananee Cafe Food Selection"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className={styles.foodOverlay}>
                  <div className={styles.foodHighlight}>
                    <span className={styles.foodEmoji}>🍛</span>
                    <div>
                      <h4>Nasi Lemak</h4>
                      <p>Best in town — highly recommended!</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <div className={styles.foodList}>
              {[
                { name: "Nasi Lemak Curry Chicken", desc: "Fragrant coconut rice with rich curry", icon: "🍛", price: "RM 15" },
                { name: "Handmade Chicken Wantan", desc: "Juicy, freshly made wantans", icon: "🥟", price: "RM 12" },
                { name: "Creamy Carbonara", desc: "Rich and flavourful Italian pasta", icon: "🍝", price: "RM 18" },
                { name: "Aglio Olio", desc: "Classic garlic & olive oil pasta", icon: "🍝", price: "RM 16" },
                { name: "Nasi Rendang", desc: "Tender rendang with fragrant rice", icon: "🍛", price: "RM 17" },
                { name: "Assorted Cakes", desc: "Dessert lovers' paradise", icon: "🍰", price: "RM 12" },
              ].map((item, i) => (
                <ScrollReveal key={i} animation="fadeRight" stagger={80} index={i}>
                  <div className={styles.foodItem}>
                    <span className={styles.foodItemIcon}>{item.icon}</span>
                    <div className={styles.foodItemInfo}>
                      <h4>{item.name}</h4>
                      <p>{item.desc}</p>
                    </div>
                    <span className={styles.foodItemPrice}>{item.price}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======= TESTIMONIALS ======= */}
      <section className={`section ${styles.testimonials}`}>
        <div className="container">
          <ScrollReveal animation="fadeUp">
            <div className={styles.sectionHeader}>
              <span className="f1-tag">From Our Guests</span>
              <h2 className="section-title">What Our Regulars Say</h2>
              <p className="section-subtitle">
                Real reviews from real coffee enthusiasts who&apos;ve crossed our finish line.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.reviewGrid}>
            {[
              {
                name: "Lady Norzaitul",
                badge: "Local Guide",
                stars: 5,
                text: "I recently had the pleasure of dining at Hananee Cafe, and it was an exceptional experience from start to finish. The culinary offerings were outstanding!",
                avatar: "🧕"
              },
              {
                name: "mc sommerville",
                badge: "Local Guide",
                stars: 5,
                text: "Excellent coffee, best in Kuching! Hananee also offers an interesting range of exotic coffee and tea combos. Ambience is classy, quiet and relaxing.",
                avatar: "👨"
              },
              {
                name: "Siti Nurain",
                badge: "",
                stars: 5,
                text: "I love the atmosphere so much. The interior is so beautiful with an F1 theme. The coffee tastes to my taste, and the food is generally delicious.",
                avatar: "👩"
              },
              {
                name: "FlatWhite Journey",
                badge: "Local Guide",
                stars: 5,
                text: "Absolutely Magical Vibes! Visited Hananee Cafe for the second time and was completely blown away. Every corner is photogenic!",
                avatar: "☕"
              },
              {
                name: "Adilla Rabaie",
                badge: "",
                stars: 5,
                text: "Best!!!! Staff service was so good, the food was so delicious and a cozy place. Staff sangat friendly.",
                avatar: "💜"
              },
              {
                name: "Jia Yi Lee",
                badge: "",
                stars: 5,
                text: "I've visited this café for two consecutive days and loved it so much! I tried the Nasi Rendang, Carbonara, Aglio Olio — everything was amazing.",
                avatar: "🌟"
              },
            ].map((review, i) => (
              <ScrollReveal key={i} animation="scaleUp" stagger={100} index={i}>
                <div className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewAvatar}>{review.avatar}</div>
                    <div>
                      <h4 className={styles.reviewName}>{review.name}</h4>
                      {review.badge && <span className={styles.reviewBadge}>{review.badge}</span>}
                    </div>
                  </div>
                  <div className="stars">
                    {Array.from({ length: review.stars }).map((_, j) => (
                      <span key={j}>★</span>
                    ))}
                  </div>
                  <p className={styles.reviewText}>{review.text}</p>
                  <div className={styles.reviewPlatform}>
                    <span>via Google Reviews</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======= CTA SECTION ======= */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaOverlay} />
        <div className={`container ${styles.ctaContent}`}>
          <ScrollReveal animation="zoomFade">
            <span className={styles.ctaF1}>🏎️ START YOUR ENGINES</span>
            <h2 className={styles.ctaTitle}>Ready for the Best Coffee in Kuching?</h2>
            <p className={styles.ctaDesc}>
              Visit us at Jalan Simpang Tiga, right beside Titik Temu.
              Open daily from 9 AM to 11 PM. Pit stops always welcome!
            </p>
            <div className={styles.ctaButtons}>
              <a href="https://wa.me/60109203889" target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                🏁 Order via WhatsApp
              </a>
              <Link href="/contact" className="btn btn-secondary" style={{ borderColor: 'white', color: 'white' }}>
                📍 Get Directions
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
