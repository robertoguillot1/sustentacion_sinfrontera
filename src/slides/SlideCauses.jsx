import React, { useState } from 'react';
import SlideTemplate from '../components/SlideTemplate';
import mediaCausesBlue from '../assets/media__1779410856336.png';
import mediaCausesWood from '../assets/media__1779410872286.png';
import { Bug, ShieldAlert } from 'lucide-react';

export default function SlideCauses() {
  const [selectedDisease, setSelectedDisease] = useState('blue');

  const cardStyle = (isActive, color) => {
    const base = {
      padding: '1.65rem',
      borderRadius: '24px',
      border: '2.5px solid',
      cursor: 'pointer',
      transition: 'all 0.3s',
      background: isActive ? 'rgba(140, 98, 57, 0.25)' : 'rgba(9, 19, 14, 0.65)',
      borderColor: isActive ? 'var(--gold)' : 'var(--border-subtle)',
      boxShadow: isActive ? '0 10px 25px rgba(251, 191, 36, 0.15)' : 'none',
      transform: isActive ? 'translateY(-2px)' : 'none'
    };
    return base;
  };

  const iconBubbleStyle = (isActive, color) => {
    const base = { padding: '0.9rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
    if (!isActive) return { ...base, background: 'rgba(9, 19, 14, 0.8)', color: 'var(--text-muted)' };
    return { ...base, background: 'rgba(251, 191, 36, 0.25)', color: 'var(--gold)' };
  };

  return (
    <SlideTemplate 
      subtitle="Etiología y Patogenia" 
      title="¿Por qué y cómo se" 
      gradientText="originan?"
      layout="split"
    >
      
      {/* Left Column: Visual Selectable Cards */}
      <div className="slide-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        
        {/* Lengua Azul Card Selector */}
        <div 
          onClick={() => setSelectedDisease('blue')}
          style={cardStyle(selectedDisease === 'blue', 'blue')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0.25rem' }}>
            <div style={iconBubbleStyle(selectedDisease === 'blue', 'blue')}>
              <Bug size={32} />
            </div>
            <div>
              <h3 style={{ fontWeight: 900, color: '#fff', fontSize: '1.85rem', marginBottom: '0.4rem' }}>Causas de la Lengua Azul</h3>
              <p style={{ fontSize: '1.45rem', color: 'var(--text-muted)', margin: 0 }}>Origen Viral y Vectorial (Mosquito Culicoides)</p>
            </div>
          </div>
        </div>

        {/* Lengua de Madera Card Selector */}
        <div 
          onClick={() => setSelectedDisease('purple')}
          style={cardStyle(selectedDisease === 'purple', 'purple')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0.25rem' }}>
            <div style={iconBubbleStyle(selectedDisease === 'purple', 'purple')}>
              <ShieldAlert size={32} />
            </div>
            <div>
              <h3 style={{ fontWeight: 900, color: '#fff', fontSize: '1.85rem', marginBottom: '0.4rem' }}>Causas de la Lengua de Madera</h3>
              <p style={{ fontSize: '1.45rem', color: 'var(--text-muted)', margin: 0 }}>Origen Bacteriano Oportunista (Heridas Bucales)</p>
            </div>
          </div>
        </div>

        {/* Veterinary Note */}
        <div style={{ background: 'rgba(9, 19, 14, 0.7)', padding: '1.75rem 2rem', borderRadius: '20px', border: '2px solid var(--border-subtle)', fontSize: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          ⚠️ <span style={{ fontWeight: 900, color: 'var(--gold)' }}>¡Atención Auxiliares!</span> La Lengua Azul <span style={{ fontWeight: 900, color: 'var(--cyan)' }}>NO se contagia directamente</span> entre vacas. Si hay un brote, es porque el mosquito vector está presente en la zona picando a todo el hato.
        </div>

      </div>

      {/* Right Column: Dynamic Explanatory Content with Realistic Image */}
      <div className="slide-col">
        {selectedDisease === 'blue' ? (
          <div className="glass animate-in" style={{ padding: '2.25rem', background: 'rgba(21, 51, 36, 0.55)', borderColor: 'var(--border-subtle)', borderRadius: '24px' }}>
            
            {/* Real/Generated Disease Image */}
            <img 
              src={mediaCausesBlue} 
              alt="Etiología de Lengua Azul" 
              style={{ 
                width: '100%', 
                height: '180px', 
                objectFit: 'cover', 
                borderRadius: '16px', 
                border: '2px solid rgba(74, 222, 128, 0.35)', 
                marginBottom: '1.5rem',
                boxShadow: '0 8px 25px rgba(0,0,0,0.4)' 
              }} 
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem', color: 'var(--cyan)' }}>
              <Bug size={32} />
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: 0 }}>Ciclo de la Lengua Azul</h3>
            </div>
            
            <ul className="vet-list" style={{ fontSize: '1.45rem', lineHeight: 1.65 }}>
              <li>
                <strong style={{ color: '#fff' }}>Agente Causal:</strong> Virus de la Lengua Azul (BTV), de la familia <em>Reoviridae</em>. Existen más de 27 serotipos diferentes.
              </li>
              <li>
                <strong style={{ color: '#fff' }}>Vector Clave:</strong> Transmitido por mosquitos diminutos del género <span style={{ fontStyle: 'italic', color: 'var(--cyan)', fontWeight: 800 }}>Culicoides</span>. El mosquito pica a un animal infectado, incuba el virus y lo transmite en su siguiente picadura.
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
          <div className="glass animate-in" style={{ padding: '2.25rem', background: 'rgba(21, 51, 36, 0.55)', borderColor: 'var(--border-subtle)', borderRadius: '24px' }}>
            
            {/* Real/Generated Disease Image */}
            <img 
              src={mediaCausesWood} 
              alt="Etiología de Lengua de Madera" 
              style={{ 
                width: '100%', 
                height: '180px', 
                objectFit: 'cover', 
                borderRadius: '16px', 
                border: '2px solid rgba(251, 191, 36, 0.35)', 
                marginBottom: '1.5rem',
                boxShadow: '0 8px 25px rgba(0,0,0,0.4)' 
              }} 
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem', color: 'var(--gold)' }}>
              <ShieldAlert size={32} />
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: 0 }}>Mecanismo de Lengua de Madera</h3>
            </div>

            <ul className="vet-list purple" style={{ fontSize: '1.45rem', lineHeight: 1.65 }}>
              <li>
                <strong style={{ color: '#fff' }}>Agente Causal:</strong> Bacteria Gram-negativa llamada <span style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 800 }}>Actinobacillus lignieresii</span>. Es un habitante normal de la boca del ganado.
              </li>
              <li>
                <strong style={{ color: '#fff' }}>Forma de Ingreso:</strong> La bacteria no puede invadir tejidos sanos. Necesita una <span style={{ fontWeight: 800, color: 'var(--gold)' }}>lesión o abrasión en la mucosa de la boca</span>.
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
