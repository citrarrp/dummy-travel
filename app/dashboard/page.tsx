import RecommendedDestinasi from "@/components/destinations/destinations";
import { Hero } from "@/components/hero/hero";
import ReviewsList from "@/components/review";
// import SearchTrip from "@/components/search";

export default function Home() {
  return (
    <>
      {/* <SearchTrip />
      <QuickSearch /> */}
      <Hero />
      <RecommendedDestinasi />
      <div className="flex items-center justify-center font-medium h-6 w-auto">
        <h2 className="whitespace-nowrap lg:mb-5 md:mb-4 text-secondaryGray bold">
          Real Experience From Travelers
        </h2>
      </div>
      <ReviewsList />
    </>
  );
}
