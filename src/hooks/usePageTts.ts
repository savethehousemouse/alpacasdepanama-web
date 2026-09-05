import { useState, useEffect, useRef, useCallback } from 'react';

interface UsePageTtsOptions {
  activeText: string;
}

export function usePageTts({ activeText }: UsePageTtsOptions) {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speakText = useCallback((textToSpeak: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    if (!textToSpeak.trim()) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    // Pick an appropriate voice (prefer English natural/studio voices if available)
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') ||
          v.name.includes('Enhanced') ||
          v.name.includes('Serena') ||
          v.name.includes('Google UK') ||
          v.name.includes('Daniel') ||
          v.name.includes('Samantha'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Set calm, curatorial cadence
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (e) => {
      // Interrupted errors happen normally on cancel()
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.warn('TTS playback error:', e);
      }
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  // When activeText changes and TTS is enabled, read the new page content
  useEffect(() => {
    if (!isEnabled) {
      stopSpeaking();
      return;
    }

    // Slight delay so DOM / state transition settles
    const timeout = setTimeout(() => {
      speakText(activeText);
    }, 150);

    return () => {
      clearTimeout(timeout);
    };
  }, [isEnabled, activeText, speakText, stopSpeaking]);

  const toggleTts = () => {
    if (!isEnabled) {
      setIsEnabled(true);
      speakText(activeText);
    } else {
      setIsEnabled(false);
      stopSpeaking();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isEnabled,
    isSpeaking,
    isSupported,
    toggleTts,
    stopSpeaking,
  };
}
