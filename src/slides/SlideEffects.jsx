import React, { useState } from 'react';
import SlideTemplate from '../components/SlideTemplate';
import { AlertCircle, TrendingDown, DollarSign, Ban } from 'lucide-react';

export default function SlideEffects() {
  const [selectedStat, setSelectedStat] = useState('reproduction');

  const stats = {
    reproduction: {
      title: "Impacto Reproductivo (Bovinos)",
      value: "-45%",
      desc: "Disminución drástica en la tasa de preñez, reabsorciones embrionarias y abortos espontáneos masivos en vacas gestantes afectadas por el virus de la Lengua Azul.",
      highlight: "Terneros nacidos con malformaciones congénitas graves (hidranencefalia o 'terneros tontos')."
    },
    milk: {
      title: "Producción de Leche y Carne",
      value: "-30%",
      desc: "La salivación profusa, el dolor agudo y la rigidez de la lengua impiden que el animal consuma alimento por días (anorexia mecánica), provocando pérdida extrema de peso.",
      highlight: "Reducción persistente del volumen de ordeño de hasta un 30% a 40% durante toda la lactancia."
    },
    comercial: {
      title: "Bloqueos y Restricciones",
      value: "100%",
      desc: "Al ser una enfermedad de notificación obligatoria a la OMSA, la detección de un solo caso positivo de Lengua Azul bloquea inmediatamente las exportaciones de ganado en pie.",
      highlight: "Cuarentena obligatoria del predio y multas severas si no se reporta a las entidades de control local (ej. ICA en Colombia)."
    }
  };

  const cardBaseStyle = {
    padding: '1.25rem',
    borderRadius: '1rem',
    border: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem'
  };

  const activeCardStyle = {
    ...cardBaseStyle,
    background: 'rgba(251, 191, 36, 0.12)',
    borderColor: '#fbbf24',
    boxShadow: '0 8px 25px rgba(251, 191, 36, 0.2)',
    transform: 'scale(1.02)'
  };

  const inactiveCardStyle = {
    ...cardBaseStyle,
    background: 'rgba(21, 51, 36, 0.45)',
    borderColor: 'rgba(161, 123, 88, 0.3)',
    opacity: 0.85
  };

  return (
    <SlideTemplate 
      subtitle="Consecuencias Críticas" 
      title="Cosas Malas e" 
      gradientText="Impactos Negativos"
      layout="split"
    >
      
      {/* Left Column: Interactive Stats Cards */}
      <div style={{ flex: 1.1, width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <p style={{ color: '#f1f5f9', fontSize: '1.45rem', lineHeight: '1.6', margin: 0 }}>
          Estas enfermedades no solo causan sufrimiento animal; destruyen la viabilidad económica de las fincas ganaderas. Haz clic en las pérdidas para analizar su impacto:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Reproduction Card */}
          <div 
            onClick={() => setSelectedStat('reproduction')}
            style={selectedStat === 'reproduction' ? activeCardStyle : inactiveCardStyle}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.65rem', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={24} />
              </div>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: '1.4rem' }}>Pérdida Reproductiva y Malformaciones</span>
            </div>
            <span style={{ fontSize: '1.65rem', fontWeight: 900, color: '#ef4444' }}>-45%</span>
          </div>

          {/* Milk Card */}
          <div 
            onClick={() => setSelectedStat('milk')}
            style={selectedStat === 'milk' ? activeCardStyle : inactiveCardStyle}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.65rem', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingDown size={24} />
              </div>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: '1.4rem' }}>Pérdida de Peso y Caída Láctea</span>
            </div>
            <span style={{ fontSize: '1.65rem', fontWeight: 900, color: '#fbbf24' }}>-30%</span>
          </div>

          {/* Comercial Card */}
          <div 
            onClick={() => setSelectedStat('comercial')}
            style={selectedStat === 'comercial' ? activeCardStyle : inactiveCardStyle}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.65rem', background: 'rgba(161, 123, 88, 0.25)', color: '#a17b58', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ban size={24} />
              </div>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: '1.4rem' }}>Cierre Comercial e ICA (Fronteras)</span>
            </div>
            <span style={{ fontSize: '1.65rem', fontWeight: 900, color: '#4ade80' }}>Bloqueo</span>
          </div>

        </div>
      </div>

      {/* Right Column: Graphic representation */}
      <div style={{ flex: 0.9, width: '100%' }}>
        <div className="glass animate-in" style={{
          padding: '2rem',
          borderColor: selectedStat === 'reproduction' ? '#ef4444' : selectedStat === 'milk' ? '#fbbf24' : '#4ade80',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          gap: '1.5rem',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)'
        }}>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '0.5rem' }}>
              Análisis de Pérdidas
            </span>
            <h3 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: '1rem' }}>
              {stats[selectedStat].title}
            </h3>
            <p style={{ color: '#e2e8f0', fontSize: '1.35rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {stats[selectedStat].desc}
            </p>

            <div style={{ padding: '1.25rem', background: 'rgba(9, 19, 14, 0.75)', border: '2px solid rgba(161, 123, 88, 0.35)', borderRadius: '0.85rem' }}>
              <div style={{ fontSize: '0.95rem', color: '#fbbf24', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                🔬 Observación Clínica Auxiliar:
              </div>
              <div style={{ fontSize: '1.3rem', color: '#fef3c7', fontWeight: 500, lineHeight: 1.6 }}>
                {stats[selectedStat].highlight}
              </div>
            </div>
          </div>

          {/* Graphic Bar Simulation */}
          <div style={{ paddingTop: '1.25rem', borderTop: '2px solid rgba(161, 123, 88, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: 700 }}>
                <span>Gravedad del Impacto</span>
                <span style={{ color: '#fbbf24' }}>{selectedStat === 'reproduction' ? 'Crítico (85%)' : selectedStat === 'milk' ? 'Alto (65%)' : 'Severo (100%)'}</span>
              </div>
              <div className="progress-track" style={{ height: '0.75rem', borderRadius: '999px', background: 'rgba(9, 19, 14, 0.8)' }}>
                <div 
                  className="progress-fill"
                  style={{
                    width: selectedStat === 'reproduction' ? '85%' : selectedStat === 'milk' ? '65%' : '100%',
                    background: 'linear-gradient(to right, #4ade80, #fbbf24, #ef4444)',
                    height: '100%',
                    borderRadius: '999px',
                    transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              </div>
            </div>
            <div style={{ textAlign: 'right', minWidth: '90px' }}>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', fontWeight: 700 }}>IMPACTO</span>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>{stats[selectedStat].value}</span>
            </div>
          </div>

        </div>
      </div>

    </SlideTemplate>
  );
}
