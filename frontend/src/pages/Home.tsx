import { HeroSection } from '../components/sections/Hero';
import { FeatureShowcase, FeatureAnimated, FeatureGrid, CTA } from '../components/sections/Features';
import ContactSection from '../components/sections/ContactSection';
import { useContent, type HomeSectionId } from '../admin/store';
import type { JSX } from 'react';

const sections: Record<HomeSectionId, () => JSX.Element> = {
  hero: HeroSection,
  showcase: FeatureShowcase,
  animated: FeatureAnimated,
  grid: FeatureGrid,
  cta: CTA,
  contact: ContactSection,
};

export default function Home() {
  const { content } = useContent();
  return (
    <>
      {content.homeLayout
        .filter((item) => item.visible)
        .map((item) => {
          const Section = sections[item.id];
          return <Section key={item.id} />;
        })}
    </>
  );
}
