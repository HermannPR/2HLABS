import { Hero } from '../components/home/Hero';
import { WaitlistSection } from '../components/home/WaitlistSection';
import { Features } from '../components/home/Features';
import { HowItWorksPreview } from '../components/home/HowItWorksPreview';
import { Testimonials } from '../components/home/Testimonials';
import { FAQ } from '../components/home/FAQ';
import { FinalCTA } from '../components/home/FinalCTA';

export const Home = () => {
  return (
    <>
      <Hero />
      <WaitlistSection />
      <Features />
      <HowItWorksPreview />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
};
