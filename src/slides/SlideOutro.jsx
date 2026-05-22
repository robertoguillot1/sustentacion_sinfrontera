import React, { useState } from 'react';
import SlideTemplate from '../components/SlideTemplate';
import logo from '../assets/media__1779410848960.png';
import robertoImg from '../assets/avatar_roberto.png';
import valentinaImg from '../assets/avatar_valentina.png';
import { HelpCircle, Award, Sparkles } from 'lucide-react';

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
      title="¡Muchas" 
      gradientText="Gracias!"
      layout="split"
    >
      
      {/* Left Column: Thank you and summary with avatars */}
      <div style={{ flex: 1.2, width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="glass" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem', background: 'linear-gradient(to bottom, rgba(21, 51, 36, 0.9), rgba(15, 36, 26, 0.95))', border: '3px solid var(--gold)', borderRadius: '28px', boxShadow: '0 12px 35px rgba(0,0,0,0.5)' }}>
          
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.01em', margin: 0, textShadow: '0 0 15px rgba(251,191,36,0.25)' }}>
            Compromiso Profesional
          </h2>
          
          <p style={{ color: '#fff', fontSize: '1.45rem', lineHeight: 1.65, maxWidth: '600px', margin: '0 auto', fontWeight: 600 }}>
            Como futuros <strong style={{ color: 'var(--cyan)' }}>Técnicos Auxiliares Veterinarios</strong> de la Corporación Educativa Sin Fronteras, asumimos el compromiso de proteger la salud y el bienestar animal en rumiantes.
          </p>

          {/* Avatars Row - Full Dolls Standing */}
          <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', marginTop: '0.5rem', width: '100%' }}>
            {/* Roberto */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '130px', height: '180px', borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(161, 123, 88, 0.5)', background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(9, 19, 14, 0.8) 100%)', marginBottom: '0.6rem', boxShadow: '0 6px 15px rgba(0,0,0,0.4)' }}>
                <img src={robertoImg} alt="Roberto" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
              </div>
              <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff' }}>Roberto Guillot</span>
              <span style={{ fontSize: '1rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Expositor</span>
            </div>
            {/* Valentina */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '130px', height: '180px', borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(161, 123, 88, 0.5)', background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(9, 19, 14, 0.8) 100%)', marginBottom: '0.6rem', boxShadow: '0 6px 15px rgba(0,0,0,0.4)' }}>
                <img src={valentinaImg} alt="Valentina" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
              </div>
              <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff' }}>Valentina Padilla H.</span>
              <span style={{ fontSize: '1rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Expositora</span>
            </div>
          </div>
          
        </div>

        {/* Corporate Logo & Presenters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem 2rem', background: 'rgba(161, 123, 88, 0.25)', border: '2px solid var(--border-subtle)', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
          <img src={logo} alt="Sin Fronteras Logo" style={{ height: '58px', width: 'auto', background: '#fff', padding: '4px 10px', borderRadius: '8px', objectFit: 'contain' }} />
          <div>
            <h4 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#fff', margin: 0 }}>Corporación Educativa Sin Fronteras</h4>
            <span style={{ fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 700 }}>Curso de Técnico Auxiliar Veterinario, 2026</span>
          </div>
        </div>
      </div>

      {/* Right Column: Q&A Board */}
      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HelpCircle size={18} style={{ color: 'var(--gold)' }} />
          Preguntas de Repaso para el Público:
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {questions.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={() => setSelectedQuestion(selectedQuestion === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '1.15rem 1.25rem',
                  borderRadius: '16px',
                  border: selectedQuestion === idx ? '2.5px solid var(--gold)' : '1.5px solid var(--border-subtle)',
                  textAlign: 'left',
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  transition: 'all 0.25s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-primary)',
                  background: selectedQuestion === idx ? 'rgba(140, 98, 57, 0.25)' : 'rgba(9, 19, 14, 0.65)',
                  color: selectedQuestion === idx ? 'var(--gold)' : '#fff',
                  boxShadow: selectedQuestion === idx ? '0 8px 20px rgba(251,191,36,0.1)' : 'none',
                  transform: selectedQuestion === idx ? 'translateY(-1px)' : 'none'
                }}
              >
                <span>{item.q}</span>
                <HelpCircle size={16} style={{ flexShrink: 0, marginLeft: '0.75rem' }} />
              </button>

              {selectedQuestion === idx && (
                <div className="animate-in" style={{ padding: '1.25rem 1.5rem', background: 'rgba(9, 19, 14, 0.9)', border: '1.5px solid var(--border-subtle)', borderRadius: '16px', fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  💡 <span style={{ fontWeight: 800, color: 'var(--gold)' }}>Respuesta:</span> {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

    </SlideTemplate>
  );
}
