import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import Deliverables from "@/components/Deliverables";
import SocialProof from "@/components/SocialProof";
import ForDogs from "@/components/ForDogs";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Deliverables />
      <SocialProof />
      <ForDogs />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
