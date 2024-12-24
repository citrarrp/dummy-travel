// import { getDestinations } from "@/actions/getDestinations";
// import HotelList from "@/components/hotel/HotelList";

// interface props {
//   searchParams: {
//     title: string;
//     country: string;
//     state: string;
//     city: string;
//   };
// }

// const HomePage = async ({ searchParams }: props) => {
//   const destinasi = await getDestinations(searchParams);

//   if (!destinasi) {
//     return <div>No hotel found...</div>;
//   }
//   return <DestinasiList hotels={destinasi} />;
// };

// export default HomePage;

import RecommendedDestinasi from "@/components/destinations/destinations";
import { Hero } from "@/components/hero/hero";
import ReviewsList from "@/components/review";
import { Start } from "@/components/explore";

export default function Home() {
  return (
    <>
      {/* <SearchTrip />
      <QuickSearch /> */}
      <Hero />
      <RecommendedDestinasi />
      <ReviewsList />
      <Start />
    </>
  );
}
