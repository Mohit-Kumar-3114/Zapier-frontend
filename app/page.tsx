import { Appbar } from "@/components/Appbar";
import { Hero } from "@/components/Hero";
import { HeroVideo}  from "@/components/HeroVideo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="">
        <Appbar />
        <Hero />
        <div className="pt-8">
          <HeroVideo />
          <Footer />
        </div>
    </main>
  );
}