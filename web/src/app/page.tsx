import { HeroSection } from "@/components/sections/hero";
import { CoursesGrid } from "@/components/sections/courses-grid";
import { AboutBerny } from "@/components/sections/about-berny";
import { Newsletter } from "@/components/sections/newsletter";
import ScrollVelocity from "@/components/react-bits/ScrollVelocity"; // Import default export
import ParallaxGallery from "@/components/react-bits/ParallaxGallery"; // Import default export

export default function Home() {
  return (
    <div className="flex flex-col gap-0 w-full overflow-x-hidden">
      <HeroSection />
      {/* Scroll Velocity Component handles its own layout */}
      <ScrollVelocity />
      <CoursesGrid />
      <AboutBerny />
      <ParallaxGallery />
      <Newsletter />
    </div>
  );
}
