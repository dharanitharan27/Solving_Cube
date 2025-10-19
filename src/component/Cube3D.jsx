import React from 'react';

const Cube3D = ({ 
  cubeData, 
  rotation = { x: -20, y: 30 }, 
  onRotationChange,
  onDragStart,
  onDragEnd,
  interactive = true,
  size = 300 
}) => {
  const faceMapping = {
    'F': 'front',
    'B': 'back', 
    'R': 'right',
    'L': 'left',
    'U': 'top',
    'D': 'bottom'
  };

  const handleMouseDown = (e) => {
    if (!interactive) return;
    onDragStart?.();
  };

  const handleMouseMove = (e) => {
    if (!interactive || !e.buttons) return;
    
    const deltaX = e.movementX;
    const deltaY = e.movementY;
    
    onRotationChange?.({
      x: rotation.x - deltaY * 0.5,
      y: rotation.y + deltaX * 0.5
    });
  };

  const handleMouseUp = () => {
    if (!interactive) return;
    onDragEnd?.();
  };

  return (
    <div 
      className="cube-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: interactive ? 'grab' : 'default' }}
    >
      <div 
        className="cube"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          width: `${size}px`,
          height: `${size}px`
        }}
      >
        {Object.entries(faceMapping).map(([cubeFace, className]) => (
          <div 
            key={cubeFace}
            className={`face ${className}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transform: getFaceTransform(className, size / 2)
            }}
          >
            {cubeData[cubeFace]?.map((row, rowIndex) =>
              row.map((color, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`cubelet ${color}`}
                />
              ))
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .cube-container {
          perspective: 2000px;
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
        }

        .cube {
          position: relative;
          transform-style: preserve-3d;
          transition: ${interactive ? 'transform 0.1s ease-out' : 'none'};
        }

        .face {
          position: absolute;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 2px;
          padding: 2px;
          border: 2px solid #222;
          box-sizing: border-box;
          backface-visibility: visible;
        }

        .cubelet {
          border: 1px solid rgba(0,0,0,0.3);
          border-radius: 3px;
          transition: all 0.3s;
        }

        .cubelet.white { background-color: #ffffff; }
        .cubelet.yellow { background-color: #ffeb3b; }
        .cubelet.red { background-color: #f44336; }
        .cubelet.orange { background-color: #ff9800; }
        .cubelet.blue { background-color: #2196f3; }
        .cubelet.green { background-color: #4caf50; }
      `}</style>
    </div>
  );
};

const getFaceTransform = (face, translateZ) => {
  const transforms = {
    front: `translateZ(${translateZ}px)`,
    back: `rotateY(180deg) translateZ(${translateZ}px)`,
    right: `rotateY(90deg) translateZ(${translateZ}px)`,
    left: `rotateY(-90deg) translateZ(${translateZ}px)`,
    top: `rotateX(90deg) translateZ(${translateZ}px)`,
    bottom: `rotateX(-90deg) translateZ(${translateZ}px)`
  };
  return transforms[face] || '';
};

export default Cube3D;