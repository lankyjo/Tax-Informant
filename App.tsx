
import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import ChatMessage from './components/ChatMessage';
import WelcomeScreen from './components/WelcomeScreen';
import Sidebar from './components/Sidebar';
import { Message, GroundingSource } from './types';
import { getGeminiResponse } from './services/geminiService';
import { IconClose, IconChevronRight, IconArrowDown } from './components/Icons';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sourcesMap, setSourcesMap] = useState<Record<number, GroundingSource[]>>({});
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 300);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    if (!isChatOpen) setIsChatOpen(true);

    const userMessage: Message = {
      role: 'user',
      text: text.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const response = await getGeminiResponse(history, text);
      
      const modelMessage: Message = {
        role: 'model',
        text: response.text || "No response text received.",
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, modelMessage]);
      if (response.sources) {
        setSourcesMap(prev => ({ ...prev, [modelMessage.timestamp]: response.sources || [] }));
      }
    } catch (error: any) {
      console.error("Chat Error:", error);
      
      let errorText = "My apologies. I encountered a technical connectivity issue. Please re-send your request.";
      
      if (error.message === "QUOTA_EXCEEDED") {
        errorText = "THE SERVICE IS CURRENTLY BUSY DUE TO HIGH DEMAND (Quota Reached). Please try again in a few minutes or wait for the hourly reset.";
      }

      setMessages(prev => [...prev, {
        role: 'model',
        text: errorText,
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setMessages([]);
    setSourcesMap({});
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col min-w-0 relative">
        {isSidebarCollapsed && (
          <button 
            onClick={() => setIsSidebarCollapsed(false)}
            className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-xl shadow-lg hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all text-emerald-600"
            title="Expand Sidebar"
          >
            <IconChevronRight />
          </button>
        )}

        <Navbar 
          isDarkMode={isDarkMode} 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 flex flex-col relative overflow-hidden">
          
          {!isChatOpen ? (
            <div className="flex-1 overflow-y-auto pb-40">
              <WelcomeScreen onSelectPrompt={(t) => handleSend(t)} />
            </div>
          ) : (
            <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center justify-between px-6 md:px-12 py-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">
                    Consultation Live
                  </span>
                </div>
                <div className="flex gap-2">
                   <button 
                    onClick={closeChat}
                    className="flex items-center gap-2 px-4 py-2 text-[10px] font-black bg-slate-100 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-50 hover:text-white dark:hover:text-slate-950 rounded-xl transition-all uppercase tracking-widest shadow-sm border border-slate-200 dark:border-slate-700"
                  >
                    <IconClose />
                    <span>Exit</span>
                  </button>
                </div>
              </div>

              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto px-4 md:px-12 py-10 scroll-smooth relative"
              >
                <div className="max-w-4xl mx-auto space-y-4">
                  {messages.map((m, idx) => (
                    <ChatMessage 
                      key={idx}
                      message={m} 
                      sources={sourcesMap[m.timestamp]} 
                      isLatest={idx === messages.length - 1}
                      onTypingUpdate={scrollToBottom}
                    />
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start mb-10 pl-6 md:pl-16">
                      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] px-6 py-4 shadow-xl">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scanning Gazette</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {showScrollButton && (
                  <button 
                    onClick={scrollToBottom}
                    className="fixed bottom-32 md:bottom-40 right-8 md:right-16 bg-emerald-600 text-white p-3 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all z-50 animate-bounce"
                  >
                    <IconArrowDown />
                  </button>
                )}
                
                <div className="h-44"></div>
              </div>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-10 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-slate-50 dark:via-slate-950/90 to-transparent pointer-events-none">
            <div className="max-w-4xl mx-auto pointer-events-auto">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[3rem] border-2 border-slate-200 dark:border-slate-800 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] focus-within:border-emerald-500 dark:focus-within:border-emerald-600 focus-within:ring-[12px] focus-within:ring-emerald-500/5 transition-all duration-500"
              >
                <div className="flex items-center px-5 md:px-10 py-4 md:py-6">
                  <div className="mr-4 text-emerald-600 dark:text-emerald-400 hidden md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22h.01"/><path d="M3.4 18.4a11 11 0 0 1 0-12.8"/><path d="M6.2 15.6a7 7 0 0 1 0-7.2"/><path d="M17.8 15.6a7 7 0 0 0 0-7.2"/><path d="M20.6 18.4a11 11 0 0 0 0-12.8"/></svg>
                  </div>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about 2026 Tax laws..."
                    className="flex-1 bg-transparent border-none outline-none py-2 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-700 font-bold text-sm md:text-xl"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="ml-2 bg-slate-950 dark:bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 text-white pl-4 md:pl-8 pr-3 md:pr-6 py-3 md:py-5 rounded-[1.5rem] md:rounded-[2rem] flex items-center gap-2 md:gap-3 transition-all duration-300 shadow-xl shadow-emerald-500/10 active:scale-95 group/btn"
                  >
                    <span className="hidden sm:inline text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Consult</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform"><path d="m13 17 5-5-5-5"/><path d="M6 17l5-5-5-5"/></svg>
                  </button>
                </div>
              </form>
              <div className="flex justify-between px-6 md:px-10 mt-4">
                <div className="flex items-center gap-4">
                  <span className="text-[8px] md:text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                    End-to-End Encrypted
                  </span>
                </div>
                <span className="text-[8px] md:text-[9px] font-black text-emerald-600/80 dark:text-emerald-500/60 uppercase tracking-[0.3em] italic">NG-REFORM-2026</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
