// 'use client'

// import React, { useState } from 'react'
// import SectionHeaderText from '../SectionHeaderText/SectionHeaderText'
// // import { useTourCategoryQuery } from '@/lib/services/tourService'
// import TravelCard from '../TravelCard/Travelcard'
// import TravelCardSkeleton from '../TravelCard/TravelCard-Skeleton'

// interface Tour {
//     _id: string
//     image: string
//     name: string
//     price: string
//     rating: string
//     description: string
//     duration: string
//     guests: string
// }

// export default function FindYourPerfectTour() {
//     // const [category, setCategory] = useState<string>("All")
//     // const { isLoading, isFetching, data } = useTourCategoryQuery(category)

//     // const categories = ["All", "luxury", "budget friendly", "recommended"]

//     return (
//         <div className='my-5'>
//             <div className="d-flex justify-center items-center my-3">
//             <div className="text-center text-3xl">Our Popular Destinations</div>
//             <div className="text-center text-gray-400">Cari tujuan destinasimuu!</div>
//             </div>
//             <div className='my-5'>
//                 <ul className='flex justify-center gap-3'>
//                     {categories.map((cat) => (
//                         <li
//                             key={cat}
//                             onClick={() => setCategory(cat)}
//                             className={`cursor-pointer ${category === cat ? 'text-rose-500 font-semibold' : 'hover:text-rose-500 hover:font-semibold'}`}
//                         >
//                             {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div className='grid place-items-center grid-cols-1 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4'>
//                 {isLoading || isFetching ? (
//                     Array.from({ length: 6 }).map((_, index) => (
//                         <div key={index} className="p-2 pl-6 sm:pl-0 md:p-4">
//                             <TravelCardSkeleton />
//                         </div>
//                     ))
//                 ) : (
//                     data && data.data.map((tour: Tour) => (
//                         <div key={tour._id} className="p-2 pl-6 sm:pl-0 md:p-4">
//                             <TravelCard
//                                 id={tour._id}
//                                 cardImage={tour.image}
//                                 title={tour.name}
//                                 price={tour.price}
//                                 ratingText={tour.rating}
//                                 description={tour.description}
//                                 duration={tour.duration}
//                                 guests={tour.guests}
//                             />
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     )
// }

import TripItem from "@/components/item";
import prisma from "@/lib/db";
import { Destinasi } from "@prisma/client";

const getDestinasi = async () => {
  const destinasi = await prisma.destinasi.findMany();
  return destinasi;
};

const RecommendedDestinasi = async () => {
  const data = await getDestinasi();

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-5">
      <div className="flex items-center justify-center w-full h-6 gap-2">
        <div className="h-[1px] w-full bg-grayLight"></div>
        <div className="flex items-center justify-center font-medium h-6 w-auto">
          <h2 className="whitespace-nowrap lg:mb-5 md:mb-4 text-secondaryGray bold mt-55">
            Our Popular Destinations
          </h2>
        </div>
        <div className="h-[1px] w-full bg-grayLight"></div>
      </div>
      <div className="mx-auto flex justify-center w-full">
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center lg:flex-row lg:flex-wrap gap-5 lg:gap-8 lg:justify-center items-center w-full">
          {data.map((trip: Destinasi) => (
            <TripItem key={trip.id_destinasi} trip={trip} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedDestinasi;
