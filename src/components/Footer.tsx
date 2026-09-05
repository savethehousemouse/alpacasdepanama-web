import React, { useState, useEffect } from 'react';

interface FooterProps {
  onOpenStatusInfo?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenStatusInfo }) => {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setTimeString(`${hours}:${minutes}:${seconds} GMT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="h-auto md:h-20 border-t border-muted flex flex-col md:flex-row items-start md:items-center justify-between px-8 md:px-12 py-6 md:py-0 gap-4 md:gap-0 select-none">
      <div className="flex flex-wrap items-center gap-6 md:gap-12">
        <div 
          onClick={onOpenStatusInfo}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-stone-500 group-hover:text-stone-300 transition-colors">
            Live Exhibition Status: Open
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-widest text-stone-500 font-mono">
            Local Time: {timeString || '14:48:00 GMT'}
          </span>
        </div>
      </div>

      <div className="flex gap-6 md:gap-8 text-stone-600">
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors cursor-pointer"
        >
          Instagram
        </a>
        <a 
          href="https://pinterest.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors cursor-pointer"
        >
          Pinterest
        </a>
        <a 
          href="https://are.na" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors cursor-pointer"
        >
          Are.na
        </a>
      </div>
    </footer>
  );
};
