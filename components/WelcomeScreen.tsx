
import React from 'react';

interface WelcomeScreenProps {
  onSelectPrompt: (text: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectPrompt }) => {
  const suggestions = [
    { text: "Market & Retail", q: "I have a small shop, how does the 2026 law affect my daily profit?" },
    { text: "Income & Salary", q: "I am a worker earning 150k monthly. How will the 2026 tax law change my salary?" },
    { text: "Purchase & VAT", q: "Explain the new VAT rules in very simple terms for someone who just buys groceries." }
  ];

  return (
    <div className="flex flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto py-12 md:py-20 animate-modern-fade">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-black rounded-full border border-emerald-200 dark:border-emerald-500/20 uppercase tracking-[0.25em] mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        Verified Reform Data
      </div>
      
      <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.05] tracking-tight">
        Tax Laws, <br/><span className="text-emerald-600 dark:text-emerald-500">Simplified.</span>
      </h2>
      
      <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg mb-10 leading-relaxed font-medium max-w-md">
        Instant, clear answers on Nigeria's 2026 tax reforms for every citizen.
      </p>
      
      <div className="grid grid-cols-1 gap-4 w-full">
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(s.q)}
            className="group flex items-center justify-between text-left px-6 py-5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] md:rounded-[2rem] hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
          >
            <div className="flex-1 pr-4">
              <p className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1.5">{s.text}</p>
              <p className="text-slate-800 dark:text-slate-200 font-bold text-sm md:text-base leading-tight">"{s.q}"</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
