import React, { useState, useEffect } from 'react';

const loadingSteps = [
  'Preparing your workspace...',
  'Organising project intelligence...',
  'Connecting your construction workspace...',
  'Getting everything ready...'
];

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Step progression timer
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 450);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 18;
      });
    }, 250);

    // Fade out and complete after ~1.6s
    const completeTimeout = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 350);
    }, 1600);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F7F4] select-none transition-opacity duration-300 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Brand & Architectural Monogram */}
      <div className="flex flex-col items-center text-center max-w-sm px-6 animate-fade-in">
        {/* Architectural Brand Mark */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#536F67] flex items-center justify-center shadow-card relative overflow-hidden">
            {/* SVG Architectural lines & correspondence flow */}
            <svg 
              className="w-10 h-10 text-white" 
              viewBox="0 0 40 40" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Architectural Grid / Column */}
              <rect x="8" y="10" width="24" height="20" rx="3" stroke="white" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />
              {/* Construction Beams & Correspondence Flow */}
              <path d="M12 26V14H22C24.2 14 26 15.8 26 18C26 20.2 24.2 22 22 22H12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 22H24C26.2 22 28 23.8 28 26C28 28.2 26.2 30 24 30H12V26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Connection Node */}
              <circle cx="28" cy="14" r="2.5" fill="#C5D3CC" />
            </svg>
          </div>
          {/* Subtle pulse aura */}
          <div className="absolute -inset-1 rounded-2xl bg-[#536F67]/20 blur-sm -z-10 animate-pulse-subtle" />
        </div>

        {/* Identity */}
        <h1 className="text-xl font-bold tracking-tight text-[#252B29] font-heading">
          BUILDFLOW <span className="text-[#536F67]">AI</span>
        </h1>
        <p className="text-[11px] font-semibold tracking-widest uppercase text-[#747B76] mt-1 mb-8">
          Construction Intelligence Platform
        </p>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-[#E7E9E4] rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-[#536F67] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Rotating Step Text */}
        <p className="text-xs font-medium text-[#747B76] h-5 transition-opacity duration-200">
          {loadingSteps[currentStepIndex]}
        </p>
      </div>
    </div>
  );
};
