import CTA from "./_components/cta";
import Features from "./_components/features";
import MarketingHero from "./_components/hero";
import Team from "./_components/team";
import Review from "./_components/reviews";
import FAQSection from "./_components/faq";

export default function Home() {
	return (
		<div className='min-h-screen relative'>
			<MarketingHero />
			<Features />
			<Team />
			<Review />
			<FAQSection />
			<CTA />
		</div>
	);
}
