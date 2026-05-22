import React from 'react';
import { ChevronLeft, ChevronRight, Trophy, Award } from 'lucide-react';
import logo from '../assets/media__1779410848960.png';

export default function Navigation({ 
  currentSlide, 
  totalSlides, 
  onNext, 
  onPrev, 
  onJumpToSlide,
  playersCount 
}) {
  return (
    <footer className="nav-bar">
      
      {/* Institution Logo & Team Info */}
      <div className="nav-brand">
        <img 
          src={logo} 
          alt="Logo Sin Fronteras" 
        />
        <div className="nav-brand-text">
          <div className="nav-brand-title">
            CORPORACIÓN SIN FRONTERAS
          </div>
          <div className="nav-brand-subtitle">
            Roberto Guillot • Valentina Padilla
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className="nav-controls">
        <button 
          onClick={onPrev} 
          disabled={currentSlide === 0}
          className="nav-btn"
          title="Diapositiva Anterior"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="nav-dots">
          {Array.from({ length: totalSlides }).map((_, idx) => {
            const isGameSlide = idx === 4 || idx === 7 || idx === 9;
            const classes = [
              'nav-dot',
              currentSlide === idx ? 'active' : '',
              isGameSlide ? 'game-dot' : ''
            ].filter(Boolean).join(' ');
            return (
              <button
                key={idx}
                onClick={() => onJumpToSlide(idx)}
                className={classes}
                title={`Ir a diapositiva ${idx + 1}`}
              />
            );
          })}
        </div>

        <button 
          onClick={onNext} 
          disabled={currentSlide === totalSlides - 1}
          className="nav-btn"
          title="Siguiente Diapositiva"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Shortcuts & Course Info */}
      <div className="nav-info">
        {playersCount > 0 && (
          <div className="nav-badge players">
            <Trophy size={14} />
            <span>{playersCount} Competidores</span>
          </div>
        )}
        <div className="nav-badge course">
          <span>Téc. Auxiliar Veterinario</span>
          <Award size={16} style={{ color: '#d946ef' }} />
        </div>
      </div>

    </footer>
  );
}
