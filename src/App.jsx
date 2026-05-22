import React, { useState } from 'react';
import Navigation from './components/Navigation';
import SlideIntro from './slides/SlideIntro';
import SlideDefinition from './slides/SlideDefinition';
import SlideCauses from './slides/SlideCauses';
import SlideSymptoms from './slides/SlideSymptoms';
import SlideEffects from './slides/SlideEffects';
import SlideTreatment from './slides/SlideTreatment';
import SlideCaseStudy from './slides/SlideCaseStudy';
import SlideOutro from './slides/SlideOutro';
import DiagnosisGame from './games/DiagnosisGame';
import VectorGame from './games/VectorGame';
import Leaderboard from './components/Leaderboard';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [players, setPlayers] = useState([
    // Prefill some test players so the board looks full and alive immediately
    { name: "Juan (Clase)", score: 250 },
    { name: "María (Clase)", score: 180 },
    { name: "Carlos (Clase)", score: 90 }
  ]);

  const totalSlides = 11;

  // Handle Score Updates
  const handleRegisterPlayer = (name, scoreToAdd) => {
    setPlayers(prev => {
      const trimmedName = name.trim();
      const existingIdx = prev.findIndex(p => p.name.toLowerCase() === trimmedName.toLowerCase());
      
      if (existingIdx !== -1) {
        // Update score of existing player
        const updated = [...prev];
        updated[existingIdx].score = updated[existingIdx].score + scoreToAdd;
        return updated;
      } else {
        // Add new player
        return [...prev, { name: trimmedName, score: scoreToAdd }];
      }
    });
  };

  // Navigations
  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleJumpToSlide = (slideIdx) => {
    setCurrentSlide(slideIdx);
  };

  // Render slides dynamically
  const renderSlideContent = () => {
    switch (currentSlide) {
      case 0:
        return <SlideIntro onStart={() => setCurrentSlide(1)} />;
      case 1:
        return <SlideDefinition />;
      case 2:
        return <SlideCauses />;
      case 3:
        return <SlideSymptoms />;
      case 4:
        return (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem 0' }}>
            <DiagnosisGame 
              onGameComplete={() => setCurrentSlide(9)} // Jump straight to leaderboard to see rank changes!
              onRegisterPlayer={handleRegisterPlayer}
            />
          </div>
        );
      case 5:
        return <SlideEffects />;
      case 6:
        return <SlideTreatment />;
      case 7:
        return (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem 0' }}>
            <VectorGame 
              onGameComplete={() => setCurrentSlide(9)} // Jump to leaderboard
              onRegisterPlayer={handleRegisterPlayer}
            />
          </div>
        );
      case 8:
        return <SlideCaseStudy />;
      case 9:
        return (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem 0', gap: '1rem' }}>
            <Leaderboard players={players} />
            <button
              onClick={() => setCurrentSlide(10)}
              className="btn-primary"
            >
              Continuar a Conclusiones
            </button>
          </div>
        );
      case 10:
        return <SlideOutro />;
      default:
        return <SlideIntro onStart={() => setCurrentSlide(1)} />;
    }
  };

  // Listen to keyboard arrow keys for slick slide flipping
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't switch slides if the user is typing in game registration
      if (document.activeElement.tagName === 'INPUT') return;
      
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="app-root">
      
      {/* Dynamic Slide Viewer */}
      <main className="slide-viewport">
        {renderSlideContent()}
      </main>

      {/* Main Slide Navigation Bar */}
      <Navigation 
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onNext={handleNext}
        onPrev={handlePrev}
        onJumpToSlide={handleJumpToSlide}
        playersCount={players.filter(p => !p.name.includes('(Clase)')).length}
      />

    </div>
  );
}
