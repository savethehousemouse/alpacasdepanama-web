import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import { EXHIBITION_PIECES } from '../data/exhibitions';
import { ExhibitionPiece } from '../types';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPiece: (piece: ExhibitionPiece) => void;
  activePieceId: string;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  onSelectPiece,
  activePieceId,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl max-h-[90vh] bg-[#0c0c0d] border border-muted text-stone-300 flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-muted">
            <div>
              <span className="serif text-2xl text-white uppercase tracking-wider font-light">
                Spring Exhibition Catalog
              </span>
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent mt-1">
                Volume 08 — Selected Monoliths
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Grid */}
          <div className="p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {EXHIBITION_PIECES.map((piece) => {
              const isCurrent = piece.id === activePieceId;
              return (
                <div
                  key={piece.id}
                  onClick={() => {
                    onSelectPiece(piece);
                    onClose();
                  }}
                  className={`p-6 border transition-all cursor-pointer group flex flex-col justify-between relative ${
                    isCurrent
                      ? 'border-accent bg-[#141417]'
                      : 'border-muted hover:border-stone-600 bg-[#0f0f12]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.3em] text-accent block mb-1">
                        {piece.series}
                      </span>
                      <h3 className="serif text-2xl text-white font-light group-hover:text-stone-100 transition-colors">
                        {piece.title}
                      </h3>
                    </div>
                    <span className="serif italic text-2xl text-stone-700 group-hover:text-stone-400 transition-colors">
                      {piece.number}
                    </span>
                  </div>

                  <p className="text-xs text-stone-400 mb-6 leading-relaxed">
                    {piece.curatorNote}
                  </p>

                  <div className="border-t border-muted/80 pt-4 grid grid-cols-3 text-[9px] tracking-wider text-stone-500 uppercase">
                    <div>
                      <span className="block text-stone-600">Material</span>
                      <span className="text-stone-300 mt-1 block truncate">{piece.materiality}</span>
                    </div>
                    <div>
                      <span className="block text-stone-600">Tones</span>
                      <span className="text-stone-300 mt-1 block truncate">{piece.tonalities}</span>
                    </div>
                    <div>
                      <span className="block text-stone-600">Location</span>
                      <span className="text-stone-300 mt-1 block truncate">{piece.origins}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-end text-[10px] uppercase tracking-widest text-accent group-hover:translate-x-1 transition-transform">
                    <span>Feature on Centerpiece</span>
                    <ArrowUpRight size={14} className="ml-1" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Modal Footer */}
          <div className="px-8 py-4 border-t border-muted flex items-center justify-between text-[10px] text-stone-600 uppercase tracking-widest">
            <span>Curatorial Archive • All Rights Reserved</span>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              Close Catalog [Esc]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
