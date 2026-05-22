import React, { useState } from 'react';
import SlideTemplate from '../components/SlideTemplate';
import Bovine3DViewer from '../components/Bovine3DViewer';
import { Stethoscope, CheckCircle, Info } from 'lucide-react';

export default function SlideSymptoms() {
  const [activePart, setActivePart] = useState('Lengua');
  const [symptomData, setSymptomData] = useState({
    title: 'Lengua (Cianosis e Inflamación)',
    symptoms: [
      'Lengua de color azul-morado (cianosis por hipoxia severa en Lengua Azul).',
      'Lengua extremadamente dura, rígida e inflamada (como una madera en Actinobacilosis).',
      'Presencia de pequeñas llagas, úlceras o heridas dolorosas en los bordes.',
      'Dificultad mecánica para moverla, impidiendo que el animal pueda enrollar pastos.'
    ],
    color: 'blue'
  });

  const handlePartClick = (part) => {
    setActivePart(part);
    if (part === 'Lengua') {
      setSymptomData({
        title: 'Lengua (Cianosis e Inflamación)',
        symptoms: [
          'Lengua de color azul-morado (cianosis por hipoxia severa en Lengua Azul).',
          'Lengua extremadamente dura y rígida (Woody Tongue / Actinobacilosis).',
          'Aparición de úlceras y sangrado menor en las encías y bordes linguales.',
          'Dificultad mecánica severa para tragar e ingerir alimentos.'
        ],
        color: 'blue'
      });
    } else if (part === 'Hocico') {
      setSymptomData({
        title: 'Hocico y Mucosas (Sialorrea)',
        symptoms: [
          'Salivación excesiva (sialorrea) o babeo constante debido al dolor bucal.',
          'Descarga nasal mucosa o purulenta, que a veces forma costras secas.',
          'Labios hinchados y enrojecidos (hiperemia).',
          'Olor fétido de la boca (halitosis) en casos de infección bacteriana.'
        ],
        color: 'purple'
      });
    } else if (part === 'Ganglios') {
      setSymptomData({
        title: 'Ganglios y Garganta (Edema)',
        symptoms: [
          'Hinchazón visible de la mandíbula inferior (edema submandibular o "mandíbula de botella").',
          'Ganglios linfáticos retrofaríngeos y submandibulares agrandados y dolorosos.',
          'Abscesos que pueden drenar pus amarillento y espeso (característico de Actinobacilosis).',
          'Dificultad para respirar debido a la presión de la inflamación de la garganta.'
        ],
        color: 'purple'
      });
    } else if (part === 'Fiebre') {
      setSymptomData({
        title: 'Fiebre y Estado General',
        symptoms: [
          'Fiebre muy alta, con picos de hasta 41°C - 42°C en fases iniciales.',
          'Postración, depresión severa y deshidratación rápida del animal.',
          'Cojera e inflamación en la corona de las pezuñas (lesión podal típica en Lengua Azul).',
          'Pérdida drástica de peso en pocos días debido a la imposibilidad de pastar.'
        ],
        color: 'blue'
      });
    }
  };

  return (
    <SlideTemplate 
      subtitle="Sintomatología Clínica" 
      title="Principales" 
      gradientText="Síntomas en el Bovino"
      layout="split"
    >
      
      {/* Left Column: Interactive 3D Model */}
      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '32rem' }}>
          <Bovine3DViewer 
            diseaseState={activePart === 'Lengua' ? 'blue' : 'purple'} 
            activePart={activePart}
            onPartClick={handlePartClick}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic' }}>
          👆 Haz clic en los puntos rojos parpadeantes del bovino para inspeccionar los síntomas
        </div>
      </div>

      {/* Right Column: Dynamic Symptoms Details */}
      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Category Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            padding: '0.5rem',
            background: 'rgba(244, 63, 94, 0.1)',
            color: '#fb7185',
            borderRadius: '0.75rem',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Stethoscope size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Zona Seleccionada</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>
              {symptomData.title}
            </h3>
          </div>
        </div>

        {/* Symptoms Bullet Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {symptomData.symptoms.map((symptom, idx) => (
            <div 
              key={idx}
              className="glass"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.75rem',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(30, 41, 59, 0.8)',
                borderRadius: '0.75rem',
                transition: 'border-color 0.2s'
              }}
            >
              <CheckCircle 
                size={16} 
                style={{
                  marginTop: '0.125rem',
                  flexShrink: 0,
                  color: symptomData.color === 'blue' ? '#00e5ff' : '#d946ef'
                }}
              />
              <span style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                {symptom}
              </span>
            </div>
          ))}
        </div>

        {/* Dynamic Selector Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(30, 41, 59, 0.8)' }}>
          {['Lengua', 'Hocico', 'Ganglios', 'Fiebre'].map((part) => (
            <button
              key={part}
              onClick={() => handlePartClick(part)}
              style={{
                padding: '0.375rem 0.875rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                border: '1px solid',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: "'Outfit', sans-serif",
                background: activePart === part ? 'rgba(244, 63, 94, 0.2)' : 'rgba(30, 41, 59, 0.4)',
                color: activePart === part ? '#fb7185' : '#94a3b8',
                borderColor: activePart === part ? '#f43f5e' : 'rgba(51, 65, 85, 1)'
              }}
            >
              {part}
            </button>
          ))}
        </div>

      </div>

    </SlideTemplate>
  );
}
