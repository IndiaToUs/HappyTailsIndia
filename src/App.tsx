import { useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import TrustBadges from './sections/TrustBadges';
import Manifesto from './sections/Manifesto';
import Anatomy from './sections/Anatomy';
import Tiers from './sections/Tiers';
import Products from './sections/Products';
import PromoBanner from './sections/PromoBanner';
import Testimonials from './sections/Testimonials';
import Newsletter from './sections/Newsletter';
import Footer from './sections/Footer';
import ParchmentUnroll from './effects/ParchmentUnroll';
import { siteConfig } from './config';

function App() {
  useLenis();

  useEffect(() => {
    document.title = siteConfig.siteTitle || '';
    document.documentElement.lang = siteConfig.language || '';

    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = siteConfig.siteDescription || '';
  }, []);

  return (
    <>
      <Navigation />
      <ParchmentUnroll />
      <main>
        <Hero />
        <TrustBadges />
        <Manifesto />
        <Anatomy />
        <Tiers />
        <Products />
        <PromoBanner />
        <Testimonials />
        <Newsletter />
        <Footer />
      </main>
    </>
  );
}

export default App;
