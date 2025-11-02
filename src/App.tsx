import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { PageLoader } from './components/common/Skeleton';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const FormulaGenerator = lazy(() => import('./pages/FormulaGenerator').then(module => ({ default: module.FormulaGenerator })));
const AllSouls = lazy(() => import('./pages/AllSouls').then(module => ({ default: module.AllSouls })));
const HowItWorks = lazy(() => import('./pages/HowItWorks').then(module => ({ default: module.HowItWorks })));
const Ingredients = lazy(() => import('./pages/Ingredients').then(module => ({ default: module.Ingredients })));
const IngredientDetail = lazy(() => import('./pages/IngredientDetail').then(module => ({ default: module.IngredientDetail })));
const Pricing = lazy(() => import('./pages/Pricing').then(module => ({ default: module.Pricing })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Privacy = lazy(() => import('./pages/Privacy').then(module => ({ default: module.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then(module => ({ default: module.Terms })));
const Developer = lazy(() => import('./pages/Developer').then(module => ({ default: module.Developer })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

function App() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <Layout>
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageLoader message="Loading experience..." />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/formula" element={<FormulaGenerator />} />
              <Route path="/souls" element={<AllSouls />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/ingredients" element={<Ingredients />} />
              <Route path="/ingredients/:ingredientId" element={<IngredientDetail />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/developer" element={<Developer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
