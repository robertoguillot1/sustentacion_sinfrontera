import { useState } from 'react';
import SlideTemplate from '../components/SlideTemplate';
import { Stethoscope, CheckCircle } from 'lucide-react';
import imgSintomaLengua from '../assets/vaca_sintoma_lengua.png';
import imgSintomaHocico from '../assets/vaca_sintoma_hocico.png';
import imgSintomaGanglios from '../assets/vaca_sintoma_ganglios.png';
import imgSintomaFiebre from '../assets/vaca_sintoma_fiebre.png';

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
      
      {/* Left Column: Interactive Clinical Photo Viewer */}
      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{
          width: '100%',
          maxWidth: '32rem',
          aspectRatio: '4/3',
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '2px solid ' + (symptomData.color === 'blue' ? 'rgba(56,189,248,0.35)' : 'rgba(251,191,36,0.35)'),
          boxShadow: '0 12px 40px rgba(0,0,0,0.55), 0 0 25px ' + (symptomData.color === 'blue' ? 'rgba(56,189,248,0.12)' : 'rgba(251,191,36,0.12)'),
          background: 'rgba(9,19,14,0.6)',
          transition: 'all 0.3s ease-in-out'
        }}>
          {/* Badge Overlay */}
          <div style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.25rem',
            zIndex: 10,
            padding: '0.5rem 1rem',
            fontSize: '0.95rem',
            fontWeight: 800,
            borderRadius: '12px',
            background: 'rgba(9,19,14,0.85)',
            border: '1px solid ' + (symptomData.color === 'blue' ? 'rgba(56,189,248,0.35)' : 'rgba(251,191,36,0.35)'),
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: symptomData.color === 'blue' ? '#38bdf8' : 'var(--gold)',
              boxShadow: '0 0 8px ' + (symptomData.color === 'blue' ? '#38bdf8' : 'var(--gold)')
            }} />
            Inspección: {activePart}
          </div>

          {/* Active Image */}
          <img 
            src={
              activePart === 'Lengua' ? imgSintomaLengua :
              activePart === 'Hocico' ? imgSintomaHocico :
              activePart === 'Ganglios' ? imgSintomaGanglios :
              imgSintomaFiebre
            } 
            alt={`Síntoma de ${activePart}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          📸 Inspección semiológica de {activePart.toLowerCase()}
        </div>
      </div>

      {/* Right Column: Dynamic Symptoms Details */}
      <div style={{ flex: 1.1, width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Category Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            padding: '0.75rem',
            background: 'rgba(251, 191, 36, 0.15)',
            color: 'var(--gold)',
            borderRadius: '0.85rem',
            border: '1.5px solid rgba(251, 191, 36, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Stethoscope size={28} />
          </div>
          <div>
            <span style={{ fontSize: '1.05rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>Zona Seleccionada</span>
            <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#fff', lineHeight: 1.2, margin: 0 }}>
              {symptomData.title}
            </h3>
          </div>
        </div>

        {/* Symptoms Bullet Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {symptomData.symptoms.map((symptom, idx) => (
            <div 
              key={idx}
              className="glass"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                padding: '1.2rem',
                background: 'rgba(21, 51, 36, 0.6)',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: '16px',
                transition: 'border-color 0.2s'
              }}
            >
              <CheckCircle 
                size={22} 
                style={{
                  marginTop: '0.15rem',
                  flexShrink: 0,
                  color: symptomData.color === 'blue' ? '#38bdf8' : 'var(--gold)'
                }}
              />
              <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {symptom}
              </span>
            </div>
          ))}
        </div>

        {/* Dynamic Selector Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem', borderTop: '1.5px solid rgba(161, 123, 88, 0.2)' }}>
          {['Lengua', 'Hocico', 'Ganglios', 'Fiebre'].map((part) => (
            <button
              key={part}
              onClick={() => handlePartClick(part)}
              style={{
                padding: '0.65rem 1.35rem',
                borderRadius: '999px',
                fontSize: '1.1rem',
                fontWeight: 800,
                border: '2px solid',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: "'Outfit', sans-serif",
                background: activePart === part ? 'rgba(74, 222, 128, 0.2)' : 'rgba(9, 19, 14, 0.65)',
                color: activePart === part ? 'var(--cyan)' : 'var(--text-muted)',
                borderColor: activePart === part ? 'var(--cyan)' : 'var(--border-subtle)'
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
