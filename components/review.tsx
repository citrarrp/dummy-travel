import React from "react";
import { MdStarRate } from "react-icons/md";
import { reviews } from "./data";

export const ReviewsList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ml-25 mr-25">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="p-4 border border-gray-200 rounded-lg shadow-sm bg-blue-300"
        >
          <p className="text-gray-800 text-sm mb-2">{review.comment}</p>
          <div className="my-2 flex">
            {Array.from({ length: review.rating }, (_, index) => (
              <MdStarRate key={index} size={16} className="text-rose-500" />
            ))}
          </div>
          <p className="font-semibold text-gray-700 text-xs">
            {review.name} - {review.location}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
