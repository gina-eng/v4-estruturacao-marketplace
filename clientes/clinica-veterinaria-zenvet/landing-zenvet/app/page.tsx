import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsTransition from "@/components/StatsTransition";
import Problem from "@/components/Problem";
import DraNathalia from "@/components/DraNathalia";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import Deliverables from "@/components/Deliverables";
import SocialProof from "@/components/SocialProof";
import ForDogs from "@/components/ForDogs";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsTransition />
        <Problem />
        <DraNathalia />
        <Solution />
        <HowItWorks />
        <Deliverables />
        <SocialProof />
        <ForDogs />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
