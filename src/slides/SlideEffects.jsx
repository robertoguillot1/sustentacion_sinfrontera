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
    padding: '1rem',
    borderRadius: '0.75rem',
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const activeCardStyle = {
    ...cardBaseStyle,
    background: 'rgba(76, 5, 25, 0.2)',
    borderColor: '#f43f5e',
    boxShadow: '0 10px 25px rgba(76, 5, 25, 0.2)',
    transform: 'scale(1.01)'
  };

  const inactiveCardStyle = {
    ...cardBaseStyle,
    background: 'rgba(15, 23, 42, 0.6)',
    borderColor: 'rgba(30, 41, 59, 0.8)'
  };

  return (
    <SlideTemplate 
      subtitle="Consecuencias Críticas" 
      title="Cosas Malas e" 
      gradientText="Impactos Negativos"
      layout="split"
    >
      
      {/* Left Column: Interactive Stats Cards */}
      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: '#cbd5e1', fontSize: '0.875rem', margin: 0 }}>
          Estas enfermedades no solo causan sufrimiento animal; destruyen la viabilidad económica de las fincas ganaderas. Haz clic en las pérdidas para analizar su impacto:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          
          {/* Reproduction Card */}
          <div 
            onClick={() => setSelectedStat('reproduction')}
            style={selectedStat === 'reproduction' ? activeCardStyle : inactiveCardStyle}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(244, 63, 94, 0.1)', color: '#fb7185', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={18} />
              </div>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.875rem' }}>Pérdida Reproductiva y Malformaciones</span>
            </div>
            <span className="glow-purple" style={{ fontSize: '1.25rem', fontWeight: 900, color: '#f43f5e' }}>-45%</span>
          </div>

          {/* Milk Card */}
          <div 
            onClick={() => setSelectedStat('milk')}
            style={selectedStat === 'milk' ? activeCardStyle : inactiveCardStyle}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingDown size={18} />
              </div>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.875rem' }}>Pérdida de Peso y Caída Láctea</span>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#f59e0b' }}>-30%</span>
          </div>

          {/* Comercial Card */}
          <div 
            onClick={() => setSelectedStat('comercial')}
            style={selectedStat === 'comercial' ? activeCardStyle : inactiveCardStyle}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(0, 229, 255, 0.1)', color: '#00e5ff', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ban size={18} />
              </div>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.875rem' }}>Cierre Comercial e ICA (Fronteras)</span>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#00e5ff' }}>Bloqueo</span>
          </div>

        </div>
      </div>

      {/* Right Column: Graphic representation */}
      <div style={{ flex: 1, width: '100%' }}>
        <div className="glass animate-in" style={{
          padding: '1.5rem',
          borderColor: 'rgba(244, 63, 94, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          gap: '1rem'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fb7185', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.25rem' }}>
              Análisis de Pérdidas
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: '0.75rem' }}>
              {stats[selectedStat].title}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              {stats[selectedStat].desc}
            </p>

            <div style={{ padding: '1rem', background: 'rgba(2, 6, 23, 0.6)', border: '1px solid rgba(30, 41, 59, 0.8)', borderRadius: '0.75rem' }}>
              <div style={{ fontSize: '0.625rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                🔬 Observación Clínica Auxiliar:
              </div>
              <div style={{ fontSize: '0.75rem', color: '#fda4af', fontWeight: 500, lineHeight: 1.6 }}>
                {stats[selectedStat].highlight}
              </div>
            </div>
          </div>

          {/* Graphic Bar Simulation */}
          <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(30, 41, 59, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.375rem', fontWeight: 700 }}>
                <span>Gravedad del Impacto</span>
                <span>{selectedStat === 'reproduction' ? 'Crítico (85%)' : selectedStat === 'milk' ? 'Alto (65%)' : 'Severo (100%)'}</span>
              </div>
              <div className="progress-track" style={{ height: '0.5rem', borderRadius: '999px' }}>
                <div 
                  className="progress-fill"
                  style={{
                    width: selectedStat === 'reproduction' ? '85%' : selectedStat === 'milk' ? '65%' : '100%',
                    background: 'linear-gradient(to right, #e11d48, #f59e0b)',
                    height: '100%',
                    borderRadius: '999px',
                    transition: 'width 1s ease'
                  }}
                />
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.5625rem', color: '#64748b', display: 'block' }}>PÉRDIDA ESTIMADA</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff' }}>{stats[selectedStat].value}</span>
            </div>
          </div>

        </div>
      </div>

    </SlideTemplate>
  );
}
