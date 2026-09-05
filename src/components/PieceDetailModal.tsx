import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { ExhibitionPiece } from '../types';

interface PieceDetailModalProps {
  piece: ExhibitionPiece | null;
  onClose: () => void;
  onInquire: (piece: ExhibitionPiece) => void;
}

export const PieceDetailModal: React.FC<PieceDetailModalProps> = ({ piece, onClose, onInquire }) => {
  if (!piece) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-[#0c0c0d] border border-muted text-stone-300 p-8 md:p-12 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-stone-500 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex items-center justify-between mb-4">
            <span className="text-accent text-[10px] uppercase tracking-[0.4em]">
              {piece.series}
            </span>
            <span className="serif italic text-3xl text-stone-700">
              {piece.number}
            </span>
          </div>

          <h2 className="serif text-4xl md:text-5xl text-white font-light mb-2">
            {piece.title}
          </h2>
          <p className="text-xs text-stone-500 mb-8 italic">
            {piece.subtitle}
          </p>

          <div className="p-6 bg-[#141417] border border-muted mb-8 space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
              Curatorial Observation
            </h4>
            <p className="text-sm text-stone-300 leading-relaxed font-light">
              {piece.curatorNote}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-muted mb-8">
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-stone-600">Materiality</span>
              <span className="serif text-base text-white mt-1 block">{piece.materiality}</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-stone-600">Tonalities</span>
              <span className="serif text-base text-white mt-1 block">{piece.tonalities}</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-stone-600">Origins</span>
              <span className="serif text-base text-white mt-1 block">{piece.origins}</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-stone-600">Scale</span>
              <span className="serif text-base text-white mt-1 block">{piece.dimensions}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-stone-500 text-[10px] uppercase tracking-widest">
              <Check size={14} className="text-accent" />
              <span>Available for Architectural Placement</span>
            </div>
            <button
              onClick={() => {
                onInquire(piece);
                onClose();
              }}
              className="w-full sm:w-auto bg-stone-800 text-white px-8 py-3 text-[10px] uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              Request Acquisition Dossier
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
