
import React from 'react';
import { TaxResult } from './types';
import { IconCheck, IconAlert } from '../Icons';

interface CalculatorResultProps {
    result: TaxResult;
}

const CalculatorResult: React.FC<CalculatorResultProps> = ({ result }) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-emerald-600 dark:bg-emerald-600 rounded-[2rem] p-8 text-white shadow-2xl shadow-emerald-600/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.15-1.46-3.27-3.4h1.96c.1 1.05 1.18 1.91 2.53 1.91 1.29 0 2.13-.59 2.13-1.66 0-1.2-1.15-1.62-2.73-2.12-2.05-.65-4.03-1.74-4.03-3.95 0-1.8 1.48-2.84 3.09-3.2V4H13.4v1.86c1.31.29 2.29 1.05 2.59 2.37h-1.94c-.21-.69-.99-1.21-1.99-1.21-1.12 0-1.89.66-1.89 1.5 0 1.06 1.15 1.48 2.68 1.96 2.06.67 4.09 1.63 4.09 4.07 0 1.76-1.39 2.92-2.93 3.34z" /></svg>
                </div>

                <p className="text-emerald-100 font-bold uppercase tracking-widest text-xs mb-2">Estimated Monthly Tax</p>
                <div className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                    {formatCurrency(result.taxPayable / 12)}
                </div>
                <p className="text-emerald-200 text-sm font-medium">
                    Total Annual Liability: {formatCurrency(result.taxPayable)}
                </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
                <h4 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                    Breakdown
                </h4>
                <div className="space-y-4">
                    {result.breakdown.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                            <span className={`font-medium ${item.isDeduction ? 'text-slate-500 dark:text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                                {item.label}
                            </span>
                            <span className={`font-bold ${item.isDeduction ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>
                                {item.isDeduction ? '-' : ''}{formatCurrency(item.amount)}
                            </span>
                        </div>
                    ))}
                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <span className="font-black text-slate-800 dark:text-slate-200">Taxable Income</span>
                        <span className="font-black text-emerald-600 dark:text-emerald-500">{formatCurrency(result.taxableIncome)}</span>
                    </div>
                </div>
            </div>

            {result.advice.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
                    <h4 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <IconCheck /> Smart Tax Tips
                    </h4>
                    <ul className="space-y-4">
                        {result.advice.map((tip, idx) => (
                            <li key={idx} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                <span className="mt-1 text-emerald-500 shrink-0">•</span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="text-[10px] text-slate-400 text-center font-medium max-w-sm mx-auto">
                Disclaimer: This is an estimation based on 2024/2026 proposed reforms. Actual tax liability is determined by your relevant tax authority.
            </div>
        </div>
    );
};

export default CalculatorResult;
