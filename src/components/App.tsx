import { LanguageProvider } from '../i18n/LanguageContext';
import Navigation from './Navigation';
import Hero from './Hero';
import BrandManifest from './BrandManifest';
import Exordium from './Exordium';
import FragranceNotes from './FragranceNotes';
import Collections from './Collections';
import Gallery from './Gallery';
import Craftsmanship from './Craftsmanship';
import Testimonials from './Testimonials';
import Access from './Access';
import RequestForm from './RequestForm';
import Footer from './Footer';

export default function App() {
  return (
    <LanguageProvider>
      <Navigation />
      <main>
        <Hero />
        <BrandManifest />
        <Exordium />
        <FragranceNotes />
        <Collections />
        <Gallery />
        <Craftsmanship />
        <Testimonials />
        <Access />
        <RequestForm />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
