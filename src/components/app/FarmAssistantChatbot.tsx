import React, { useState, useRef, useEffect } from 'react';
import { 
  Sprout, 
  X, 
  Send, 
  Bot, 
  User, 
  ArrowRight,
  Droplets,
  Camera,
  Activity,
  Scan,
  CloudSun
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const FarmAssistantChatbot: React.FC = () => {
  const { 
    chatOpen, 
    setChatOpen, 
    chatMessages, 
    sendFarmerMessage, 
    executeChatAction,
    zones,
    irrigation 
  } = useFarm();

  const [inputVal, setInputVal] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'Should I irrigate?',
    'Is my crop healthy?',
    'Any disease?',
    'Any pest risk?',
    'What should I do today?',
    'Which zone needs attention?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (chatOpen) {
      scrollToBottom();
    }
  }, [chatMessages, chatOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendFarmerMessage(inputVal.trim());
    setInputVal('');
  };

  const handleQuickQuestionClick = (q: string) => {
    sendFarmerMessage(q);
  };

  const getActionIcon = (actionId: string) => {
    if (actionId.includes('irrigation')) return <Droplets className="w-3.5 h-3.5 text-sky-500" />;
    if (actionId.includes('camera')) return <Camera className="w-3.5 h-3.5 text-purple-500" />;
    if (actionId.includes('ai-scan')) return <Scan className="w-3.5 h-3.5 text-emerald-500" />;
    if (actionId.includes('environment')) return <CloudSun className="w-3.5 h-3.5 text-amber-500" />;
    return <Activity className="w-3.5 h-3.5 text-stone-500" />;
  };

  const z2Moisture = zones['zone-2']?.soilMoisture ?? 43;

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-5 z-40 select-none">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className={`px-4 py-3 rounded-full font-black text-sm flex items-center gap-2.5 shadow-2xl transition-all cursor-pointer ${
            chatOpen
              ? 'bg-stone-900 text-white hover:bg-stone-800'
              : 'bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white shadow-emerald-900/30 ring-4 ring-emerald-200/60 hover:scale-105'
          }`}
          aria-label="Open Farm Assistant Chat"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Sprout className="w-4 h-4 text-emerald-100" />
          </div>
          <span>Farm Assistant</span>
          {z2Moisture < 50 && !irrigation.isRunning && (
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" title="Action recommended" />
          )}
        </button>
      </div>

      {/* Expandable Chat Dialog */}
      {chatOpen && (
        <div className="fixed bottom-24 sm:bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[82vh] h-[580px] bg-white rounded-3xl border border-stone-200/90 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-800 to-emerald-900 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                <Bot className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-white">Farm Assistant</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700 text-emerald-100 uppercase tracking-wider">
                    Edge AI
                  </span>
                </div>
                <p className="text-xs text-emerald-200">Your smart farming companion</p>
              </div>
            </div>

            <button
              onClick={() => setChatOpen(false)}
              className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Farm Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50/60">
            {chatMessages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Sprout className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-2`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs whitespace-pre-line ${
                        isAi
                          ? 'bg-white text-stone-800 border border-stone-200/80'
                          : 'bg-emerald-700 text-white rounded-br-xs font-medium'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Interactive Action Buttons attached to AI message */}
                    {isAi && msg.actionButtons && msg.actionButtons.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.actionButtons.map((btn, idx) => (
                          <button
                            key={`action-${idx}`}
                            onClick={() => {
                              executeChatAction(btn.actionId);
                              setChatOpen(false);
                            }}
                            className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                              btn.primary
                                ? 'bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-800'
                                : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {getActionIcon(btn.actionId)}
                            <span>{btn.label}</span>
                            <ArrowRight className="w-3 h-3 opacity-60" />
                          </button>
                        ))}
                      </div>
                    )}

                    <span className={`text-[10px] text-stone-400 block ${isAi ? 'text-left' : 'text-right'}`}>
                      {msg.timestamp}
                    </span>
                  </div>

                  {!isAi && (
                    <div className="w-8 h-8 rounded-xl bg-stone-200 text-stone-700 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Horizontal Scroll */}
          <div className="p-2.5 bg-white border-t border-stone-200/60 overflow-x-auto scrollbar-none flex gap-2">
            {quickQuestions.map((q, i) => (
              <button
                key={`qq-${i}`}
                onClick={() => handleQuickQuestionClick(q)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold transition-all cursor-pointer shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask Farm Assistant a question..."
              className="flex-1 px-4 py-2.5 rounded-2xl bg-stone-100 border border-stone-200 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white transition-colors cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
