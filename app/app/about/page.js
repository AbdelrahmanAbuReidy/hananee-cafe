import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Our Story — Hananee Café | F1-Inspired Coffee Experience',
  description: 'Discover the story behind Hananee Café — where an F1 fan\'s dream became Kuching\'s trendiest coffee destination. Coffee + vibes + aesthetics.',
};

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* About Hero */}
      <section className={styles.aboutHero}>
        <div className={styles.aboutHeroOverlay} />
        <div className={styles.aboutHeroImage}>
          <Image 
            src="/cafe-ambiance.png" 
            alt="Hananee Cafe Ambiance" 
            fill 
            priority 
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
        </div>
        <div className={`container ${styles.aboutHeroContent}`}>
          <span className="f1-tag">Our Story</span>
          <h1 className={styles.aboutHeroTitle}>The Story Behind<br/>Every Cup</h1>
          <p className={styles.aboutHeroDesc}>
            Where an F1 fan&apos;s lifelong dream became reality — one cup at a time.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className={`section ${styles.originSection}`}>
        <div className="container">
          <div className={styles.originGrid}>
            <div className={styles.originText}>
              <span className={styles.chapterTag}>Chapter 01</span>
              <h2 className={`section-title ${styles.originTitle}`}>
                A Dream Fueled by Passion
              </h2>
              <p className={styles.originDesc}>
                Every great story starts with a dream. For the founder of Hananee Café, that dream 
                was to create a space that combines two of life&apos;s greatest passions — the artistry 
                of coffee and the adrenaline of Formula 1 racing.
              </p>
              <p className={styles.originDesc}>
                The owner really poured his heart into this place, turning his long-time dream into 
                reality. The whole space is designed around racing elements — walls adorned with F1 
                memorabilia, displays showcasing the sport&apos;s rich history, and lighting that makes 
                every corner feel like a scene from the paddock.
              </p>
              <p className={styles.originDesc}>
                Located at Jalan Simpang Tiga in Kuching, right beside Titik Temu and near 
                Swinburne University, Hananee quickly became the go-to spot for students, 
                professionals, and coffee enthusiasts seeking something truly different.
              </p>
            </div>
            <div className={styles.originImage}>
              <Image 
                src="/hero-interior.png" 
                alt="Hananee F1 Interior" 
                fill 
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.originOverlayBadge}>
                <span className={styles.obIcon}>🏎️</span>
                <span className={styles.obText}>Est. 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <div className={styles.valuesSectionHeader}>
            <span className="f1-tag">What Drives Us</span>
            <h2 className="section-title">Our Pit Crew Values</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Like a winning F1 team, every detail matters. These are the values 
              that keep us on the podium.
            </p>
          </div>

          <div className={styles.valuesGrid}>
            {[
              {
                icon: "🏆",
                title: "Quality First",
                desc: "We source the finest ingredients and craft every drink with precision — like tuning a race car for peak performance.",
                f1Term: "POLE POSITION"
              },
              {
                icon: "🎨",
                title: "Aesthetic Excellence",
                desc: "Every corner is photogenic, every moment is Instagram-worthy. We believe beautiful spaces inspire beautiful conversations.",
                f1Term: "AERO DESIGN"
              },
              {
                icon: "🤝",
                title: "Genuine Hospitality",
                desc: "Our staff is like a pit crew — fast, friendly, and always ready. We treat every guest like they're our race day VIP.",
                f1Term: "TEAM SPIRIT"
              },
              {
                icon: "🌿",
                title: "Fresh & Local",
                desc: "Supporting local suppliers and keeping ingredients fresh. Real food, real flavors, no shortcuts on the circuit.",
                f1Term: "GREEN FLAG"
              },
              {
                icon: "💡",
                title: "Innovation",
                desc: "We're always experimenting with new drinks, new flavors, and new experiences — just like F1 pushes the boundaries of speed.",
                f1Term: "R&D LAB"
              },
              {
                icon: "☕",
                title: "Coffee Passion",
                desc: "Coffee isn't just a beverage — it's an experience. Every cup is a lap of pure delight, crafted with love.",
                f1Term: "TURBO BOOST"
              },
            ].map((value, i) => (
              <div key={i} className={styles.valueCard}>
                <span className={styles.valueF1}>{value.f1Term}</span>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDesc}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Experience */}
      <section className={`section ${styles.experienceSection}`}>
        <div className="container">
          <div className={styles.experienceGrid}>
            <div className={styles.experienceImages}>
              <div className={styles.expImgLarge}>
                <Image 
                  src="/cafe-exterior.png" 
                  alt="Hananee Cafe Exterior" 
                  fill 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={styles.expImgSmall}>
                <Image 
                  src="/food-spread.png" 
                  alt="Hananee Food" 
                  fill 
                  style={{ objectFit: 'cover' }}
                  sizes="250px"
                />
              </div>
            </div>
            <div className={styles.experienceText}>
              <span className={styles.chapterTag}>Chapter 02</span>
              <h2 className={`section-title ${styles.experienceTitle}`}>
                More Than Just a Café
              </h2>
              <div className={styles.experienceList}>
                {[
                  { icon: "🏎️", text: "F1-themed interior with racing memorabilia and checkered patterns" },
                  { icon: "📸", text: "Every corner is Instagram-worthy — your phone shoots content on its own" },
                  { icon: "🎲", text: "Board games available for group hangouts and chill sessions" },
                  { icon: "📚", text: "Cozy study spot for students — perfect for assignments and projects" },
                  { icon: "🅿️", text: "Free parking lot with plenty of spaces available" },
                  { icon: "🍽️", text: "Dine-in, takeaway, and delivery options available" },
                  { icon: "👪", text: "Family-friendly environment — good for kids and groups" },
                  { icon: "🕘", text: "Open 9 AM to 11 PM daily — late-night hangout welcome" },
                ].map((item, i) => (
                  <div key={i} className={styles.expItem}>
                    <span className={styles.expItemIcon}>{item.icon}</span>
                    <span className={styles.expItemText}>{item.text}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '16px' }}>
                📍 Visit Us Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className={styles.statsBanner}>
        <div className={`container ${styles.statsGrid}`}>
          {[
            { value: "4.5", label: "Google Rating", icon: "⭐" },
            { value: "31+", label: "Reviews", icon: "💬" },
            { value: "7", label: "Days Open", icon: "📅" },
            { value: "448+", label: "Facebook Likes", icon: "❤️" },
          ].map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statIcon}>{stat.icon}</span>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
