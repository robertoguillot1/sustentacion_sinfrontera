import React, { useState } from 'react';
import SlideTemplate from '../components/SlideTemplate';
import { MapPin, Stethoscope, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function SlideCaseStudy() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: "1. El Reporte en la Finca",
      title: "Alerta en Riohacha, La Guajira",
      desc: "En la Finca 'San Isidro', ubicada en la periferia semiárida de Riohacha, el vaquero reporta que 'General', un valioso toro Brahman de 3 años, lleva dos días sin comer, apartado del grupo, triste y babeando profusamente (sialorrea).",
      meta: "Clima: Caliente y seco, pero con potreros invadidos por arbustos espinosos (Trupillo y cactus) debido a la sequía."
    },
    {
      label: "2. Inspección Clínica",
      title: "Evaluación por Roberto y Valentina",
      desc: "Los técnicos auxiliares veterinarios proceden al examen clínico. Registran una temperatura de 39.3°C (fiebre leve), y al sujetar la boca, descubren una lengua severamente inflamada, rígida como una tabla y con pequeñas llagas sangrantes en los bordes.",
      meta: "Hallazgo clave: La lengua NO está azul, pero está sumamente endurecida (como madera) y dolorosa."
    },
    {
      label: "3. Diagnóstico Técnico",
      title: "Descarte de Lengua Azul",
      desc: "Aunque el babeo asusta, se descarta Lengua Azul porque no hay cianosis (color azul), no hay cojeras en las pezuñas ni fiebres extremas (41°C). El diagnóstico es claro: Actinobacilosis (Lengua de Madera) causada por heridas bucales del arbusto trupillo espinoso.",
      meta: "Patógeno: Actinobacillus lignieresii, bacteria oportunista bucal."
    },
    {
      label: "4. Tratamiento y Éxito",
      title: "Recuperación de 'General'",
      desc: "Se aplica inmediatamente Yoduro de Sodio (10%) vía intravenosa lenta combinada con antibiótico (Bencilpenicilina) y antiinflamatorio (Flunixin). Se aísla a la sombra y se le suministra forraje verde picado suave.",
      meta: "Resultado: A los 5 días la lengua recuperó su movilidad, y 'General' volvió a pastar con normalidad."
    }
  ];

  const iconColors = ['#00e5ff', '#f59e0b', '#c084fc', '#10b981'];

  return (
    <SlideTemplate 
      subtitle="Estudio de Caso" 
      title="Caso Clínico Práctico:" 
      gradientText="Finca San Isidro (Riohacha)"
      layout="split"
    >
      
      {/* Left Column: Interactive Timeline */}
      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ color: '#cbd5e1', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
          Sigue el paso a paso de este caso clínico real en el Caribe colombiano para comprender cómo se aplica el diagnóstico en campo:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: '1px solid',
                textAlign: 'left',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                background: activeStep === idx ? 'rgba(30, 27, 75, 0.3)' : 'rgba(15, 23, 42, 0.6)',
                borderColor: activeStep === idx ? '#00e5ff' : 'rgba(30, 41, 59, 0.8)',
                color: activeStep === idx ? '#00e5ff' : '#94a3b8',
                boxShadow: activeStep === idx ? '0 10px 25px rgba(30, 27, 75, 0.2)' : 'none',
                transform: activeStep === idx ? 'scale(1.01)' : 'scale(1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: activeStep === idx ? '#00e5ff' : 'rgba(30, 41, 59, 1)',
                  color: activeStep === idx ? '#020617' : '#94a3b8'
                }}>
                  {idx + 1}
                </span>
                <span style={{ fontWeight: 600, fontSize: '0.75rem', color: '#fff' }}>{step.label}</span>
              </div>
              <ChevronRight size={14} />
            </button>
          ))}
        </div>
      </div>

      {/* Right Column: Steps Details Display */}
      <div style={{ flex: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
        <div className="glass animate-in" style={{
          padding: '1.5rem',
          borderColor: 'rgba(99, 102, 241, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          gap: '1rem'
        }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {activeStep === 0 && <MapPin size={20} style={{ color: '#00e5ff' }} />}
              {activeStep === 1 && <Stethoscope size={20} style={{ color: '#f59e0b' }} />}
              {activeStep === 2 && <Stethoscope size={20} style={{ color: '#c084fc' }} />}
              {activeStep === 3 && <CheckCircle2 size={20} style={{ color: '#10b981' }} />}
              
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>
                {steps[activeStep].title}
              </h3>
            </div>
            
            <p style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              {steps[activeStep].desc}
            </p>
          </div>

          <div style={{ padding: '0.75rem', background: 'rgba(2, 6, 23, 0.6)', border: '1px solid rgba(30, 41, 59, 0.8)', borderRadius: '0.75rem' }}>
            <span style={{ fontSize: '0.5625rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>
              {activeStep === 3 ? "🎯 Lección del Auxiliar:" : "📋 Datos de Terreno:"}
            </span>
            <p style={{ fontSize: '0.75rem', color: '#cbd5e1', margin: 0, fontWeight: 500, fontStyle: 'italic' }}>
              {steps[activeStep].meta}
            </p>
          </div>

          {/* Progress Indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.625rem', color: '#64748b', paddingTop: '0.75rem', borderTop: '1px solid rgba(30, 41, 59, 0.8)' }}>
            <span>Ubicación: Riohacha, La Guajira</span>
            <span>Paso {activeStep + 1} de {steps.length}</span>
          </div>

        </div>
      </div>

    </SlideTemplate>
  );
}
