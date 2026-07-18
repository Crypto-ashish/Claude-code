import Hero from "@/components/Hero";
import {
  CategoriesSection,
  FeaturedSection,
  InstagramSection,
  MarqueeSection,
  NewsletterSection,
  RecentlyViewedSection,
  ReviewsSection,
  StatsSection,
  UspSection,
} from "@/components/HomeSections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <CategoriesSection />
      <FeaturedSection />
      <MarqueeSection />
      <UspSection />
      <ReviewsSection />
      <RecentlyViewedSection />
      <InstagramSection />
      <NewsletterSection />
    </>
  );
}
