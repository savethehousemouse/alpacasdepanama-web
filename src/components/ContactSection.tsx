import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface ContactSectionProps {
  initialSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject = '' }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: initialSubject || 'Acquisition Dossier Request',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-8 md:p-16 max-w-5xl mx-auto w-full">
      <div className="mb-12 border-b border-muted pb-8">
        <span className="text-accent text-xs uppercase tracking-[0.5em] mb-3 block">
          Digital Atelier & Inquiries
        </span>
        <h2 className="serif text-4xl md:text-5xl text-white font-light">
          Connect with the Collective
        </h2>
        <p className="text-stone-500 text-sm mt-3 max-w-xl">
          Private viewing appointments, commissioned architectural monoliths, and curatorial correspondence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-8 border border-muted bg-[#141417] text-stone-300">
              <div className="flex items-center gap-3 text-accent mb-4">
                <Check size={20} />
                <span className="text-[10px] uppercase tracking-widest font-semibold">
                  Transmission Dispatched
                </span>
              </div>
              <h3 className="serif text-2xl text-white font-light mb-2">
                Thank you for your inquiry, {form.name || 'patron'}.
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-6 font-light">
                Our curatorial director will review your request and send the relevant private dossier to {form.email} within one business cycle.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-stone-800 text-white px-6 py-3 text-[10px] uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                Send Another Inscription
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                  Full Name / Studio
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Henrik Lindqvist"
                  className="w-full bg-[#141417] border border-muted px-4 py-3 text-sm text-stone-200 placeholder:text-stone-700 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full bg-[#141417] border border-muted px-4 py-3 text-sm text-stone-200 placeholder:text-stone-700 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                  Inquiry Nature
                </label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-[#141417] border border-muted px-4 py-3 text-sm text-stone-200 focus:outline-none focus:border-accent transition-colors cursor-pointer"
                >
                  <option value="Acquisition Dossier Request">Acquisition Dossier Request</option>
                  <option value="Private Atelier Appointment (Oslo)">Private Atelier Appointment (Oslo)</option>
                  <option value="Private Atelier Appointment (Milan)">Private Atelier Appointment (Milan)</option>
                  <option value="Architectural Commission">Architectural Commission</option>
                  <option value="Press & Curatorial Loan">Press & Curatorial Loan</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                  Project Notes or Architectural Context
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Specify desired installation dimensions, building materiality, or space requirements..."
                  className="w-full bg-[#141417] border border-muted px-4 py-3 text-sm text-stone-200 placeholder:text-stone-700 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-stone-800 text-white py-4 text-[10px] uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                Submit Inscription
              </button>
            </form>
          )}
        </div>

        {/* Right Info */}
        <div className="lg:col-span-5 space-y-8 lg:border-l lg:border-muted lg:pl-10">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-stone-600 block mb-1">
              Atelier Oslo
            </span>
            <p className="serif text-xl text-white">Prinsens gate 14</p>
            <p className="text-xs text-stone-500 mt-1">0152 Oslo, Norway</p>
            <p className="text-[10px] text-accent uppercase tracking-widest mt-2">Visits by appointment</p>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-widest text-stone-600 block mb-1">
              Atelier Milano
            </span>
            <p className="serif text-xl text-white">Via San Damiano 7</p>
            <p className="text-xs text-stone-500 mt-1">20122 Milano, Italy</p>
            <p className="text-[10px] text-accent uppercase tracking-widest mt-2">Open Thursday – Saturday</p>
          </div>

          <div className="pt-6 border-t border-muted">
            <span className="text-[10px] uppercase tracking-widest text-stone-600 block mb-1">
              Direct Encrypted Line
            </span>
            <p className="serif text-base text-stone-300">atelier@aesthetique.archive</p>
          </div>
        </div>
      </div>
    </div>
  );
};
