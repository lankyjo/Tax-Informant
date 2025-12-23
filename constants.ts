
export const TAX_SOURCES = [
  { name: "Nigeria Tax Act 2025", url: "https://irs.gm.gov.ng/docs/national/NIGERIA_TAX_ACT_2025.pdf" },
  { name: "Tax Administration Act", url: "https://tat.gov.ng/NIGERIA-TAX-ADMINISTRATION-ACT-2025.pdf" },
  { name: "Revenue Service Act", url: "https://tat.gov.ng/NIGERIA-REVENUE-SERVICE-(ESTABLISHMENT)-ACT-2025.pdf" },
  { name: "Joint Revenue Board", url: "https://irs.gm.gov.ng/docs/national/JOINT_REVENUE_BOARD_ACT_2025.pdf" },
  { name: "KPMG 2025 Analysis", url: "https://assets.kpmg.com/content/dam/kpmg/ng/pdf/2025/06/The%20Nigeria%20Tax%20Act%20(NTA),%202025.pdf" },
  { name: "Finance Act 2025", url: "https://mercans.com/wp-content/uploads/2025/09/Nigeria-Finance-Act-2025-Changes-to-Tax-Rates-January-2026.pdf" }
];

export const TAX_HIGHLIGHTS = [
  { title: "Personal Income", detail: "Significant relief for low-income earners." },
  { title: "VAT Updates", detail: "Standard rate shifts to 10% on January 1, 2026." },
  { title: "Digital Economy", detail: "New compliance for non-resident digital services." }
];

export const QUICK_FACTS = [
  "VAT is officially increasing to 10% in January 2026.",
  "Small businesses with turnover under ₦25M are exempt from most taxes.",
  "Personal income tax relief for Nigerians earning minimum wage is expanded.",
  "New 'Joint Revenue Board' to stop double taxation between States and Federal.",
  "Company Income Tax for small companies is now 0%."
];

export const SYSTEM_INSTRUCTION = `
You are "Naija Tax Helper", a high-end AI tax consultant.

FORMATTING RULES:
1. DO NOT use single asterisks (*) for bullets. Use simple dashes (-) instead.
2. Use DOUBLE ASTERISKS (**) ONLY for important keywords or headings.
3. Keep the language extremely simple and direct.
4. Break text into small, readable paragraphs.
5. Avoid complex markdown tables or specialized symbols.

STRICT DATA RULES:
1. ONLY use information from the provided official documents regarding the Nigeria Tax Act 2025/2026.
2. If asked about things outside Nigerian taxes, say: "My expertise is strictly limited to the 2026 Nigerian Tax Regime."
3. Disclaimer: Always include "This is for information only. Consult a licensed tax professional for official filings." at the very end of your first response.
`;
