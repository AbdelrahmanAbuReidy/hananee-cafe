import styles from './page.module.css';
import Image from 'next/image';

export const metadata = {
  title: 'Our Menu — Hananee Café | Coffee, Food & Drinks',
  description: 'Explore the full menu at Hananee Café. From artisan coffee and matcha to nasi lemak and pasta — fuel up at Kuching\'s trendiest F1-themed café.',
};

const menuSections = [
  {
    category: "Hot Coffee",
    icon: "☕",
    f1Label: "TURBO BREWS",
    items: [
      { name: "Espresso", price: "RM 7", desc: "Bold, rich single shot" },
      { name: "Double Espresso", price: "RM 9", desc: "Extra power for the overtake" },
      { name: "Americano", price: "RM 9", desc: "Smooth and classic" },
      { name: "Café Latte", price: "RM 12", desc: "Creamy steamed milk & espresso" },
      { name: "Cappuccino", price: "RM 12", desc: "Perfect foam, perfect balance" },
      { name: "Flat White", price: "RM 12", desc: "Velvety micro-foam on espresso" },
      { name: "Mocha", price: "RM 14", desc: "Chocolate meets coffee bliss" },
      { name: "Spanish Latte", price: "RM 14", desc: "Condensed milk & espresso magic" },
    ]
  },
  {
    category: "Iced Coffee",
    icon: "🧊",
    f1Label: "COOL DOWN LAP",
    items: [
      { name: "Iced Americano", price: "RM 10", desc: "Crisp and refreshing" },
      { name: "Iced Latte", price: "RM 13", desc: "Chilled creamy perfection" },
      { name: "Iced Cappuccino", price: "RM 13", desc: "Frothy cold delight" },
      { name: "Iced Mocha", price: "RM 15", desc: "Chocolate & coffee on ice" },
      { name: "Iced Spanish Latte", price: "RM 15", desc: "Sweet victory in a glass" },
      { name: "Iced Hazelnut Latte", price: "RM 15", desc: "Nutty, sweet, irresistible" },
      { name: "Iced Caramel Latte", price: "RM 15", desc: "Buttery caramel smooth finish" },
    ]
  },
  {
    category: "Matcha & Tea",
    icon: "🍵",
    f1Label: "GREEN FLAG DRINKS",
    items: [
      { name: "Matcha Latte (Hot/Iced)", price: "RM 14", desc: "Perfectly consistent every time" },
      { name: "Houjicha Latte", price: "RM 14", desc: "Warm, toasty Japanese green tea" },
      { name: "Chai Latte", price: "RM 12", desc: "Spiced and warming" },
      { name: "English Breakfast", price: "RM 8", desc: "Classic black tea" },
      { name: "Earl Grey", price: "RM 8", desc: "Bergamot infused elegance" },
      { name: "Jasmine Green Tea", price: "RM 8", desc: "Delicate floral notes" },
    ]
  },
  {
    category: "Non-Coffee",
    icon: "🥤",
    f1Label: "SAFETY CAR SIPS",
    items: [
      { name: "Hot Chocolate", price: "RM 12", desc: "Rich, comforting cocoa" },
      { name: "Iced Chocolate", price: "RM 13", desc: "Cool chocolate happiness" },
      { name: "Fresh Orange Juice", price: "RM 10", desc: "Freshly squeezed goodness" },
      { name: "Lemonade", price: "RM 9", desc: "Zesty and refreshing" },
      { name: "Milo (Hot/Iced)", price: "RM 8", desc: "Malaysian classic" },
    ]
  },
  {
    category: "Main Dishes",
    icon: "🍛",
    f1Label: "PIT STOP FUEL",
    items: [
      { name: "Nasi Lemak Curry Chicken", price: "RM 15", desc: "Best in town — customer favorite!" },
      { name: "Nasi Rendang", price: "RM 17", desc: "Tender rendang with fragrant rice" },
      { name: "Chicken Aglio Olio", price: "RM 16", desc: "Garlic & olive oil pasta" },
      { name: "Creamy Carbonara", price: "RM 18", desc: "Rich, indulgent cream sauce" },
      { name: "Chicken Bolognese", price: "RM 16", desc: "Hearty tomato meat sauce" },
      { name: "Handmade Chicken Wantan", price: "RM 12", desc: "Juicy, freshly made" },
      { name: "Chicken Chop", price: "RM 18", desc: "Juicy grilled with sides" },
    ]
  },
  {
    category: "Cakes & Desserts",
    icon: "🍰",
    f1Label: "PODIUM SWEETS",
    items: [
      { name: "Burnt Cheesecake", price: "RM 14", desc: "Caramelized perfection" },
      { name: "Chocolate Lava Cake", price: "RM 15", desc: "Molten center, pure indulgence" },
      { name: "Matcha Cake", price: "RM 13", desc: "Green tea elegance" },
      { name: "Red Velvet Slice", price: "RM 13", desc: "Classic cream cheese frosting" },
      { name: "Assorted Pastries", price: "RM 10", desc: "Daily fresh selection" },
    ]
  }
];

export default function MenuPage() {
  return (
    <div className={styles.menuPage}>
      {/* Menu Hero */}
      <section className={styles.menuHero}>
        <div className={styles.menuHeroOverlay} />
        <div className={styles.menuHeroImage}>
          <Image 
            src="/drinks-specialty.png" 
            alt="Hananee Specialty Drinks" 
            fill 
            priority 
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
        </div>
        <div className={`container ${styles.menuHeroContent}`}>
          <span className="f1-tag">Full Menu</span>
          <h1 className={styles.menuHeroTitle}>Our Menu</h1>
          <p className={styles.menuHeroDesc}>
            From pole position espressos to victory lap desserts — 
            every item engineered for taste perfection.
          </p>
          <div className={styles.menuQuickNav}>
            {menuSections.map((section, i) => (
              <a key={i} href={`#${section.category.toLowerCase().replace(/\s+/g, '-')}`} className={styles.quickNavItem}>
                <span>{section.icon}</span>
                <span>{section.category}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Sections */}
      <div className={`container ${styles.menuContent}`}>
        {menuSections.map((section, i) => (
          <section
            key={i}
            id={section.category.toLowerCase().replace(/\s+/g, '-')}
            className={styles.menuSection}
          >
            <div className={styles.menuSectionHeader}>
              <div className={styles.menuSectionIcon}>{section.icon}</div>
              <div>
                <span className={styles.f1Label}>{section.f1Label}</span>
                <h2 className={styles.menuSectionTitle}>{section.category}</h2>
              </div>
              <div className={styles.menuSectionLine} />
            </div>

            <div className={styles.menuGrid}>
              {section.items.map((item, j) => (
                <div key={j} className={styles.menuItem}>
                  <div className={styles.menuItemTop}>
                    <h3 className={styles.menuItemName}>{item.name}</h3>
                    <div className={styles.menuItemDots} />
                    <span className={styles.menuItemPrice}>{item.price}</span>
                  </div>
                  <p className={styles.menuItemDesc}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Note */}
        <div className={styles.menuNote}>
          <div className={styles.menuNoteIcon}>ℹ️</div>
          <div>
            <strong>Please note:</strong> Prices shown are approximate. Menu items and pricing may vary. 
            All food is prepared fresh. Please inform our staff of any dietary requirements or allergies. 
            Dine-in, takeaway, and delivery available.
          </div>
        </div>
      </div>
    </div>
  );
}
