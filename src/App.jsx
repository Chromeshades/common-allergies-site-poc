import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllergyList from './components/AllergyList';
import AllergyDetail from './components/AllergyDetail';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<AllergyList />} />
          <Route path="/allergy/:id" element={<AllergyDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;