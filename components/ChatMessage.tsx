
import React, { useState, useEffect } from 'react';
import { Message, GroundingSource } from '../types';

interface ChatMessageProps {
  message: Message;
  sources?: GroundingSource[];
  isLatest?: boolean;
  onTypingUpdate?: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sources, isLatest, onTypingUpdate }) => {
  const isUser = message.role === 'user';
  const [displayedText, setDisplayedText] = useState(isUser || !isLatest ? message.text : "");
  
  useEffect(() => {
    if (!isUser && isLatest && displayedText.length < message.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(message.text.slice(0, displayedText.length + 3));
        if (onTypingUpdate) onTypingUpdate();
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [message.text, displayedText, isUser, isLatest, onTypingUpdate]);

  const formatText = (text: string) => {
    // Clean up any remaining formatting artifacts
    // Regex to find **bold** text and render it as <strong>
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-black text-emerald-600 dark:text-emerald-400 tracking-tight">{part.slice(2, -2)}</strong>;
      }
      // Remove any single asterisks that might slip through
      return part.replace(/\*/g, '');
    });
  };

  return (
    <div className={`flex w-full mb-10 ${isUser ? 'justify-end' : 'justify-start'} animate-modern-fade`}>
      <div className={`flex max-w-[95%] md:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-4 md:gap-6 group`}>
        {/* Avatar */}
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-[1.25rem] flex-shrink-0 flex items-center justify-center text-sm shadow-xl transition-all duration-300 group-hover:scale-110 ${
          isUser ? 'bg-slate-950 dark:bg-slate-50 text-white dark:text-slate-900 rotate-2' : 'bg-emerald-600 text-white -rotate-2'
        }`}>
          {isUser ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          ) : (
            <span className="font-display font-black text-xl">N</span>
          )}
        </div>

        {/* Bubble */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-5 md:px-7 py-4 md:py-5 rounded-[1.75rem] md:rounded-[2.25rem] text-[15px] md:text-[16px] leading-[1.65] shadow-lg relative transition-all ${
            isUser 
              ? 'bg-slate-950 dark:bg-slate-50 text-slate-100 dark:text-slate-900 rounded-tr-none font-medium' 
              : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-800 rounded-tl-none'
          }`}>
            <div className="prose dark:prose-invert max-w-none">
              {displayedText.split('\n').map((line, i) => (
                <p key={i} className={line.trim() === '' ? 'h-3' : 'mb-3 last:mb-0'}>
                  {formatText(line)}
                </p>
              ))}
            </div>
          </div>
          
          {!isUser && sources && sources.length > 0 && displayedText.length >= message.text.length && (
            <div className="mt-5 flex flex-wrap gap-2 animate-modern-fade">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] block w-full mb-1">Official Reference</span>
              {sources.map((source, idx) => (
                <a 
                  key={idx}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] bg-white dark:bg-slate-900/50 text-emerald-700 dark:text-emerald-400 font-black px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2 shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3m-3 5h12"/></svg>
                  {source.title.substring(0, 35)}...
                </a>
              ))}
            </div>
          )}
          
          <div className="mt-2.5 flex items-center gap-3">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {!isUser && (
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-500 font-black uppercase tracking-widest italic">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                Legal Verification
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
