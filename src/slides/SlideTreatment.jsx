import { useState } from 'react';
import SlideTemplate from '../components/SlideTemplate';
import { Pill, ShieldCheck, HeartPulse } from 'lucide-react';

export default function SlideTreatment() {
  const [activeTab, setActiveTab] = useState('blue');

  const tabBaseStyle = {
    padding: '1.25rem',
    borderRadius: '1rem',
    border: '2px solid',
    textAlign: 'left',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    width: '100%',
    fontFamily: "'Outfit', sans-serif",
    background: 'none',
    display: 'block'
  };

  return (
    <SlideTemplate 
      subtitle="Protocolo Clínico" 
      title="Tratamientos y" 
      gradientText="Medidas Preventivas"
      layout="split"
    >
      
      {/* Left Column: Interactive Nav Tabs */}
      <div style={{ flex: 1.1, width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <p style={{ color: '#f1f5f9', fontSize: '1.25rem', lineHeight: '1.6', margin: 0 }}>
          Como auxiliares veterinarios, vuestro rol principal es la detección oportuna de síntomas, la administración exacta del tratamiento y el diseño del plan de bioseguridad del hato.
        </p>

        {/* Tab: Blue Tongue */}
        <button
          onClick={() => setActiveTab('blue')}
          style={{
            ...tabBaseStyle,
            background: activeTab === 'blue' ? 'rgba(74, 222, 128, 0.12)' : 'rgba(21, 51, 36, 0.45)',
            borderColor: activeTab === 'blue' ? '#4ade80' : 'rgba(161, 123, 88, 0.3)',
            color: activeTab === 'blue' ? '#4ade80' : '#cbd5e1',
            boxShadow: activeTab === 'blue' ? '0 8px 25px rgba(74, 222, 128, 0.2)' : 'none',
            transform: activeTab === 'blue' ? 'scale(1.02)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ShieldCheck size={26} style={{ color: activeTab === 'blue' ? '#4ade80' : '#a17b58' }} />
            <div>
              <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.25rem', margin: 0 }}>Prevención: Lengua Azul</h4>
              <span style={{ fontSize: '0.95rem', color: '#cbd5e1', display: 'block', marginTop: '0.25rem' }}>Esquema preventivo de control de mosquitos</span>
            </div>
          </div>
        </button>

        {/* Tab: Wooden Tongue */}
        <button
          onClick={() => setActiveTab('purple')}
          style={{
            ...tabBaseStyle,
            background: activeTab === 'purple' ? 'rgba(251, 191, 36, 0.12)' : 'rgba(21, 51, 36, 0.45)',
            borderColor: activeTab === 'purple' ? '#fbbf24' : 'rgba(161, 123, 88, 0.3)',
            color: activeTab === 'purple' ? '#fbbf24' : '#cbd5e1',
            boxShadow: activeTab === 'purple' ? '0 8px 25px rgba(251, 191, 36, 0.2)' : 'none',
            transform: activeTab === 'purple' ? 'scale(1.02)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Pill size={26} style={{ color: activeTab === 'purple' ? '#fbbf24' : '#a17b58' }} />
            <div>
              <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.25rem', margin: 0 }}>Tratamiento: Lengua de Madera</h4>
              <span style={{ fontSize: '0.95rem', color: '#cbd5e1', display: 'block', marginTop: '0.25rem' }}>Protocolo farmacológico directo y eficaz</span>
            </div>
          </div>
        </button>

        {/* Golden Rule Box */}
        <div style={{
          background: 'rgba(9, 19, 14, 0.8)',
          border: '2px solid rgba(161, 123, 88, 0.4)',
          padding: '1.25rem',
          borderRadius: '1rem',
          fontSize: '1.1rem',
          color: '#cbd5e1',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
          lineHeight: '1.5'
        }}>
          <HeartPulse size={26} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '0.15rem' }} />
          <div>
            <strong style={{ color: '#fff', fontSize: '1.15rem', display: 'block', marginBottom: '0.25rem' }}>¡Regla de Oro!</strong> Un bovino con lengua inflamada debe aislarse de inmediato y alimentarse con pasto verde picado muy fino o silos suaves para evitar que muera de hambre.
          </div>
        </div>

      </div>

      {/* Right Column: Tab Content */}
      <div style={{ flex: 0.9, width: '100%' }}>
        {activeTab === 'blue' ? (
          <div className="glass animate-in" style={{ padding: '2rem', borderColor: '#4ade80', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem', color: '#4ade80' }}>
              <ShieldCheck size={28} />
              <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fff', margin: 0 }}>Esquema Preventivo (Virus)</h3>
            </div>
            
            <ul className="vet-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                <strong style={{ color: '#fbbf24' }}>Vacunación Específica:</strong> Uso de vacunas inactivadas seguras (como <span style={{ color: '#4ade80', fontWeight: 600 }}>Zulvac</span> o <span style={{ color: '#4ade80', fontWeight: 600 }}>BTVpur</span>) según el serotipo local (1, 4 u 8) antes de primavera.
              </li>
              <li style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                <strong style={{ color: '#fbbf24' }}>Control del Vector:</strong> Aplicación de insecticidas de acción prolongada (<span style={{ color: '#4ade80' }}>pour-on</span> a base de piretroides) en los animales.
              </li>
              <li style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                <strong style={{ color: '#fbbf24' }}>Manejo de Potreros:</strong> Drenar acumulaciones de agua y evitar pastoreo cerca de arroyos estancados en horas de alta actividad.
              </li>
              <li style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                <strong style={{ color: '#fbbf24' }}>Terapia de Soporte:</strong> Administrar AINEs (<span style={{ color: '#4ade80' }}>Flunixin Meglumine</span>) para controlar la fiebre y el dolor, facilitando la ingesta.
              </li>
            </ul>
          </div>
        ) : (
          <div className="glass animate-in" style={{ padding: '2rem', borderColor: '#fbbf24', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem', color: '#fbbf24' }}>
              <Pill size={28} />
              <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fff', margin: 0 }}>Esquema Curativo (Bacteria)</h3>
            </div>

            <ul className="vet-list purple" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                <strong style={{ color: '#fbbf24' }}>Yoduro de Sodio (10%):</strong> Tratamiento intravenoso lento de alta eficacia. Repetir dosis a los 7-10 días.
              </li>
              <li style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                <strong style={{ color: '#fbbf24' }}>Terapia Antibiótica:</strong> Administración de estreptomicina, penicilina o tetraciclinas de larga acción en casos moderados a graves.
              </li>
              <li style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                <strong style={{ color: '#fbbf24' }}>Antiinflamatorios:</strong> Uso de <span style={{ color: '#fbbf24', fontWeight: 600 }}>Dexametasona</span> o Flunixin para reducir la inflamación lingual y evitar la asfixia.
              </li>
              <li style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                <strong style={{ color: '#fbbf24' }}>Prevención Física:</strong> Retirar del potrero plantas espinosas o forrajes duros que causen lesiones en la boca.
              </li>
            </ul>
          </div>
        )}
      </div>

    </SlideTemplate>
  );
}
