import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import Header from './pages/Header';
import PokemonCards from './PokemonCards';
import CardDetail from './pages/CardDetail';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    setSearchQuery(searchTerm);
    navigate('/');
  };

  return (
    <div className="App">
      <Header 
        navigate={navigate} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        handleSearch={handleSearch}
      />
      
      <div style={{maxWidth: '1280px', margin: 'auto', marginTop: '100px'}}>
        <Routes>
          <Route path="/" element={<PokemonCards searchQuery={searchQuery} />} />
          <Route path="/card/:id" element={<CardDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
