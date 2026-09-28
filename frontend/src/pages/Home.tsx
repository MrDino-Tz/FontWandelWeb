import { HeroSection } from '../components/sections/Hero';
import { FeatureShowcase, FeatureAnimated, FeatureGrid, CTA } from '../components/sections/Features';
import ContactSection from '../components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureShowcase />
      <FeatureAnimated />
      <FeatureGrid />
      <CTA />
      <ContactSection />
    </>
  );
}
