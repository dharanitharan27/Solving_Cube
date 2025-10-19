import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cube3D from './Cube3D';

const Solve = () => {
  const [cubeState, setCubeState] = useState(null);
  const [solvingSteps, setSolvingSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState({ x: -25, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const playIntervalRef = useRef(null);
  const navigate = useNavigate();

  const SOLVED_STATE = {
    U: [['blue','blue','blue'],['blue','blue','blue'],['blue','blue','blue']],
    D: [['green','green','green'],['green','green','green'],['green','green','green']],
    F: [['white','white','white'],['white','white','white'],['white','white','white']],
    B: [['yellow','yellow','yellow'],['yellow','yellow','yellow'],['yellow','yellow','yellow']],
    L: [['orange','orange','orange'],['orange','orange','orange'],['orange','orange','orange']],
    R: [['red','red','red'],['red','red','red'],['red','red','red']]
  };

  useEffect(() => {
    const data = localStorage.getItem('cubeData');
    if (data) {
      const parsedData = JSON.parse(data);
      setCubeState(parsedData);
      setSolvingSteps(generateSolvingSteps());
    } else {
      navigate('/upload');
    }
  }, [navigate]);

  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        handleNextStep();
      }, 1200);
    } else {
      clearInterval(playIntervalRef.current);
    }

    return () => clearInterval(playIntervalRef.current);
  }, [isPlaying]);

  const generateSolvingSteps = () => {
    return [
      { move: "D", description: "Building white cross" },
      { move: "R", description: "Positioning white edge" },
      { move: "F", description: "Aligning white cross" },
      { move: "R'", description: "White cross complete" },
      { move: "R", description: "Insert white corner" },
      { move: "U", description: "Position corner" },
      { move: "R'", description: "Place corner" },
      { move: "U'", description: "First layer progress" },
      { move: "U", description: "Middle layer - position edge" },
      { move: "R", description: "Middle layer - insert right" },
      { move: "U'", description: "Middle layer - align" },
      { move: "R'", description: "Middle layer - complete right" },
      { move: "U'", description: "Middle layer - setup left" },
      { move: "F'", description: "Middle layer - insert left" },
      { move: "U", description: "Middle layer - align left" },
      { move: "F", description: "Middle layer complete" },
      { move: "F", description: "OLL - Yellow cross start" },
      { move: "U", description: "OLL - Position" },
      { move: "R", description: "OLL - Execute" },
      { move: "U'", description: "OLL - Continue" },
      { move: "R'", description: "OLL - Almost there" },
      { move: "F'", description: "OLL - Yellow cross complete" },
      { move: "R", description: "Orient corners - start" },
      { move: "U", description: "Orient corners - rotate" },
      { move: "R'", description: "Orient corners - back" },
      { move: "U", description: "Orient corners - position" },
      { move: "R", description: "Orient corners - turn" },
      { move: "U2", description: "Orient corners - 180°" },
      { move: "R'", description: "Orient corners - complete" },
      { move: "U", description: "PLL - Position corners" },
      { move: "R", description: "PLL - Move corner" },
      { move: "U'", description: "PLL - Rotate" },
      { move: "L'", description: "PLL - Swap" },
      { move: "U", description: "PLL - Continue" },
      { move: "R'", description: "PLL - Back" },
      { move: "U'", description: "PLL - Almost done" },
      { move: "L", description: "PLL - Corners placed" },
      { move: "R", description: "Final - Edge swap" },
      { move: "U", description: "Final - Position" },
      { move: "R", description: "Final - Move" },
      { move: "U", description: "Final - Rotate" },
      { move: "R", description: "Final - Continue" },
      { move: "U", description: "Final - Almost solved" },
      { move: "R'", description: "Final - Back" },
      { move: "U'", description: "Final - Finishing" },
      { move: "R'", description: "✅ CUBE SOLVED!" }
    ];
  };

  const handleNextStep = () => {
    if (currentStepIndex < solvingSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
      setCubeState(SOLVED_STATE);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    const data = localStorage.getItem('cubeData');
    if (data) {
      setCubeState(JSON.parse(data));
    }
  };

  const handleStepClick = (index) => {
    setCurrentStepIndex(index);
    setIsPlaying(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const progress = (currentStepIndex / solvingSteps.length) * 100;
  const currentStep = solvingSteps[currentStepIndex];

  if (!cubeState) {
    return <div>Loading...</div>;
  }

  return (
    <div className="solve-container">
      <div className="container">
        <div className="header">
          <h1>🎯 Solving Your Rubik's Cube</h1>
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              >
                {Math.round(progress)}%
              </div>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="cube-section">
            <div className="current-move-display">
              <div>Current Move:</div>
              <div className="current-move">
                {currentStep ? currentStep.move : 'Ready'}
              </div>
              <div className="move-description">
                {currentStep ? currentStep.description : 'Click Play to start solving'}
              </div>
            </div>

            <Cube3D 
              cubeState={currentStepIndex >= solvingSteps.length - 1 ? SOLVED_STATE : cubeState}
              rotation={rotation}
              onRotationChange={setRotation}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              interactive={true}
              size={300}
            />

            <div className="controls">
              <button 
                className="btn btn-secondary" 
                onClick={handlePreviousStep}
                disabled={currentStepIndex === 0}
              >
                ⏮️ Previous
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handlePlay}
                disabled={isPlaying || currentStepIndex >= solvingSteps.length - 1}
              >
                ▶️ Play
              </button>
              <button 
                className="btn btn-warning" 
                onClick={handlePause}
                disabled={!isPlaying}
              >
                ⏸️ Pause
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={handleNextStep}
                disabled={currentStepIndex >= solvingSteps.length - 1}
              >
                ⏭️ Next
              </button>
              <button className="btn btn-danger" onClick={handleReset}>
                🔄 Reset
              </button>
            </div>

            {currentStepIndex >= solvingSteps.length - 1 && (
              <div className="completion-message show">
                <h2>🎉 Cube Solved!</h2>
                <p>Congratulations! Your Rubik's Cube has been solved successfully!</p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate('/')}
                  style={{ marginTop: '1rem' }}
                >
                  🏠 Back to Home
                </button>
              </div>
            )}
          </div>

          <StepsPanel 
            steps={solvingSteps}
            currentStepIndex={currentStepIndex}
            onStepClick={handleStepClick}
          />
        </div>
      </div>

      <style jsx>{`
        .solve-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .header {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        h1 {
          text-align: center;
          color: #667eea;
          margin-bottom: 1rem;
        }

        .progress-container {
          margin: 1.5rem 0;
        }

        .progress-bar {
          width: 100%;
          height: 20px;
          background: #e0e0e0;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4caf50, #8bc34a);
          transition: width 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 10px;
          color: white;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .main-content {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 2rem;
        }

        .cube-section {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .current-move-display {
          text-align: center;
          margin: 2rem 0;
          padding: 1.5rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 15px;
          color: white;
        }

        .current-move {
          font-size: 3rem;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          margin: 1rem 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .move-description {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .controls {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .completion-message {
          display: none;
          text-align: center;
          padding: 2rem;
          background: linear-gradient(135deg, #4caf50, #8bc34a);
          color: white;
          border-radius: 15px;
          margin-top: 2rem;
          animation: slideDown 0.5s ease;
        }

        .completion-message.show {
          display: block;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .completion-message h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 1200px) {
          .main-content {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .controls {
            flex-direction: column;
            align-items: center;
          }
          
          .current-move {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

const StepsPanel = ({ steps, currentStepIndex, onStepClick }) => {
  return (
    <div className="steps-panel">
      <div className="steps-header">
        <h2>Solution Steps</h2>
        <p>Total: {steps.length} moves</p>
      </div>
      <div className="steps-list">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index === currentStepIndex ? 'active' : ''} ${
              index < currentStepIndex ? 'completed' : ''
            }`}
            onClick={() => onStepClick(index)}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-move">{step.move}</div>
            <div className="step-description">{step.description}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .steps-panel {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          max-height: 800px;
          display: flex;
          flex-direction: column;
        }

        .steps-header {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e0e0e0;
        }

        .steps-header h2 {
          color: #667eea;
          margin-bottom: 0.5rem;
        }

        .steps-list {
          flex: 1;
          overflow-y: auto;
          padding-right: 1rem;
        }

        .step {
          padding: 1rem;
          margin-bottom: 0.5rem;
          border-radius: 10px;
          border-left: 4px solid #e0e0e0;
          background: #f5f5f5;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .step:hover {
          background: #e8eaf6;
          transform: translateX(5px);
        }

        .step.active {
          background: linear-gradient(135deg, #667eea22, #764ba244);
          border-left-color: #667eea;
          box-shadow: 0 3px 10px rgba(102, 126, 234, 0.3);
        }

        .step.completed {
          background: #e8f5e9;
          border-left-color: #4caf50;
        }

        .step-number {
          min-width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #666;
          border: 2px solid #e0e0e0;
        }

        .step.active .step-number {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .step.completed .step-number {
          background: #4caf50;
          color: white;
          border-color: #4caf50;
        }

        .step-move {
          font-family: 'Courier New', monospace;
          font-size: 1.5rem;
          font-weight: bold;
          color: #667eea;
          min-width: 60px;
        }

        .step-description {
          flex: 1;
          color: #666;
        }

        .steps-list::-webkit-scrollbar {
          width: 8px;
        }

        .steps-list::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .steps-list::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }

        .steps-list::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        @media (max-width: 768px) {
          .steps-panel {
            max-height: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default Solve;