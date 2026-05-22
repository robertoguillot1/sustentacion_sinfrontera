import React, { useState } from 'react';
import SlideTemplate from '../components/SlideTemplate';
import riohachaImg from '../assets/campo_riohacha_bovinos.png';
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

  const iconColors = ['var(--cyan)', 'var(--gold)', 'var(--purple-bright)', '#4ade80'];

  return (
    <SlideTemplate 
      subtitle="Estudio de Caso" 
      title="Caso Clínico Práctico:" 
      gradientText="Finca San Isidro (Riohacha)"
      layout="split"
    >
      
      {/* Left Column: Interactive Timeline */}
      <div style={{ flex: 1.1, width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.35rem', marginBottom: '1rem', lineHeight: 1.6 }}>
          Sigue el paso a paso de este caso clínico real en el Caribe colombiano para comprender cómo se aplica el diagnóstico en campo:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              style={{
                padding: '1.15rem 1.5rem',
                borderRadius: '16px',
                border: '1.5px solid',
                textAlign: 'left',
                transition: 'all 0.25s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                fontFamily: "var(--font-primary)",
                background: activeStep === idx ? 'rgba(140, 98, 57, 0.25)' : 'rgba(9, 19, 14, 0.65)',
                borderColor: activeStep === idx ? 'var(--gold)' : 'var(--border-subtle)',
                color: activeStep === idx ? 'var(--gold)' : 'var(--text-secondary)',
                boxShadow: activeStep === idx ? '0 10px 25px rgba(251, 191, 36, 0.15)' : 'none',
                transform: activeStep === idx ? 'translateY(-2px)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  fontSize: '1rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: activeStep === idx ? 'var(--gold)' : 'var(--bg-surface)',
                  color: activeStep === idx ? 'var(--bg-deep)' : 'var(--text-muted)'
                }}>
                  {idx + 1}
                </span>
                <span style={{ fontWeight: 700, fontSize: '1.3rem', color: '#fff' }}>{step.label}</span>
              </div>
              <ChevronRight size={18} />
            </button>
          ))}
        </div>
      </div>

      {/* Right Column: Steps Details Display with Realistic Image */}
      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
        <div className="glass animate-in" style={{
          padding: '2rem',
          borderColor: 'var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          gap: '1.25rem',
          background: 'rgba(21, 51, 36, 0.5)'
        }}>
          
          <div>
            {/* Context Image representing agricultural field of Riohacha */}
            <img 
              src={riohachaImg} 
              alt="Campo y Bovino en Riohacha" 
              style={{ 
                width: '100%', 
                height: '180px', 
                objectFit: 'cover', 
                borderRadius: '16px', 
                border: '1.5px solid var(--border-subtle)', 
                marginBottom: '1rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)' 
              }} 
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              {activeStep === 0 && <MapPin size={24} style={{ color: 'var(--cyan)' }} />}
              {activeStep === 1 && <Stethoscope size={24} style={{ color: 'var(--gold)' }} />}
              {activeStep === 2 && <Stethoscope size={24} style={{ color: 'var(--purple-bright)' }} />}
              {activeStep === 3 && <CheckCircle2 size={24} style={{ color: '#4ade80' }} />}
              
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', lineHeight: 1.25, margin: 0 }}>
                {steps[activeStep].title}
              </h3>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              {steps[activeStep].desc}
            </p>
          </div>

          <div style={{ padding: '1rem 1.25rem', background: 'rgba(9, 19, 14, 0.8)', border: '1.5px solid var(--border-subtle)', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>
              {activeStep === 3 ? "🎯 Lección del Auxiliar:" : "📋 Datos de Terreno:"}
            </span>
            <p style={{ fontSize: '1rem', color: '#fff', margin: 0, fontWeight: 600, fontStyle: 'italic', lineHeight: 1.5 }}>
              {steps[activeStep].meta}
            </p>
          </div>

          {/* Progress Indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', paddingTop: '1rem', borderTop: '1px solid rgba(161, 123, 88, 0.2)' }}>
            <span>Ubicación: Riohacha, La Guajira</span>
            <span>Paso {activeStep + 1} de {steps.length}</span>
          </div>

        </div>
      </div>

    </SlideTemplate>
  );
}
