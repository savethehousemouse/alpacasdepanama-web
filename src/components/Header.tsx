import React from 'react';
import { NavTab } from '../types';
import { TtsSwitch } from './TtsSwitch';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isTtsEnabled: boolean;
  isTtsSpeaking: boolean;
  onToggleTts: () => void;
  isTtsSupported: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  isTtsEnabled,
  isTtsSpeaking,
  onToggleTts,
  isTtsSupported,
}) => {
  return (
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-8 md:px-12 py-6 md:py-8 border-b border-muted gap-4 select-none">
      <button 
        onClick={() => onSelectTab('atelier')}
        className="flex flex-col text-left group transition-opacity hover:opacity-90 cursor-pointer focus:outline-none"
      >
        <span className="serif text-2xl md:text-3xl tracking-widest text-white uppercase font-light">
          Aesthetique
        </span>
        <span className="text-[9px] uppercase tracking-[0.4em] text-accent mt-1 transition-colors group-hover:text-stone-300">
          Curated Digital Collective
        </span>
      </button>

      <div className="flex flex-wrap items-center justify-between lg:justify-end gap-6 md:gap-8 w-full lg:w-auto">
        <nav className="flex items-center gap-6 md:gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-stone-500 overflow-x-auto pb-1 lg:pb-0">
          <button
            onClick={() => onSelectTab('atelier')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white ${
              currentTab === 'atelier' ? 'text-white' : 'text-stone-500'
            }`}
          >
            The Atelier
          </button>
          <button
            onClick={() => onSelectTab('exhibitions')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white ${
              currentTab === 'exhibitions' ? 'text-white' : 'text-stone-500'
            }`}
          >
            Exhibitions
          </button>
          <button
            onClick={() => onSelectTab('journal')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white ${
              currentTab === 'journal' ? 'text-white' : 'text-stone-500'
            }`}
          >
            Journal
          </button>
          <button
            onClick={() => onSelectTab('contact')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white ${
              currentTab === 'contact' ? 'text-white' : 'text-stone-500'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Dedicated Single TTS On/Off Switch */}
        <TtsSwitch
          isEnabled={isTtsEnabled}
          isSpeaking={isTtsSpeaking}
          onToggle={onToggleTts}
          isSupported={isTtsSupported}
        />
      </div>
    </header>
  );
};

