import Hero from "@/features/_global/components/Home";
import Features from "@/features/_global/components/Feautres";
import HowItWorks from "@/features/_global/components/HowItWorks";
import PricingPlans from "@/features/_global/components/PricingPlans";
import UserComments from "@/features/_global/components/UserComments";
import FAQ from "@/features/_global/components/FAQ";
import FinalCTA from "@/features/_global/components/FinalCTA";
import Footer from "@/features/_global/components/Footer";

const Home = () => {
  return (
    <div>
        <Hero />
        <Features />
        <HowItWorks />
        <PricingPlans />
        <UserComments />
        <FAQ />
        <FinalCTA />
        <Footer />
    </div>
  )
}

export default Home;
