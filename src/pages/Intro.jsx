import Header from "@/components/Intro/Header";
import Hero from "@/components/Intro/Hero";
import FeaturedWork from "@/components/Work/FeaturedWork";
import WorkGrid from "@/components/Work/WorkGrid";
import Stack from "@/components/About/Stack";
import Footer from "@/components/Intro/Footer";

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
      <Footer />
    </div>
  );
};

export default Intro;
