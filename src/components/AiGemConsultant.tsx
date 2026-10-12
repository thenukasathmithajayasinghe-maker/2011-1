import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Brain, Zap, Send, RefreshCw, User, Bot, AlertCircle, Copy, Check, Flame } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  modelUsed?: string;
  thinkingEnabled?: boolean;
  timestamp: string;
}

export const AiGemConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Greetings. I am the **THENUKA AI GEM CONSULTANT** for **THENUKA SATHMITHA GEMS**. 

I am equipped to provide advanced laboratory-grade gemological insights regarding:
- **Ceylon Corundum Authenticity:** Unheated verification, rutile silk analysis, and Geuda heat detection.
- **Sri Lankan Provenance:** Illam stratigraphy of Ratnapura, Pelmadulla, Balangoda, Elahera, and Meetiyagoda.
- **Optical & Spectroscopic Diagnostics:** Refractometry (RI / Birefringence), pleochroic dichroscope axes, UV fluorescence, and Raman/LA-ICP-MS signatures.
- **Market Appraisals:** 4Cs grading, rarity premiums, and international certification standards.

How may I assist your gemological inquiry today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gemini-3.1-pro-preview' | 'gemini-3.5-flash' | 'gemini-3.1-flash-lite'>('gemini-3.5-flash');
  const [enableThinking, setEnableThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickPrompts = [
    'How to verify unheated status in a Ceylon Blue Sapphire?',
    'What are the strict color parameters of a true Balangoda Padparadscha?',
    'Diagnostic differences between natural and Verneuil synthetic ruby?',
    'Explain the geological formation of Illam gravels in Ratnapura.'
  ];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputPrompt('');
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Send conversation history to backend Express API
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, content: m.content })),
          model: enableThinking ? 'gemini-3.1-pro-preview' : selectedModel,
          enableThinking: enableThinking
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to communicate with AI Consultant');
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        modelUsed: data.modelUsed,
        thinkingEnabled: data.thinkingEnabled,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Unable to connect to AI server. Please verify your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Chat history reset. How may I assist your gemological analysis today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="w-full rounded-2xl glass-panel-elevated border border-[#D4AF37]/30 shadow-2xl flex flex-col h-[700px] overflow-hidden text-white">
      {/* Top Header / Model Controls */}
      <div className="px-5 py-4 border-b border-[#D4AF37]/20 bg-[#0D1016]/95 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8A6B0A] flex items-center justify-center text-[#050608] shadow-lg shadow-[#D4AF37]/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-bold text-white text-base tracking-wide">
                THENUKA AI GEM CONSULTANT
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/30">
                GIA & Gübelin Calibrated
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8]">
              Autonomous Gemological Identification & Laboratory Assistant
            </p>
          </div>
        </div>

        {/* Model & Thinking Mode Selector */}
        <div className="flex items-center gap-2">
          {/* High Thinking Toggle (gemini-3.1-pro-preview with ThinkingLevel.HIGH) */}
          <button
            type="button"
            onClick={() => {
              const nextState = !enableThinking;
              setEnableThinking(nextState);
              if (nextState) {
                setSelectedModel('gemini-3.1-pro-preview');
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              enableThinking
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#050608] border-[#FFF6D6] shadow-lg shadow-[#D4AF37]/30 font-bold'
                : 'bg-white/5 text-[#94A3B8] border-white/10 hover:text-white hover:border-[#D4AF37]/40'
            }`}
            title="Enable Deep Reasoning Mode for Complex Spectroscopy & Laboratory Treatment Identification"
          >
            <Brain className={`w-3.5 h-3.5 ${enableThinking ? 'text-[#050608] animate-pulse' : 'text-[#D4AF37]'}`} />
            <span>High Thinking {enableThinking ? 'Active' : 'Mode'}</span>
          </button>

          {/* Model Dropdown */}
          <select
            value={enableThinking ? 'gemini-3.1-pro-preview' : selectedModel}
            disabled={enableThinking}
            onChange={(e) => setSelectedModel(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-lg text-xs bg-[#141824] border border-[#D4AF37]/30 text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37] disabled:opacity-60"
          >
            <option value="gemini-3.5-flash">Gemini 3.5 Flash (General)</option>
            <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Complex)</option>
            <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash-Lite (Fast)</option>
          </select>

          <button
            type="button"
            onClick={clearChat}
            title="Reset Chat"
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Thread (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-md ${
                  isUser
                    ? 'bg-[#1E2538] text-[#F3E5AB] border border-white/10'
                    : 'bg-gradient-to-br from-[#D4AF37] to-[#997914] text-[#050608]'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`rounded-2xl p-4 text-xs leading-relaxed border relative group ${
                  isUser
                    ? 'bg-[#141A28] border-[#D4AF37]/30 text-white'
                    : 'bg-[#0D1016]/90 border-[#D4AF37]/20 text-[#CBD5E1] shadow-xl'
                }`}
              >
                {/* Header Tag in Message */}
                <div className="flex items-center justify-between gap-4 mb-1.5 text-[10px] text-[#94A3B8]">
                  <span className="font-semibold text-[#D4AF37]">
                    {isUser ? 'Inquirer' : 'Thenuka AI Gemologist'}
                  </span>
                  <div className="flex items-center gap-2">
                    {msg.thinkingEnabled && (
                      <span className="px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/30 flex items-center gap-1">
                        <Brain className="w-2.5 h-2.5" /> High Thinking
                      </span>
                    )}
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                {/* Content (Render formatted text) */}
                <div className="prose prose-invert prose-xs max-w-none space-y-2 whitespace-pre-wrap">
                  {msg.content}
                </div>

                {/* Copy Button */}
                {!isUser && (
                  <button
                    type="button"
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/40 text-[#94A3B8] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy message"
                  >
                    {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-[#50C878]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-xl mr-auto">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#997914] flex items-center justify-center text-[#050608] shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="rounded-2xl p-4 bg-[#0D1016]/90 border border-[#D4AF37]/20 text-xs text-[#CBD5E1] flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span>
                {enableThinking
                  ? 'Engaging Gemini 3.1 Pro High Thinking reasoning on spectroscopic & crystalline parameters...'
                  : 'Synthesizing gemological diagnosis...'}
              </span>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-5 py-2 border-t border-[#D4AF37]/15 bg-[#0A0D14] flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-[10px] text-[#D4AF37] font-semibold shrink-0">Inquiries:</span>
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(q)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-full text-[10px] text-[#CBD5E1] bg-white/5 hover:bg-[#D4AF37]/15 hover:text-[#F3E5AB] border border-white/5 hover:border-[#D4AF37]/30 transition-all shrink-0 whitespace-nowrap disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box Footer */}
      <div className="p-4 border-t border-[#D4AF37]/20 bg-[#0D1016] shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask anything (e.g. identify red crystal RI 1.765, detect beryllium diffusion in sapphire, Ratnapura geuda history)..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#141824] border border-[#D4AF37]/30 text-white placeholder-[#64748B] text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="px-5 py-2.5 rounded-xl gold-gradient-btn text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
          >
            <span>Consult</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
