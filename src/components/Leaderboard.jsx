import React, { useEffect, useState } from 'react';
import { Trophy, Star } from 'lucide-react';

export default function Leaderboard({ players }) {
  const [animatedPlayers, setAnimatedPlayers] = useState([]);

  // Sort players by score descending
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  useEffect(() => {
    // Mimic high-end animations by delaying entry slightly
    setAnimatedPlayers([]);
    const timeout = setTimeout(() => {
      setAnimatedPlayers(sortedPlayers);
    }, 100);
    return () => clearTimeout(timeout);
  }, [players]);

  return (
    <div
      className="glass animate-in"
      style={{
        width: '100%',
        maxWidth: '580px',
        margin: '0 auto',
        padding: '1.75rem',
        userSelect: 'none',
        textAlign: 'center',
      }}
    >
      
      <div>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
          <Trophy style={{ color: '#fbbf24' }} size={32} />
          <span>Podio de Honor Auxiliar Veterinario</span>
        </h2>
        <p style={{ fontSize: '1.25rem', color: '#cbd5e1', marginTop: '0.5rem' }}>
          Escala de posiciones en vivo de la sustentación
        </p>
      </div>

      {players.length === 0 ? (
        <div style={{
          padding: '3rem 1rem',
          border: '2px dashed rgba(161, 123, 88, 0.6)',
          borderRadius: '16px',
          color: '#cbd5e1',
          fontSize: '1.25rem',
          marginTop: '1.5rem',
        }}>
          📭 Ningún compañero se ha registrado aún.<br />
          ¡Inicia uno de los minijuegos para ver quién sube al podio!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
          
          {/* Visual Pyramid Podium */}
          <div className="pyramid">
            {animatedPlayers.slice(0, 3).map((player, idx) => {
              const rank = idx + 1;
              let tierClass = 'pyramid-row pyramid-other';
              let title = '';
              
              if (rank === 1) {
                tierClass = 'pyramid-row pyramid-gold';
                title = '🏆 Campeón de Diagnóstico';
              } else if (rank === 2) {
                tierClass = 'pyramid-row pyramid-silver';
                title = '🥈 Especialista de Campo';
              } else if (rank === 3) {
                tierClass = 'pyramid-row pyramid-bronze';
                title = '🥉 Técnico Destacado';
              }

              return (
                <div 
                  key={player.name}
                  className={tierClass}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '1.15rem', opacity: 0.85 }}>#{rank}</span>
                    <span style={{ fontWeight: 700, letterSpacing: '0.03em', fontSize: '1.2rem' }}>{player.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.15rem', opacity: 0.8 }}>{title}</span>
                    <span style={{ fontWeight: 900, fontFamily: 'monospace', fontSize: '1.25rem' }}>{player.score} pts</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* List of remaining players */}
          {animatedPlayers.length > 3 && (
            <div style={{ borderTop: '2px solid rgba(161, 123, 88, 0.4)', paddingTop: '1.25rem' }}>
              <div style={{ fontSize: '1.15rem', color: '#cbd5e1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'left', marginBottom: '0.75rem' }}>
                Resto de Participantes:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {animatedPlayers.slice(3).map((player, idx) => {
                  const rank = idx + 4;
                  return (
                    <div 
                      key={player.name}
                      className="pyramid-row pyramid-other"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontFamily: 'monospace', color: '#94a3b8', fontSize: '1.15rem' }}>#{rank}</span>
                        <span style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '1.25rem' }}>{player.name}</span>
                      </div>
                      <div style={{ fontWeight: 900, color: '#fbbf24', fontFamily: 'monospace', fontSize: '1.25rem' }}>{player.score} pts</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Gamified tips */}
          <div style={{
            fontSize: '1.1rem',
            color: '#cbd5e1',
            background: 'rgba(9, 19, 14, 0.8)',
            padding: '1rem',
            borderRadius: '12px',
            border: '2px solid rgba(161, 123, 88, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}>
            <Star size={12} style={{ color: '#facc15' }} />
            <span>¿Quién podrá superar al número 1? ¡Jueguen otra ronda para subir de puesto!</span>
          </div>

        </div>
      )}

    </div>
  );
}
