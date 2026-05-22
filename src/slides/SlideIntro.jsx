import React from 'react';
import logo from '../assets/media__1779410848960.png';
import { Play, Sparkles } from 'lucide-react';

export default function SlideIntro({ onStart }) {
  return (
    <div className="slide-wrap animate-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '1.5rem', maxWidth: '900px', margin: '0 auto', userSelect: 'none' }}>
      
      {/* Logo Row */}
      <div className="glass" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', padding: '1rem 2rem' }}>
        <img src={logo} alt="Sin Fronteras Logo" style={{ height: '56px', width: 'auto', objectFit: 'contain', background: '#fff', borderRadius: '8px', padding: '4px 10px' }} />
      </div>

      {/* Main Title Section */}
      <h2 className="animate-pulse-slow" style={{ color: '#00e5ff', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        ★ PROYECTO DE SUSTENTACIÓN FINAL ★
      </h2>
      
      <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1.5rem' }}>
        Enfermedades de la <br />
        <span className="glow-cyan" style={{ color: '#00e5ff' }}>Lengua Azul</span> y <span className="glow-purple" style={{ color: '#d946ef' }}>Morada</span> <br />
        <span style={{ color: '#fff' }}>en Bovinos</span>
      </h1>

      <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto 2rem', fontWeight: 500, lineHeight: 1.6 }}>
        Una guía interactiva veterinaria en 3D sobre la patogenia, diagnóstico clínico, consecuencias críticas y medidas de control en rumiantes.
      </p>

      {/* Presenters Box */}
      <div className="glass" style={{ width: '100%', maxWidth: '520px', padding: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '0.7rem', color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>
          Ponentes / Expositores
        </div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
          Roberto Guillot & Valentina Padilla Hoyos
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#94a3b8', borderTop: '1px solid rgba(30,41,59,0.8)', paddingTop: '0.75rem' }}>
          <div>
            <span style={{ fontWeight: 600, color: '#cbd5e1' }}>Curso:</span> Técnico Auxiliar Veterinario
          </div>
          <div>
            <span style={{ fontWeight: 600, color: '#cbd5e1' }}>Institución:</span> Corp. Sin Fronteras
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={onStart}
        className="btn-primary"
        style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}
      >
        <Sparkles size={20} />
        <span>Iniciar Sustentación</span>
        <Play size={18} />
      </button>

    </div>
  );
}
