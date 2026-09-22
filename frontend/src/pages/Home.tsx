import { HeroSection } from '../components/sections/Hero';
import { FeatureShowcase, FeatureAnimated, FeatureGrid, CTA } from '../components/sections/Features';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureShowcase />
      <FeatureAnimated />
      <FeatureGrid />
      <CTA />
    </>
  );
}
