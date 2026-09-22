import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import BaseLayout from './layout/BaseLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Platform from './pages/Platform';
import {
  ArticlesIndex,
  ArticleDetail,
  ReferenceIndex,
  ReferenceDetail,
  KnowledgeBase,
  Whitepapers,
  NotFound,
} from './pages/support/Support';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PrelineInit() {
  const { pathname } = useLocation();
  useEffect(() => {
    import('preline').then(({ HSStaticMethods }) => {
      try {
        HSStaticMethods.autoInit();
      } catch {
        /* ignore */
      }
    });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter basename="/FontWandelWeb">
      <ScrollToTop />
      <PrelineInit />
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="platform" element={<Platform />} />

          {/* Retired Downloads section — send old URLs to contact */}
          <Route path="downloads/*" element={<Navigate to="/contact" replace />} />

          <Route path="support/articles" element={<ArticlesIndex />} />
          <Route path="support/articles/:id" element={<ArticleDetail />} />
          <Route path="support/reference" element={<ReferenceIndex />} />
          <Route path="support/reference/:id" element={<ReferenceDetail />} />
          <Route path="support/knowledge-base" element={<KnowledgeBase />} />
          <Route path="support/whitepapers" element={<Whitepapers />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
