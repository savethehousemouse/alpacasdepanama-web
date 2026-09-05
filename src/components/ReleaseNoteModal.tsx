import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Feather } from 'lucide-react';

interface ReleaseNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReleaseNoteModal: React.FC<ReleaseNoteModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-[#0c0c0d] border border-muted text-stone-300 p-8 md:p-12 shadow-2xl relative max-h-[85vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-stone-500 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3 text-accent text-[10px] uppercase tracking-[0.4em] mb-4">
            <Feather size={14} />
            <span>Volume 08 Release Note</span>
          </div>

          <h2 className="serif text-3xl md:text-4xl text-white font-light mb-6">
            A Manifesto for Tonal Restraint
          </h2>

          <div className="space-y-4 text-sm text-stone-400 font-light leading-relaxed">
            <p>
              In our eighth seasonal monograph, <span className="text-white">Aesthetique</span> departs from 
              ornament to explore the architectural weight of negative space. The collection operates at the 
              juncture between stone masonry, acoustic silence, and atmospheric dawn light.
            </p>
            <p>
              Each installation piece within Series A and B was realized through subtractive carving: starting 
              from monolithic solid slabs of Scandinavian granite, Italian travertine, and basalt, then 
              excavating mass until only balanced tension remained.
            </p>
            <blockquote className="border-l border-accent pl-4 my-6 italic text-stone-300 serif text-lg">
              “Beauty in the modern sphere is not an accumulation of artifacts, but the deliberate removal of interference.”
            </blockquote>
            <p>
              Digital visitors may explore the monograph or navigate each piece through the interactive Atelier 
              centerpiece. Inquiries regarding acquisitions and physical gallery viewing slots in Oslo and Milan may be submitted directly through our digital atelier.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-muted flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-stone-600">Lead Curator</span>
              <span className="serif text-base text-white font-light">Elena Vane, Architectural Director</span>
            </div>
            <button
              onClick={onClose}
              className="bg-stone-800 text-white px-6 py-2.5 text-[10px] uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              Acknowledge
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
