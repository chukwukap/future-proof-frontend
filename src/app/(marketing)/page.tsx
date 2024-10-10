import CTA from "./_components/cta";
import Features from "./_components/features";
import Footer from "./_components/footer";
import MarketingHero from "./_components/hero";
import Testimonials from "./_components/testimonials";

export default function Home() {
  return (
    <div className="min-h-screen">
      <MarketingHero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
