import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './pages/Header';
import MainPage from './pages/MainPage'; 
import PokemonCards from './pages/PokemonCards';
import CardDetail from './pages/CardDetail';
import Footer from './pages/Footer';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <BrowserRouter>
      <div className="App">
        <Header setSearchTerm={setSearchTerm} />
        
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route 
              path="/search" 
              element={<PokemonCards searchTerm={searchTerm} />} // 검색어 전달
            />
            <Route path="/card/:id" element={<CardDetail />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
