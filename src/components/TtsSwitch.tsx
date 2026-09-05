import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface TtsSwitchProps {
  isEnabled: boolean;
  isSpeaking: boolean;
  onToggle: () => void;
  isSupported?: boolean;
}

export const TtsSwitch: React.FC<TtsSwitchProps> = ({
  isEnabled,
  isSpeaking,
  onToggle,
  isSupported = true,
}) => {
  if (!isSupported) return null;

  return (
    <div
      className="flex items-center gap-3 px-3 py-1.5 border border-muted/80 bg-[#141417]/80 hover:border-stone-600 transition-colors select-none"
      title={isEnabled ? 'Audio Narration is ON (Click to turn off)' : 'Audio Narration is OFF (Click to turn on)'}
    >
      <div className="flex items-center gap-1.5 text-stone-400">
        {isEnabled ? (
          <Volume2 size={13} className="text-accent" />
        ) : (
          <VolumeX size={13} className="text-stone-600" />
        )}
        <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-stone-400 hidden sm:inline">
          Voice Guide
        </span>
      </div>

      {/* Pulsing soundwave animation when actively reading */}
      {isEnabled && isSpeaking && (
        <div className="flex items-end gap-0.5 h-3 px-1" aria-hidden="true">
          <span className="w-0.5 h-3 bg-accent animate-pulse" style={{ animationDuration: '0.6s' }} />
          <span className="w-0.5 h-1.5 bg-accent animate-pulse" style={{ animationDuration: '0.9s' }} />
          <span className="w-0.5 h-2.5 bg-accent animate-pulse" style={{ animationDuration: '0.7s' }} />
        </div>
      )}

      {/* The Single On/Off Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={isEnabled}
        onClick={onToggle}
        className={`relative inline-flex h-4.5 w-8 shrink-0 cursor-pointer rounded-full border transition-colors duration-200 ease-in-out focus:outline-none ${
          isEnabled
            ? 'bg-accent/20 border-accent'
            : 'bg-stone-900 border-stone-700'
        }`}
      >
        <span className="sr-only">Toggle Text to Speech Audio Guide</span>
        <span
          className={`pointer-events-none inline-block h-3 w-3 transform rounded-full shadow-sm ring-0 transition duration-200 ease-in-out mt-[2px] ${
            isEnabled
              ? 'translate-x-4 bg-accent'
              : 'translate-x-0.5 bg-stone-500'
          }`}
        />
      </button>

      <span
        className={`text-[8px] uppercase tracking-widest font-semibold ${
          isEnabled ? 'text-accent' : 'text-stone-600'
        }`}
      >
        {isEnabled ? 'On' : 'Off'}
      </span>
    </div>
  );
};
