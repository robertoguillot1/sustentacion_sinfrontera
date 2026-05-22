import React from 'react';

export default function SlideTemplate({ title, subtitle, gradientText, children, layout = 'split' }) {
  return (
    <div className="slide-wrap">
      {/* Slide Header */}
      <header className="slide-header" style={{ userSelect: 'none' }}>
        <h2 className="slide-label">
          {subtitle}
        </h2>
        <h1 className="slide-title">
          {title} {gradientText && <span className="grad-text">{gradientText}</span>}
        </h1>
      </header>

      {/* Slide Body */}
      <div
        className={layout === 'split' ? 'slide-body' : undefined}
        style={
          layout !== 'split'
            ? { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
}
