import { Hero } from '../components/home/Hero';
import { WaitlistSection } from '../components/home/WaitlistSection';
import { Features } from '../components/home/Features';
import { TrustBadges } from '../components/home/TrustBadges';
import { HowItWorksPreview } from '../components/home/HowItWorksPreview';
import { Testimonials } from '../components/home/Testimonials';
import { FAQ } from '../components/home/FAQ';
import { FinalCTA } from '../components/home/FinalCTA';
import { SEO, StructuredData } from '../components/seo/SEO';
import { getOrganizationSchema, getWebsiteSchema } from '../utils/structuredData';

export const Home = () => {
  return (
    <>
      <SEO
        title="Personalized Pre-Workout Supplements"
        description="Discover your unique training soul and get a personalized pre-workout formula. Science-backed ingredients, clinical dosages, 12 distinct archetypes matched to your training style."
        keywords="pre-workout, personalized supplements, training archetype, fitness supplements, science-backed nutrition, clinical dosages"
        ogType="website"
      />
      <StructuredData data={getOrganizationSchema()} />
      <StructuredData data={getWebsiteSchema()} />

      <Hero />
      <WaitlistSection />
      <Features />
      <TrustBadges />
      <HowItWorksPreview />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
};
