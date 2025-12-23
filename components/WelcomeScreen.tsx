
import React from 'react';

interface WelcomeScreenProps {
  onSelectPrompt: (text: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectPrompt }) => {
  const suggestions = [
    { text: "Small Business", q: "How does the 2026 tax law affect my small provisions shop?" },
    { text: "Monthly Salary", q: "I earn 150k monthly. How will my take-home pay change in 2026?" },
    { text: "Daily VAT", q: "Explain the new 10% VAT in simple terms for regular shoppers." }
  ];

  return (
    <div className="flex flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto py-8 md:py-16 animate-modern-fade">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[9px] font-black rounded-full border border-emerald-200 dark:border-emerald-500/20 uppercase tracking-[0.25em] mb-6 md:mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        Official 2026 Reform Data
      </div>
      
      <h2 className="text-3xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 md:mb-6 leading-[1.05] tracking-tight">
        Tax Laws, <br/><span className="text-emerald-600 dark:text-emerald-500">Simplified.</span>
      </h2>
      
      <p className="text-slate-500 dark:text-slate-400 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed font-medium max-w-md">
        Instant, plain-language answers on Nigeria's 2026 tax reforms.
      </p>
      
      <div className="grid grid-cols-1 gap-3 w-full max-w-md mx-auto">
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(s.q)}
            className="group flex items-center justify-between text-left px-5 py-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[1.25rem] md:rounded-[2rem] hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 active:scale-[0.98]"
          >
            <div className="flex-1 pr-4">
              <p className="text-[8px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">{s.text}</p>
              <p className="text-slate-800 dark:text-slate-200 font-bold text-xs md:text-base leading-tight">"{s.q}"</p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
