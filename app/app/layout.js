import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: 'Hananee Café — F1-Inspired Coffee Experience | Kuching, Sarawak',
  description: 'Hananee Café is the trendiest F1-themed coffee shop in Kuching, Sarawak. Enjoy handcrafted coffee, exotic drinks, delicious food & racing vibes. Open daily 9AM-11PM.',
  keywords: 'Hananee Cafe, Kuching cafe, F1 themed cafe, coffee shop Sarawak, Kuching coffee, Formula 1 cafe',
  openGraph: {
    title: 'Hananee Café — F1-Inspired Coffee Experience',
    description: 'Coffee + vibes + aesthetics. The trendiest spot in Kuching.',
    type: 'website',
    locale: 'en_MY',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
