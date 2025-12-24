
import { CalculatorProfile, TaxResult } from './types';

export const CALCULATOR_PROFILES: CalculatorProfile[] = [
    {
        id: 'petty_trader',
        label: 'Petty Trader / Artisan',
        description: 'For market traders, artisans, and shop owners with annual turnover under ₦25m.',
        inputs: [
            { id: 'daily_sales', label: 'Average Daily Sales', type: 'currency', placeholder: 'e.g. 15,000', prefix: '₦' },
            { id: 'working_days', label: 'Days Worked per Week', type: 'number', placeholder: 'e.g. 6' },
            { id: 'expenses', label: 'Monthly Business Expenses', type: 'currency', placeholder: 'Restocking, transport, etc.', description: 'Estimate your total monthly costs to run the business', prefix: '₦' },
            { id: 'shop_rent', label: 'Yearly Shop/Stall Rent', type: 'currency', placeholder: 'e.g. 120,000', description: 'Enter 0 if you trade from home or open space', prefix: '₦' }
        ]
    },
    {
        id: 'salary_earner',
        label: 'Salary Earner (PAYE)',
        description: 'For employees receiving a monthly salary from an employer.',
        inputs: [
            { id: 'monthly_salary', label: 'Gross Monthly Salary', type: 'currency', placeholder: 'e.g. 250,000', prefix: '₦' },
            { id: 'pension', label: 'Monthly Pension Contribution', type: 'currency', placeholder: 'Usually 8% of Basic + Housing + Transport', prefix: '₦' },
            { id: 'nhf', label: 'National Housing Fund', type: 'currency', placeholder: '2.5% of Basic', description: 'Enter 0 if not applicable', prefix: '₦' },
            { id: 'other_deductions', label: 'Other Tax Exempt Deductions', type: 'currency', placeholder: 'e.g. Life Insurance', prefix: '₦' }
        ]
    },
    {
        id: 'freelancer',
        label: 'Freelancer / Gig Worker',
        description: 'For independent contractors, tech talents, and remote workers.',
        inputs: [
            { id: 'monthly_income', label: 'Average Monthly Income', type: 'currency', placeholder: 'e.g. 500,000', prefix: '₦' },
            { id: 'internet_costs', label: 'Monthly Data/Internet Costs', type: 'currency', placeholder: 'e.g. 30,000', prefix: '₦' },
            { id: 'power_costs', label: 'Monthly Power/Fuel Costs', type: 'currency', placeholder: 'e.g. 40,000', prefix: '₦' },
            { id: 'workspace_cost', label: 'Co-working/Office Rent (Yearly)', type: 'currency', placeholder: 'e.g. 0', prefix: '₦' }
        ]
    }
];

export const calculateTax = (type: string, values: Record<string, number>): TaxResult => {
    let revenue = 0;
    let taxableIncome = 0;
    let allowances = 0;
    let taxPayable = 0;
    let breakdown: any[] = [];
    let advice: string[] = [];

    // Helper to format currency (not used in calculation but good for debugging)
    const format = (n: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(n);

    switch (type) {
        case 'petty_trader':
            const daily = values.daily_sales || 0;
            const days = values.working_days || 0;
            const rent = values.shop_rent || 0;
            const monthlyExp = values.expenses || 0;

            revenue = daily * days * 52; // Annual
            const annualExpenses = (monthlyExp * 12) + rent;

            // Presumptive Tax Logic (Simplified for 2026 reform context)
            // Usually small businesses < 25m are exempt from CIT but liable for PIT on a presumptive basis or direct assessment
            // Let's assume a simplified Profit estimation
            const estimatedProfit = Math.max(0, revenue - annualExpenses);

            // Allowances: Consolidated Relief Allowance (CRA)
            // Higher of 200k or 1% of Gross + 20% of Adjusted Gross
            const cra = Math.max(200000, revenue * 0.01) + (estimatedProfit * 0.20);
            allowances = cra + annualExpenses; // Treat expenses as deduction for simplicity in this view

            taxableIncome = Math.max(0, estimatedProfit - cra);

            // Tax Bands (Standard PIT)
            taxPayable = calculatePIT(taxableIncome);

            breakdown.push({ label: 'Annual Gross Turnover', amount: revenue });
            breakdown.push({ label: 'Estimated Annual Expenses', amount: annualExpenses, isDeduction: true });
            breakdown.push({ label: 'Consolidated Relief Allowance', amount: cra, isDeduction: true });

            if (revenue < 25000000) {
                advice.push("Based on an annual turnover under ₦25m, you are exempt from VAT registration but must file Personal Income Tax.");
                advice.push(`Your estimated profit margin is ${((estimatedProfit / revenue) * 100).toFixed(1)}%. Keeping detailed records of your ${format(annualExpenses)} expenses is crucial to avoid over-estimation by tax authorities.`);
            }
            break;

        case 'salary_earner':
            const monthly = values.monthly_salary || 0;
            const pension = (values.pension || 0) * 12;
            const nhf = (values.nhf || 0) * 12;
            const other = (values.other_deductions || 0) * 12;

            revenue = monthly * 12;
            const taxExempt = pension + nhf + other;

            const craSalary = Math.max(200000, revenue * 0.01) + ((revenue - taxExempt) * 0.20);
            allowances = taxExempt + craSalary;

            taxableIncome = Math.max(0, revenue - allowances);
            taxPayable = calculatePIT(taxableIncome);

            breakdown.push({ label: 'Annual Gross Income', amount: revenue });
            breakdown.push({ label: 'Pension & NHF (Tax Exempt)', amount: taxExempt, isDeduction: true });
            breakdown.push({ label: 'Consolidated Relief Allowance', amount: craSalary, isDeduction: true });

            advice.push("Ensure your employer is remitting your PAYE tax to the correct state authority.");
            if (values.pension === 0) advice.push("Consider a Voluntary Pension Contribution to reduce your taxable income.");
            break;

        case 'freelancer':
            const monthlyInc = values.monthly_income || 0;
            const internet = (values.internet_costs || 0) * 12;
            const power = (values.power_costs || 0) * 12;
            const space = values.workspace_cost || 0;

            revenue = monthlyInc * 12;
            const bizExpenses = internet + power + space;

            // Direct Assessment
            const grossIncome = Math.max(0, revenue - bizExpenses);
            const craFreelance = Math.max(200000, revenue * 0.01) + (grossIncome * 0.20);

            allowances = bizExpenses + craFreelance;
            taxableIncome = Math.max(0, grossIncome - craFreelance);
            taxPayable = calculatePIT(taxableIncome);

            breakdown.push({ label: 'Annual Gross Revenue', amount: revenue });
            breakdown.push({ label: 'Business Expenses (Internet, Power, etc)', amount: bizExpenses, isDeduction: true });
            breakdown.push({ label: 'Consolidated Relief Allowance', amount: craFreelance, isDeduction: true });

            advice.push("As a freelancer, you should file your taxes via Direct Assessment with your State Internal Revenue Service.");
            advice.push(`Deducting your ${format(bizExpenses)} business costs significantly reduced your tax liability. Keep receipts for all power and internet purchases.`);
            break;
    }

    return {
        taxPayable,
        revenue,
        allowances,
        taxableIncome,
        breakdown,
        advice
    };
};

// Standard Nigeria PIT Bands (First 300k @ 7%, next 300k @ 11%, etc)
const calculatePIT = (income: number): number => {
    let tax = 0;
    let remaining = income;

    const bands = [
        { limit: 300000, rate: 0.07 },
        { limit: 300000, rate: 0.11 },
        { limit: 500000, rate: 0.15 },
        { limit: 500000, rate: 0.19 },
        { limit: 1600000, rate: 0.21 },
        { limit: Infinity, rate: 0.24 }
    ];

    for (const band of bands) {
        if (remaining <= 0) break;
        const taxable = Math.min(remaining, band.limit);
        tax += taxable * band.rate;
        remaining -= taxable;
    }

    // Minimum tax: 1% of Gross if taxable income is too low? (Simplified: Ignore for now to favour user)
    return tax;
};
