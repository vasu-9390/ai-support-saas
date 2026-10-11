import React from 'react';
import { Bot, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-2.5 text-white font-extrabold text-lg">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            SynthSupport AI
          </div>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            Enterprise AI customer support and WebRTC voice agent SaaS platform. Resolve tickets 24/7 with zero friction.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> All Systems Operational
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-4">Product</h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#demo" className="hover:text-white transition-colors">AI Support Chat</a></li>
            <li><a href="#voice-demo" className="hover:text-white transition-colors">Voice AI Studio</a></li>
            <li><a href="#features" className="hover:text-white transition-colors">RAG Vector Store</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-4">Resources</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/knowledge-base" className="hover:text-white transition-colors">Documentation</Link></li>
            <li><a href="#integrations" className="hover:text-white transition-colors">API & Webhooks</a></li>
            <li><a href="#faq" className="hover:text-white transition-colors">System Status</a></li>
            <li><Link to="/login" className="hover:text-white transition-colors">Staff Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-4">Company</h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Security & Privacy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Sales</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>© 2026 SynthSupport AI Inc. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Crafted for Enterprise Customer Experience Operations
        </p>
      </div>
    </footer>
  );
};
