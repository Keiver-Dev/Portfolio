import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
const Intro = lazy(() => import("@/pages/Intro"));
const CaseStudy = lazy(() => import("@/pages/CaseStudy"));
const About = lazy(() => import("@/pages/About"));
const Works = lazy(() => import("@/pages/Works"));
import CustomCursor from "@/components/ui/CustomCursor";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      <div className="flex flex-col min-h-screen bg-background text-text-primary selection:bg-accent/30 selection:text-primary">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/works" element={<Works />} />
            <Route path="/about" element={<About />} />
            <Route path="/case/:id" element={<CaseStudy />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Intro />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
