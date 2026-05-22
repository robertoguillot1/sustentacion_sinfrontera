import React from 'react';
import logo from '../assets/media__1779410848960.png';
import robertoImg from '../assets/avatar_roberto.png';
import valentinaImg from '../assets/avatar_valentina.png';
import { Play, Sparkles } from 'lucide-react';

export default function SlideIntro({ onStart }) {
  return (
    <div className="slide-wrap animate-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem', width: '100%', maxWidth: '1400px', margin: '0 auto', userSelect: 'none' }}>
      
      {/* Logo Row */}
      <div className="glass animate-float" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', padding: '0.8rem 3rem', border: '2.5px solid var(--border-subtle)', borderRadius: '16px', background: 'rgba(21, 51, 36, 0.8)' }}>
        <img src={logo} alt="Sin Fronteras Logo" style={{ height: '85px', width: 'auto', objectFit: 'contain', background: '#fff', borderRadius: '10px', padding: '5px 15px' }} />
      </div>

      {/* Presentation Row: Presenters & Title in the Center */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '2.5rem', width: '100%', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        
        {/* Left Side: Roberto Avatar Card */}
        <div className="glass hover-grow" style={{ width: '310px', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid var(--gold)', borderRadius: '28px', boxShadow: '0 15px 40px rgba(0,0,0,0.6)', textAlign: 'center', background: 'linear-gradient(to bottom, rgba(21, 51, 36, 0.95), rgba(15, 36, 26, 0.98))', transition: 'all 0.3s' }}>
          <div style={{ width: '240px', height: '330px', borderRadius: '20px', overflow: 'hidden', border: '2.5px solid rgba(161, 123, 88, 0.6)', marginBottom: '1.5rem', background: 'radial-gradient(circle, rgba(251, 191, 36, 0.18) 0%, rgba(9, 19, 14, 0.9) 100%)', boxShadow: 'inset 0 0 25px rgba(0,0,0,0.9)' }}>
            <img src={robertoImg} alt="Roberto Guillot" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
          </div>
          <div style={{ fontSize: '1.05rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 900, marginBottom: '0.5rem' }}>
            ★ Expositor
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#fff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Roberto Guillot
          </h2>
          <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', borderTop: '2px solid rgba(161, 123, 88, 0.4)', paddingTop: '1rem', width: '100%', fontWeight: 700 }}>
            Técnico Auxiliar Veterinario
          </div>
        </div>

        {/* Center: Title & Details */}
        <div style={{ flex: '1.2', minWidth: '320px', maxWidth: '680px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 1.5rem' }}>
          <h2 style={{ color: 'var(--gold)', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '1.25rem', textShadow: '0 0 15px rgba(251,191,36,0.35)' }}>
            ★ PROYECTO DE SUSTENTACIÓN FINAL ★
          </h2>
          
          <h1 style={{ fontSize: 'clamp(2.8rem, 5.2vw, 4.4rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1.5rem', color: '#fff', textShadow: '0 4px 12px rgba(0,0,0,0.6)' }}>
            Enfermedades de la <br />
            <span style={{ color: 'var(--cyan)', textShadow: '0 0 35px rgba(74, 222, 128, 0.45)' }}>Lengua Azul</span> y <br />
            <span style={{ color: 'var(--purple-bright)', textShadow: '0 0 35px rgba(251, 191, 36, 0.45)' }}>Lengua Morada</span> <br />
            en Bovinos
          </h1>

          <p style={{ color: '#fff', fontSize: '1.45rem', maxWidth: '600px', margin: '0 auto 2.25rem', fontWeight: 600, lineHeight: 1.6, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Una guía interactiva veterinaria en 3D sobre la patogenia, diagnóstico clínico, consecuencias críticas y medidas de control en rumiantes.
          </p>

          <div style={{ fontSize: '1.25rem', color: '#fff', background: 'rgba(161, 123, 88, 0.25)', padding: '0.75rem 2rem', borderRadius: '30px', border: '2px solid rgba(161, 123, 88, 0.45)', fontWeight: 700, boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
            Institución: <span style={{ color: 'var(--gold)', fontWeight: 900 }}>Corp. Educativa Sin Fronteras</span>
          </div>
        </div>

        {/* Right Side: Valentina Avatar Card */}
        <div className="glass hover-grow" style={{ width: '310px', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid var(--gold)', borderRadius: '28px', boxShadow: '0 15px 40px rgba(0,0,0,0.6)', textAlign: 'center', background: 'linear-gradient(to bottom, rgba(21, 51, 36, 0.95), rgba(15, 36, 26, 0.98))', transition: 'all 0.3s' }}>
          <div style={{ width: '240px', height: '330px', borderRadius: '20px', overflow: 'hidden', border: '2.5px solid rgba(161, 123, 88, 0.6)', marginBottom: '1.5rem', background: 'radial-gradient(circle, rgba(251, 191, 36, 0.18) 0%, rgba(9, 19, 14, 0.9) 100%)', boxShadow: 'inset 0 0 25px rgba(0,0,0,0.9)' }}>
            <img src={valentinaImg} alt="Valentina Padilla Hoyos" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
          </div>
          <div style={{ fontSize: '1.05rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 900, marginBottom: '0.5rem' }}>
            ★ Expositora
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#fff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Valentina Padilla H.
          </h2>
          <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', borderTop: '2px solid rgba(161, 123, 88, 0.4)', paddingTop: '1rem', width: '100%', fontWeight: 700 }}>
            Técnico Auxiliar Veterinario
          </div>
        </div>

      </div>

      {/* Action Button */}
      <button 
        onClick={onStart}
        className="btn-primary animate-pulse-slow"
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem 4rem', borderRadius: '20px', fontSize: '1.4rem', fontWeight: 900, cursor: 'pointer', boxShadow: '0 8px 30px rgba(251,191,36,0.3)' }}
      >
        <Sparkles size={28} />
        <span>Iniciar Sustentación</span>
        <Play size={24} />
      </button>

    </div>
  );
}
