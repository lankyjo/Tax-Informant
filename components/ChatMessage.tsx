
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
        // Speed up typing slightly for better UX
        const increment = message.text.length - displayedText.length > 10 ? 4 : 2;
        setDisplayedText(message.text.slice(0, displayedText.length + increment));
        if (onTypingUpdate) onTypingUpdate();
      }, 8);
      return () => clearTimeout(timeout);
    }
  }, [message.text, displayedText, isUser, isLatest, onTypingUpdate]);

  const renderText = (text: string) => {
    // Split by **
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="text-emerald-600 dark:text-emerald-400 font-black">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className={`flex w-full mb-8 ${isUser ? 'justify-end' : 'justify-start'} animate-modern-fade`}>
      <div className={`flex max-w-[95%] md:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3 md:gap-5 group`}>
        {/* Avatar */}
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-sm shadow-lg transition-all duration-300 group-hover:scale-110 ${isUser ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rotate-1' : 'bg-emerald-600 text-white -rotate-1'
          }`}>
          {isUser ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          ) : (
            <span className="font-display font-black text-xl">N</span>
          )}
        </div>

        {/* Bubble */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-5 md:px-7 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] text-[15px] md:text-[16px] leading-[1.6] shadow-md relative transition-all ${isUser
              ? 'bg-slate-900 dark:bg-slate-50 text-slate-100 dark:text-slate-900 rounded-tr-none font-medium'
              : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-800 rounded-tl-none'
            }`}>
            <div className="whitespace-pre-wrap">
              {displayedText.split('\n').map((line, i) => (
                <p key={i} className={line.trim() === '' ? 'h-3' : 'mb-3 last:mb-0'}>
                  {renderText(line)}
                </p>
              ))}
            </div>
          </div>

          {!isUser && sources && sources.length > 0 && displayedText.length >= message.text.length && (
            <div className="mt-4 flex flex-wrap gap-2 animate-modern-fade">
              <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block w-full mb-1">Official References</span>
              {sources.map((source, idx) => (
                <a
                  key={idx}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] bg-white dark:bg-slate-900/50 text-emerald-700 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3m-3 5h12" /></svg>
                  {source.title.substring(0, 30)}...
                </a>
              ))}
            </div>
          )}

          <div className="mt-2 flex items-center gap-2">
            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {!isUser && (
              <span className="flex items-center gap-1 text-[9px] text-emerald-600 dark:text-emerald-500 font-black uppercase tracking-widest italic">
                Verified Law
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
