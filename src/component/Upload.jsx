import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Upload = () => {
  const [uploadedImages, setUploadedImages] = useState({});
  const navigate = useNavigate();

  const faces = [
    { id: 'front', label: '⬜ Front (White)' },
    { id: 'back', label: '🟨 Back (Yellow)' },
    { id: 'right', label: '🟥 Right (Red)' },
    { id: 'left', label: '🟧 Left (Orange)' },
    { id: 'top', label: '🟦 Top (Blue)' },
    { id: 'bottom', label: '🟩 Bottom (Green)' }
  ];

  const handleFileUpload = (faceId, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages(prev => ({
          ...prev,
          [faceId]: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const allUploaded = faces.every(face => uploadedImages[face.id]);

  const handleContinue = () => {
    const cubeData = generateMockCubeData();
    localStorage.setItem('cubeData', JSON.stringify(cubeData));
    navigate('/confirm');
  };

  const generateMockCubeData = () => {
    return {
      F: [['white', 'white', 'white'], ['white', 'white', 'white'], ['white', 'white', 'white']],
      B: [['yellow', 'yellow', 'yellow'], ['yellow', 'yellow', 'yellow'], ['yellow', 'yellow', 'yellow']],
      R: [['red', 'red', 'red'], ['red', 'red', 'red'], ['red', 'red', 'red']],
      L: [['orange', 'orange', 'orange'], ['orange', 'orange', 'orange'], ['orange', 'orange', 'orange']],
      U: [['blue', 'blue', 'blue'], ['blue', 'blue', 'blue'], ['blue', 'blue', 'blue']],
      D: [['green', 'green', 'green'], ['green', 'green', 'green'], ['green', 'green', 'green']]
    };
  };

  return (
    <div className="upload-container">
      <div className="container">
        <h1>📸 Upload Cube Face Images</h1>

        <div className="progress-steps">
          <div className="step active">
            <div className="step-circle">1</div>
            <div className="step-label">Upload</div>
          </div>
          <div className="step">
            <div className="step-circle">2</div>
            <div className="step-label">Confirm</div>
          </div>
          <div className="step">
            <div className="step-circle">3</div>
            <div className="step-label">Solve</div>
          </div>
        </div>

        <div className="upload-grid">
          {faces.map(face => (
            <FaceUpload
              key={face.id}
              label={face.label}
              faceId={face.id}
              preview={uploadedImages[face.id]}
              onFileUpload={handleFileUpload}
            />
          ))}
        </div>

        <div className="actions">
          <button 
            className={`btn btn-primary ${!allUploaded ? 'disabled' : ''}`}
            onClick={handleContinue}
            disabled={!allUploaded}
          >
            ✅ Confirm & Continue →
          </button>
          <Link to="/" className="btn btn-secondary">
            ← Back to Home
          </Link>
        </div>
      </div>

      <style jsx>{`
        .upload-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
          animation: gradientShift 10s ease infinite;
          background-size: 200% 200%;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          animation: fadeIn 0.8s ease-out;
        }

        h1 {
          text-align: center;
          color: white;
          margin-bottom: 2rem;
          font-size: 2.5rem;
          text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
          animation: textPulse 2s ease-in-out infinite;
        }

        @keyframes textPulse {
          0%, 100% {
            text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
          }
          50% {
            text-shadow: 3px 3px 6px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.5);
          }
        }

        .progress-steps {
          display: flex;
          justify-content: center;
          margin-bottom: 3rem;
          position: relative;
          animation: slideDown 0.6s ease-out 0.2s both;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .progress-steps::before {
          content: '';
          position: absolute;
          top: 25px;
          left: 25%;
          right: 25%;
          height: 3px;
          background: rgba(255,255,255,0.3);
          z-index: 0;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
          margin: 0 2rem;
          transition: transform 0.3s ease;
        }

        .step:hover {
          transform: translateY(-5px);
        }

        .step-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
          margin-bottom: 0.5rem;
          border: 3px solid rgba(255,255,255,0.3);
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .step.active .step-circle {
          background: linear-gradient(135deg, #4caf50, #45a049);
          border-color: #4caf50;
          transform: scale(1.2);
          box-shadow: 0 8px 25px rgba(76, 175, 80, 0.5);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 8px 25px rgba(76, 175, 80, 0.5);
          }
          50% {
            box-shadow: 0 8px 35px rgba(76, 175, 80, 0.8);
          }
        }

        .step-label {
          color: white;
          font-size: 0.9rem;
          font-weight: bold;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }

        .upload-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 3rem;
          animation: fadeIn 0.8s ease-out 0.6s both;
        }

        @media (max-width: 768px) {
          .upload-grid {
            grid-template-columns: 1fr;
          }
          .actions {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

const FaceUpload = ({ label, faceId, preview, onFileUpload }) => {
  const handleClick = () => {
    document.getElementById(`file-input-${faceId}`).click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(faceId, file);
    }
  };

  return (
    <div className="face-upload">
      <h3>{label}</h3>
      <div className="face-preview" onClick={handleClick}>
        {preview ? (
          <img src={preview} alt={label} />
        ) : (
          <div className="upload-icon">📷</div>
        )}
      </div>
      <input
        type="file"
        id={`file-input-${faceId}`}
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button className="upload-btn" onClick={handleClick}>
        Choose Image
      </button>

      <style jsx>{`
        .face-upload {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .face-upload::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .face-upload:hover::before {
          left: 100%;
        }

        .face-upload:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }

        .face-upload h3 {
          margin-bottom: 1rem;
          color: #667eea;
          font-size: 1.5rem;
        }

        .face-preview {
          width: 100%;
          height: 250px;
          border: 3px dashed #ccc;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
          position: relative;
          overflow: hidden;
        }

        .face-preview::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(102,126,234,0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .face-preview:hover::after {
          opacity: 1;
        }

        .face-preview:hover {
          border-color: #667eea;
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
        }

        .face-preview img {
          max-width: 100%;
          max-height: 100%;
          border-radius: 10px;
          transition: transform 0.3s ease;
        }

        .face-preview:hover img {
          transform: scale(1.1);
        }

        .upload-icon {
          font-size: 4rem;
          color: #ccc;
          transition: all 0.3s ease;
        }

        .face-preview:hover .upload-icon {
          color: #667eea;
          transform: scale(1.2) rotate(10deg);
        }

        .upload-btn {
          padding: 0.8rem 2rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: bold;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          position: relative;
          overflow: hidden;
        }

        .upload-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .upload-btn:active::before {
          width: 300px;
          height: 300px;
        }

        .upload-btn:hover {
          background: linear-gradient(135deg, #764ba2, #667eea);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Upload;