import React, { useState } from 'react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { AIChatDemo } from '@/components/landing/AIChatDemo';
import { VoiceAIDemo } from '@/components/landing/VoiceAIDemo';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { IntegrationsSection } from '@/components/landing/IntegrationsSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { Footer } from '@/components/landing/Footer';
import { Modal } from '@/components/ui/Modal';
import { Bot, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const LandingPage: React.FC = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <LandingNavbar />
      
      <main className="flex-1">
        <HeroSection onOpenDemoModal={() => setIsDemoModalOpen(true)} />
        <AIChatDemo />
        <VoiceAIDemo />
        <FeaturesGrid />
        <HowItWorks />
        <IntegrationsSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
      </main>

      <Footer />

      {/* AI Demo Video Modal */}
      <Modal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} title="SynthSupport AI 2.0 Walkthrough Demo">
        <div className="space-y-4 text-center py-4">
          <div className="w-full h-64 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 text-slate-400 relative overflow-hidden group">
            <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all cursor-pointer">
              <Play className="w-8 h-8 fill-white ml-1" />
            </div>
            <p className="absolute bottom-4 text-xs font-mono text-slate-400">
              Interactive Voice & Chat Agent Demonstration (2:45)
            </p>
          </div>
          <p className="text-xs text-slate-400">
            Learn how SynthSupport AI automates 78% of incoming customer support tickets using RAG vector indexing and sub-200ms WebRTC voice calls.
          </p>
          <Button variant="primary" className="w-full" onClick={() => setIsDemoModalOpen(false)}>
            Close Video Walkthrough
          </Button>
        </div>
      </Modal>
    </div>
  );
};
