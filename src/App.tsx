import { useState } from 'react';
import { EXHIBITION_PIECES } from './data/exhibitions';
import { ExhibitionPiece, NavTab } from './types';
import { Header } from './components/Header';
import { Showcase } from './components/Showcase';
import { Footer } from './components/Footer';
import { GalleryModal } from './components/GalleryModal';
import { ReleaseNoteModal } from './components/ReleaseNoteModal';
import { PieceDetailModal } from './components/PieceDetailModal';
import { JournalSection } from './components/JournalSection';
import { ContactSection } from './components/ContactSection';
import { usePageTts } from './hooks/usePageTts';

export default function App() {
  const [currentPieceIndex, setCurrentPieceIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState<NavTab>('atelier');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isReleaseNoteOpen, setIsReleaseNoteOpen] = useState(false);
  const [selectedModalPiece, setSelectedModalPiece] = useState<ExhibitionPiece | null>(null);
  const [contactSubject, setContactSubject] = useState<string>('');

  const currentPiece = EXHIBITION_PIECES[currentPieceIndex];

  // Dynamically derive the narrative script for the currently active page/view
  const getActivePageText = () => {
    if (selectedModalPiece) {
      return `Monograph: ${selectedModalPiece.title}, ${selectedModalPiece.series}. ${selectedModalPiece.subtitle}. Curatorial observation: ${selectedModalPiece.curatorNote}. Materiality: ${selectedModalPiece.materiality}. Tonalities: ${selectedModalPiece.tonalities}. Origins: ${selectedModalPiece.origins}. Scale: ${selectedModalPiece.dimensions}.`;
    }
    if (isReleaseNoteOpen) {
      return `Volume 08 Release Note. A Manifesto for Tonal Restraint, by Elena Vane, Architectural Director. In our eighth seasonal monograph, Aesthetique departs from ornament to explore the architectural weight of negative space. Beauty in the modern sphere is not an accumulation of artifacts, but the deliberate removal of interference.`;
    }
    if (isGalleryOpen) {
      return `Spring Exhibition Catalog, Volume 08: Selected Monoliths. Currently featuring four architectural series: Piece 01 Shadow & Light in Oslo, Piece 02 Monolith & Void in Kyoto, Piece 03 Equilibrium in Milan, and Piece 04 Silent Geometry in Zurich. Select any piece to view on the centerpiece or inspect the monograph.`;
    }
    if (currentTab === 'atelier') {
      return `The Atelier. Spring Edition 2024. Redefining the visual poetry of modern space. A synthesis of architectural precision and organic movement, crafted for those who demand more than the ordinary. Now presenting Piece ${currentPiece.number}: ${currentPiece.title}, ${currentPiece.series}. Materiality: ${currentPiece.materiality}. Tonalities: ${currentPiece.tonalities}. Origins: ${currentPiece.origins}.`;
    }
    if (currentTab === 'journal') {
      return `The Journal of Spatial Practice. Essays on material authenticity, minimal acoustics, and intentional darkness within modern architectural environments. Featured essays: On the Weight of Stillness; Materiality Over Representation; and The Tonal Gradient of Dusk.`;
    }
    if (currentTab === 'contact') {
      return `Digital Atelier and Inquiries. Connect with the collective for private viewing appointments, architectural commissions, or curatorial correspondence. Visiting ateliers located in Oslo at Prinsens gate 14, and in Milan at Via San Damiano 7.`;
    }
    return '';
  };

  const tts = usePageTts({
    activeText: getActivePageText(),
  });

  const handlePrev = () => {
    setCurrentPieceIndex((prev) => (prev === 0 ? EXHIBITION_PIECES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPieceIndex((prev) => (prev === EXHIBITION_PIECES.length - 1 ? 0 : prev + 1));
  };

  const handleSelectPiece = (piece: ExhibitionPiece) => {
    const idx = EXHIBITION_PIECES.findIndex((p) => p.id === piece.id);
    if (idx !== -1) {
      setCurrentPieceIndex(idx);
    }
  };

  const handleOpenInquiry = (piece: ExhibitionPiece) => {
    setContactSubject(`Inquiry regarding ${piece.title} (${piece.series})`);
    setCurrentTab('contact');
  };

  return (
    <div className="min-h-screen bg-[#0c0c0d] flex items-center justify-center p-0 md:p-6 lg:p-10 selection:bg-[#c2a37d]/25 selection:text-white">
      {/* Primary Frame */}
      <div className="bg-sophisticated text-stone-300 w-full max-w-[1280px] min-h-[768px] flex flex-col sans overflow-hidden border-0 md:border-8 border-[#1a1a1c] shadow-2xl relative">
        
        {/* Header with single TTS switch */}
        <Header
          currentTab={currentTab}
          onSelectTab={(tab) => {
            if (tab === 'exhibitions') {
              setIsGalleryOpen(true);
            } else {
              setCurrentTab(tab);
            }
          }}
          isTtsEnabled={tts.isEnabled}
          isTtsSpeaking={tts.isSpeaking}
          onToggleTts={tts.toggleTts}
          isTtsSupported={tts.isSupported}
        />

        {/* Content Body */}
        <main className="flex-grow flex flex-col">
          {currentTab === 'atelier' && (
            <div className="flex-grow flex flex-col lg:flex-row">
              {/* Left Column: Hero & Narrative */}
              <section className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-muted">
                <div className="mb-6">
                  <span className="text-accent text-xs uppercase tracking-[0.5em] mb-4 block font-medium">
                    Spring Edition — 2024
                  </span>
                  <h1 className="serif text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.1] font-light tracking-normal">
                    Redefining the <br />
                    <i className="font-light">Visual Poetry</i> of Modern Space.
                  </h1>
                </div>

                <p className="text-stone-500 leading-relaxed max-w-sm text-sm mb-10 font-light">
                  A synthesis of architectural precision and organic movement, crafted for those who demand more than the ordinary.
                </p>

                <div className="flex flex-wrap items-center gap-6">
                  <button
                    onClick={() => setIsGalleryOpen(true)}
                    className="bg-stone-800 text-white px-8 py-4 text-[10px] uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-all cursor-pointer shadow-lg active:scale-95"
                  >
                    Explore Gallery
                  </button>

                  <div className="flex flex-col">
                    <span className="text-[10px] text-stone-600 uppercase tracking-widest">
                      Volume 08
                    </span>
                    <button
                      onClick={() => setIsReleaseNoteOpen(true)}
                      className="text-[10px] text-accent uppercase tracking-widest text-left hover:underline cursor-pointer transition-colors"
                    >
                      Release Note
                    </button>
                  </div>
                </div>

                {/* Sub-strip quick navigator */}
                <div className="mt-12 pt-8 border-t border-muted/60 flex items-center gap-4">
                  <span className="text-[9px] uppercase tracking-widest text-stone-600">
                    Series Index:
                  </span>
                  <div className="flex gap-2">
                    {EXHIBITION_PIECES.map((piece, idx) => (
                      <button
                        key={piece.id}
                        onClick={() => setCurrentPieceIndex(idx)}
                        className={`text-[10px] px-2.5 py-1 border transition-all cursor-pointer ${
                          idx === currentPieceIndex
                            ? 'border-accent text-white bg-white/5'
                            : 'border-muted text-stone-600 hover:text-stone-300 hover:border-stone-600'
                        }`}
                      >
                        {piece.number}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Right Column: Showcase Stage & Specifications */}
              <Showcase
                currentPiece={currentPiece}
                onPrev={handlePrev}
                onNext={handleNext}
                onSelectPiece={(piece) => setSelectedModalPiece(piece)}
              />
            </div>
          )}

          {currentTab === 'journal' && <JournalSection />}

          {currentTab === 'contact' && (
            <ContactSection initialSubject={contactSubject} />
          )}
        </main>

        {/* Footer */}
        <Footer onOpenStatusInfo={() => setIsGalleryOpen(true)} />

        {/* Modals & Overlays */}
        <GalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          onSelectPiece={handleSelectPiece}
          activePieceId={currentPiece.id}
        />

        <ReleaseNoteModal
          isOpen={isReleaseNoteOpen}
          onClose={() => setIsReleaseNoteOpen(false)}
        />

        <PieceDetailModal
          piece={selectedModalPiece}
          onClose={() => setSelectedModalPiece(null)}
          onInquire={handleOpenInquiry}
        />
      </div>
    </div>
  );
}

