interface CarouselControlsProps {
  handlePrev: () => void;
  handleNext: () => void;
  totalSlides: number;
  activeSlide: number;
  displayedSlides: number;
}

export default function CarouselControls({
  handlePrev,
  handleNext,
  totalSlides,
  activeSlide,
  displayedSlides
}: CarouselControlsProps) {
  // Calculate which index to display in indicators
  const normalizedIndex = (activeSlide - displayedSlides) % displayedSlides;
  
  return (
    <>
      <div className="flex items-center">
        <button 
          onClick={handlePrev}
          className="p-3 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-surface-200)] hover:border-[var(--color-border-hover)] transition-all duration-300 mr-3"
          aria-label="Previous case study"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={handleNext}
          className="p-3 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-surface-200)] hover:border-[var(--color-border-hover)] transition-all duration-300"
          aria-label="Next case study"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Indicator Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: displayedSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => {}}
            className={`h-1 rounded-full transition-all duration-300 ${
              normalizedIndex === idx 
                ? 'bg-[var(--color-primary)] w-10' 
                : 'bg-[var(--color-border)] w-6 hover:bg-[var(--color-border-hover)]'
            }`}
            aria-label={`Go to case study ${idx + 1}`}
          />
        ))}
      </div>
    </>
  );
}
