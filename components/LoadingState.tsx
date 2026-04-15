'use client';

import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  submessage?: string;
}

export default function LoadingState({
  message = 'Generating your creative...',
  submessage = 'This may take a few seconds',
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 animate-pulse">
      <Loader2 className="w-12 h-12 text-[#FF6B35] animate-spin" />
      <h2 className="text-xl font-medium text-white">{message}</h2>
      <p className="text-sm text-gray-400">{submessage}</p>
    </div>
  );
}
