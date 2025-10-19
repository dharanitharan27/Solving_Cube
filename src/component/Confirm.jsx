import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cube3D from './Cube3D';

const Confirm = () => {
  const [cubeData, setCubeData] = useState(null);
  const [rotation, setRotation] = useState({ x: -20, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('cubeData');
    if (data) {
      setCubeData(JSON.parse(data));
    } else {
      navigate('/upload');
    }
  }, [navigate]);

  useEffect(() => {
    if (!autoRotate || isDragging) return;

    const interval = setInterval(() => {
      setRotation(prev => ({ ...prev, y: prev.y + 0.5 }));
    }, 50);

    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  const handleDragStart = () => {
    setIsDragging(true);
    setAutoRotate(false);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setTimeout(() => setAutoRotate(true), 2000);
  };

  if (!cubeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="confirm-container">
      <div className="container">
        <h1>✅ Confirm Your Cube Configuration</h1>
        <p className="subtitle">Rotate and verify the cube. Make sure all colors are correct!</p>

        <div className="cube-3d-container">
          <Cube3D
            cubeData={cubeData}
            rotation={rotation}
            onRotationChange={setRotation}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            interactive={true}
            size={300}
          />
        </div>

        <ColorLegend />

        <p className="instructions">
          Drag to rotate the cube manually • Auto-rotation will resume when not dragging
        </p>

        <div className="controls">
          <Link to="/upload" className="btn btn-secondary">
            ⬅️ Re-upload
          </Link>
          <Link to="/solve" className="btn btn-primary">
            ✅ Looks Good! Solve It
          </Link>
        </div>

        <p className="note">
          Double-check your cube configuration before proceeding. An accurate configuration ensures a correct solution.
        </p>
      </div>

      <style jsx>{`
        .confirm-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow-x: hidden;
        }

        .container {
          max-width: 1000px;
          width: 100%;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 3rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          backdrop-filter: blur(10px);
          animation: fadeIn 0.8s ease-out;
        }

        h1 {
          text-align: center;
          color: #667eea;
          margin-bottom: 1rem;
          font-size: 2.5rem;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .cube-3d-container {
          perspective: 1500px;
          display: flex;
          justify-content: center;
          margin: 3rem 0;
          position: relative;
        }

        .instructions {
          text-align: center;
          margin-top: 1rem;
          color: #666;
          font-size: 0.9rem;
        }

        .controls {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin: 2rem 0;
          flex-wrap: wrap;
        }

        .note {
          text-align: center;
          color: #666;
          margin-top: 2rem;
          font-style: italic;
          padding: 1rem;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 10px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .container {
            padding: 2rem;
          }
          
          h1 {
            font-size: 2rem;
          }
          
          .controls {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          body {
            padding: 1rem;
          }
          
          .container {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

const ColorLegend = () => {
  const colors = [
    { name: 'white', label: 'White' },
    { name: 'yellow', label: 'Yellow' },
    { name: 'red', label: 'Red' },
    { name: 'orange', label: 'Orange' },
    { name: 'blue', label: 'Blue' },
    { name: 'green', label: 'Green' }
  ];

  return (
    <div className="legend">
      {colors.map(color => (
        <div key={color.name} className="color-item">
          <div className={`color-box ${color.name}`}></div>
          <span>{color.label}</span>
        </div>
      ))}

      <style jsx>{`
        .legend {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }

        .color-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .color-box {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          border: 1px solid rgba(0,0,0,0.2);
        }

        .color-box.white { background-color: #ffffff; }
        .color-box.yellow { background-color: #ffeb3b; }
        .color-box.red { background-color: #f44336; }
        .color-box.orange { background-color: #ff9800; }
        .color-box.blue { background-color: #2196f3; }
        .color-box.green { background-color: #4caf50; }
      `}</style>
    </div>
  );
};

export default Confirm;