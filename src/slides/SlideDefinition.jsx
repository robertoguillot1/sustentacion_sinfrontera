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
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      fontWeight: 700,
      fontSize: '0.875rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.35rem',
      border: '1px solid',
      cursor: 'pointer',
      transition: 'all 0.2s',
    };
    if (!isActive) {
      return { ...base, background: 'rgba(30,41,59,0.5)', color: '#94a3b8', borderColor: 'rgba(51,65,85,1)' };
    }
    if (state === 'normal') return { ...base, background: 'rgba(16,185,129,0.12)', color: '#10b981', borderColor: '#10b981', boxShadow: '0 0 15px rgba(16,185,129,0.2)' };
    if (state === 'blue') return { ...base, background: 'rgba(0,229,255,0.12)', color: '#00e5ff', borderColor: '#00e5ff', boxShadow: '0 0 15px rgba(0,229,255,0.2)' };
    return { ...base, background: 'rgba(217,70,239,0.12)', color: '#d946ef', borderColor: '#d946ef', boxShadow: '0 0 15px rgba(217,70,239,0.2)' };
  };

  const getInfoBoxStyle = () => {
    const base = { padding: '1.25rem', borderRadius: '16px', border: '1px solid', transition: 'all 0.3s' };
    if (activeInfo.type === 'normal') return { ...base, background: 'rgba(6,78,59,0.15)', borderColor: 'rgba(16,185,129,0.3)' };
    if (activeInfo.type === 'blue') return { ...base, background: 'rgba(8,47,73,0.15)', borderColor: 'rgba(0,229,255,0.3)' };
    return { ...base, background: 'rgba(112,26,117,0.15)', borderColor: 'rgba(217,70,239,0.3)' };
  };

  const iconColor = activeInfo.type === 'normal' ? '#10b981' : activeInfo.type === 'blue' ? '#00e5ff' : '#d946ef';

  return (
    <SlideTemplate 
      subtitle="Definición y Comparativa" 
      title="¿Qué es la" 
      gradientText="Lengua Azul y Morada?"
      layout="split"
    >
      
      {/* Left Column: Explanatory Content */}
      <div className="slide-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>
          En veterinaria, una lengua con coloración anómala (azul o morada) o rigidez excesiva es una alarma grave de infección o hipoxia. Comparemos las dos afecciones principales:
        </p>

        {/* Dynamic Selector Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          <button 
            onClick={() => handleStateChange('normal')}
            style={getButtonStyle('normal', diseaseState === 'normal')}
          >
            <Heart size={16} />
            <span>1. Sano</span>
          </button>
          
          <button 
            onClick={() => handleStateChange('blue')}
            style={getButtonStyle('blue', diseaseState === 'blue')}
          >
            <AlertCircle size={16} />
            <span>2. Lengua Azul</span>
          </button>

          <button 
            onClick={() => handleStateChange('purple')}
            style={getButtonStyle('purple', diseaseState === 'purple')}
          >
            <AlertCircle size={16} />
            <span>3. L. de Madera</span>
          </button>
        </div>

        {/* Reactive Info Box */}
        <div style={getInfoBoxStyle()}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            {activeInfo.type === 'normal' ? (
              <ShieldCheck size={20} style={{ color: iconColor }} />
            ) : (
              <AlertCircle size={20} style={{ color: iconColor }} />
            )}
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
              {activeInfo.title}
            </h3>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.55, margin: 0 }}>
            {activeInfo.desc}
          </p>
        </div>

        {/* Key Veterinary Concept */}
        <div style={{ fontSize: '0.75rem', color: '#64748b', background: 'rgba(15,23,42,0.6)', padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(30,41,59,0.4)', lineHeight: 1.5 }}>
          💡 <span style={{ fontWeight: 700, color: '#94a3b8' }}>Dato de Diagnóstico:</span> La "Lengua Azul" es sistémica y viral (afecta vasos sanguíneos y circulación). La "Lengua de Madera" es local y bacteriana (infección profunda del músculo de la lengua por lesiones mecánicas).
        </div>

      </div>

      {/* Right Column: 3D Bovine Model */}
      <div className="slide-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <Bovine3DViewer diseaseState={diseaseState} />
        </div>
        <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic' }}>
          Haz clic e interactúa con el modelo para ver los cambios anatómicos
        </div>
      </div>

    </SlideTemplate>
  );
}
