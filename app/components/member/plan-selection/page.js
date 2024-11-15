"use client";

import { planData } from "@/app/data/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const PlanCard = () => {
  const router = useRouter();

  // Handle redirection when a plan card is clicked
  const handleCardClick = (link) => {
    router.push(link);
  };

  return (
    <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4">
      {planData.map((plan) => (
        <div
          key={plan.id}
          className="flex flex-col max-w-sm rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-shadow"
          onClick={() => handleCardClick(plan.link)}
        >
          {/* Image with object-contain to preserve aspect ratio and fit image */}
          <div className="relative w-full h-32">
            <Image
              className="object-contain w-full h-full"
              src={plan.image}
              alt={plan.title}
              layout="fill" // Ensures the image takes up the full area of its parent container
              objectFit="contain"
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {plan.title}
            </h3>
            <p className="text-gray-600 mt-2">{plan.description}</p>
          </div>

          {/* Button at the bottom */}
          <div className="p-4 bg-gray-100">
            <button
              className="w-full py-2 px-4 text-white main-color rounded transition-colors"
              onClick={() => handleCardClick(plan.link)}
            >
              Select Plan
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanCard;
