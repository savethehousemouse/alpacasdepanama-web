import React from 'react';
import { JOURNAL_ENTRIES } from '../data/exhibitions';
import { ArrowUpRight } from 'lucide-react';

export const JournalSection: React.FC = () => {
  return (
    <div className="p-8 md:p-16 max-w-5xl mx-auto w-full">
      <div className="mb-12 border-b border-muted pb-8">
        <span className="text-accent text-xs uppercase tracking-[0.5em] mb-3 block">
          Editorial & Critique
        </span>
        <h2 className="serif text-4xl md:text-5xl text-white font-light">
          The Journal of Spatial Practice
        </h2>
        <p className="text-stone-500 text-sm mt-3 max-w-xl">
          Essays on material authenticity, minimal acoustics, and intentional darkness within modern architectural environments.
        </p>
      </div>

      <div className="divide-y divide-muted">
        {JOURNAL_ENTRIES.map((entry) => (
          <article key={entry.id} className="py-8 group cursor-pointer">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-widest text-accent font-medium">
                  {entry.issue}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-stone-600">
                  {entry.date}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-stone-600">
                {entry.readTime} read
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="serif text-2xl md:text-3xl text-white font-light group-hover:text-stone-200 transition-colors">
                  {entry.title}
                </h3>
                <p className="text-stone-400 text-sm mt-2 max-w-2xl leading-relaxed">
                  {entry.excerpt}
                </p>
              </div>
              <div className="p-3 text-stone-600 group-hover:text-accent transition-colors">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
