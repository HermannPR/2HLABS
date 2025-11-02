import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import './i18n/config'; // Initialize i18n
import { DeveloperProvider } from './context/DeveloperContext';

// Disable default browser scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeveloperProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DeveloperProvider>
  </StrictMode>,
);
