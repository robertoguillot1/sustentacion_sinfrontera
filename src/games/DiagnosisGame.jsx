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
    <div className="glass" style={{ width: '100%', maxWidth: '52rem', margin: '0 auto', padding: '2.5rem', userSelect: 'none', borderColor: 'rgba(161, 123, 88, 0.45)' }}>
      
      {/* Game Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid rgba(161, 123, 88, 0.25)', paddingBottom: '1.25rem', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
            <Award style={{ color: '#fbbf24' }} size={28} />
            <span>Minijuego 1: El Inspector Diagnóstico</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', margin: '0.35rem 0 0 0' }}>Inspecciona y salva al ganado de la corporación</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '1rem', color: '#cbd5e1', fontWeight: 700 }}>Score</span>
          <div style={{ fontSize: '2.25rem', fontWeight: 900, color: '#fbbf24' }}>{score} pts</div>
        </div>
      </div>

      {/* Screen 1: Registration */}
      {!gameStarted && (
        <form onSubmit={handleStartGame} className="animate-in" style={{ padding: '1rem 0', textAlign: 'center' }}>
          <div style={{ maxWidth: '32rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: 0 }}>¡Registra un participante de la clase!</h3>
            <p style={{ fontSize: '1.35rem', color: '#cbd5e1', margin: 0, lineHeight: '1.5' }}>Registra el nombre de un compañero para competir por el primer puesto en el podio veterinario</p>
            
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#fbbf24' }} size={24} />
              <input 
                type="text" 
                placeholder="Nombre del compañero..." 
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="game-input"
                style={{
                  fontSize: '1.25rem',
                  padding: '1.1rem 1rem 1.1rem 3.5rem',
                  borderRadius: '14px',
                  background: 'rgba(9, 19, 14, 0.85)',
                  border: '2px solid rgba(161, 123, 88, 0.45)',
                  color: '#fff',
                  width: '100%',
                  outline: 'none'
                }}
                required
              />
            </div>

            <button 
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '1.2rem' }}
            >
              Comenzar Diagnóstico
            </button>
          </div>
        </form>
      )}

      {/* Screen 2: Scenarios */}
      {gameStarted && !gameOver && (
        <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Progress bar */}
          <div className="progress-track" style={{ height: '8px', background: 'rgba(9, 19, 14, 0.8)' }}>
            <div 
              className="progress-fill"
              style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', color: '#cbd5e1', fontWeight: 700 }}>
            <span>Caso {scenarios[currentScenario].caseNum} de {scenarios.length}</span>
            <span>Jugador: <strong style={{ color: '#fbbf24' }}>{playerName}</strong></span>
          </div>

          {/* Diagnostic scanner animation */}
          <div style={{ background: 'rgba(9, 19, 14, 0.85)', border: '2px solid rgba(161, 123, 88, 0.35)', padding: '1.75rem', borderRadius: '18px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #4ade80, transparent, #fbbf24)', animation: 'pulseSlow 2.5s ease-in-out infinite' }} />
            <h4 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#fbbf24', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={26} />
              {scenarios[currentScenario].title}
            </h4>
            <p style={{ color: '#f1f5f9', fontSize: '1.45rem', lineHeight: 1.7, margin: 0 }}>
              {scenarios[currentScenario].description}
            </p>
          </div>

          {/* Diagnosis Choices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {scenarios[currentScenario].options.map((option, idx) => {
              let btnStyle = {};
              if (feedback) {
                if (option.correct) {
                  btnStyle = { borderColor: '#4ade80', background: 'rgba(74,222,128,0.12)', color: '#4ade80', pointerEvents: 'none' };
                } else {
                  btnStyle = { borderColor: '#ef4444', background: 'rgba(239,68,68,0.05)', color: '#fca5a5', pointerEvents: 'none', opacity: 0.4 };
                }
              } else {
                btnStyle = { borderColor: 'rgba(161, 123, 88, 0.35)', background: 'rgba(21, 51, 36, 0.45)', color: '#fff', cursor: 'pointer' };
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  style={{
                    width: '100%',
                    padding: '1.1rem 1.5rem',
                    borderRadius: '14px',
                    border: '2px solid',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    transition: 'all 0.25s ease-in-out',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'var(--font-primary)',
                    boxShadow: !feedback ? '0 4px 10px rgba(0,0,0,0.15)' : 'none',
                    ...btnStyle,
                  }}
                >
                  <span>{option.label}</span>
                  {feedback && option.correct && <CheckCircle2 size={22} style={{ color: '#4ade80' }} />}
                  {feedback && !option.correct && <XCircle size={22} style={{ color: '#ef4444' }} />}
                </button>
              );
            })}
          </div>

          {/* Feedback section */}
          {feedback && (
            <div
              className="animate-in"
              style={{
                padding: '1.5rem',
                borderRadius: '16px',
                border: '2px solid',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.5rem',
                borderColor: feedback.type === 'correct' ? 'rgba(74,222,128,0.4)' : 'rgba(239,68,68,0.4)',
                background: feedback.type === 'correct' ? 'rgba(21,51,36,0.9)' : 'rgba(9,19,14,0.9)',
                color: feedback.type === 'correct' ? '#bbf7d0' : '#fecaca',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ fontSize: '1.35rem', flex: 1, lineHeight: 1.6, fontWeight: 500 }}>
                {feedback.text}
              </div>
              <button 
                onClick={handleNext}
                className="btn-primary"
                style={{ padding: '0.8rem 1.5rem', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}
              >
                <span>{currentScenario === scenarios.length - 1 ? "Terminar" : "Siguiente"}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

        </div>
      )}

      {/* Screen 3: Game Over */}
      {gameStarted && gameOver && (
        <div className="animate-in" style={{ padding: '1.5rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
          <div style={{ width: '6.5rem', height: '6.5rem', background: 'rgba(251,191,36,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(251,191,36,0.4)', color: '#fbbf24' }}>
            <Award size={56} />
          </div>
          
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', margin: 0 }}>¡Caso Cerrado, Inspector!</h3>
            <p style={{ fontSize: '1.25rem', color: '#cbd5e1', marginTop: '0.5rem' }}>El diagnóstico del paciente veterinario ha finalizado con éxito.</p>
          </div>

          <div style={{ background: 'rgba(9,19,14,0.95)', maxWidth: '28rem', width: '100%', padding: '1.5rem', borderRadius: '18px', border: '2px solid rgba(161, 123, 88, 0.45)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.95rem', color: '#cbd5e1', fontWeight: 700 }}>Participante</span>
              <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.35rem', marginTop: '0.25rem' }}>{playerName}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.95rem', color: '#cbd5e1', fontWeight: 700 }}>Puntaje Final</span>
              <div style={{ fontWeight: 900, color: '#fbbf24', fontSize: '1.75rem', marginTop: '0.25rem' }}>{score} Puntos</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', width: '100%', maxWidth: '28rem' }}>
            <button 
              onClick={() => {
                setGameStarted(false);
                setPlayerName('');
              }}
              className="btn-secondary"
              style={{ fontWeight: 700, fontSize: '1.1rem', flex: 1, padding: '1rem' }}
            >
              Registrar Otro
            </button>
            
            <button 
              onClick={onGameComplete}
              className="btn-primary"
              style={{ fontWeight: 800, fontSize: '1.1rem', flex: 1, padding: '1rem' }}
            >
              Tabla de Posiciones
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
