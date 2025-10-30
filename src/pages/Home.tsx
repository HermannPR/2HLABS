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
        description="Create your personalized pre-workout formula matched to today's training. Science-backed ingredients, clinical dosages, 12 distinct profiles for every training style and goal."
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
