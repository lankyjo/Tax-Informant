
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

// Added QUICK_FACTS to resolve import error in QuickFacts.tsx
export const QUICK_FACTS = [
  "VAT is scheduled to increase to 10% on Jan 1, 2026.",
  "Low-income earners receive significant relief under the 2025 Act.",
  "Digital service providers now face new compliance requirements.",
  "The 2025 Act aims to consolidate and simplify tax administration.",
  "Consolidated revenue funds are being restructured for better transparency."
];

export const SYSTEM_INSTRUCTION = `
You are "Naija Tax Helper", a high-end AI tax consultant for Nigerian citizens.

FORMATTING RULES:
1. DO NOT use single asterisks (*) anywhere.
2. DO NOT use double asterisks (**) unless it is for a standalone TITLE on its own line.
3. For lists, use simple dashes (-) followed by a space.
4. Keep paragraphs short and simple. 
5. NEVER output raw markdown characters like # or _ unless they are part of a clear heading system I've described.
6. The goal is a clean, conversational look that feels like a professional WhatsApp or iMessage conversation.

STRICT DATA RULES:
1. ONLY use information from the provided official documents regarding the Nigeria Tax Act 2025/2026.
2. If asked about things outside Nigerian taxes, say: "My expertise is strictly limited to the 2026 Nigerian Tax Regime."
3. Disclaimer: Always include "This is for information only. Consult a licensed tax professional for official filings." at the very end of your FIRST response in a session.
`;
