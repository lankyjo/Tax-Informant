# Tax Informant 🇳🇬

**Tax Informant** is an intelligent, AI-powered chat assistant designed to demystify the 2026 Nigerian Tax Reform laws. It provides instant, plain-language answers to complex tax questions, helping everyday citizens and small business owners understand how the new regulations affect them and their business at large.

## 🚀 Features

-   **AI-Powered Consultation:** Leverages Google's Gemini Flash model to provide accurate, context-aware explanations of tax laws.
-   **Plain Language:** Translates complex legal jargon into simple, easy-to-understand English.
-   **Source Grounding:** (Beta) Provides citations and sources for its answers to ensure trust and transparency.
-   **Responsive Design:** Fully responsive interface that works seamlessly on desktops, tablets, and mobile phones.
-   **Dark Mode Support:** Built-in dark mode for comfortable reading in low-light environments.
-   **Real-time Interaction:** Fast, streaming responses with typing indicators and smooth animations.
-   **Rich UI/UX:** Features a modern, polished interface with glassmorphism effects and micro-interactions.

## 🛠️ Tech Stack

This project is built with a modern, performant web stack:

-   **Frontend Framework:** [React](https://react.dev/) (v18)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **AI Integration:** [Google GenAI SDK](https://www.npmjs.com/package/@google/genai)
-   **Icons:** Custom SVG Icons

## 🏁 Getting Started

Follow these steps to get the project running locally on your machine.

### Prerequisites

-   **Node.js** (v18 or higher)
-   **npm** (comes with Node.js)
-   A **Google Gemini API Key** (Get one at [aistudio.google.com](https://aistudio.google.com/))

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/tax-informant.git
    cd tax-informant
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add your Gemini API key:
    ```env
    API_KEY=your_gemini_api_key_here
    ```

### Running the App

Start the development server:
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📄 License

[MIT License](LICENSE)
