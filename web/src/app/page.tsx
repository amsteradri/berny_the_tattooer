import { HeroSection } from "@/components/sections/hero";
import { CoursesGrid } from "@/components/sections/courses-grid";
import { AboutBerny } from "@/components/sections/about-berny";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 w-full">
      <HeroSection />
      <CoursesGrid />
      <AboutBerny />
    </div>
  );
}
