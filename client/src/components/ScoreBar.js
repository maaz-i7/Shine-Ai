import React from 'react';

export default function ScoreBar({ score = 0, className = "" }) {
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
      {/* 
        The outer track of the progress bar.
        w-32 gives it a fixed width, h-3 gives it height.
        bg-gray-200 provides the empty track color.
        overflow-hidden ensures the inner bar doesn't spill out rounded corners.
      */}
      <div 
        className="w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner shrink-0"
        role="progressbar"
        aria-valuenow={normalizedScore}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {}
        {/* 
          The inner fill bar.
          Transitions are added for smooth width changes if the score updates.
        */}
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out shadow-[inset_0_-1px_1px_rgba(0,0,0,0.1)]"
          style={getGradientStyle(normalizedScore)}
        />
      </div>
      
      {}
      {/* Text representation of the score */}
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 font-sans whitespace-nowrap">
        {Math.round(normalizedScore)}
      </span>
    </div>
  );
}

// The following is just an example component to demonstrate the ScoreBar in action.
// You can ignore or remove this if you only need the ScoreBar component above.
export function ScoreBarPreview() {
  const [demoScore, setDemoScore] = React.useState(50);

  return (
    <div className="p-8 flex flex-col gap-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg m-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Score Bar Examples</h2>
      
      {/* Static examples */}
      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Low Score (15)</p>
          <ScoreBar score={15} />
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Medium Score (50)</p>
          <ScoreBar score={50} />
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">High Score (85)</p>
          <ScoreBar score={85} />
        </div>
      </div>

      {/* Interactive example */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 mb-2">Interactive Preview</p>
        <ScoreBar score={demoScore} className="scale-110 origin-left mb-4" />
        
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={demoScore}
          onChange={(e) => setDemoScore(parseInt(e.target.value))}
          className="w-full mt-4 cursor-pointer accent-blue-500"
        />
      </div>
    </div>
  );
}