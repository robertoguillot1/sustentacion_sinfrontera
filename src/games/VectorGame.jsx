import React, { useState, useEffect, useRef } from 'react';
import { Shield, Sparkles, Bug, User, Heart, RotateCcw, AlertTriangle } from 'lucide-react';
import potreroBg from '../assets/potrero_topdown.png';

export default function VectorGame({ onGameComplete, onRegisterPlayer }) {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds gameplay
  const [gameOver, setGameOver] = useState(false);
  const [activeDefense, setActiveDefense] = useState(null); // 'vaccine', 'repellent', 'stall', 'drain'
  const [defenseCooldowns, setDefenseCooldowns] = useState({
    vaccine: 0,
    repellent: 0,
    stall: 0,
    drain: 0
  });

  const [mosquitos, setMosquitos] = useState([]);
  const gameAreaRef = useRef(null);
  const requestRef = useRef(null);

  // Web Audio Synth for retro sound effects
  const playSound = (type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'swat') {
        // High to low explosion/splat noise
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'shield') {
        // Futuristic shield sound
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'bite') {
        // Ouch beep
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.setValueAtTime(75, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'win') {
        // Fanfare
        osc.type = 'sine';
        const notes = [261.63, 329.63, 392.00, 523.25]; // C, E, G, C
        notes.forEach((f, i) => {
          const oscN = ctx.createOscillator();
          const gainN = ctx.createGain();
          oscN.connect(gainN);
          gainN.connect(ctx.destination);
          oscN.type = 'sine';
          oscN.frequency.setValueAtTime(f, ctx.currentTime + i * 0.1);
          gainN.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.1);
          gainN.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.15);
          oscN.start(ctx.currentTime + i * 0.1);
          oscN.stop(ctx.currentTime + i * 0.1 + 0.2);
        });
      }
    } catch (e) {
      console.warn('Audio synthesis not supported or blocked:', e);
    }
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    setGameStarted(true);
    setScore(0);
    setHealth(3);
    setTimeLeft(30);
    setGameOver(false);
    setMosquitos([]);
    setActiveDefense(null);
    setDefenseCooldowns({ vaccine: 0, repellent: 0, stall: 0, drain: 0 });
  };

  // Cooldown timers
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const interval = setInterval(() => {
      setDefenseCooldowns(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          if (next[key] > 0) next[key] = next[key] - 1;
        });
        return next;
      });

      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleWin();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  // Spawn mosquitoes
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const spawnInterval = setInterval(() => {
      // Mosquito spawn rate depends on "Drenaje de Charcos" active defense
      const spawnChance = activeDefense === 'drain' ? 0.3 : 0.75;
      if (Math.random() > spawnChance) return;

      const sides = ['top', 'bottom', 'left', 'right'];
      const spawnSide = sides[Math.floor(Math.random() * sides.length)];
      let x = 0, y = 0;

      if (spawnSide === 'top') {
        x = Math.random() * 100;
        y = -10;
      } else if (spawnSide === 'bottom') {
        x = Math.random() * 100;
        y = 110;
      } else if (spawnSide === 'left') {
        x = -10;
        y = Math.random() * 100;
      } else if (spawnSide === 'right') {
        x = 110;
        y = Math.random() * 100;
      }

      setMosquitos(prev => [
        ...prev,
        {
          id: Math.random(),
          x,
          y,
          speed: 1.0 + Math.random() * 1.5,
          angle: Math.random() * Math.PI * 2
        }
      ]);
    }, 800);

    return () => clearInterval(spawnInterval);
  }, [gameStarted, gameOver, activeDefense]);

  // Main game animation loop (mosquito movement towards cow in center 50%, 50%)
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const updatePhysics = () => {
      setMosquitos(prev => {
        const next = [];
        
        for (let i = 0; i < prev.length; i++) {
          const m = prev[i];
          
          // Vector pointing towards the cow in the center (50, 50)
          const dx = 50 - m.x;
          const dy = 58 - m.y; // Slightly lower towards cow target
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 8) {
            // Reached cow!
            handleBite();
            continue; // Skip adding to next frame
          }

          // Move mosquito towards center
          const angle = Math.atan2(dy, dx);
          const nextX = m.x + Math.cos(angle) * (m.speed * 0.4);
          const nextY = m.y + Math.sin(angle) * (m.speed * 0.4);

          next.push({
            ...m,
            x: nextX,
            y: nextY
          });
        }
        
        return next;
      });

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameStarted, gameOver, activeDefense]);

  const handleBite = () => {
    // If vaccine shield or stable stall shield is active, block the bite!
    if (activeDefense === 'vaccine' || activeDefense === 'stall') {
      playSound('shield');
      return;
    }

    playSound('bite');
    setHealth(prev => {
      const next = prev - 1;
      if (next <= 0) {
        handleLoss();
      }
      return next;
    });
  };

  const handleLoss = () => {
    setGameOver(true);
    playSound('bite');
    onRegisterPlayer(playerName, score);
  };

  const handleWin = () => {
    setGameOver(true);
    playSound('win');
    const survivalBonus = health * 100;
    const finalScore = score + survivalBonus;
    setScore(finalScore);
    onRegisterPlayer(playerName, finalScore);
  };

  // Swat single mosquito
  const handleSwat = (id) => {
    playSound('swat');
    setScore(prev => prev + 15);
    setMosquitos(prev => prev.filter(m => m.id !== id));
  };

  // Trigger active defense
  const triggerDefense = (type) => {
    if (defenseCooldowns[type] > 0 || gameOver) return;

    setActiveDefense(type);
    playSound('shield');
    
    // Set Cooldown
    setDefenseCooldowns(prev => ({
      ...prev,
      [type]: type === 'repellent' ? 12 : type === 'stall' ? 8 : 10
    }));

    if (type === 'repellent') {
      // Repellent swat all mosquitos currently on screen
      setScore(prev => prev + mosquitos.length * 10);
      setMosquitos([]);
      setTimeout(() => setActiveDefense(null), 1000);
    } else if (type === 'stall') {
      // Put cow in stable: fully protected for 3.5 seconds
      setTimeout(() => setActiveDefense(null), 3500);
    } else if (type === 'vaccine') {
      // Vaccination shield lasts 5 seconds
      setTimeout(() => setActiveDefense(null), 5000);
    } else if (type === 'drain') {
      // Draining puddles lowers spawns for 6 seconds
      setTimeout(() => setActiveDefense(null), 6000);
    }
  };

  return (
    <div className="glass" style={{ width: '100%', maxWidth: '52rem', margin: '0 auto', padding: '2.5rem', boxSizing: 'border-box', userSelect: 'none', fontFamily: '"Outfit", sans-serif', borderColor: 'rgba(161, 123, 88, 0.45)' }}>
      
      {/* Game Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid rgba(161, 123, 88, 0.25)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
            <Shield style={{ color: '#fbbf24' }} size={28} />
            <span>Minijuego 2: Defensa contra el Culicoides</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', margin: '0.35rem 0 0 0' }}>Protege a tu bovino de las picaduras transmisoras</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '1rem', color: '#cbd5e1', fontWeight: 700 }}>Puntaje</span>
          <div style={{ fontSize: '2.25rem', fontWeight: 900, color: '#fbbf24' }}>{score} pts</div>
        </div>
      </div>

      {/* Screen 1: Registration */}
      {!gameStarted && (
        <form onSubmit={handleStartGame} className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem 0', textAlign: 'center' }}>
          <div style={{ maxWidth: '32rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: 0 }}>¡Registra un participante para la defensa!</h3>
            <p style={{ fontSize: '1.15rem', color: '#cbd5e1', margin: 0, lineHeight: '1.5' }}>El mosquito Culicoides atacará al bovino en el centro. ¡Usa repelentes, vacunas y manotazos para protegerlo!</p>
            
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
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            <button 
              type="submit"
              className="btn-primary"
              style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '1.2rem', fontSize: '1.2rem', fontWeight: 800 }}
            >
              Iniciar Defensa de Campo
            </button>
          </div>
        </form>
      )}

      {/* Screen 2: Gameplay */}
      {gameStarted && !gameOver && (
        <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Status Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.1rem', fontWeight: 700 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#cbd5e1' }}>Jugador:</span>
              <span style={{ color: '#fbbf24' }}>{playerName}</span>
            </div>
            
            {/* Timer */}
            <div style={{ backgroundColor: 'rgba(9, 19, 14, 0.85)', border: '2px solid rgba(161, 123, 88, 0.45)', padding: '0.4rem 1.25rem', borderRadius: '9999px', fontFamily: 'monospace', fontSize: '1.25rem', color: '#4ade80', fontWeight: 'bold' }}>
              ⏱️ {timeLeft}s
            </div>

            {/* Health (Hearts) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              {Array.from({ length: 3 }).map((_, idx) => (
                <Heart 
                  key={idx} 
                  size={24} 
                  style={{
                    color: idx < health ? '#ef4444' : '#334155',
                    fill: idx < health ? '#ef4444' : 'none'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Active Shields Banner */}
          <div style={{ height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {activeDefense === 'vaccine' && (
              <span style={{ fontSize: '1.1rem', backgroundColor: 'rgba(21, 51, 36, 0.85)', border: '2px solid #4ade80', padding: '0.35rem 1rem', borderRadius: '9999px', color: '#4ade80', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(74,222,128,0.2)' }}>
                🛡️ Vacuna Activa (Inmunidad Temporal)
              </span>
            )}
            {activeDefense === 'stall' && (
              <span style={{ fontSize: '1.1rem', backgroundColor: 'rgba(15, 36, 26, 0.85)', border: '2px solid #fbbf24', padding: '0.35rem 1rem', borderRadius: '9999px', color: '#fbbf24', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(251,191,36,0.2)' }}>
                🏠 Estabulado (Vaca en Corral Protegida)
              </span>
            )}
            {activeDefense === 'drain' && (
              <span style={{ fontSize: '1.1rem', backgroundColor: 'rgba(9, 19, 14, 0.85)', border: '2px solid rgba(161, 123, 88, 0.45)', padding: '0.35rem 1rem', borderRadius: '9999px', color: '#cbd5e1', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🚜 Drenaje de Charcos (Pocos Mosquitos)
              </span>
            )}
          </div>

          {/* Game Canvas Area */}
          <div 
            ref={gameAreaRef} 
            className="game-screen"
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', height: '320px', width: '100%', backgroundImage: `url(${potreroBg})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '2px solid rgba(161, 123, 88, 0.35)', borderRadius: '1rem', boxSizing: 'border-box', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)' }}
          >
            {/* Cow Graphic at center */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '9999px',
                padding: '1rem',
                borderWidth: '2px',
                borderStyle: 'solid',
                transition: 'all 0.3s',
                ...(activeDefense === 'vaccine' 
                  ? { borderColor: '#4ade80', backgroundColor: 'rgba(21, 51, 36, 0.6)', boxShadow: '0 0 25px rgba(74,222,128,0.5)' }
                  : activeDefense === 'stall'
                  ? { borderColor: '#fbbf24', backgroundColor: 'rgba(15, 36, 26, 0.6)', boxShadow: '0 0 25px rgba(251,191,36,0.5)' }
                  : { borderColor: 'rgba(161, 123, 88, 0.35)', backgroundColor: 'rgba(9, 19, 14, 0.65)' })
              }}
            >
              <span style={{ fontSize: '3.5rem', userSelect: 'none', lineHeight: 1 }}>🐄</span>
              <span style={{
                fontSize: '0.85rem',
                fontWeight: 'bold',
                marginTop: '0.35rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                ...(activeDefense === 'stall' 
                  ? { backgroundColor: '#fbbf24', color: '#09130e' }
                  : activeDefense === 'vaccine'
                  ? { backgroundColor: '#4ade80', color: '#09130e' }
                  : { backgroundColor: 'rgba(161, 123, 88, 0.35)', color: '#cbd5e1' })
              }}>
                {activeDefense === 'stall' ? 'ESTABULADA' : activeDefense === 'vaccine' ? 'VACUNADA' : 'VACA'}
              </span>
            </div>

            {/* Rendering mosquitoes (ENLARGED to 2.25rem for high projection visibility) */}
            {mosquitos.map(m => (
              <div
                key={m.id}
                onClick={() => handleSwat(m.id)}
                className="mosquito-sprite"
                style={{
                  position: 'absolute',
                  cursor: 'crosshair',
                  fontSize: '2.25rem',
                  left: `${m.x}%`,
                  top: `${m.y}%`,
                  transform: 'translate(-50%, -50%)',
                  userSelect: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem'
                }}
              >
                🦟
              </div>
            ))}
          </div>

          {/* Active Defense Dashboard */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '0.75rem' }}>
            
            <button
              onClick={() => triggerDefense('vaccine')}
              disabled={defenseCooldowns.vaccine > 0}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.75rem 0.5rem',
                borderRadius: '1rem',
                borderWidth: '2px',
                borderStyle: 'solid',
                textAlign: 'center',
                fontFamily: 'var(--font-primary)',
                cursor: defenseCooldowns.vaccine > 0 ? 'not-allowed' : 'pointer',
                ...(defenseCooldowns.vaccine > 0
                  ? { backgroundColor: 'rgba(9, 19, 14, 0.5)', borderColor: 'rgba(161, 123, 88, 0.15)', color: '#475569' }
                  : { backgroundColor: 'rgba(21, 51, 36, 0.8)', borderColor: 'rgba(161, 123, 88, 0.4)', color: '#4ade80' })
              }}
            >
              <Shield size={20} />
              <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>1. Vacuna</span>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 700 }}>
                {defenseCooldowns.vaccine > 0 ? `${defenseCooldowns.vaccine}s` : 'Listo'}
              </span>
            </button>

            <button
              onClick={() => triggerDefense('repellent')}
              disabled={defenseCooldowns.repellent > 0}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.75rem 0.5rem',
                borderRadius: '1rem',
                borderWidth: '2px',
                borderStyle: 'solid',
                textAlign: 'center',
                fontFamily: 'var(--font-primary)',
                cursor: defenseCooldowns.repellent > 0 ? 'not-allowed' : 'pointer',
                ...(defenseCooldowns.repellent > 0
                  ? { backgroundColor: 'rgba(9, 19, 14, 0.5)', borderColor: 'rgba(161, 123, 88, 0.15)', color: '#475569' }
                  : { backgroundColor: 'rgba(21, 51, 36, 0.8)', borderColor: 'rgba(161, 123, 88, 0.4)', color: '#fbbf24' })
              }}
            >
              <Sparkles size={20} />
              <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>2. Repelente</span>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 700 }}>
                {defenseCooldowns.repellent > 0 ? `${defenseCooldowns.repellent}s` : 'Listo'}
              </span>
            </button>

            <button
              onClick={() => triggerDefense('stall')}
              disabled={defenseCooldowns.stall > 0}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.75rem 0.5rem',
                borderRadius: '1rem',
                borderWidth: '2px',
                borderStyle: 'solid',
                textAlign: 'center',
                fontFamily: 'var(--font-primary)',
                cursor: defenseCooldowns.stall > 0 ? 'not-allowed' : 'pointer',
                ...(defenseCooldowns.stall > 0
                  ? { backgroundColor: 'rgba(9, 19, 14, 0.5)', borderColor: 'rgba(161, 123, 88, 0.15)', color: '#475569' }
                  : { backgroundColor: 'rgba(21, 51, 36, 0.8)', borderColor: 'rgba(161, 123, 88, 0.4)', color: '#fbbf24' })
              }}
            >
              <Bug size={20} />
              <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>3. Establo</span>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 700 }}>
                {defenseCooldowns.stall > 0 ? `${defenseCooldowns.stall}s` : 'Listo'}
              </span>
            </button>

            <button
              onClick={() => triggerDefense('drain')}
              disabled={defenseCooldowns.drain > 0}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.75rem 0.5rem',
                borderRadius: '1rem',
                borderWidth: '2px',
                borderStyle: 'solid',
                textAlign: 'center',
                fontFamily: 'var(--font-primary)',
                cursor: defenseCooldowns.drain > 0 ? 'not-allowed' : 'pointer',
                ...(defenseCooldowns.drain > 0
                  ? { backgroundColor: 'rgba(9, 19, 14, 0.5)', borderColor: 'rgba(161, 123, 88, 0.15)', color: '#475569' }
                  : { backgroundColor: 'rgba(21, 51, 36, 0.8)', borderColor: 'rgba(161, 123, 88, 0.4)', color: '#4ade80' })
              }}
            >
              <RotateCcw size={20} />
              <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>4. Drenar</span>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 700 }}>
                {defenseCooldowns.drain > 0 ? `${defenseCooldowns.drain}s` : 'Listo'}
              </span>
            </button>

          </div>

          <div style={{ textAlign: 'center', fontSize: '1rem', color: '#cbd5e1', background: 'rgba(9, 19, 14, 0.65)', padding: '0.75rem', borderRadius: '10px', border: '1px solid rgba(161, 123, 88, 0.2)' }}>
            🖱️ ¡Haz clic rápido en los mosquitos 🦟 para aplastarlos y obtener puntos! Usa tus poderes de defensa en caso de enjambre.
          </div>

        </div>
      )}

      {/* Screen 3: Game Over */}
      {gameStarted && gameOver && (
        <div className="animate-in" style={{ padding: '1.5rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
          <div style={{
            width: '6.5rem', height: '6.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', borderWidth: '2px', borderStyle: 'solid',
            ...(health > 0 
              ? { backgroundColor: 'rgba(74, 222, 128, 0.12)', borderColor: 'rgba(74, 222, 128, 0.4)', color: '#4ade80' }
              : { backgroundColor: 'rgba(239, 68, 68, 0.12)', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444' })
          }}>
            {health > 0 ? (
              <Sparkles size={56} />
            ) : (
              <AlertTriangle size={56} />
            )}
          </div>
          
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'white', margin: 0 }}>
              {health > 0 ? '¡Defensa Excepcional!' : '¡Infección en el Hato!'}
            </h3>
            <p style={{ fontSize: '1.25rem', color: '#cbd5e1', marginTop: '0.5rem', marginBottom: 0, lineHeight: '1.5' }}>
              {health > 0 
                ? 'Protegiste al bovino con éxito. ¡Los Culicoides fueron derrotados!' 
                : 'Demasiadas picaduras de mosquitos. El toro presenta síntomas de cianosis de Lengua Azul.'}
            </p>
          </div>

          <div style={{ background: 'rgba(9, 19, 14, 0.95)', maxWidth: '28rem', margin: '0 auto', padding: '1.5rem', borderRadius: '18px', border: '2px solid rgba(161, 123, 88, 0.45)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', boxSizing: 'border-box', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.95rem', color: '#cbd5e1', fontWeight: 700 }}>Defensor</span>
              <div style={{ fontWeight: 800, color: 'white', fontSize: '1.35rem', marginTop: '0.25rem' }}>{playerName}</div>
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
              style={{ fontSize: '1.1rem', fontWeight: 800, flex: 1, padding: '1rem' }}
            >
              Registrar Otro
            </button>
            
            <button 
              onClick={onGameComplete}
              className="btn-primary"
              style={{ fontSize: '1.1rem', fontWeight: 800, flex: 1, padding: '1rem' }}
            >
              Tabla de Posiciones
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

