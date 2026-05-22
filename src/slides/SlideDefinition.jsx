import React, { useState } from 'react';
import SlideTemplate from '../components/SlideTemplate';
import Bovine3DViewer from '../components/Bovine3DViewer';
import { ShieldCheck, AlertCircle, Heart } from 'lucide-react';

export default function SlideDefinition() {
  const [diseaseState, setDiseaseState] = useState('normal');
  const [activeInfo, setActiveInfo] = useState({
    title: 'Bovino Sano',
    desc: 'La mucosa bucal y la lengua presentan un tono rosado saludable, blando y móvil. Sin signos de infección.',
    type: 'normal'
  });

  const handleStateChange = (state) => {
    setDiseaseState(state);
    if (state === 'normal') {
      setActiveInfo({
        title: 'Bovino Saludable',
        desc: 'Mucosa rosada, sin lesiones ni inflamaciones. Movilidad lingual normal esencial para la ingesta de pastos.',
        type: 'normal'
      });
    } else if (state === 'blue') {
      setActiveInfo({
        title: 'Lengua Azul (Fiebre Catarral)',
        desc: 'Enfermedad viral que provoca cianosis (coloración azul/morada debido a la falta de oxígeno en sangre) por daño en los vasos sanguíneos capilares.',
        type: 'blue'
      });
    } else if (state === 'purple') {
      setActiveInfo({
        title: 'Lengua de Madera (Actinobacilosis)',
        desc: 'Infección bacteriana oportunista. La lengua se inflama severamente, se endurece (como madera) y adquiere una coloración congestionada/morada.',
        type: 'purple'
      });
    }
  };

  const getButtonStyle = (state, isActive) => {
    const base = {
      padding: '1.25rem 1.5rem',
      borderRadius: '16px',
      fontWeight: 800,
      fontSize: '1.2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.6rem',
      border: '2px solid',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontFamily: 'var(--font-primary)'
    };
    if (!isActive) {
      return { ...base, background: 'rgba(9,19,14,0.6)', color: 'var(--text-muted)', borderColor: 'var(--border-subtle)' };
    }
    if (state === 'normal') return { ...base, background: 'rgba(74,222,128,0.15)', color: 'var(--cyan)', borderColor: 'var(--cyan)', boxShadow: '0 0 15px rgba(74,222,128,0.2)' };
    if (state === 'blue') return { ...base, background: 'rgba(56,189,248,0.15)', color: '#38bdf8', borderColor: '#38bdf8', boxShadow: '0 0 15px rgba(56,189,248,0.2)' };
    return { ...base, background: 'rgba(161,123,88,0.2)', color: 'var(--gold)', borderColor: 'var(--gold)', boxShadow: '0 0 15px rgba(251,191,36,0.2)' };
  };

  const getInfoBoxStyle = () => {
    const base = { padding: '1.75rem', borderRadius: '18px', border: '2px solid', transition: 'all 0.3s' };
    if (activeInfo.type === 'normal') return { ...base, background: 'rgba(21,51,36,0.6)', borderColor: 'rgba(74,222,128,0.3)' };
    if (activeInfo.type === 'blue') return { ...base, background: 'rgba(21,51,36,0.6)', borderColor: 'rgba(56,189,248,0.3)' };
    return { ...base, background: 'rgba(21,51,36,0.6)', borderColor: 'rgba(161,123,88,0.45)' };
  };

  const iconColor = activeInfo.type === 'normal' ? 'var(--cyan)' : activeInfo.type === 'blue' ? '#38bdf8' : 'var(--gold)';

  return (
    <SlideTemplate 
      subtitle="Definición y Comparativa" 
      title="¿Qué es la" 
      gradientText="Lengua Azul y Lengua de Madera?"
      layout="split"
    >
      
      {/* Left Column: Explanatory Content */}
      <div className="slide-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.35rem', lineHeight: 1.65 }}>
          En veterinaria, una lengua con coloración anómala (azul o morada) o rigidez excesiva es una alarma grave de infección o hipoxia. Comparemos las dos afecciones principales:
        </p>

        {/* Dynamic Selector Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          <button 
            onClick={() => handleStateChange('normal')}
            style={getButtonStyle('normal', diseaseState === 'normal')}
          >
            <Heart size={24} />
            <span>1. Sano</span>
          </button>
          
          <button 
            onClick={() => handleStateChange('blue')}
            style={getButtonStyle('blue', diseaseState === 'blue')}
          >
            <AlertCircle size={24} />
            <span>2. Lengua Azul</span>
          </button>

          <button 
            onClick={() => handleStateChange('purple')}
            style={getButtonStyle('purple', diseaseState === 'purple')}
          >
            <AlertCircle size={24} />
            <span>3. L. de Madera</span>
          </button>
        </div>

        {/* Reactive Info Box */}
        <div style={getInfoBoxStyle()}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.85rem' }}>
            {activeInfo.type === 'normal' ? (
              <ShieldCheck size={32} style={{ color: iconColor }} />
            ) : (
              <AlertCircle size={32} style={{ color: iconColor }} />
            )}
            <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              {activeInfo.title}
            </h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', lineHeight: 1.65, margin: 0 }}>
            {activeInfo.desc}
          </p>
        </div>

        {/* Key Veterinary Concept */}
        <div style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', background: 'rgba(9,19,14,0.6)', padding: '1.25rem 1.5rem', borderRadius: '16px', border: '1.5px solid var(--border-subtle)', lineHeight: 1.6 }}>
          💡 <span style={{ fontWeight: 800, color: 'var(--gold)' }}>Dato de Diagnóstico:</span> La "Lengua Azul" es sistémica y viral (afecta vasos sanguíneos y circulación). La "Lengua de Madera" es local y bacteriana (infección profunda del músculo de la lengua por lesiones mecánicas).
        </div>

      </div>

      {/* Right Column: 3D Bovine Model */}
      <div className="slide-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '580px' }}>
          <Bovine3DViewer diseaseState={diseaseState} />
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '1.1rem', color: 'var(--text-muted)', fontStyle: 'italic', fontWeight: 600 }}>
          👉 Haz clic, arrastra para rotar e interactúa con el modelo 3D
        </div>
      </div>

    </SlideTemplate>
  );
}
