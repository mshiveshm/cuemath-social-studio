'use client';

import { Wand2, Sparkles, Monitor, Download } from 'lucide-react';

export default function WelcomeState() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center h-full p-8">
      {/* Icon Container */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #FF6B35, #6B4EFF)',
        }}
      >
        <Wand2 className="w-10 h-10 text-white" />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-white">Turn Ideas Into Creatives</h1>

      {/* Subtext */}
      <p className="text-white/50 text-sm max-w-xs">
        Type your content idea and click Generate Creative to get started
      </p>

      {/* Feature Cards */}
      <div className="flex gap-3 mt-2">
        {/* Card 1 */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 w-32">
          <Sparkles className="w-5 h-5 text-orange-500" />
          <p className="text-white/70 text-xs text-center">AI Content</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 w-32">
          <Monitor className="w-5 h-5 text-orange-500" />
          <p className="text-white/70 text-xs text-center">3 Formats</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 w-32">
          <Download className="w-5 h-5 text-orange-500" />
          <p className="text-white/70 text-xs text-center">Export Ready</p>
        </div>
      </div>

      {/* Example Idea Box */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 max-w-sm mt-2">
        <p className="text-white/40 text-xs mb-1">Try this idea:</p>
        <p className="italic text-white/70 text-sm">
          Carousel for parents about why kids forget what they learn
        </p>
      </div>
    </div>
  );
}
