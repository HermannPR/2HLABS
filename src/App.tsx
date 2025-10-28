import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { FormulaGenerator } from './pages/FormulaGenerator';
import { AllSouls } from './pages/AllSouls';
import { HowItWorks } from './pages/HowItWorks';
import { Ingredients } from './pages/Ingredients';
import { Pricing } from './pages/Pricing';
import { About } from './pages/About';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formula" element={<FormulaGenerator />} />
        <Route path="/souls" element={<AllSouls />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  );
}

export default App;
