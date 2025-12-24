
import React, { useState, useMemo } from 'react';
import { CALCULATOR_PROFILES, calculateTax } from './data';
import CalculatorInputs from './CalculatorInputs';
import CalculatorResult from './CalculatorResult';
import { TaxResult, UserType } from './types';
import { IconChevronLeft } from '../Icons';

interface TaxCalculatorProps {
    onBack: () => void;
}

const TaxCalculator: React.FC<TaxCalculatorProps> = ({ onBack }) => {
    const [selectedType, setSelectedType] = useState<UserType | ''>('');
    const [formValues, setFormValues] = useState<Record<string, number>>({});
    const [result, setResult] = useState<TaxResult | null>(null);

    const selectedProfile = useMemo(
        () => CALCULATOR_PROFILES.find(p => p.id === selectedType),
        [selectedType]
    );

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedType) {
            const res = calculateTax(selectedType, formValues);
            setResult(res);
        }
    };

    const handleReset = () => {
        setResult(null);
        setFormValues({});
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-950 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-12 py-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 -ml-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <IconChevronLeft />
                    </button>
                    <div>
                        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Tax Estimator</h2>
                        <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">
                            Instant Assessment
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-12 relative">
                <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

                    {/* Left Column: Form */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 md:p-10 shadow-sm">
                            <form onSubmit={handleCalculate} className="space-y-8">
                                <div className="space-y-4">
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                                        Taxpayer Profile
                                    </label>
                                    <select
                                        value={selectedType}
                                        onChange={(e) => {
                                            setSelectedType(e.target.value as UserType);
                                            handleReset();
                                        }}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-4 px-4 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                                    >
                                        <option value="" disabled>Select your category...</option>
                                        {CALCULATOR_PROFILES.map((profile) => (
                                            <option key={profile.id} value={profile.id}>
                                                {profile.label}
                                            </option>
                                        ))}
                                    </select>

                                    {selectedProfile && (
                                        <div className="text-sm text-slate-600 dark:text-slate-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
                                            {selectedProfile.description}
                                        </div>
                                    )}
                                </div>

                                {selectedProfile && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        <div className="h-px bg-slate-100 dark:bg-slate-800 my-8"></div>
                                        <CalculatorInputs
                                            inputs={selectedProfile.inputs}
                                            values={formValues}
                                            onChange={(id, val) => setFormValues(prev => ({ ...prev, [id]: val }))}
                                        />

                                        <div className="mt-10 flex gap-4">
                                            <button
                                                type="submit"
                                                className="flex-1 bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-emerald-500/10 active:scale-95 transition-all text-sm uppercase tracking-widest"
                                            >
                                                Calculate Tax
                                            </button>
                                            {result && (
                                                <button
                                                    type="button"
                                                    onClick={handleReset}
                                                    className="px-6 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold py-4 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                                >
                                                    Reset
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>

                        {!selectedType && (
                            <div className="text-center text-slate-400 py-10">
                                <p className="text-sm">Select a category above to begin your assessment.</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Results */}
                    <div>
                        {result ? (
                            <CalculatorResult result={result} />
                        ) : (
                            <div className="hidden lg:flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] text-slate-300 dark:text-slate-700 p-10 text-center">
                                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800/50 mb-6 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-slate-400 dark:text-slate-600">No Assessment Yet</h3>
                                <p className="text-sm max-w-xs">Complete the form on the left to generate your comprehensive tax breakdown.</p>
                            </div>
                        )}
                    </div>

                </div>
                <div className="h-20"></div>
            </div>
        </div>
    );
};

export default TaxCalculator;
