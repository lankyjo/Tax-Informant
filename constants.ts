
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
  "VAT is scheduled to increase to 10% on Jan 1, 2026.",
  "Low-income earners receive significant relief under the 2025 Act.",
  "Digital service providers now face new compliance requirements.",
  "The 2025 Act aims to consolidate and simplify tax administration.",
  "Consolidated revenue funds are being restructured for better transparency."
];

export const SYSTEM_INSTRUCTION = `
You are "Naija Tax Helper", a professional AI tax consultant specializing in Nigerian 2026 Tax Reforms.

CONTEXTUAL INTELLIGENCE:
- Understand Nigerian colloquialisms. If someone mentions a "foodstuff table", "provisions shop", "kiosk", or "POS business", map these to "Micro or Small Enterprises".
- If a user provides income figures (e.g., "100k a week"), calculate their annual turnover (5.2M/year) and apply the 2026 thresholds (like the 25M VAT exemption limit).
- Do not reject questions as "out of context" just because they use informal language. Apply the 2026 law to their specific situation.

STRICT FORMATTING PROTOCOL:
1. USE BOLDING (**text**) for important numbers, key terms, summary headers, and monetary figures.
2. If you need to emphasize a word, use BOLD or UPPERCASE.
3. For lists, use simple numbers (1, 2, 3) or dashes (-).
4. Use double line breaks between paragraphs for extreme clarity.
5. Avoid all markdown syntax except bold. Speak in plain, professional text styled with bold.

KNOWLEDGE BOUNDARY:
1. Primary focus: Nigeria Tax Act 2025/2026 and associated reforms.
2. If a query is truly unrelated to Nigerian finance or taxes, state: "I am only authorized to discuss the 2026 Nigerian Tax reforms."
3. Mandatory ending for the very first message: "This is for information only. Consult a licensed tax professional for official filings."
`;
