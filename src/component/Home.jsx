import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="particles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${(i + 1) * 10}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${12 + i * 2}s`
          }}></div>
        ))}
      </div>

      <div className="hero-container">
        <h1>🎲 Rubik's Cube Solver</h1>
        <p className="subtitle">Solve any Rubik's Cube configuration instantly!</p>
        
        <div className="cube-icon">
          <MiniCube />
        </div>

        <div className="btn-container">
          <Link to="/upload" className="btn btn-primary">
            🚀 Start Solving
          </Link>
          <Link to="/upload" className="btn btn-secondary">
            📸 Upload Cube
          </Link>
        </div>
      </div>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          animation: gradientShift 10s ease infinite;
          background-size: 200% 200%;
          position: relative;
        }

        .hero-container {
          text-align: center;
          color: white;
          animation: fadeIn 1s ease-in;
          position: relative;
          z-index: 10;
          padding: 2rem;
        }

        h1 {
          font-size: 4rem;
          margin-bottom: 1rem;
          text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
          animation: textGlow 2s ease-in-out infinite;
        }

        @keyframes textGlow {
          0%, 100% {
            text-shadow: 3px 3px 6px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.3);
          }
          50% {
            text-shadow: 3px 3px 6px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.5);
          }
        }

        .subtitle {
          font-size: 1.5rem;
          margin-bottom: 3rem;
          opacity: 0.9;
          animation: fadeInUp 1s ease-in 0.3s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 0.9;
            transform: translateY(0);
          }
        }

        .cube-icon {
          margin: 3rem auto;
          perspective: 2000px;
          animation: float 3s ease-in-out infinite;
        }

        .btn-container {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 3rem;
          animation: fadeIn 1s ease-in 0.6s both;
        }

        /* Particles */
        .particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 10px;
          height: 10px;
          background: rgba(255,255,255,0.3);
          border-radius: 50%;
          animation: particleFloat 15s linear infinite;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem;
          }
          .subtitle {
            font-size: 1.2rem;
          }
          .btn-container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

const MiniCube = () => {
  return (
    <div className="mini-cube">
      {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
        <div key={face} className={`mini-face ${face}`}>
          {[...Array(9)].map((_, i) => (
            <div key={i} className="mini-cubelet"></div>
          ))}
        </div>
      ))}
      
      <style jsx>{`
        .mini-cube {
          width: 200px;
          height: 200px;
          position: relative;
          transform-style: preserve-3d;
          margin: 0 auto;
          animation: rotate 8s linear infinite;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.4));
          transition: transform 0.5s ease;
        }

        .mini-cube:hover {
          animation-play-state: paused;
          transform: scale(1.1);
        }

        @keyframes rotate {
          0% { transform: rotateX(-20deg) rotateY(0deg); }
          100% { transform: rotateX(-20deg) rotateY(360deg); }
        }

        .mini-face {
          position: absolute;
          width: 200px;
          height: 200px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 3px;
          padding: 3px;
          background: #000;
          border: 3px solid #000;
          backface-visibility: visible;
        }

        .mini-cubelet {
          border: 2px solid #000;
          border-radius: 4px;
          transition: transform 0.3s ease;
        }

        .mini-face:hover .mini-cubelet {
          transform: scale(0.95);
        }

        .mini-face.front { 
          background: linear-gradient(135deg, #ffffff, #f0f0f0); 
          transform: translateZ(100px); 
        }
        .mini-face.back { 
          background: linear-gradient(135deg, #ffeb3b, #fdd835); 
          transform: rotateY(180deg) translateZ(100px); 
        }
        .mini-face.right { 
          background: linear-gradient(135deg, #f44336, #e53935); 
          transform: rotateY(90deg) translateZ(100px); 
        }
        .mini-face.left { 
          background: linear-gradient(135deg, #ff9800, #fb8c00); 
          transform: rotateY(-90deg) translateZ(100px); 
        }
        .mini-face.top { 
          background: linear-gradient(135deg, #2196f3, #1e88e5); 
          transform: rotateX(90deg) translateZ(100px); 
        }
        .mini-face.bottom { 
          background: linear-gradient(135deg, #4caf50, #43a047); 
          transform: rotateX(-90deg) translateZ(100px); 
        }

        @media (max-width: 768px) {
          .mini-cube {
            width: 150px;
            height: 150px;
          }
          .mini-face {
            width: 150px;
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;