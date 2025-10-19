import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Upload from './components/Upload';
import Confirm from './components/Confirm';
import Solve from './components/Solve';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/solve" element={<Solve />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;