
export type UserType = 'petty_trader' | 'freelancer' | 'business_owner' | 'salary_earner';

export interface CalculatorInput {
    id: string;
    label: string;
    type: 'number' | 'currency' | 'select';
    options?: string[];
    placeholder?: string;
    description?: string;
    prefix?: string;
}

export interface CalculatorProfile {
    id: UserType;
    label: string;
    description: string;
    inputs: CalculatorInput[];
}

export interface TaxResult {
    taxPayable: number;
    revenue: number;
    allowances: number;
    taxableIncome: number;
    breakdown: { label: string; amount: number; isDeduction?: boolean }[];
    advice: string[];
}
