import React, { useState } from 'react';
import SlideTemplate from '../components/SlideTemplate';
import { Bug, ShieldAlert } from 'lucide-react';

export default function SlideCauses() {
  const [selectedDisease, setSelectedDisease] = useState('blue');

  const cardStyle = (isActive, color) => {
    const base = {
      padding: '1.25rem',
      borderRadius: '16px',
      border: '1px solid',
      cursor: 'pointer',
      transition: 'all 0.3s',
    };
    if (!isActive) {
      return { ...base, background: 'rgba(30,41,59,0.4)', borderColor: 'rgba(30,41,59,1)' };
    }
    if (color === 'blue') {
      return { ...base, background: 'rgba(8,47,73,0.15)', borderColor: '#00e5ff', boxShadow: '0 0 15px rgba(0,229,255,0.15)', transform: 'scale(1.02)' };
    }
    return { ...base, background: 'rgba(112,26,117,0.15)', borderColor: '#d946ef', boxShadow: '0 0 15px rgba(217,70,239,0.15)', transform: 'scale(1.02)' };
  };

  const iconBubbleStyle = (isActive, color) => {
    const base = { padding: '0.6rem', borderRadius: '12px' };
    if (!isActive) return { ...base, background: 'rgba(30,41,59,1)', color: '#94a3b8' };
    if (color === 'blue') return { ...base, background: 'rgba(0,229,255,0.15)', color: '#00e5ff' };
    return { ...base, background: 'rgba(217,70,239,0.15)', color: '#d946ef' };
  };

  return (
    <SlideTemplate 
      subtitle="Etiología y Patogenia" 
      title="¿Por qué y cómo se" 
      gradientText="originan?"
      layout="split"
    >
      
      {/* Left Column: Visual Selectable Cards */}
      <div className="slide-col" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Lengua Azul Card Selector */}
        <div 
          onClick={() => setSelectedDisease('blue')}
          style={cardStyle(selectedDisease === 'blue', 'blue')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={iconBubbleStyle(selectedDisease === 'blue', 'blue')}>
              <Bug size={20} />
            </div>
            <div>
              <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>Causas de la Lengua Azul</h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>Origen Viral y Vectorial (Mosquito Culicoides)</p>
            </div>
          </div>
        </div>

        {/* Lengua de Madera Card Selector */}
        <div 
          onClick={() => setSelectedDisease('purple')}
          style={cardStyle(selectedDisease === 'purple', 'purple')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={iconBubbleStyle(selectedDisease === 'purple', 'purple')}>
              <ShieldAlert size={20} />
            </div>
            <div>
              <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>Causas de la Lengua de Madera</h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>Origen Bacteriano Oportunista (Heridas Bucales)</p>
            </div>
          </div>
        </div>

        {/* Veterinary Note */}
        <div style={{ background: 'rgba(15,23,42,0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(30,41,59,1)', fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5 }}>
          ⚠️ <span style={{ fontWeight: 700, color: '#cbd5e1' }}>¡Atención Auxiliares!</span> La Lengua Azul <span style={{ fontWeight: 700, color: '#00e5ff' }}>NO se contagia directamente</span> entre vacas. Si hay un brote, es porque el mosquito vector está presente en la zona picando a todo el hato.
        </div>

      </div>

      {/* Right Column: Dynamic Explanatory Content */}
      <div className="slide-col">
        {selectedDisease === 'blue' ? (
          <div className="glass animate-in" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#00e5ff' }}>
              <Bug size={24} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>Ciclo de la Lengua Azul</h3>
            </div>
            
            <ul className="vet-list">
              <li>
                <strong style={{ color: '#fff' }}>Agente Causal:</strong> Virus de la Lengua Azul (BTV), de la familia <em>Reoviridae</em>. Existen más de 27 serotipos diferentes.
              </li>
              <li>
                <strong style={{ color: '#fff' }}>Vector Clave:</strong> Transmitido por mosquitos diminutos del género <span style={{ fontStyle: 'italic', color: '#00e5ff', fontWeight: 600 }}>Culicoides</span>. El mosquito pica a un animal infectado, incuba el virus y lo transmite en su siguiente picadura.
              </li>
              <li>
                <strong style={{ color: '#fff' }}>Patogenia:</strong> El virus ingresa e invade las células endoteliales (las que recubren el interior de los vasos sanguíneos). Causa micro-trombos, congestión de fluidos y hemorragias. Al romperse el flujo de oxígeno, los tejidos se tornan azules (cianosis).
              </li>
              <li>
                <strong style={{ color: '#fff' }}>Clima Favorito:</strong> Regiones húmedas y cálidas donde hay agua estancada y barro, los cuales sirven de criadero ideal para el mosquito.
              </li>
            </ul>
          </div>
        ) : (
          <div className="glass animate-in" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#d946ef' }}>
              <ShieldAlert size={24} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>Mecanismo de Lengua de Madera</h3>
            </div>

            <ul className="vet-list purple">
              <li>
                <strong style={{ color: '#fff' }}>Agente Causal:</strong> Bacteria Gram-negativa llamada <span style={{ fontStyle: 'italic', color: '#d946ef', fontWeight: 600 }}>Actinobacillus lignieresii</span>. Es un habitante normal de la boca del ganado.
              </li>
              <li>
                <strong style={{ color: '#fff' }}>Forma de Ingreso:</strong> La bacteria no puede invadir tejidos sanos. Necesita una <span style={{ fontWeight: 700, color: '#d946ef' }}>lesión o abrasión en la mucosa de la boca</span>.
              </li>
              <li>
                <strong style={{ color: '#fff' }}>Disparadores Comunes:</strong> Forrajes duros, pastos fibrosos o leñosos con espinas, rastrojos duros, o heridas causadas por alambres o dientes dañados.
              </li>
              <li>
                <strong style={{ color: '#fff' }}>Patogenia:</strong> Al ingresar, la bacteria genera una reacción inflamatoria granulomatosa severa. El tejido muscular de la lengua se reemplaza por tejido fibroso de cicatrización extremadamente duro, haciendo que la lengua pierda su movilidad por completo.
              </li>
            </ul>
          </div>
        )}
      </div>

    </SlideTemplate>
  );
}
