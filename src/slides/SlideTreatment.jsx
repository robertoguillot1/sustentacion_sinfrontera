import React, { useState } from 'react';
import SlideTemplate from '../components/SlideTemplate';
import { Pill, Activity, ShieldCheck, HeartPulse } from 'lucide-react';

export default function SlideTreatment() {
  const [activeTab, setActiveTab] = useState('blue');

  const tabBaseStyle = {
    padding: '1rem',
    borderRadius: '0.75rem',
    border: '1px solid',
    textAlign: 'left',
    transition: 'all 0.2s',
    cursor: 'pointer',
    width: '100%',
    fontFamily: "'Outfit', sans-serif",
    background: 'none'
  };

  return (
    <SlideTemplate 
      subtitle="Protocolo Clínico" 
      title="Tratamientos y" 
      gradientText="Medidas Preventivas"
      layout="split"
    >
      
      {/* Left Column: Interactive Nav Tabs */}
      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <p style={{ color: '#cbd5e1', fontSize: '0.875rem', margin: 0 }}>
          Como auxiliares veterinarios, vuestro rol principal es la detección oportuna de síntomas, la administración exacta del tratamiento y el diseño del plan de bioseguridad del hato.
        </p>

        {/* Tab: Blue Tongue */}
        <button
          onClick={() => setActiveTab('blue')}
          style={{
            ...tabBaseStyle,
            background: activeTab === 'blue' ? 'rgba(8, 47, 73, 0.2)' : 'rgba(15, 23, 42, 0.6)',
            borderColor: activeTab === 'blue' ? '#00e5ff' : 'rgba(30, 41, 59, 0.8)',
            color: activeTab === 'blue' ? '#00e5ff' : '#94a3b8',
            boxShadow: activeTab === 'blue' ? '0 10px 25px rgba(0, 229, 255, 0.1)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={20} />
            <div>
              <h4 style={{ fontWeight: 700, color: '#fff', fontSize: '0.875rem', margin: 0 }}>Prevención: Lengua Azul</h4>
              <span style={{ fontSize: '0.625rem', color: '#94a3b8', display: 'block' }}>Esquema preventivo de control de mosquitos</span>
            </div>
          </div>
        </button>

        {/* Tab: Wooden Tongue */}
        <button
          onClick={() => setActiveTab('purple')}
          style={{
            ...tabBaseStyle,
            background: activeTab === 'purple' ? 'rgba(74, 4, 78, 0.2)' : 'rgba(15, 23, 42, 0.6)',
            borderColor: activeTab === 'purple' ? '#d946ef' : 'rgba(30, 41, 59, 0.8)',
            color: activeTab === 'purple' ? '#d946ef' : '#94a3b8',
            boxShadow: activeTab === 'purple' ? '0 10px 25px rgba(217, 70, 239, 0.1)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Pill size={20} />
            <div>
              <h4 style={{ fontWeight: 700, color: '#fff', fontSize: '0.875rem', margin: 0 }}>Tratamiento: Lengua de Madera</h4>
              <span style={{ fontSize: '0.625rem', color: '#94a3b8', display: 'block' }}>Protocolo farmacológico directo y eficaz</span>
            </div>
          </div>
        </button>

        {/* Golden Rule Box */}
        <div style={{
          background: 'rgba(2, 6, 23, 1)',
          border: '1px solid rgba(30, 41, 59, 0.8)',
          padding: '1rem',
          borderRadius: '0.75rem',
          fontSize: '0.75rem',
          color: '#94a3b8',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.625rem'
        }}>
          <HeartPulse size={16} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '0.125rem' }} />
          <div>
            <strong style={{ color: '#cbd5e1' }}>¡Regla de Oro!</strong> Un bovino con lengua inflamada debe aislarse de inmediato y alimentarse con pasto verde picado muy fino o silos suaves para evitar que muera de hambre.
          </div>
        </div>

      </div>

      {/* Right Column: Tab Content */}
      <div style={{ flex: 1, width: '100%' }}>
        {activeTab === 'blue' ? (
          <div className="glass animate-in" style={{ padding: '1.5rem', borderColor: 'rgba(0, 229, 255, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#00e5ff' }}>
              <ShieldCheck size={24} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0 }}>Esquema Preventivo (Virus)</h3>
            </div>
            
            <ul className="vet-list">
              <li>
                <strong style={{ color: '#fff' }}>Vacunación:</strong> La herramienta más efectiva. Debe aplicarse antes de la época de lluvias.
              </li>
              <li>
                <strong style={{ color: '#fff' }}>Control de Vector (Mosquito):</strong> Uso de insecticidas tópicos de acción prolongada en los animales (pour-on a base de piretroides).
              </li>
              <li>
                <strong style={{ color: '#fff' }}>Manejo de Potreros:</strong> Drenar acumulaciones de agua y lodo. Evitar que el ganado paste cerca de arroyos estancados al amanecer/atardecer.
              </li>
              <li>
                <strong style={{ color: '#fff' }}>Terapia de Soporte:</strong> Al no haber cura contra el virus, se administran antiinflamatorios no esteroideos (AINEs como Flunixin Meglumine) para bajar la fiebre y aliviar el dolor, facilitando que beba agua.
              </li>
            </ul>
          </div>
        ) : (
          <div className="glass animate-in" style={{ padding: '1.5rem', borderColor: 'rgba(217, 70, 239, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#d946ef' }}>
              <Pill size={24} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0 }}>Esquema Curativo (Bacteria)</h3>
            </div>

            <ul className="vet-list purple">
              <li>
                <strong style={{ color: '#fff' }}>Tratamiento con Yoduros:</strong> El protocolo clásico y altamente efectivo consiste en inyecciones de <span style={{ fontWeight: 600, color: '#fff' }}>Yoduro de Sodio (10%)</span> vía intravenosa lenta. Repetir a los 7-10 días.
              </li>
              <li>
                <strong style={{ color: '#fff' }}>Terapia Antibiótica:</strong> La bacteria es muy sensible a la estreptomicina, penicilina, y tetraciclinas de larga acción. Se combinan con los yoduros en casos moderados a graves.
              </li>
              <li>
                <strong style={{ color: '#fff' }}>Antiinflamatorios:</strong> Dexametasona o Meglumine de Flunixin para reducir la hinchazón masiva de la lengua rápidamente y evitar asfixias.
              </li>
              <li>
                <strong style={{ color: '#fff' }}>Prevención Mecánica:</strong> Cambiar el potrero si hay malezas con espinas. Retirar forrajes duros del comedero.
              </li>
            </ul>
          </div>
        )}
      </div>

    </SlideTemplate>
  );
}
