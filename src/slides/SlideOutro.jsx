import React, { useState } from 'react';
import SlideTemplate from '../components/SlideTemplate';
import logo from '../assets/media__1779410848960.png';
import { HelpCircle, Award, BookOpen, Star } from 'lucide-react';

export default function SlideOutro() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const questions = [
    {
      q: "¿La Lengua Azul puede contagiar a los humanos?",
      a: "¡No! La Lengua Azul no es una zoonosis. Es una enfermedad viral exclusiva de rumiantes (vacas, ovejas, cabras). Los humanos no corremos ningún riesgo de contagio al estar en contacto con animales enfermos ni por comer carne o leche."
    },
    {
      q: "¿Cómo diferencia un Auxiliar Veterinario ambas enfermedades rápido?",
      a: "Por dos criterios cardinales: 1. Movilidad y dureza lingual: Si está dura como madera, es Actinobacilosis bacteriana. 2. Coloración y fiebre: Si hay cianosis azulada, fiebre muy alta y cojera generalizada en el lote, sospecha de Lengua Azul viral por mosquito."
    },
    {
      q: "¿Por qué es obligatorio reportar la Lengua Azul?",
      a: "Porque al ser de alta difusión y transmisión vectorial, representa un peligro comercial devastador. Un brote no reportado puede propagarse por mosquitos a fincas vecinas, paralizando el comercio ganadero nacional e internacional."
    }
  ];

  return (
    <SlideTemplate 
      subtitle="Conclusión y Cierre" 
      title="Resumen Clínico y" 
      gradientText="Preguntas finales"
      layout="split"
    >
      
      {/* Left Column: Thank you and summary */}
      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="glass" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Award style={{ color: '#00e5ff' }} size={22} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', margin: 0 }}>Mensaje para la Clase</h3>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
            Como futuros <strong style={{ color: '#00e5ff' }}>Técnicos Auxiliares Veterinarios</strong> de la Corporación Sin Fronteras, nuestro rol es el pilar de la salud animal. La detección temprana y la bioseguridad salvan vidas y protegen la producción nacional.
          </p>
        </div>

        {/* Corporate Logo & Presenters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}>
          <img src={logo} alt="Sin Fronteras" style={{ height: '3.5rem', width: 'auto', background: '#fff', padding: '2px 8px', borderRadius: '12px', objectFit: 'contain' }} />
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', margin: 0 }}>¡Muchas Gracias por su Atención!</h4>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Exposición presentada por Roberto Guillot y Valentina Padilla.</span>
          </div>
        </div>
      </div>

      {/* Right Column: Q&A Board */}
      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <HelpCircle size={14} style={{ color: '#d946ef' }} />
          Preguntas de Repaso para el Público:
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {questions.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <button
                onClick={() => setSelectedQuestion(selectedQuestion === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: selectedQuestion === idx ? '1px solid #d946ef' : '1px solid #1e293b',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  transition: 'all 0.2s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-primary)',
                  background: selectedQuestion === idx ? 'rgba(112, 26, 83, 0.2)' : 'rgba(15,23,42,0.6)',
                  color: selectedQuestion === idx ? '#d946ef' : '#cbd5e1',
                }}
              >
                <span>{item.q}</span>
                <HelpCircle size={14} style={{ flexShrink: 0, marginLeft: '0.5rem' }} />
              </button>

              {selectedQuestion === idx && (
                <div className="animate-in" style={{ padding: '1rem', background: '#020617', border: '1px solid #0f172a', borderRadius: '12px', fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.7 }}>
                  💡 <span style={{ fontWeight: 600, color: '#cbd5e1' }}>Respuesta:</span> {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

    </SlideTemplate>
  );
}
