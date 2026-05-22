import React, { useState } from 'react';
import { User, ShieldAlert, Award, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

export default function DiagnosisGame({ onGameComplete, onRegisterPlayer }) {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' or 'incorrect'
  const [gameOver, setGameOver] = useState(false);

  const scenarios = [
    {
      caseNum: 1,
      title: "Inspección en la Finca 'El Hato'",
      description: "Una novilla presenta salivación abundante (babeo continuo). Al abrirle la boca, notas que la lengua está inflamada, sobresale levemente y se siente extremadamente dura y rígida al tacto (como un trozo de leño). El dueño menciona que estuvieron comiendo forrajes muy secos y fibrosos.",
      options: [
        { label: "Lengua Azul (Fiebre Catarral)", correct: false, reason: "Incorrecto. La lengua azul causa inflamación blanda y cianosis (color azul), no rigidez de madera." },
        { label: "Lengua de Madera (Actinobacilosis)", correct: true, reason: "¡Excelente! La rigidez ('madera') de la lengua producida por Actinobacillus lignieresii al entrar por heridas de forrajes duros es la clave." },
        { label: "Bovino Sano / Normal", correct: false, reason: "Incorrecto. Un bovino sano tiene una lengua móvil y blanda, sin salivación excesiva." }
      ],
      state: 'purple'
    },
    {
      caseNum: 2,
      title: "Alerta en Riohacha, La Guajira",
      description: "Es época de lluvias y hay proliferación de mosquitos Culicoides. Un toro reproductor presenta fiebre muy alta (41.8°C), cojera severa con inflamación en la corona de los cascos, y al inspeccionar el hocico, la mucosa bucal y la lengua lucen de un color azulado brillante (cianóticas).",
      options: [
        { label: "Lengua de Madera (Actinobacilosis)", correct: false, reason: "Incorrecto. La actinobacilosis no suele cursar con fiebres tan altas de 41.8°C ni cianosis azulada sistémica ni cojeras agudas." },
        { label: "Bovino Sano / Normal", correct: false, reason: "Incorrecto. Las pezuñas y la boca inflamadas con fiebre alta descartan un animal sano." },
        { label: "Lengua Azul (Infección por Orbivirus)", correct: true, reason: "¡Extraordinario! La cianosis azulada, la fiebre alta en época de mosquitos vector y las lesiones coronarias en las pezuñas gritan Lengua Azul." }
      ],
      state: 'blue'
    },
    {
      caseNum: 3,
      title: "Chequeo Preventivo del Lote",
      description: "Una vaca de ordeño mastica tranquilamente su rumiación. Su temperatura es de 38.5°C, no babea y su lengua es de color rosáceo, flexible y húmeda, sin ganglios inflamados en la mandíbula.",
      options: [
        { label: "Lengua Azul (Virus)", correct: false, reason: "Incorrecto. No hay fiebre, cianosis ni babeo para sospechar de este virus." },
        { label: "Bovino Sano / Normal", correct: true, reason: "¡Correcto! Todos los parámetros (temperatura, color de mucosa, movilidad lingual) están en rangos saludables." },
        { label: "Lengua de Madera (Bacteria)", correct: false, reason: "Incorrecto. La lengua está móvil, blanda y la vaca come perfectamente sin dolor." }
      ],
      state: 'normal'
    }
  ];

  const handleStartGame = (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    setGameStarted(true);
    setCurrentScenario(0);
    setScore(0);
    setFeedback(null);
    setGameOver(false);
  };

  const handleSelectOption = (option) => {
    if (feedback) return; // Prevent double clicking
    
    if (option.correct) {
      setScore(prev => prev + 100);
      setFeedback({ type: 'correct', text: option.reason });
    } else {
      setFeedback({ type: 'incorrect', text: option.reason });
    }
  };

  const handleNext = () => {
    setFeedback(null);
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
    } else {
      setGameOver(true);
      onRegisterPlayer(playerName, score);
    }
  };

  return (
    <div className="glass" style={{ width: '100%', maxWidth: '42rem', margin: '0 auto', padding: '1.5rem', userSelect: 'none' }}>
      
      {/* Game Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
            <Award style={{ color: '#00e5ff' }} />
            <span>Minijuego 1: El Inspector Diagnóstico</span>
          </h2>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>Inspecciona y salva al ganado de la corporación</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Score</span>
          <div className="glow-cyan" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#00e5ff' }}>{score} pts</div>
        </div>
      </div>

      {/* Screen 1: Registration */}
      {!gameStarted && (
        <form onSubmit={handleStartGame} className="animate-in" style={{ padding: '1.5rem 0', textAlign: 'center' }}>
          <div style={{ maxWidth: '28rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#cbd5e1', margin: 0 }}>¡Registra un participante de la clase!</h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>Registra el nombre de un compañero para competir por el primer puesto en el podio veterinario</p>
            
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={18} />
              <input 
                type="text" 
                placeholder="Nombre del compañero..." 
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="game-input"
                required
              />
            </div>

            <button 
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Comenzar Diagnóstico
            </button>
          </div>
        </form>
      )}

      {/* Screen 2: Scenarios */}
      {gameStarted && !gameOver && (
        <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Progress bar */}
          <div className="progress-track">
            <div 
              className="progress-fill"
              style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
            <span>Caso {scenarios[currentScenario].caseNum} de {scenarios.length}</span>
            <span>Jugador: <strong style={{ color: '#fff' }}>{playerName}</strong></span>
          </div>

          {/* Diagnostic scanner animation */}
          <div style={{ background: 'rgba(2,6,23,0.8)', border: '1px solid rgba(99,102,241,0.1)', padding: '1.25rem', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #00e5ff, transparent, #d946ef)', animation: 'pulseSlow 2.5s ease-in-out infinite' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#00e5ff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <ShieldAlert size={16} />
              {scenarios[currentScenario].title}
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
              {scenarios[currentScenario].description}
            </p>
          </div>

          {/* Diagnosis Choices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {scenarios[currentScenario].options.map((option, idx) => {
              let btnStyle = {};
              if (feedback) {
                if (option.correct) {
                  btnStyle = { borderColor: '#10b981', background: 'rgba(16,185,129,0.1)', color: '#34d399', pointerEvents: 'none' };
                } else {
                  btnStyle = { borderColor: '#ef4444', background: 'rgba(239,68,68,0.05)', color: '#fb7185', pointerEvents: 'none', opacity: 0.4 };
                }
              } else {
                btnStyle = { borderColor: '#1e293b', background: 'rgba(15,23,42,0.6)', color: '#cbd5e1', cursor: 'pointer' };
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'var(--font-primary)',
                    ...btnStyle,
                  }}
                >
                  <span>{option.label}</span>
                  {feedback && option.correct && <CheckCircle2 size={16} style={{ color: '#34d399' }} />}
                  {feedback && !option.correct && <XCircle size={16} style={{ color: '#fb7185' }} />}
                </button>
              );
            })}
          </div>

          {/* Feedback section */}
          {feedback && (
            <div
              className="animate-in"
              style={{
                padding: '1rem',
                borderRadius: '12px',
                border: '1px solid',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                borderColor: feedback.type === 'correct' ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.3)',
                background: feedback.type === 'correct' ? 'rgba(6,78,59,0.2)' : 'rgba(76,5,25,0.2)',
                color: feedback.type === 'correct' ? '#6ee7b7' : '#fda4af',
              }}
            >
              <div style={{ fontSize: '0.875rem', flex: 1, lineHeight: 1.7 }}>
                {feedback.text}
              </div>
              <button 
                onClick={handleNext}
                className="btn-primary"
                style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <span>{currentScenario === scenarios.length - 1 ? "Terminar" : "Siguiente"}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

        </div>
      )}

      {/* Screen 3: Game Over */}
      {gameStarted && gameOver && (
        <div className="animate-in" style={{ padding: '2rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <div className="glow-cyan" style={{ width: '5rem', height: '5rem', background: 'rgba(0,229,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,229,255,0.3)', color: '#00e5ff' }}>
            <Award size={40} />
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', margin: 0 }}>¡Caso Cerrado, Inspector!</h3>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>El diagnóstico del paciente veterinario ha finalizado con éxito.</p>
          </div>

          <div style={{ background: '#0f172a', maxWidth: '24rem', width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Participante</span>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{playerName}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Puntaje Final</span>
              <div style={{ fontWeight: 900, color: '#00e5ff', fontSize: '1.25rem' }}>{score} Puntos</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button 
              onClick={() => {
                setGameStarted(false);
                setPlayerName('');
              }}
              className="btn-secondary"
              style={{ fontWeight: 700, fontSize: '0.75rem' }}
            >
              Registrar Otro Jugador
            </button>
            
            <button 
              onClick={onGameComplete}
              className="btn-primary"
              style={{ fontWeight: 700, fontSize: '0.75rem' }}
            >
              Ver Tabla de Posiciones
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
