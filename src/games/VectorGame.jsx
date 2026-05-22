import React, { useState, useEffect, useRef } from 'react';
import { Shield, Sparkles, Bug, User, Heart, RotateCcw, AlertTriangle } from 'lucide-react';

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
    <div className="glass" style={{ width: '100%', maxWidth: '42rem', margin: '0 auto', padding: '1.5rem', boxSizing: 'border-box', userSelect: 'none', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Game Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '1rem', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
            <Shield style={{ color: '#fb7185' }} />
            <span>Minijuego 2: Defensa contra el Culicoides</span>
          </h2>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>Protege a tu bovino de las picaduras transmisoras</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Puntaje</span>
          <div className="glow-purple" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fb7185' }}>{score} pts</div>
        </div>
      </div>

      {/* Screen 1: Registration */}
      {!gameStarted && (
        <form onSubmit={handleStartGame} className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.5rem 0', textAlign: 'center' }}>
          <div style={{ maxWidth: '28rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#cbd5e1', margin: 0 }}>¡Registra un participante para la defensa!</h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>El mosquito Culicoides atacará al bovino en el centro. ¡Usa repelentes, vacunas y manotazos para protegerlo!</p>
            
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={18} />
              <input 
                type="text" 
                placeholder="Nombre del compañero..." 
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="game-input"
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', boxSizing: 'border-box' }}
                required
              />
            </div>

            <button 
              type="submit"
              className="btn-primary"
              style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0.875rem', fontSize: '0.875rem', fontWeight: 'bold' }}
            >
              Iniciar Defensa de Campo
            </button>
          </div>
        </form>
      )}

      {/* Screen 2: Gameplay */}
      {gameStarted && !gameOver && (
        <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Status Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{ color: '#94a3b8', fontWeight: 600 }}>Jugador:</span>
              <span style={{ color: 'white', fontWeight: 'bold' }}>{playerName}</span>
            </div>
            
            {/* Timer */}
            <div style={{ backgroundColor: '#020617', border: '1px solid #1e293b', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontFamily: 'monospace', fontSize: '0.875rem', color: '#00e5ff', fontWeight: 'bold' }}>
              ⏱️ {timeLeft}s
            </div>

            {/* Health (Hearts) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {Array.from({ length: 3 }).map((_, idx) => (
                <Heart 
                  key={idx} 
                  size={16} 
                  style={{
                    color: idx < health ? '#f43f5e' : '#334155',
                    fill: idx < health ? '#f43f5e' : 'none'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Active Shields Banner */}
          <div style={{ height: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {activeDefense === 'vaccine' && (
              <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(8, 51, 68, 0.8)', border: '1px solid rgba(0, 229, 255, 0.5)', padding: '0.125rem 0.75rem', borderRadius: '9999px', color: '#00e5ff', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                🛡️ Vacuna Activa (Inmunidad Temporal)
              </span>
            )}
            {activeDefense === 'stall' && (
              <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(49, 46, 129, 0.8)', border: '1px solid rgba(99, 102, 241, 0.5)', padding: '0.125rem 0.75rem', borderRadius: '9999px', color: '#a5b4fc', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                🏠 Estabulado (Vaca en Corral Protegida)
              </span>
            )}
            {activeDefense === 'drain' && (
              <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(2, 44, 34, 0.8)', border: '1px solid rgba(16, 185, 129, 0.5)', padding: '0.125rem 0.75rem', borderRadius: '9999px', color: '#34d399', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                🚜 Drenaje de Charcos (Pocos Mosquitos)
              </span>
            )}
          </div>

          {/* Game Canvas Area */}
          <div 
            ref={gameAreaRef} 
            className="game-screen"
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', height: '300px', width: '100%', backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '0.5rem', boxSizing: 'border-box' }}
          >
            {/* Cow Graphic at center */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '9999px',
                padding: '0.5rem',
                borderWidth: '1px',
                borderStyle: 'solid',
                transition: 'all 0.3s',
                ...(activeDefense === 'vaccine' 
                  ? { borderColor: '#22d3ee', backgroundColor: 'rgba(8, 51, 68, 0.4)', boxShadow: '0 0 20px rgba(0,229,255,0.4)' }
                  : activeDefense === 'stall'
                  ? { borderColor: '#818cf8', backgroundColor: 'rgba(49, 46, 129, 0.4)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }
                  : { borderColor: '#1e293b', backgroundColor: 'rgba(15, 23, 42, 0.6)' })
              }}
            >
              <span style={{ fontSize: '3rem', userSelect: 'none', lineHeight: 1 }}>🐄</span>
              <span style={{
                fontSize: '0.625rem',
                fontWeight: 'bold',
                marginTop: '0.25rem',
                padding: '0.125rem 0.5rem',
                borderRadius: '9999px',
                ...(activeDefense === 'stall' 
                  ? { backgroundColor: '#6366f1', color: 'white' }
                  : activeDefense === 'vaccine'
                  ? { backgroundColor: '#00e5ff', color: '#020617' }
                  : { backgroundColor: '#1e293b', color: '#94a3b8' })
              }}>
                {activeDefense === 'stall' ? 'ESTABULADA' : activeDefense === 'vaccine' ? 'VACUNADA' : 'VACA'}
              </span>
            </div>

            {/* Rendering mosquitoes */}
            {mosquitos.map(m => (
              <div
                key={m.id}
                onClick={() => handleSwat(m.id)}
                className="mosquito-sprite"
                style={{
                  position: 'absolute',
                  cursor: 'crosshair',
                  fontSize: '1.5rem',
                  left: `${m.x}%`,
                  top: `${m.y}%`,
                  transform: 'translate(-50%, -50%)',
                  userSelect: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                🦟
              </div>
            ))}
          </div>

          {/* Active Defense Dashboard */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '0.5rem' }}>
            
            <button
              onClick={() => triggerDefense('vaccine')}
              disabled={defenseCooldowns.vaccine > 0}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.5rem',
                borderRadius: '0.75rem',
                borderWidth: '1px',
                borderStyle: 'solid',
                textAlign: 'center',
                cursor: defenseCooldowns.vaccine > 0 ? 'not-allowed' : 'pointer',
                ...(defenseCooldowns.vaccine > 0
                  ? { backgroundColor: 'rgba(15, 23, 42, 0.4)', borderColor: '#0f172a', color: '#475569' }
                  : { backgroundColor: 'rgba(8, 51, 68, 0.2)', borderColor: 'rgba(6, 182, 212, 0.3)', color: '#22d3ee' })
              }}
            >
              <Shield size={16} />
              <span style={{ fontSize: '0.625rem', fontWeight: 'bold' }}>1. Vacuna</span>
              <span style={{ fontSize: '0.5625rem', color: '#64748b' }}>
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
                gap: '0.25rem',
                padding: '0.5rem',
                borderRadius: '0.75rem',
                borderWidth: '1px',
                borderStyle: 'solid',
                textAlign: 'center',
                cursor: defenseCooldowns.repellent > 0 ? 'not-allowed' : 'pointer',
                ...(defenseCooldowns.repellent > 0
                  ? { backgroundColor: 'rgba(15, 23, 42, 0.4)', borderColor: '#0f172a', color: '#475569' }
                  : { backgroundColor: 'rgba(59, 7, 100, 0.2)', borderColor: 'rgba(168, 85, 247, 0.3)', color: '#c084fc' })
              }}
            >
              <Sparkles size={16} />
              <span style={{ fontSize: '0.625rem', fontWeight: 'bold' }}>2. Repelente</span>
              <span style={{ fontSize: '0.5625rem', color: '#64748b' }}>
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
                gap: '0.25rem',
                padding: '0.5rem',
                borderRadius: '0.75rem',
                borderWidth: '1px',
                borderStyle: 'solid',
                textAlign: 'center',
                cursor: defenseCooldowns.stall > 0 ? 'not-allowed' : 'pointer',
                ...(defenseCooldowns.stall > 0
                  ? { backgroundColor: 'rgba(15, 23, 42, 0.4)', borderColor: '#0f172a', color: '#475569' }
                  : { backgroundColor: 'rgba(49, 46, 129, 0.2)', borderColor: 'rgba(99, 102, 241, 0.3)', color: '#a5b4fc' })
              }}
            >
              <Bug size={16} />
              <span style={{ fontSize: '0.625rem', fontWeight: 'bold' }}>3. Establo</span>
              <span style={{ fontSize: '0.5625rem', color: '#64748b' }}>
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
                gap: '0.25rem',
                padding: '0.5rem',
                borderRadius: '0.75rem',
                borderWidth: '1px',
                borderStyle: 'solid',
                textAlign: 'center',
                cursor: defenseCooldowns.drain > 0 ? 'not-allowed' : 'pointer',
                ...(defenseCooldowns.drain > 0
                  ? { backgroundColor: 'rgba(15, 23, 42, 0.4)', borderColor: '#0f172a', color: '#475569' }
                  : { backgroundColor: 'rgba(2, 44, 34, 0.2)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#34d399' })
              }}
            >
              <RotateCcw size={16} />
              <span style={{ fontSize: '0.625rem', fontWeight: 'bold' }}>4. Drenar</span>
              <span style={{ fontSize: '0.5625rem', color: '#64748b' }}>
                {defenseCooldowns.drain > 0 ? `${defenseCooldowns.drain}s` : 'Listo'}
              </span>
            </button>

          </div>

          <div className="canvas-hint" style={{ textAlign: 'center', fontSize: '0.625rem', color: '#64748b' }}>
            🖱️ ¡Haz clic rápido en los mosquitos 🦟 para aplastarlos y obtener puntos! Usa tus poderes de defensa en caso de enjambre.
          </div>

        </div>
      )}

      {/* Screen 3: Game Over */}
      {gameStarted && gameOver && (
        <div className="animate-in" style={{ padding: '2rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            width: '5rem', height: '5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', borderWidth: '1px', borderStyle: 'solid',
            ...(health > 0 
              ? { backgroundColor: 'rgba(2, 44, 34, 0.2)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#34d399' }
              : { backgroundColor: 'rgba(76, 5, 25, 0.2)', borderColor: 'rgba(244, 63, 94, 0.3)', color: '#f43f5e' })
          }}>
            {health > 0 ? (
              <Sparkles size={40} />
            ) : (
              <AlertTriangle size={40} />
            )}
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white', margin: 0 }}>
              {health > 0 ? '¡Defensa Excepcional!' : '¡Infección en el Hato!'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem', marginBottom: 0 }}>
              {health > 0 
                ? 'Protegiste al bovino con éxito. ¡Los Culicoides fueron derrotados!' 
                : 'Demasiadas picaduras de mosquitos. El toro presenta síntomas de cianosis de Lengua Azul.'}
            </p>
          </div>

          <div style={{ backgroundColor: '#0f172a', maxWidth: '24rem', margin: '0 auto', padding: '1rem', borderRadius: '1rem', border: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Defensor</span>
              <div style={{ fontWeight: 'bold', color: 'white', fontSize: '1rem' }}>{playerName}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Puntaje Final</span>
              <div className="glow-purple" style={{ fontWeight: 900, color: '#fb7185', fontSize: '1.25rem' }}>{score} Puntos</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button 
              onClick={() => {
                setGameStarted(false);
                setPlayerName('');
              }}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', fontWeight: 'bold', padding: '0.5rem 1rem' }}
            >
              Registrar Otro Defensor
            </button>
            
            <button 
              onClick={onGameComplete}
              className="btn-primary"
              style={{ fontSize: '0.75rem', fontWeight: 'bold', padding: '0.5rem 1rem' }}
            >
              Ver Tabla de Posiciones
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

