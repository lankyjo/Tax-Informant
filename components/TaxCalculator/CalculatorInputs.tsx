
import React from 'react';
import { CalculatorInput } from './types';

interface CalculatorInputsProps {
    inputs: CalculatorInput[];
    values: Record<string, any>;
    onChange: (id: string, value: any) => void;
}

const CalculatorInputs: React.FC<CalculatorInputsProps> = ({ inputs, values, onChange }) => {
    return (
        <div className="space-y-6">
            {inputs.map((input) => (
                <div key={input.id} className="group">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-emerald-600 dark:group-focus-within:text-emerald-500">
                        {input.label}
                    </label>
                    <div className="relative">
                        {input.prefix && (
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-slate-400 font-bold">{input.prefix}</span>
                            </div>
                        )}
                        <input
                            type={input.type === 'number' || input.type === 'currency' ? 'number' : 'text'}
                            value={values[input.id] || ''}
                            onChange={(e) => onChange(input.id, parseFloat(e.target.value) || 0)}
                            placeholder={input.placeholder}
                            className={`
                w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 
                rounded-xl py-3 text-slate-800 dark:text-slate-200 font-bold
                focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10
                transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700
                ${input.prefix ? 'pl-10 pr-4' : 'px-4'}
              `}
                        />
                    </div>
                    {input.description && (
                        <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 font-medium leading-relaxed">
                            {input.description}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CalculatorInputs;
