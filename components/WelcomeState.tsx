'use client';

import { Wand2, Sparkles, Monitor, Download } from 'lucide-react';

export default function WelcomeState() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '40px',
        gap: '32px',
        textAlign: 'center',
      }}
    >
      {/* Section 1 - Icon and Heading */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        {/* Icon wrapper */}
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #FF6B35, #6B4EFF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(255,107,53,0.3)',
          }}
        >
          <Wand2 size={32} color="white" />
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '800',
            color: 'white',
            margin: 0,
            lineHeight: '1.2',
          }}
        >
          Turn Ideas Into Creatives
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.45)',
            margin: 0,
            maxWidth: '360px',
            lineHeight: '1.6',
          }}
        >
          Type your content idea on the left and click Generate Creative to get started
        </p>
      </div>

      {/* Section 2 - Feature Cards */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 20px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px',
            width: '120px',
          }}
        >
          <Sparkles size={22} color="#FF6B35" />
          <div
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.6)',
              fontWeight: '500',
              lineHeight: '1.4',
              textAlign: 'center',
            }}
          >
            AI Generated Content
          </div>
        </div>

        {/* Card 2 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 20px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px',
            width: '120px',
          }}
        >
          <Monitor size={22} color="#FF6B35" />
          <div
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.6)',
              fontWeight: '500',
              lineHeight: '1.4',
              textAlign: 'center',
            }}
          >
            3 Format Types
          </div>
        </div>

        {/* Card 3 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 20px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px',
            width: '120px',
          }}
        >
          <Download size={22} color="#FF6B35" />
          <div
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.6)',
              fontWeight: '500',
              lineHeight: '1.4',
              textAlign: 'center',
            }}
          >
            Instant Export
          </div>
        </div>
      </div>

      {/* Section 3 - Example Idea Box */}
      <div
        style={{
          background: 'rgba(255,107,53,0.06)',
          border: '1px solid rgba(255,107,53,0.15)',
          borderRadius: '16px',
          padding: '16px 24px',
          maxWidth: '420px',
          width: '100%',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.35)',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '8px',
          }}
        >
          Try this idea:
        </div>
        <div
          style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.7)',
            fontStyle: 'italic',
            lineHeight: '1.5',
          }}
        >
          Carousel for parents about why kids forget what they learn
        </div>
      </div>
    </div>
  );
}
