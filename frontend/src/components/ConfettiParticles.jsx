import React from 'react';

/**
 * Sparse, elegant pink + mustard confetti particles
 * Rendered strictly on Hero and Ready to Book CTA only
 */
export default function ConfettiParticles({ count = 14, className = '' }) {
  // Pre-calculated static or deterministic positions to avoid SSR/hydration flickers
  const particles = [
    { top: '12%', left: '8%', size: 7, color: '#FF1E83', shape: 'diamond', rot: '15deg', opacity: 0.85 },
    { top: '24%', left: '16%', size: 5, color: '#F59E0B', shape: 'circle', rot: '0deg', opacity: 0.9 },
    { top: '8%', right: '14%', size: 8, color: '#FF1E83', shape: 'rect', rot: '45deg', opacity: 0.8 },
    { top: '18%', right: '8%', size: 6, color: '#F59E0B', shape: 'diamond', rot: '25deg', opacity: 0.85 },
    { top: '72%', left: '10%', size: 6, color: '#F59E0B', shape: 'rect', rot: '60deg', opacity: 0.75 },
    { top: '82%', left: '18%', size: 8, color: '#FF1E83', shape: 'circle', rot: '0deg', opacity: 0.9 },
    { top: '78%', right: '12%', size: 7, color: '#FF1E83', shape: 'diamond', rot: '35deg', opacity: 0.85 },
    { top: '88%', right: '22%', size: 5, color: '#F59E0B', shape: 'circle', rot: '0deg', opacity: 0.8 },
    { top: '45%', left: '4%', size: 5, color: '#FF1E83', shape: 'rect', rot: '12deg', opacity: 0.7 },
    { top: '52%', right: '5%', size: 6, color: '#F59E0B', shape: 'diamond', rot: '50deg', opacity: 0.8 },
    { top: '92%', left: '32%', size: 6, color: '#FF1E83', shape: 'circle', rot: '0deg', opacity: 0.8 },
    { top: '14%', left: '48%', size: 4, color: '#F59E0B', shape: 'diamond', rot: '30deg', opacity: 0.75 },
    { top: '85%', right: '40%', size: 5, color: '#FF1E83', shape: 'rect', rot: '20deg', opacity: 0.8 },
    { top: '35%', right: '18%', size: 4, color: '#F59E0B', shape: 'circle', rot: '0deg', opacity: 0.7 },
  ];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.slice(0, count).map((p, idx) => {
        const style = {
          position: 'absolute',
          top: p.top,
          left: p.left,
          right: p.right,
          width: `${p.size}px`,
          height: `${p.shape === 'rect' ? p.size * 1.6 : p.size}px`,
          backgroundColor: p.color,
          borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'diamond' ? '1px' : '2px',
          transform: `rotate(${p.rot})`,
          opacity: p.opacity,
          boxShadow: `0 0 8px ${p.color}40`,
        };

        return <span key={idx} style={style} className="animate-pulse duration-1000" />;
      })}
    </div>
  );
}
