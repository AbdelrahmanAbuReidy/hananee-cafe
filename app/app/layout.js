import './globals.css';
import { Outfit, Playfair_Display, Racing_Sans_One } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const racing = Racing_Sans_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-racing',
  display: 'swap',
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://hananeecafe.com');

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Hananee Café — F1-Inspired Coffee Experience | Kuching, Sarawak',
    template: '%s | Hananee Café',
  },
  description:
    'Hananee Café is the trendiest F1-themed coffee shop in Kuching, Sarawak. Handcrafted coffee, exotic drinks, delicious food, racing vibes — open daily 9 AM to 11 PM.',
  keywords: [
    'Hananee Cafe',
    'Hananee Café',
    'Kuching cafe',
    'F1 themed cafe',
    'coffee shop Sarawak',
    'Kuching coffee',
    'Formula 1 cafe',
    'Jalan Simpang Tiga cafe',
    'Swinburne cafe',
  ],
  authors: [{ name: 'Hananee Café' }],
  creator: 'Hananee Café',
  openGraph: {
    type: 'website',
    locale: 'en_MY',
    url: 'https://hananeecafe.com',
    siteName: 'Hananee Café',
    title: 'Hananee Café — F1-Inspired Coffee Experience',
    description: 'Coffee + vibes + aesthetics. The trendiest F1-themed café in Kuching, Sarawak.',
    images: [
      {
        url: '/cafe-ambiance.png',
        width: 1200,
        height: 630,
        alt: 'Hananee Café — F1-themed coffee shop in Kuching',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hananee Café — F1-Inspired Coffee Experience',
    description: 'Coffee + vibes + aesthetics. The trendiest spot in Kuching.',
    images: ['/cafe-ambiance.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

export const viewport = {
  themeColor: '#4a7a3f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} ${racing.variable}`}>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <ScrollToTop />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
