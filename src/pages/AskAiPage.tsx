import React, { useState, useRef, useEffect } from 'react';
import { useFarm } from '../context/FarmContext';
import { 
  Send, 
  Sparkles, 
  User, 
  HelpCircle, 
  ArrowRight, 
  Trash2, 
  Bot
} from 'lucide-react';
import type { TabType } from '../types/farm';

export const AskAiPage: React.FC = () => {
  const { 
    chatMessages, 
    isAiThinking, 
    sendMessage, 
    askQuickQuestion, 
    clearChat, 
    setActiveTab 
  } = useFarm();

  const [inputPrompt, setInputPrompt] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiThinking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;
    sendMessage(inputPrompt);
    setInputPrompt('');
  };

  const quickQuestions = [
    'Should I irrigate?',
    'Why are my leaves yellow?',
    'Is my crop healthy?',
    'Is there any disease?',
    'What is the soil condition?',
    'What should I do for Zone 2?',
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              Farmer Assistant
            </span>
            {/* Required label from Section 16 */}
            <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
              AI Farmer Assistant – Prototype Simulation
            </span>
          </div>
          {/* Required title from Section 14 */}
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
            Ask your farming question
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Query your 1-acre wheat farm in plain English. Powered by edge rules and live telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 font-semibold text-xs transition-colors flex items-center gap-1.5"
            title="Reset conversation"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
        </div>
      </div>

      {/* ================= 6 QUICK-QUESTION BUTTONS (SECTION 14 REQUIREMENT) ================= */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-600 uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-emerald-700" />
          <span>Quick Farming Questions (Click to Ask):</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => askQuickQuestion(q)}
              className="px-3.5 py-2 rounded-xl bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 border border-stone-200/90 hover:border-emerald-300 text-xs font-medium transition-all shadow-2xs flex items-center gap-1.5 group text-left"
            >
              <span>{q}</span>
              <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>

      {/* ================= MAIN CONVERSATIONAL CHAT CONTAINER ================= */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
        {/* Chat Stream Viewport */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-stone-50/40">
          {chatMessages.map((msg) => {
            const isFarmer = msg.sender === 'farmer';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${isFarmer ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    isFarmer
                      ? 'bg-stone-800 text-white'
                      : 'bg-emerald-700 text-white shadow-emerald-700/20'
                  }`}
                >
                  {isFarmer ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div className="space-y-1.5 min-w-0">
                  <div className={`flex items-center gap-2 ${isFarmer ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-[11px] font-bold text-stone-700">
                      {isFarmer ? 'You (Farmer)' : 'Edge AI Assistant'}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                      isFarmer
                        ? 'bg-stone-900 text-white rounded-tr-xs'
                        : 'bg-white text-stone-800 border border-stone-200/90 rounded-tl-xs'
                    }`}
                  >
                    {msg.text}

                    {/* Embedded Suggestion Action Button */}
                    {!isFarmer && msg.suggestedAction && (
                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-start">
                        <button
                          onClick={() => setActiveTab(msg.suggestedAction!.tab as TabType)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors"
                        >
                          <span>{msg.suggestedAction.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* AI Thinking Animation */}
          {isAiThinking && (
            <div className="flex items-center gap-3 mr-auto max-w-md">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-white border border-stone-200 rounded-tl-xs flex items-center gap-2 text-xs text-stone-500 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
                <span className="font-mono text-[11px] ml-1">Analyzing edge sensor telemetry...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar Form */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4 bg-white border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Type your question here… (e.g., Should I irrigate Zone 2?)"
            className="flex-1 px-4 py-3 rounded-xl bg-stone-50 border border-stone-300/80 focus:border-emerald-600 focus:bg-white focus:outline-hidden text-xs sm:text-sm text-stone-900 transition-all placeholder:text-stone-400"
          />

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isAiThinking}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
              !inputPrompt.trim() || isAiThinking
                ? 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20'
            }`}
          >
            <span>ASK AI</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Knowledge Base Helper Note */}
      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-500 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
        <p className="leading-relaxed">
          <strong className="text-stone-800">Simulated Edge Reasoning: </strong>
          The assistant understands inquiries about soil moisture, irrigation, leaf yellowing, crop health, pest & disease detection, weather, and zone-specific actions for Zone 1 and Zone 2 without any external cloud API calls.
        </p>
      </div>
    </div>
  );
};
