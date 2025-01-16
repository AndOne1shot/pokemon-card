import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './pages/Header';
import MainPage from './pages/MainPage'; 
import PokemonCards from './pages/PokemonCards';
import CardDetail from './pages/CardDetail';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          handleSearch={handleSearch}
          resetSearch={resetSearch} 
        />
        
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route 
              path="/search" 
              element={
                <PokemonCards 
                  searchTerm={searchTerm} 
                  searchResults={searchResults}
                  handleSearch={handleSearch}
                />
              } 
            />
            <Route path="/card/:id" element={<CardDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
