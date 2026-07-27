import React from 'react';

export default function ScoreBar({ score, className = "" }) {
  // Ensure score is between 0 and 100
  const normalizedScore = Math.min(Math.max(Number(score) || 0, 0), 100);

  // Determine the gradient background based on the score
  // We use CSS variables to create a dynamic gradient that matches the score
  const getGradientStyle = (currentScore) => {
    // This creates a solid color transition based on percentage
    // For a smoother gradient that changes based on the score, we could interpolate colors
    // But for a simple progress bar, a fixed gradient that reveals itself is often better

    // Alternative approach: Dynamic color based on score
    let colorClass = 'from-red-500 to-red-400'; // Default low score

    if (currentScore >= 75) {
      colorClass = 'from-green-500 to-green-400';
    } else if (currentScore >= 40) {
      colorClass = 'from-yellow-500 to-yellow-400';
    }

    // However, the prompt asks for a gradient transitioning from red to yellow to green.
    // The easiest way to achieve this smoothly across the whole bar is to have a full gradient background
    // and clip it, or just use a fixed gradient and let the width reveal it.

    // For this implementation, we'll use a dynamic background color that smoothly transitions
    // using HSL values based on the score (0 = Red, 50 = Yellow, 100 = Green).
    // Hue ranges approximately from 0 (Red) to 120 (Green).

    const hue = (currentScore / 100) * 120;

    return {
      width: `${currentScore}%`,
      backgroundColor: `hsl(${hue}, 80%, 50%)`,
      // Adding a subtle gradient effect over the solid HSL color
      backgroundImage: `linear-gradient(90deg, hsl(${Math.max(0, hue - 15)}, 80%, 50%), hsl(${hue}, 80%, 50%))`
    };
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className="w-32 max-[600px]:w-[15vw] h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner shrink-0"
        role="progressbar"
        aria-valuenow={normalizedScore}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        { }
        {/* 
          The inner fill bar.
          Transitions are added for smooth width changes if the score updates.
        */}
        <div
          className="h-full rounded-full transition-all duration-500 ease-out shadow-[inset_0_-1px_1px_rgba(0,0,0,0.1)]"
          style={getGradientStyle(normalizedScore)}
        />
      </div>

      { }
      {/* Text representation of the score */}
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 font-sans whitespace-nowrap">
        {Math.round(normalizedScore)}
      </span>
    </div>
  );
}