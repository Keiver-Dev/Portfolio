import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import FeaturedWork from "@/components/sections/FeaturedWork";
import WorkGrid from "@/components/sections/WorkGrid";
import Stack from "@/components/sections/Stack";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

const Intro = () => {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 md:pt-32">
      <Header />
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">
        <Hero />
      </div>
      <div id="work">
        <FeaturedWork />
        <WorkGrid />
      </div>
      <div id="stack">
        <Stack />
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default Intro;
