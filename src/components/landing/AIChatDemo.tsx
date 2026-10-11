import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, CheckCircle, RefreshCw, ThumbsUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const AIChatDemo: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'customer',
      text: 'Hi, I need to check the status of my order #ORD-98231 and request an invoice copy.',
      time: '10:42 AM',
    },
    {
      id: '2',
      sender: 'ai',
      text: 'Hello! I can definitely help with order #ORD-98231. I am executing custom tool `getOrderStatus` and pulling your invoice right now.',
      time: '10:42 AM',
      tool: '⚡ Executed tool getOrderStatus -> Status: Out for delivery today by 3 PM.',
    },
    {
      id: '3',
      sender: 'ai',
      text: 'Your order #ORD-98231 is out for delivery today! Here is your generated invoice PDF: `invoice_ORD-98231.pdf` (Amount: $1,499.00). Would you like me to send a notification to your email as well?',
      time: '10:43 AM',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), sender: 'customer', text: input, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `I have received your request regarding "${input}". I am processing it through our RAG vector store and account backend. Your ticket is updated!`,
        time: 'Just now',
        tool: '✓ Completed knowledge retrieval with 96% confidence score',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <section id="demo" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="info" className="mb-3">Live Interactive Demo</Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Experience AI Support in Action
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-3 text-base">
          Test how our AI agent executes custom tools, searches orders, and resolves customer issues in real-time.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="shadow-2xl border-slate-200/80 dark:border-slate-800 p-0 overflow-hidden">
          {/* Chat Header */}
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Aria - Customer Support AI Agent</h4>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Streaming Responses
                </p>
              </div>
            </div>
            <Badge variant="purple" size="sm">Autonomous Mode</Badge>
          </div>

          {/* Messages Stream */}
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="max-w-md space-y-1.5">
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      m.sender === 'customer'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p>{m.text}</p>
                    {m.tool && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-mono text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>{m.tool}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 block px-1">{m.time}</span>
                </div>
                {m.sender === 'customer' && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-white font-bold text-xs">
                    You
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-indigo-500 font-mono">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Aria AI is executing tool and generating response...
              </div>
            )}
          </div>

          {/* Quick Input Bar */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Try asking: 'Can you issue a refund for order ORD-98231?'..."
              className="flex-1 px-4 py-2.5 text-sm bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Button variant="primary" onClick={handleSend} icon={<Send className="w-4 h-4" />}>
              Send
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};
