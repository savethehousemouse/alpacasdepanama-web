import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExhibitionPiece } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ShowcaseProps {
  currentPiece: ExhibitionPiece;
  onPrev: () => void;
  onNext: () => void;
  onSelectPiece: (piece: ExhibitionPiece) => void;
}

export const Showcase: React.FC<ShowcaseProps> = ({
  currentPiece,
  onPrev,
  onNext,
  onSelectPiece,
}) => {
  return (
    <section className="w-full lg:w-1/2 flex flex-col min-h-[440px] lg:min-h-0">
      {/* Central Visual Stage */}
      <div className="flex-grow relative overflow-hidden flex items-center justify-center p-6 md:p-12 min-h-[320px]">
        <div className="w-full h-full border border-muted relative flex items-center justify-center p-4 md:p-8">
          
          {/* Subtle Series Navigation Arrows */}
          <button
            onClick={onPrev}
            aria-label="Previous piece"
            className="absolute left-2 md:left-4 z-20 p-2 text-stone-600 hover:text-white hover:bg-white/5 transition-colors rounded-sm cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={onNext}
            aria-label="Next piece"
            className="absolute right-2 md:right-4 z-20 p-2 text-stone-600 hover:text-white hover:bg-white/5 transition-colors rounded-sm cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>

          {/* Foreground Monolithic Block */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPiece.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectPiece(currentPiece)}
              className="w-4/5 h-4/5 min-h-[220px] bg-[#141417] flex items-center justify-center border border-muted shadow-2xl relative cursor-pointer group transition-transform hover:scale-[1.01]"
            >
              {/* Subtle ambient gradient overlay inside the card */}
              <div className="absolute inset-0 bg-radial from-stone-800/10 to-transparent pointer-events-none" />

              <div className="text-center p-6 md:p-8 z-10">
                <span className="serif text-2xl md:text-3xl lg:text-4xl italic text-stone-400 group-hover:text-stone-200 transition-colors mb-4 block">
                  {currentPiece.title}
                </span>
                <div className="h-[1px] w-12 bg-accent mx-auto mb-6 transition-all duration-300 group-hover:w-20" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 group-hover:text-stone-400 transition-colors">
                  {currentPiece.series}
                </p>
                <span className="inline-block mt-3 text-[9px] uppercase tracking-[0.2em] text-accent/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Monograph →
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Large Editorial Number Watermark */}
          <div className="absolute top-0 right-0 p-4 pointer-events-none select-none">
            <span className="text-[36px] md:text-[44px] serif italic text-stone-800 opacity-60">
              {currentPiece.number}
            </span>
          </div>
        </div>
      </div>

      {/* Tonal Attributes & Specifications Strip */}
      <div className="border-t border-muted grid grid-cols-3 min-h-[110px] md:min-h-[130px] lg:h-48">
        <div className="border-r border-muted p-4 md:p-8 flex flex-col justify-between">
          <span className="text-[9px] uppercase tracking-widest text-stone-600 font-medium">
            Materiality
          </span>
          <span className="serif text-base md:text-lg text-white font-light tracking-wide mt-2">
            {currentPiece.materiality}
          </span>
        </div>

        <div className="border-r border-muted p-4 md:p-8 flex flex-col justify-between">
          <span className="text-[9px] uppercase tracking-widest text-stone-600 font-medium">
            Tonalities
          </span>
          <span className="serif text-base md:text-lg text-white font-light tracking-wide mt-2">
            {currentPiece.tonalities}
          </span>
        </div>

        <div className="p-4 md:p-8 flex flex-col justify-between">
          <span className="text-[9px] uppercase tracking-widest text-stone-600 font-medium">
            Origins
          </span>
          <span className="serif text-base md:text-lg text-white font-light tracking-wide mt-2">
            {currentPiece.origins}
          </span>
        </div>
      </div>
    </section>
  );
};
