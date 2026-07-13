"use client";

import React from 'react';

/**
 * Individual Star Component
 * Handles the partial filling visually using an overlaid clipped SVG.
 */
const Star = ({ fillPercentage }) => {
  return (
    <div className="relative inline-block w-6 h-6 text-gray-200 dark:text-gray-700 drop-shadow-sm">
      {/* Background (Empty/Dark) Star */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-6 h-6 absolute top-0 left-0"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>

      {/* Foreground (Filled/Light) Star */}
      <div 
        className="absolute top-0 left-0 h-full overflow-hidden text-yellow-400" 
        style={{ width: `${fillPercentage}%` }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-6 h-6"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </div>
    </div>
  );
};

/**
 * Main Star Rating Component
 * Calculates the math for how much each of the 5 stars should be filled.
 */
export default function StarRating({ score = 3.5 }) {
  // Ensure the score is bounded between 0 and 5
  const clampedScore = Math.max(0, Math.min(5, score));

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, index) => {
        // Calculate how much this specific star should be filled (0 to 100)
        let fillPercentage = 0;
        
        if (clampedScore >= index + 1) {
          // If the score is higher than this star's position, fill it completely
          fillPercentage = 100;
        } else if (clampedScore > index && clampedScore < index + 1) {
          // If the score falls inside this star (e.g. score is 3.5, index is 3)
          // Calculate the decimal remainder and turn it into a percentage
          fillPercentage = (clampedScore - index) * 100;
        }

        return <Star key={index} fillPercentage={fillPercentage} />;
      })}
    </div>
  );
}